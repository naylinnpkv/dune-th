import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}
