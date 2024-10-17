import Image from "next/image";
import Loader from "../molecules/Loader.molecule";

const Splash = () => {
  return (
    <main className="h-screen w-screen bg-neutral-950 relative">
      <div className="absolute top-1/3 w-full flex flex-col items-center">
        <Image
          alt="logo"
          src={'/assets/portalis-logo.png'}
          width={100}
          height={100}
          className="w-48 h-auto"
        />
        <Loader className="after:!bg-neutral-950" />
      </div>
    </main>
  )
}

export default Splash;