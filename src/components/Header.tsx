import Link from "next/link";
// import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 border-solid bg-white">
      <Link href="/" className="text-2xl font-bold">
        CoinCap
      </Link>
      {/* <ThemeToggle /> */}
    </header>
  );
}
