"use client";

import { Asset } from "@/types";
import { formatLargeNumber, formatUSD } from "@/utils/formatters";
import useSWRInfinite from "swr/infinite";
import { Loader } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AssetsProps {
  initialAssets: Asset[];
}

const PAGE_SIZE = 20;

export default function Assets({ initialAssets }: AssetsProps) {
  const getKey = (
    pageIndex: number,
    previousPageData: { data: Asset[] } | null
  ) => {
    if (previousPageData && previousPageData.data.length === 0) return null;

    const offset = pageIndex * PAGE_SIZE;
    return `https://rest.coincap.io/v3/assets?limit=${PAGE_SIZE}&offset=${offset}&apiKey=${process.env.NEXT_PUBLIC_COINCAP_API_KEY}`;
  };

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(getKey, fetcher, {
      fallbackData: [{ data: initialAssets }],
      refreshInterval: 10000,
    });

  if (error) return <div>Error: {error.message}</div>;

  const assets = data ? data.flatMap((page) => page.data) : [];

  return (
    <div className="w-[80%] m-auto mb-6">
      <table className="min-w-full border-collapse border border-gray-200 bg-gray-50 m-6 rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="p-2 font-bold ">Rank</th>
            <th className="p-2 font-bold">Name</th>
            <th className="p-2 font-bold">Price</th>
            <th className="p-2 font-bold">Market Cap</th>
            <th className="p-2 font-bold">Volume(24Hr)</th>
            <th className="p-2 font-bold ">Change(24Hr)</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: Asset) => (
            <tr key={asset.id} className="bg-white">
              <td className="p-2 border-t border-gray-300 text-center">
                {asset.rank}
              </td>
              <td className="p-2 border-t border-gray-300">{asset.name}</td>
              <td className="p-2 border-t border-gray-300">
                {formatUSD(asset.priceUsd)}
              </td>
              <td className="p-2 border-t border-gray-300">
                {`$${formatLargeNumber(asset.marketCapUsd)}`}
              </td>
              <td className="p-2 border-t border-gray-300">
                {`$${formatLargeNumber(asset.volumeUsd24Hr)}`}
              </td>
              <td className="p-2 border-t border-gray-300">
                {parseFloat(asset.changePercent24Hr).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="animate-spin">
            <Loader />
          </div>
        ) : (
          <button
            className="bg-green-500 text-white text-sm p-2 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setSize(size + 1)}
            disabled={isValidating}
          >
            {isValidating ? "Updating..." : "View More"}
          </button>
        )}
      </div>
    </div>
  );
}
