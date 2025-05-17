import Assets from "@/components/assets/Assets";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/assets`);
  const data = await res.json();
  const assets = data.data;
  return <Assets initialAssets={assets} />;
}
