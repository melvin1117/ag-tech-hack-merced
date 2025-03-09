"use client";

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getDashboardData } from "../services/api";
import { PageContainer } from "@/components/containers/page-container";
import { SectionContainer } from "@/components/containers/section-container";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import RecommendedCrops from "@/components/dashboard/recommendations";

export default function RecommendationPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's dashboard data (which includes recommendedCrops).
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getAccessTokenSilently();
        const userId = user?.sub || "";
        const data = await getDashboardData(userId, token);
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching recommended crops data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getAccessTokenSilently, user]);

  if (loading) {
    return (
      <PageContainer>
        <SectionContainer>
          <p>Loading recommended crops...</p>
        </SectionContainer>
      </PageContainer>
    );
  }

  // If no data or recommended crops, show a message.
  if (!dashboardData || !dashboardData.recommendedCrops) {
    return (
      <PageContainer>
        <SectionContainer>
          <p>No recommended crops found.</p>
        </SectionContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex">
        {/* Use your existing sidebar with the 4 options */}
        <div className="flex-1">
          <DashboardHeader title="Recommended Crops" />
          <SectionContainer>
            {/* Render the recommended crops */}
            <RecommendedCrops crops={dashboardData.recommendedCrops} />
          </SectionContainer>
        </div>
      </div>
    </PageContainer>
  );
}
