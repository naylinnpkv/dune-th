import { Asset } from "@/types";
import { formatUSD, formatLargeNumber } from "@/utils/formatters";
import { ChevronDown } from "lucide-react";
import Ticker from "./Ticker";

export default function AssetDetail({ asset }: { asset: Asset }) {
  const priceChange = parseFloat(asset.changePercent24Hr).toFixed(2);

  return (
    <>
      <section
        className="
        w-full bg-blue-500 text-white
        flex flex-wrap md:flex-nowrap   
        gap-4 md:gap-0                 
        justify-between md:justify-around
        items-center p-4
"
      >
        <div
          className=" 
      w-16 h-16 shrink-0 bg-green-500 
      rounded-lg flex flex-col 
      items-center justify-center
      "
        >
          <span className="text-2xl font-bold leading-none">{asset.rank}</span>
          <span className="text-xs mt-1">Rank</span>
        </div>

        <div
          className="
      flex flex-col items-center 
      text-center md:text-left
      "
        >
          <h2 className="text-lg md:text-2xl font-bold">
            {asset.name} (<span className="uppercase">{asset.symbol}</span>)
          </h2>

          <p className="mt-1 text-base md:text-xl flex items-center gap-1">
            {formatUSD(asset.priceUsd)}
            <span
              className={`
              flex items-center gap-0.5 font-bold
              ${priceChange.startsWith("-") ? "text-red-400" : "text-green-300"}
            `}
            >
              {priceChange}% <ChevronDown className="w-3 h-3" strokeWidth={3} />
            </span>
          </p>
        </div>

        <div
          className="
          flex flex-wrap justify-center md:justify-start
          gap-x-6 gap-y-3 mt-4 md:mt-0
        "
        >
          {[
            {
              label: "Market Cap",
              value: `$${formatLargeNumber(asset.marketCapUsd)}`,
            },
            {
              label: "Volume (24 h)",
              value: `$${formatLargeNumber(asset.volumeUsd24Hr)}`,
            },
            { label: "Supply", value: formatLargeNumber(asset.supply) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center min-w-[7rem]">
              <div className="text-xs uppercase tracking-wide">{label}</div>
              <div className="text-sm md:text-xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </section>
      <Ticker coinId={asset.id} />
    </>
  );
}
