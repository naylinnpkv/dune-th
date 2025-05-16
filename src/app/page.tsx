import Assets from "@/components/assets/Assets";

export default async function Home() {
  const res = await fetch(
    `https://rest.coincap.io/v3/assets?limit=20&offset=0&apiKey=${process.env.NEXT_PUBLIC_COINCAP_API_KEY}`
  );
  const data = await res.json();
  const assets = data.data;
  return <Assets initialAssets={assets} />;
}
