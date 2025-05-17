import Assets from "@/components/assets/Assets";

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(
    `https://rest.coincap.io/v3/assets?limit=20&offset=0&apiKey=${process.env.COINCAP_API_KEY}`
  );
  const data = await res.json();
  const assets = data.data;
  console.log(assets);
  return <Assets initialAssets={assets} />;
}
