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
import { Style, Stroke, Fill } from 'ol/style';
import { useAuth0 } from '@auth0/auth0-react';
import { confirmFarmArea } from '../../services/api';

const cropOptions = [
  'Almonds',
  'Grapes',
  'Tomatoes',
  'Cotton',
  'Wheat'
];

const MapSetup = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObject = useRef<Map | null>(null);
  const [currentFeature, setCurrentFeature] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('');

  // Create a vector source and layer with a thick red border and transparent fill.
  const vectorSource = useRef(new VectorSource());
  const vectorLayer = useRef(
    new VectorLayer({
      source: vectorSource.current,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 4,
        }),
        fill: new Fill({
          color: 'rgba(0,0,0,0)',
        }),
      }),
    })
  );

  // Reference for the Draw interaction.
  const drawInteraction = useRef<Draw | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapObject.current) return;

    mapObject.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            crossOrigin: 'anonymous',
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

    // Center on user's current location if available.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = fromLonLat([position.coords.longitude, position.coords.latitude]);
          mapObject.current?.getView().animate({ center: coords, zoom: 14 });
        },
        (error) => console.error('Error obtaining geolocation', error)
      );
    }

    // Initialize drawing interaction for polygons.
    drawInteraction.current = new Draw({
      type: 'Polygon',
    });
    mapObject.current.addInteraction(drawInteraction.current);

    // When drawing ends, clear any existing feature and save the new one.
    drawInteraction.current.on('drawend', (event) => {
      vectorSource.current.clear();
      const feature = event.feature;
      vectorSource.current.addFeature(feature);
      setCurrentFeature(feature);

      // Log drawn coordinates (converted to lon/lat)
      const geometry = feature.getGeometry();
      const coords = geometry.getCoordinates();
      const lonLatCoords = coords.map((ring: any) =>
        ring.map((coord: any) => toLonLat(coord))
      );
      console.log('Drawn polygon coordinates (lon, lat):', lonLatCoords);
    });

    // Add geocoder control.
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
      mapObject.current?.getView().animate({ center: evt.coordinate, zoom: 14 });
    });

    return () => {
      mapObject.current?.setTarget(null);
      mapObject.current = null;
    };
  }, []);

  // Undo: remove the last drawn point using removeLastPoint().
  const handleUndo = () => {
    if (drawInteraction.current) {
      drawInteraction.current.removeLastPoint();
    }
  };

  // Download helper: trigger download of image blob.
  const downloadImage = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map-snapshot.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Confirm: zoom to drawn area, capture snapshot, download image, and send API via service.
  const handleConfirm = async () => {
    if (!currentFeature || !mapObject.current) {
      alert('Please draw an area first.');
      return;
    }
    if (!selectedCrop) {
      alert('Please select a crop.');
      return;
    }
    // Fit view to the feature's extent with some padding.
    const geometry = currentFeature.getGeometry();
    const extent = geometry.getExtent();
    mapObject.current.getView().fit(extent, { padding: [20, 20, 20, 20], duration: 0 });
    
    // Wait a tick for the view to update.
    setTimeout(() => {
      mapObject.current!.once('rendercomplete', async () => {
        const mapCanvas = document.createElement('canvas');
        const size = mapObject.current!.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext('2d');

        Array.prototype.forEach.call(
          document.querySelectorAll('.ol-layer canvas'),
          (canvas: HTMLCanvasElement) => {
            if (canvas.width > 0) {
              const opacity = canvas.parentNode?.style.opacity;
              mapContext!.globalAlpha = opacity === '' ? 1 : Number(opacity);
              const transform = canvas.style.transform;
              const matrix = transform.match(/^matrix\(([^\(]*)\)$/)?.[1]
                .split(',')
                .map(Number);
              if (matrix) {
                // @ts-ignore
                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
              }
              mapContext!.drawImage(canvas, 0, 0);
            }
          }
        );

        mapCanvas.toBlob(async (blob) => {
          if (blob) {
            // Download the image locally.
            downloadImage(blob);
            // Convert drawn polygon coordinates to lon/lat.
            const coords = geometry.getCoordinates();
            const lonLatCoords = coords.map((ring: any) =>
              ring.map((coord: any) => toLonLat(coord))
            );
            console.log('Confirming area with coords:', lonLatCoords);
            try {
              const token = await getAccessTokenSilently();
              const userId = user?.sub || '';
              if (!userId) {
                alert('User ID not found.');
                return;
              }
              // Call the API via the service layer, including the selected crop.
              const data = await confirmFarmArea({
                userId,
                token,
                coords: lonLatCoords,
                image: blob,
                crop: selectedCrop,
              });
              alert('Farm area confirmed successfully!');
              console.log('API response:', data);
            } catch (error) {
              console.error('Error confirming farm area:', error);
              alert('Failed to confirm farm area.');
            }
          } else {
            console.error('Failed to generate snapshot; canvas may be tainted.');
          }
        });
      });
      mapObject.current!.renderSync();
    }, 100);
  };

  return (
    <div className="flex flex-col relative">
      {/* Map container */}
      <div ref={mapRef} className="w-full h-[70vh] relative" />
      
      {/* Undo button: positioned at bottom left over the map */}
      <button
        onClick={handleUndo}
        className="absolute bottom-4 left-4 p-2 text-gray-600 hover:text-gray-800 bg-white bg-opacity-80 rounded-full shadow"
        title="Undo"
      >
        &#8630;
      </button>

      {/* Crop selection dropdown and submit button */}
      <div className="flex flex-col items-center mt-4">
        <label htmlFor="cropSelect" className="mb-2 font-semibold">
          Select Crop:
        </label>
        <select
          id="cropSelect"
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Select a crop --</option>
          {cropOptions.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
        <button
          onClick={handleConfirm}
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MapSetup;
