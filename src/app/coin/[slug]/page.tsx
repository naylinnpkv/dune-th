import AssetDetail from "@/components/detail/AssetDetail";

export default async function CoinPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/api/coin/${slug}`);
  const data = await res.json();
  const asset = data.data;
  console.log(asset);
  return <AssetDetail asset={asset} />;
}
