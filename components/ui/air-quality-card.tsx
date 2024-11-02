"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Wind } from "lucide-react";

interface AirQuality {
  aqi: number;
  status: string;
  lastUpdated: string;
}

export function AirQualityCard() {
  const [airQuality, setAirQuality] = useState<AirQuality>({
    aqi: 72,
    status: "Moderate",
    lastUpdated: new Date().toISOString(),
  });

  useEffect(() => {
    // Fetch real air quality data here
    const fetchAirQuality = async () => {
      try {
        const response = await fetch("/api/air-quality");
        const data = await response.json();
        setAirQuality(data);
      } catch (error) {
        console.error("Failed to fetch air quality:", error);
      }
    };

    fetchAirQuality();
  }, []);

  const getStatusColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-600";
    if (aqi <= 100) return "text-yellow-600";
    if (aqi <= 150) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <section className="w-full bg-gradient-to-t from-green-50 to-white dark:from-green-950 dark:to-background py-24">
      <div className="container px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
          Bucharest Air Quality Index
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground mb-12">
          Real-time air quality monitoring to help you understand your impact
        </p>
        <Card className="mx-auto max-w-md p-8">
          <Wind className="mx-auto h-12 w-12 mb-4" />
          <div className={`text-7xl font-bold mb-4 ${getStatusColor(airQuality.aqi)}`}>{airQuality.aqi}</div>
          <p className="text-xl font-medium mb-2">{airQuality.status}</p>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(airQuality.lastUpdated).toLocaleTimeString()}
          </p>
        </Card>
      </div>
    </section>
  );
}
