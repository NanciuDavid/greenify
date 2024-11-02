import { NextResponse } from "next/server";

export async function GET() {
  // In a real app, fetch from an air quality API
  const mockData = {
    aqi: Math.floor(Math.random() * (150 - 30) + 30),
    status: "Moderate",
    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(mockData);
}
