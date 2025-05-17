import Assets from "@/components/assets/Assets";

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(`http://localhost:3000/api/assets`);
  const data = await res.json();
  const assets = data.data;
  console.log(assets);
  return <Assets initialAssets={assets} />;
}
