"use client";

import { useState, useEffect } from "react";
import type { TrackingPoint } from "@/types";

interface TripTrackingProps {
  points: TrackingPoint[];
  currentIndex?: number;
  height?: number;
}

export function TripTracking({ points, currentIndex = 0, height = 220 }: TripTrackingProps) {
  const [index, setIndex] = useState(Math.min(currentIndex, points.length - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i < points.length - 1 ? i + 1 : i));
    }, 3000);
    return () => clearInterval(timer);
  }, [points.length]);

  const current = points[index];
  const minLat = Math.min(...points.map((p) => p.lat));
  const maxLat = Math.max(...points.map((p) => p.lat));
  const minLng = Math.min(...points.map((p) => p.lng));
  const maxLng = Math.max(...points.map((p) => p.lng));
  const pad = 0.02;
  const latRange = maxLat - minLat || 0.1;
  const lngRange = maxLng - minLng || 0.1;

  const toX = (lng: number) => ((lng - minLng + pad * lngRange) / (lngRange + 2 * pad * lngRange)) * 100;
  const toY = (lat: number) => 100 - ((lat - minLat + pad * latRange) / (latRange + 2 * pad * latRange)) * 100;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden" style={{ height }}>
      <div className="relative w-full h-full">
        {/* Simple map-like grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 10}
                x2={100}
                y2={i * 10}
                stroke="white"
                strokeWidth="0.3"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 10}
                y1={0}
                x2={i * 10}
                y2={100}
                stroke="white"
                strokeWidth="0.3"
              />
            ))}
          </svg>
        </div>
        {/* Route line */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <polyline
            points={points.map((p) => `${toX(p.lng)},${toY(p.lat)}`).join(" ")}
            fill="none"
            stroke="rgba(45, 212, 191, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={toX(p.lng)}
              cy={toY(p.lat)}
              r={i === index ? 3 : 1.5}
              fill={i <= index ? "#2dd4bf" : "rgba(255,255,255,0.4)"}
            />
          ))}
          {/* Moving vehicle indicator */}
          <circle
            cx={current ? toX(current.lng) : 0}
            cy={current ? toY(current.lat) : 0}
            r={4}
            fill="#2dd4bf"
            className="drop-shadow-lg"
          />
        </svg>
        {/* Status overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-medium text-sm">
            {current?.label ?? "Tracking…"}
          </p>
          <p className="text-slate-300 text-xs mt-0.5">
            {current?.time ?? ""} • Point {index + 1} of {points.length}
          </p>
        </div>
      </div>
    </div>
  );
}
