import type { Metadata } from "next";
import { Coat } from "@/components/Coat";
import { PaintLink } from "@/components/PaintLink";
import { Reveal } from "@/components/Reveal";
import { Scallop } from "@/components/decor";
import { Frame } from "@/components/rooms/parts";
import styles from "@/components/pages.module.css";
import { paint, shop, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Shop",
  description: "The Not All Beige shop opens soon.",
  alternates: { canonical: "/shop" },
};

/** Paint running down the page: [width, length] of each drip. */
const runs = [
  [86, 210], [54, 120], [110, 300], [46, 92], [78, 176], [60, 250], [120, 140], [50, 330],
  [84, 110], [66, 226], [104, 164], [48, 96], [90, 280], [62, 130], [116, 200], [52, 110],
];

function dripPath() {
  const band = 46;
  const gap = 22;
  let d = `M0 0V${band}`;
  let x = 0;
  for (const [width, length] of runs) {
    const radius = width / 2;
    d += `a${gap / 2} ${gap / 2} 0 0 1 ${gap / 2} ${gap / 2}V${band + length - radius}a${radius} ${radius} 0 0 0 ${width} 0V${band + gap / 2}a${gap / 2} ${gap / 2} 0 0 1 ${gap / 2} ${-gap / 2}`;
    x += gap + width;
  }
  return { d: `${d}V0Z`, width: x };
}

/** A little gallery wall of made-up posters, not actual Posteress prints. */
function PosterWall() {
  return (
    <svg viewBox="0 0 640 560" role="img" aria-label="Illustration of three framed posters on a wall" className={styles.posters}>
      <Frame x={36} y={42} w={250} h={340} frame={paint("hague")} mat={paint("romesco")}>
        <circle cx={125} cy={128} r={80} fill={paint("india")} />
        <rect y={236} width={250} height={104} fill={paint("calamine")} />
      </Frame>
      <Frame x={340} y={42} w={264} h={196} frame={paint("hague")} mat={paint("lulworth")}>
        <path d="M0 196A132 132 0 0 1 264 196Z" fill={paint("hague")} />
        <circle cx={204} cy={62} r={32} fill={paint("shallot")} />
      </Frame>
      <Frame x={340} y={292} w={170} h={230} frame={paint("hague")} mat={paint("bancha")}>
        <path d="M0 230V120A85 85 0 0 1 170 120V230Z" fill={paint("shallot")} />
        <path d="M46 230V124A39 39 0 0 1 124 124V230Z" fill={paint("romesco")} />
      </Frame>
      <Frame x={36} y={438} w={250} h={84} frame={paint("hague")} mat={paint("india")}>
        <rect x={0} width={50} height={84} fill={paint("hague")} />
        <rect x={100} width={50} height={84} fill={paint("romesco")} />
        <rect x={200} width={50} height={84} fill={paint("aulait")} />
      </Frame>
    </svg>
  );
}

export default function ShopPage() {
  const drips = dripPath();
  return (
    <Coat>
      <div>
        <section className={`gutter ${styles.shopHero}`}>
          <svg className={styles.drips} viewBox={`0 0 ${drips.width} 400`} preserveAspectRatio="xMidYMin slice" aria-hidden="true">
            <path d={drips.d} fill={paint("romesco")} />
          </svg>
          <h1 className="display-xl relative">{shop.title}</h1>
          <p className="relative mt-[clamp(1.5rem,4vh,3rem)] max-w-[30em] text-[1.15em] leading-[1.22]">{shop.lead}</p>
          <Scallop color="shallot" />
        </section>
        <section className={`gutter ${styles.posteress}`}>
          <div>
            <Reveal as="h2" className="display-lg">
              posters, for now.
            </Reveal>
            <Reveal as="p" delay={90} className={styles.posteressCopy}>
              {shop.posteress}
            </Reveal>
            <Reveal delay={160}>
              <PaintLink href={site.posteress} external color="romesco" over="hague">
                visit posteress ↗
              </PaintLink>
            </Reveal>
          </div>
          <Reveal>
            <PosterWall />
          </Reveal>
        </section>
      </div>
    </Coat>
  );
}
