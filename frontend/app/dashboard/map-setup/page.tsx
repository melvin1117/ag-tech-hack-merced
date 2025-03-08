'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import 'ol-geocoder/dist/ol-geocoder.min.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ } from 'ol/source';
import { Vector as VectorSource } from 'ol/source';
import { Draw } from 'ol/interaction';
import { fromLonLat, toLonLat } from 'ol/proj';
import OlGeocoder from 'ol-geocoder';
import { confirmFarmArea } from '../../services/api';
import { useAuth0 } from '@auth0/auth0-react';

const MapSetup = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObject = useRef<Map | null>(null);
  const [currentFeature, setCurrentFeature] = useState<any>(null);

  // Create a vector source and layer for drawn features
  const vectorSource = useRef(new VectorSource());
  const vectorLayer = useRef(
    new VectorLayer({
      source: vectorSource.current,
    })
  );
  // Reference for the Draw interaction
  const drawInteraction = useRef<Draw | null>(null);

  useEffect(() => {
    // Only initialize the map if it hasn't been created yet
    if (!mapRef.current || mapObject.current) return;

    // Initialize the map with a satellite base layer (with crossOrigin enabled)
    mapObject.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            crossOrigin: 'anonymous', // allow cross-origin requests
            attributions: 'Tiles © Esri',
          }),
        }),
        vectorLayer.current,
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    // Center on the user's current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lon = position.coords.longitude;
          const lat = position.coords.latitude;
          const coords = fromLonLat([lon, lat]);
          mapObject.current?.getView().animate({ center: coords, zoom: 14 });
        },
        (error) => {
          console.error('Error obtaining geolocation', error);
        }
      );
    }

    // Add drawing interaction for polygon drawing
    drawInteraction.current = new Draw({
      type: 'Polygon',
    });
    mapObject.current.addInteraction(drawInteraction.current);

    // Listen for the drawend event
    drawInteraction.current.on('drawend', (event) => {
      // Clear any existing features (allowing only one at a time)
      vectorSource.current.clear();
      const feature = event.feature;
      vectorSource.current.addFeature(feature);
      setCurrentFeature(feature);

      // Convert geometry coordinates to [lon, lat] and log them
      const geometry = feature.getGeometry();
      const coords = geometry.getCoordinates();
      const lonLatCoords = coords.map((ring: any) =>
        ring.map((coord: any) => toLonLat(coord))
      );
      console.log('Drawn polygon coordinates (lon, lat):', lonLatCoords);
    });

    // Add a geocoder control (powered by Nominatim/OpenStreetMap)
    const geocoder = new OlGeocoder('nominatim', {
      provider: 'osm',
      lang: 'en-US',
      placeholder: 'Search for location...',
      limit: 5,
      debug: false,
      autoComplete: true,
      keepOpen: false,
    });
    mapObject.current.addControl(geocoder);

    geocoder.on('addresschosen', (evt: any) => {
      const coordinate = evt.coordinate;
      console.log('Geocoder selected coordinate (lon, lat):', toLonLat(coordinate));
      mapObject.current?.getView().animate({ center: coordinate, zoom: 14 });
    });

    // Cleanup on unmount
    return () => {
      mapObject.current?.setTarget(null);
      mapObject.current = null;
    };
  }, []);

  // Undo: remove the last drawn point using draw.removeLastPoint()
  const handleUndo = () => {
    if (drawInteraction.current) {
      // This method removes the last vertex in the drawing
      drawInteraction.current.removeLastPoint();
    }
  };

  // Confirm: capture the map snapshot and polygon coordinates, then call API
  const handleConfirm = async () => {
    if (!currentFeature || !mapObject.current) {
      alert('Please draw an area first.');
      return;
    }
    // Capture snapshot after render completes
    mapObject.current.once('rendercomplete', async () => {
      const mapCanvas = document.createElement('canvas');
      const size = mapObject.current!.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext('2d');

      // Merge all layer canvases into one
      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        (canvas: HTMLCanvasElement) => {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode?.style.opacity;
            mapContext!.globalAlpha = opacity === '' ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)?.[1]
              .split(',')
              .map(Number);
            if (matrix) {
              // @ts-ignore
              CanvasRenderingContext2D.prototype.setTransform.apply(
                mapContext,
                matrix
              );
            }
            mapContext!.drawImage(canvas, 0, 0);
          }
        }
      );
      mapCanvas.toBlob(async (blob) => {
        if (blob) {
          // Extract coordinates from the drawn feature
          const geometry = currentFeature.getGeometry();
          const coords = geometry.getCoordinates();
          const lonLatCoords = coords.map((ring: any) =>
            ring.map((coord: any) => toLonLat(coord))
          );
          console.log('Confirming area with coords:', lonLatCoords);
          // Get auth token (and assume user id is in user.sub)
          const token = await getAccessTokenSilently();
          const userId = user?.sub || '';
          // Call API service to confirm farm area
          try {
            await confirmFarmArea({
              userId,
              token,
              coords: lonLatCoords,
              image: blob,
            });
            alert('Farm area confirmed successfully!');
          } catch (error) {
            console.error('Error confirming farm area:', error);
            alert('Failed to confirm area.');
          }
        } else {
          console.error('Failed to generate snapshot; canvas may be tainted.');
        }
      });
    });
    mapObject.current.renderSync();
  };

  return (
    <div className="flex flex-col">
      <div ref={mapRef} className="w-full h-[70vh]" />
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={handleUndo}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
        >
          Undo
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
        >
          Confirm Area
        </button>
      </div>
    </div>
  );
};

export default MapSetup;
