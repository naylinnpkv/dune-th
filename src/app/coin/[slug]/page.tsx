import AssetDetail from "@/components/detail/AssetDetail";

export default async function CoinPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/coin/${slug}`
  );
  const data = await res.json();
  const asset = data.data;
  console.log(asset);
  return <AssetDetail asset={asset} />;
}
