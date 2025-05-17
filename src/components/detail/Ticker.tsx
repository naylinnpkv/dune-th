"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Point {
  time: number;
  priceUsd: string;
}

export default function Ticker({ coinId }: { coinId: string }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHistory = async () => {
    const res = await fetch(`/api/coin/${coinId}/chart`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data as Point[];
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setPoints(await fetchHistory());
      } catch (e) {
        console.error("history fetch", e);
      } finally {
        setLoading(false);
      }
    };

    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);

  const labels = points.map((point: { time: number }) =>
    new Date(point.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const prices = points.map((point: { priceUsd: string }) =>
    parseFloat(point.priceUsd)
  );
  const lineColor = loading ? "#FBBF24" : "#4F46E5";

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price (USD)",
        data: prices,
        borderColor: lineColor,
        fill: true,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <Line data={chartData} />
    </div>
  );
}
