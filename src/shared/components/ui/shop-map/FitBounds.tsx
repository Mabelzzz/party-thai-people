"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitBounds({ points }: { points: { lat: number; lng: number }[] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length || !map) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}
