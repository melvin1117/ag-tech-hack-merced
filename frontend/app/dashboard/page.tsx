'use client';

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/containers/page-container";
import { SectionContainer } from "@/components/containers/section-container";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import dynamic from "next/dynamic";
import { useAuth0 } from "@auth0/auth0-react";
import { getDashboardData } from "../services/api";

// Sample tiles – adjust these if you already have similar components.
import SoilChart from "@/components/dashboard/soil-chart";
import WeatherTile from "@/components/dashboard/weather-tile";
import ImageCarousel from "@/components/dashboard/image-carousel";
import CarbonFootprint from "@/components/dashboard/carbon-footprint";
import AISuggestions from "@/components/dashboard/ai-suggestions";

export default function DashboardPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userId = user?.sub || "";
      const data = await getDashboardData(userId, token);
      setDashboardData(data);
      // Fetch weather data using first coordinate from farm.
      if (
        data &&
        data.land &&
        data.land.coordinates &&
        data.land.coordinates[0] &&
        data.land.coordinates[0].length > 0
      ) {
        const firstCoord = data.land.coordinates[0][0]; // [lon, lat]
        const lat = firstCoord[1];
        const lon = firstCoord[0];
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [getAccessTokenSilently, user]);

  if (loading) {
    return (
      <PageContainer>
        <div className="text-center p-4">Loading dashboard...</div>
      </PageContainer>
    );
  }

  // If no dashboard data, render MapSetup (for new farm area setup)
  if (!dashboardData) {
    const MapSetup = dynamic(() => import("./map-setup/page"), { ssr: false });
    return (
      <PageContainer>
        <DashboardHeader title="Set Up Your Farm Area" />
        <SectionContainer>
          <p className="mb-4">
            It looks like you haven&apos;t set up your farm area yet. Please draw your area, select a crop, and submit.
          </p>
          <MapSetup onAiTaskComplete={fetchDashboardData} />
        </SectionContainer>
      </PageContainer>
    );
  }

  // Otherwise, render full dashboard view.
  return (
    <PageContainer>
      <div className="flex">
        {/* Use your existing sidebar */}
        <div className="flex-1">
          <DashboardHeader title="AgroVision Dashboard" />
          <SectionContainer>
            {/* First row: Soil chart and Weather tile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SoilChart soil={dashboardData.soil} />
              <WeatherTile weather={weatherData} />
            </div>
            {/* Optional weather alert */}
            {weatherData && weatherData.weather && weatherData.weather[0] && (
              <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-800 rounded">
                <p className="text-gray-800 dark:text-gray-200">
                  Weather Alert: {weatherData.weather[0].description}
                </p>
              </div>
            )}
            {/* Second row: Image carousel */}
            <div className="mt-6">
              <ImageCarousel images={dashboardData.imageInsights} />
            </div>
            {/* Third row: Carbon footprint and AI suggestions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <CarbonFootprint value={dashboardData.carbonFootprint} />
              <AISuggestions suggestions={dashboardData.suggestions} insights={dashboardData.insights} />
            </div>
          </SectionContainer>
        </div>
      </div>
    </PageContainer>
  );
}
