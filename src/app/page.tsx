import Image from "next/image";
import SpinningWheel from "./components/spinningWheel";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <SpinningWheel />
    </div>
  );
}
