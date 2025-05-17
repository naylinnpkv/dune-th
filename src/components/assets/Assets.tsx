"use client";

import { Asset } from "@/types";
import AssetsTable from "./AssetsTable";
import useSWRInfinite from "swr/infinite";
import { Loader, Search } from "lucide-react";

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
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/assets?limit=${PAGE_SIZE}&offset=${offset}`;
  };

  const { data, error, size, setSize, isValidating, isLoading } =
    useSWRInfinite(getKey, fetcher, {
      fallbackData: [{ data: initialAssets }],
      refreshInterval: 20000,
    });

  if (error) return <div>Error: {error.message}</div>;

  const assets = data ? data.flatMap((page) => page.data) : [];

  return (
    <>
      <div className="w-full flex flex-col items-center mb-6 px-10 justify-center">
        <div className="relative w-1/4 max-w-sm mt-6 self-start">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full flex justify-center">
          <AssetsTable assets={assets} />
        </div>
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
    </>
  );
}
