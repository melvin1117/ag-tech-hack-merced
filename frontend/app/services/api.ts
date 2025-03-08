export interface ConfirmFarmAreaParams {
  userId: string;
  token: string;
  coords: any;
  image: Blob;
}

export async function confirmFarmArea(params: ConfirmFarmAreaParams): Promise<any> {
  const { userId, token, coords, image } = params;
  const formData = new FormData();
  formData.append('snapshot', image);
  formData.append('coords', JSON.stringify(coords));

  const response = await fetch('/api/confirm-farm-area', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-User-Id': userId,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to confirm farm area');
  }
  return await response.json();
}

export async function getDashboardData(userId: string, token: string): Promise<any> {
  const response = await fetch('/api/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-User-Id': userId,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return await response.json();
}
