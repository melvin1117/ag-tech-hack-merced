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

export async function startAiTask(userId: string, landId: string, token: string): Promise<{ task_id: string }> {
  const response = await fetch(`${BE_BASE_URL}/api/start-ai-task/?user_id=${userId}&land_id=${landId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to start AI task");
  }
  return await response.json();
}

export async function trackAiTask(taskId: string, token: string): Promise<any> {
  const response = await fetch(`${BE_BASE_URL}/api/track-ai-task/${taskId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to track AI task");
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
