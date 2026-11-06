import { Coat } from "@/components/Coat";
import { Hero } from "@/components/home/Hero";
import { PaletteWall } from "@/components/home/PaletteWall";
import { RoomsRail } from "@/components/home/RoomsRail";
import { Doors, Intro, Marquee, Open } from "@/components/home/sections";

export default function HomePage() {
  return (
    <Coat>
      <div>
        <Hero />
        <Intro />
        <Doors />
        <RoomsRail />
        <PaletteWall />
        <Marquee />
        <Open />
      </div>
    </Coat>
  );
}
