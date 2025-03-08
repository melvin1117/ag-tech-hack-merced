'use client';

import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/containers/page-container';
import { SectionContainer } from '@/components/containers/section-container';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import dynamic from 'next/dynamic';
import { FarmHealthFieldOverview } from "@/components/dashboard/farm-health-field-overview"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"

import { useAuth0 } from '@auth0/auth0-react';
import { getDashboardData } from '../services/api'

// Dynamically import the MapSetup component for farm area setup
const MapSetup = dynamic(() => import('./map-setup/page'), { ssr: false });

export default function DashboardPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from Auth0
        const token = await getAccessTokenSilently();
        const userId = user?.sub || '';
        // Call the dashboard API from our service layer
        const data = await getDashboardData(userId, token);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, user]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  // If no dashboard data (e.g. farm area not set), show map setup
  if (!dashboardData) {
    return (
      <PageContainer>
        <DashboardHeader title="Set Up Your Farm Area" />
        <SectionContainer>
          <p>
            It looks like you haven&apos;t set up your farm area yet. Please draw your area below.
          </p>
          <MapSetup />
        </SectionContainer>
      </PageContainer>
    );
  }

  // Otherwise, render the full dashboard view
  return (
    <PageContainer>
      <DashboardHeader title="AgroVision Dashboard" />
      <SectionContainer>
        <DashboardCards />
        <FarmHealthFieldOverview />
        <DashboardCharts />
      </SectionContainer>
    </PageContainer>
  );
}
