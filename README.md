## AgroVision - Smart Farming Solution

**AgroVision** is a **web-based solution** designed for **farmers** to **monitor their farmland** using **drones and IoT sensors** like **NPK and humidity sensors**.
The system provides **real-time farm analysis**, including:
-**Plant Health**
-**Soil Moisture Levels**
-**Weather Insights** (via OpenWeather API)
-**Livestock Tracking** (via Drone and Gemini AI)

It also includes an **AI-powered chatbot** and **Gemini AI** for **smart suggestions**, such as **crop recommendations and farm management insights**.

## Features

### **Farm Monitoring & Insights**
Uses **drones** & **NPK/humidity sensors** to collect **real-time data**.
Provides **weather insights** via **OpenWeather API**.
Analyzes **soil moisture levels & plant health** using **drone imagery**.
**Carbon Footprint Insights** - Estimates farm carbon emissions & sustainability impact.

### **AI-Powered Chatbot & Gemini AI**
**Chatbot integration** to assist farmers.
**Gemini AI** for **personalized insights & crop recommendations**.
**Livestock tracking using drone data**.

### **Dashboard**
**Real-time analytics** on soil quality, crops & weather.
Displays **sensor and drone data** in an easy-to-understand UI.

## Tech Stack

| **Component**   | **Technology Used**  |
|----------------|---------------------|
| **Frontend**   | Next.js (React), Tailwind CSS |
| **Backend**    | FastAPI (Python) |
| **Database**   | MongoDB |
| **Chatbot**   | Letta API |
| **AI Models**  | Gemini AI |
| **Cloud & Containers** | Docker, Docker Compose |
| **Task Processing** | Celery |

## Installation & Setup

###  Prerequisites
- Install **Docker** and **Docker Compose**.
- Ensure **Git** is installed. (`git --version` to check)

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/melvin1117/ag-tech-hack-merced.git

cd ag-tech-hack-merced
```

### **2️⃣ Run the Project**
```bash
docker compose up --build
```

## Contributing

- Fork the repository.
- Create a new branch.
```bash
git checkout -b feature-branch
```

- Make your changes and commit.
```bash
git commit -m "Added new feature"
```

- Push to the branch
```bash
git push origin feature-branch
```

- Open a pull request.

## Authors

Developed by Shubham Melvin Felix, Shreyas Kumar, Aatisha Cyrill and Priyansh Shrivastava.