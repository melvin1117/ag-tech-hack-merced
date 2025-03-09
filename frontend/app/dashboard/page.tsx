'use client';

import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/containers/page-container';
import { SectionContainer } from '@/components/containers/section-container';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import dynamic from 'next/dynamic';
import { FarmHealthFieldOverview } from '@/components/dashboard/farm-health-field-overview';
import { DashboardCards } from '@/components/dashboard/dashboard-cards';
import { DashboardCharts } from '@/components/dashboard/dashboard-charts';
import { useAuth0 } from '@auth0/auth0-react';
import { getDashboardData } from '../services/api';

// Dynamically import MapSetup for farm area setup (client-only).
const MapSetup = dynamic(() => import('./map-setup/page'), { ssr: false });

export default function DashboardPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch dashboard data.
  const fetchDashboardData = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userId = user?.sub || '';
      const data = await getDashboardData(userId, token);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  // If no dashboard data, render MapSetup.
  if (!dashboardData) {
    return (
      <PageContainer>
        <DashboardHeader title="Set Up Your Farm Area" />
        <SectionContainer>
          <p className="mb-4">
            It looks like you haven&apos;t set up your farm area yet. Please draw your area and select a crop.
          </p>
          <MapSetup onAiTaskComplete={fetchDashboardData} />
        </SectionContainer>
      </PageContainer>
    );
  }

  // Otherwise, render full dashboard view.
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
