const BE_BASE_URL = process.env.NEXT_PUBLIC_BE_BASE_URL || "http://localhost:8000";

export interface ConfirmFarmAreaParams {
  userId: string;
  token: string;
  coords: any;
  image: Blob;
  crop: string;
}

export async function confirmFarmArea(params: ConfirmFarmAreaParams): Promise<any> {
  const { userId, token, coords, image, crop } = params;
  const formData = new FormData();
  formData.append("snapshot", image);
  formData.append("coords", JSON.stringify(coords));
  formData.append("crop", crop);

  const response = await fetch(`${BE_BASE_URL}/api/confirm-farm-area/${userId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to confirm farm area");
  }
  return await response.json();
}

export async function getDashboardData(userId: string, token: string): Promise<any> {
  const response = await fetch(`${BE_BASE_URL}/api/latest-farm-area/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return await response.json();
}
