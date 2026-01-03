"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import FitBounds from "./FitBounds";
import { labelOfRegion } from "@/shared/utils/regions";
import { Shop } from "@/shared/types/shop.type";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";

const violetIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function AddFullscreenControl(): null {
  const map = useMap();

  useEffect(() => {
    const leafletMap = map as LeafletMap & {
      _fullscreenControlAdded?: boolean;
    };

    if (leafletMap && !leafletMap._fullscreenControlAdded) {
      L.control.fullscreen({ position: "topleft" }).addTo(leafletMap);
      leafletMap._fullscreenControlAdded = true;
    }
  }, [map]);

  return null;
}

export default function ShopMap({ filtered }: { filtered: Shop[] }) {
  return (
    <div className="relative w-full h-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] rounded-2xl overflow-visible border border-violet-100 shadow-sm">
      <MapContainer
        center={[15.87, 100.99] as [number, number]}
        zoom={6}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        className="rounded-2xl"
      >
        <AddFullscreenControl />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={filtered} />
        {filtered.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]} icon={violetIcon}>
            <Popup>
              <div className="font-semibold text-[#65349C]">{s.name}</div>
              <div className="text-sm text-gray-600">
                {s.province} · {labelOfRegion(s.region)}
              </div>
              {s.address && (
                <div className="text-xs text-gray-500">{s.address}</div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
