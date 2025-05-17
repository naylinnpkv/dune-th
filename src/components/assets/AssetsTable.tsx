import { Asset } from "@/types";
import { formatLargeNumber, formatUSD } from "@/utils/formatters";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type AssetsTableProps = {
  assets: Asset[];
};

export default function AssetsTable({ assets }: AssetsTableProps) {
  return (
    <div className="w-full max-w-4xl">
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
            <tr key={asset.id} className="bg-white hover:bg-gray-100">
              <td className="p-2 border-t border-gray-300 text-center">
                {asset.rank}
              </td>
              <td className="p-2 border-t border-gray-300 hover:underline cursor-pointer">
                <Link
                  href={`/coin/${asset.id}`}
                  target="_blank" // open in new tab feature is optional
                  className="flex items-center gap-2"
                >
                  {asset.name}
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </Link>
              </td>
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
    </div>
  );
}
