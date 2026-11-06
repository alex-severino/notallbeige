import { paint as c, type PaintKey } from "@/content/site";
import {
  arch,
  Checks,
  dotPaper,
  Frame,
  Frieze,
  PedestalTable,
  Pendant,
  perspectiveTiles,
  PinwheelTiles,
  Rug,
  scallops,
  ShellChair,
  stripeBands,
  TableLamp,
  Vase,
} from "./parts";

const W = 1200;
const H = 900;
const FLOOR = 770;
const PLINTH = 40;

/** The same paint in shadow, for depth without bringing in another colour. */
const shade = (base: PaintKey, into: PaintKey, amount: number) =>
  `color-mix(in srgb, ${c(base)} ${100 - amount}%, ${c(into)})`;

/** Every room's plinth is Romesco. */
function Plinth() {
  return <rect y={FLOOR - PLINTH} width={W} height={PLINTH} fill={c("romesco")} />;
}

function Entrance() {
  const steps = 7;
  const tread = 76;
  const rise = 60;
  const edge = 548;
  let stairs = `M${edge} ${FLOOR}`;
  for (let i = 1; i <= steps; i++) stairs += `V${FLOOR - i * rise}H${edge - i * tread}`;
  stairs += `V${FLOOR}Z`;
  const panel = shade("romesco", "hague", 20);
  return (
    <>
      <rect width={W} height={H} fill={c("hague")} />
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={c("hague")} />
      <Plinth />
      {/* stairs */}
      <rect y={FLOOR - steps * rise} width={edge - steps * tread} height={steps * rise} fill={c("aulait")} />
      <path d={stairs} fill={c("aulait")} />
      {Array.from({ length: steps }, (_, i) => {
        const x = edge - (i + 1) * tread;
        const y = FLOOR - (i + 1) * rise;
        return (
          <g key={i}>
            <rect x={x} y={y} width={tread} height={rise} fill={c("romesco")} />
            <rect x={x + 34} y={y - 196} width={7} height={196} fill={c("aulait")} />
          </g>
        );
      })}
      <path d={`M${edge - 2} ${FLOOR - 246}L${edge - steps * tread - 80} ${FLOOR - steps * rise - 256}`} stroke={c("aulait")} strokeWidth={16} strokeLinecap="round" />
      {/* the door */}
      <path d={arch(930, FLOOR, 174, 600)} fill={c("aulait")} />
      <path d={arch(930, FLOOR, 146, 572)} fill={c("romesco")} />
      <path d={`M784 ${FLOOR - 426}A146 146 0 0 1 1076 ${FLOOR - 426}Z`} fill={c("lulworth")} />
      <g fill={c("aulait")}>
        <rect x={784} y={FLOOR - 432} width={292} height={12} />
        <rect x={924} y={FLOOR - 572} width={12} height={146} />
        <path d={`M926 ${FLOOR - 426}L824 ${FLOOR - 526}L834 ${FLOOR - 534}L934 ${FLOOR - 430}ZM934 ${FLOOR - 426}L1036 ${FLOOR - 526}L1026 ${FLOOR - 534}L926 ${FLOOR - 430}Z`} />
      </g>
      {[816, 944].map((x) => (
        <g key={x}>
          <rect x={x} y={FLOOR - 388} width={100} height={158} fill={panel} />
          <rect x={x} y={FLOOR - 196} width={100} height={158} fill={panel} />
        </g>
      ))}
      <circle cx={1054} cy={FLOOR - 212} r={13} fill={c("india")} />
      {/* console and mirror */}
      <circle cx={660} cy={310} r={112} fill={c("aulait")} />
      <circle cx={660} cy={310} r={94} fill={c("lulworth")} />
      <path d="M612 268A68 68 0 0 1 700 250" fill="none" stroke={c("aulait")} strokeWidth={10} strokeLinecap="round" />
      <PedestalTable x={660} y={FLOOR} width={230} height={262} top={c("aulait")} leg={c("romesco")} />
      <Vase x={660} y={FLOOR - 262} s={0.56} body={c("india")} stem={c("aulait")} bloomA={c("romesco")} bloomB={c("shallot")} />
    </>
  );
}

function Hallway() {
  const vanish: [number, number] = [600, 430];
  const [vx, vy] = vanish;
  const end = 0.3;
  const back = { left: vx - 600 * end, right: vx + 600 * end, top: vy - 430 * end, bottom: vy + 470 * end };
  const wall = shade("romesco", "hague", 14);
  const trim = c("romesco");

  /** A patch of side wall between two depths. Heights run from 0 at the floor to 1 at the ceiling. */
  const patch = (side: -1 | 1, near: number, far: number, low: number, high: number) => {
    const x = (d: number) => vx + (side * 600) / d;
    const y = (d: number, level: number) => vy + 470 / d + (-430 / d - 470 / d) * level;
    return `M${x(near)} ${y(near, low)}L${x(far)} ${y(far, low)}L${x(far)} ${y(far, high)}L${x(near)} ${y(near, high)}Z`;
  };

  return (
    <>
      <rect width={W} height={H} fill={c("romesco")} />
      {/* Stripe wallpaper on the ceiling, running down the length of the hall */}
      {stripeBands(W, 480).map((band) => {
        const far = (x: number) => back.left + (x / W) * (back.right - back.left);
        const right = band.x + band.width;
        return (
          <path
            key={band.x}
            d={`M${band.x} 0L${right + 0.5} 0L${far(right) + 0.2} ${back.top}L${far(band.x)} ${back.top}Z`}
            fill={c(band.colour)}
          />
        );
      })}
      <path d={`M0 0L${back.left} ${back.top}V${back.bottom}L0 ${H}Z`} fill={wall} />
      <path d={`M${W} 0L${back.right} ${back.top}V${back.bottom}L${W} ${H}Z`} fill={wall} />
      {/* floor */}
      <path d={`M0 ${H}H${W}L${back.right} ${back.bottom}H${back.left}Z`} fill={c("aulait")} />
      <path d={perspectiveTiles({ vanish, left: 0, right: W, floor: H, near: 1, far: 1 / end, columns: 8, rows: 12 })} fill={c("hague")} />
      {/* skirting, doors and pictures, all in the same Romesco */}
      <path d={patch(-1, 1, 1 / end, 0, 0.1)} fill={trim} />
      <path d={patch(1, 1, 1 / end, 0, 0.1)} fill={trim} />
      {([-1, 1] as const).map((side) => (
        <g key={side}>
          <path d={patch(side, 1.3, 1.82, 0, 0.74)} fill={trim} />
          <path d={patch(side, 1.38, 1.76, 0.08, 0.34)} fill={wall} />
          <path d={patch(side, 1.38, 1.76, 0.4, 0.68)} fill={wall} />
        </g>
      ))}
      <path d={patch(-1, 2.15, 2.75, 0.34, 0.68)} fill={c("aulait")} />
      <path d={patch(-1, 2.22, 2.68, 0.4, 0.62)} fill={c("shallot")} />
      <path d={patch(1, 2.15, 2.75, 0.34, 0.68)} fill={c("aulait")} />
      <path d={patch(1, 2.22, 2.68, 0.4, 0.62)} fill={c("india")} />
      {/* far door, standing open */}
      <path d={arch(vx, back.bottom, 66, 208)} fill={c("aulait")} />
      <path d={arch(vx, back.bottom, 54, 196)} fill={c("lulworth")} />
      <path d={`M${vx - 54} ${back.bottom}H${vx + 54}L${vx + 34} ${back.bottom - 26}H${vx - 34}Z`} fill={c("aulait")} />
      <Pendant x={vx} y={236} width={150} shade={c("aulait")} fringe={c("india")} cord={c("hague")} />
    </>
  );
}

function Kitchen() {
  const line = shade("hague", "lulworth", 30);
  const plates = [
    { x: 126, r: 54, fill: "romesco" },
    { x: 246, r: 42, fill: "india" },
    { x: 340, r: 32, fill: "hague" },
    { x: 868, r: 32, fill: "india" },
    { x: 960, r: 44, fill: "hague" },
    { x: 1078, r: 52, fill: "romesco" },
  ] as const;
  const doors = [24, 168, 312, 762, 906, 1050];
  const doorWidth = 126;
  return (
    <>
      <rect width={W} height={H} fill={c("calamine")} />
      <rect y={344} width={W} height={198} fill={c("hague")} />
      <PinwheelTiles x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={c("hague")} />
      {[{ x: 60, w: 340 }, { x: 800, w: 340 }].map((shelf) => (
        <rect key={shelf.x} x={shelf.x} y={300} width={shelf.w} height={14} fill={c("hague")} />
      ))}
      {plates.map((plate) => (
        <g key={plate.x}>
          <circle cx={plate.x} cy={300 - plate.r} r={plate.r} fill={c("aulait")} />
          <circle cx={plate.x} cy={300 - plate.r} r={plate.r * 0.62} fill={c(plate.fill)} />
        </g>
      ))}
      {/* units */}
      <rect y={542} width={W} height={228} fill={c("hague")} />
      <rect y={526} width={W} height={18} fill={c("aulait")} />
      <rect y={FLOOR - PLINTH} width={W} height={PLINTH} fill={c("romesco")} />
      {doors.map((x) => (
        <g key={x}>
          <rect x={x} y={558} width={doorWidth} height={160} fill={line} />
          <rect x={x + 8} y={566} width={doorWidth - 16} height={144} fill={c("hague")} />
          <circle cx={x + doorWidth / 2} cy={592} r={9} fill={c("india")} />
        </g>
      ))}
      {/* range and hood */}
      <path d="M432 92H768L812 344H388Z" fill={shade("calamine", "romesco", 9)} />
      <rect x={388} y={344} width={424} height={20} fill={c("aulait")} />
      <rect x={456} y={494} width={288} height={276} fill={c("bancha")} />
      <rect x={456} y={478} width={288} height={18} fill={c("aulait")} />
      {[496, 556, 616, 676].map((x) => (
        <circle key={x} cx={x + 14} cy={530} r={15} fill={c("india")} />
      ))}
      <rect x={480} y={574} width={240} height={164} rx={10} fill={c("aulait")} />
      <rect x={498} y={592} width={204} height={128} rx={6} fill={c("hague")} />
      <rect x={520} y={556} width={160} height={10} rx={5} fill={c("india")} />
      <Pendant x={190} y={170} width={190} shade={c("romesco")} fringe={c("hague")} cord={c("hague")} />
      <Pendant x={1010} y={170} width={190} shade={c("romesco")} fringe={c("hague")} cord={c("hague")} />
    </>
  );
}

function LivingRoom() {
  const deep = shade("lulworth", "hague", 24);
  return (
    <>
      <rect width={W} height={H} fill={c("lulworth")} />
      <Frieze width={W} depth={64} fill={c("aulait")} count={16} />
      <Frame x={108} y={196} w={184} h={246} frame={c("aulait")} mat={c("lulworth")}>
        <rect x={14} y={14} width={156} height={218} fill={c("aulait")} />
        <circle cx={92} cy={100} r={54} fill={c("lulworth")} />
        <rect x={14} y={172} width={156} height={60} fill={c("lulworth")} />
      </Frame>
      <Frame x={908} y={196} w={184} h={246} frame={c("aulait")} mat={c("lulworth")}>
        <rect x={14} y={14} width={156} height={218} fill={c("aulait")} />
        <path d={arch(92, 232, 54, 180)} fill={c("lulworth")} />
        <circle cx={92} cy={130} r={22} fill={c("aulait")} />
      </Frame>
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={deep} />
      <Plinth />
      {/* mirror over the mantel */}
      <path d={arch(600, 432, 120, 300)} fill={c("aulait")} />
      <path d={arch(600, 420, 104, 276)} fill={c("lulworth")} />
      <path d="M546 248A64 64 0 0 1 628 214" fill="none" stroke={c("aulait")} strokeWidth={10} strokeLinecap="round" />
      {/* fireplace */}
      <rect x={410} y={470} width={380} height={FLOOR - 470} fill={c("aulait")} />
      <rect x={386} y={448} width={428} height={24} rx={12} fill={c("aulait")} />
      <rect x={410} y={FLOOR - PLINTH} width={380} height={PLINTH} fill={c("romesco")} />
      <path d={arch(600, FLOOR, 104, 236)} fill={shade("lulworth", "hague", 55)} />
      <rect x={380} y={FLOOR} width={440} height={24} fill={c("romesco")} />
      {/* on the mantel */}
      <Vase x={430} y={448} s={0.46} body={c("aulait")} stem={c("aulait")} bloomA={c("aulait")} bloomB={c("aulait")} />
      {[750, 782].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 14} 448H${x + 14}L${x + 5} 430V${380 + i * 20}H${x - 5}V430Z`} fill={c("aulait")} />
          <rect x={x - 5} y={340 + i * 20} width={10} height={40} rx={5} fill={c("aulait")} />
        </g>
      ))}
      {/* armchairs either side of the fire */}
      {[200, 1000].map((x) => (
        <ShellChair key={x} x={x} y={FLOOR} s={0.62} a={c("calamine")} b={shade("calamine", "romesco", 16)} seat={c("calamine")} leg={c("aulait")} />
      ))}
      <Rug x={300} y={812} width={600} height={58} a={c("romesco")} b={c("india")} stripes={15} />
    </>
  );
}

const PAPER_DEPTH = 536;
const bedroomDots = dotPaper(W, PAPER_DEPTH, 34);

function Bedroom() {
  const lobes = [
    { x: 340, top: 300 },
    { x: 470, top: 244 },
    { x: 600, top: 212 },
    { x: 730, top: 244 },
    { x: 860, top: 300 },
  ];
  return (
    <>
      {/* Dot wallpaper above Bancha panelling */}
      <rect width={W} height={PAPER_DEPTH} fill={c("romesco")} />
      <path d={bedroomDots} fill={c("shallot")} />
      <rect y={PAPER_DEPTH} width={W} height={FLOOR - PAPER_DEPTH} fill={c("bancha")} />
      <rect y={PAPER_DEPTH - 8} width={W} height={14} fill={c("bancha")} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={c("hague")} />
      <Plinth />
      {lobes.map((lobe) => (
        <rect key={lobe.x} x={lobe.x - 66} y={lobe.top} width={132} height={FLOOR - lobe.top - 60} rx={66} fill={c("bancha")} />
      ))}
      {/* bed */}
      <rect x={272} y={700} width={26} height={70} fill={c("aulait")} />
      <rect x={902} y={700} width={26} height={70} fill={c("aulait")} />
      <rect x={252} y={560} width={696} height={160} rx={44} fill={c("aulait")} />
      <path d="M252 626H948V672H252Z" fill={c("romesco")} />
      <rect x={292} y={478} width={288} height={118} rx={54} fill={c("calamine")} />
      <rect x={620} y={478} width={288} height={118} rx={54} fill={c("calamine")} />
      <rect x={476} y={510} width={248} height={92} rx={44} fill={c("shallot")} />
      {/* bedside */}
      {[120, 1080].map((x) => (
        <g key={x}>
          <PedestalTable x={x} y={FLOOR} width={170} height={236} top={c("aulait")} leg={c("hague")} />
          <TableLamp x={x} y={FLOOR - 236} s={0.9} shade={c("aulait")} fringe={c("india")} base={c("india")} />
        </g>
      ))}
      <Rug x={170} y={796} width={860} height={78} a={c("shallot")} b={c("aulait")} stripes={19} />
    </>
  );
}

function ChildrensBedroom() {
  const band = 161;
  return (
    <>
      <rect width={W} height={H} fill={c("macadamia")} />
      {/* Stripe wallpaper hung on its side against the ceiling, so its red runs along as one line */}
      {stripeBands(band, 420).map((stripe) => (
        <rect key={stripe.x} y={stripe.x} width={W} height={stripe.width + 0.5} fill={c(stripe.colour)} />
      ))}
      <rect y={band} width={W} height={12} fill={c("aulait")} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={c("aulait")} />
      <Plinth />
      <Rug x={140} y={796} width={900} height={70} a={c("romesco")} b={c("shallot")} stripes={15} />
      {/* paper lantern and pictures */}
      <rect x={520} y={band + 12} width={4} height={234 - band - 12} fill={c("hague")} />
      <circle cx={522} cy={296} r={74} fill={c("aulait")} />
      {[
        { x: 128, fill: "romesco" },
        { x: 268, fill: "shallot" },
      ].map((picture, i) => (
        <Frame key={picture.x} x={picture.x} y={232} w={100} h={132} frame={c("romesco")} mat={c("aulait")}>
          {i ? <path d={arch(50, 132, 32, 96)} fill={c(picture.fill as "shallot")} /> : <circle cx={50} cy={66} r={30} fill={c(picture.fill as "romesco")} />}
        </Frame>
      ))}
      {/* bed */}
      <path d={arch(150, FLOOR, 62, 392)} fill={c("romesco")} />
      <path d={arch(660, FLOOR, 62, 262)} fill={c("romesco")} />
      <rect x={172} y={640} width={466} height={34} fill={c("romesco")} />
      <rect x={176} y={566} width={458} height={84} rx={24} fill={c("aulait")} />
      <rect x={336} y={536} width={306} height={122} rx={34} fill={c("shallot")} />
      <rect x={336} y={588} width={306} height={22} fill={c("romesco")} />
      <rect x={186} y={520} width={150} height={64} rx={30} fill={c("aulait")} />
      {/* toy shelf */}
      <path d="M818 770V392L950 282 1082 392V770Z" fill={c("romesco")} />
      <path d="M842 750V402L950 312 1058 402V750Z" fill={c("aulait")} />
      <rect x={842} y={500} width={216} height={14} fill={c("romesco")} />
      <rect x={842} y={630} width={216} height={14} fill={c("romesco")} />
      <circle cx={950} cy={400} r={32} fill={c("india")} />
      {[866, 898, 926, 964, 998].map((x, i) => (
        <rect key={x} x={x} y={630 - [92, 104, 86, 100, 90][i]} width={i % 2 ? 28 : 34} height={[92, 104, 86, 100, 90][i]} fill={c((["shallot", "hague", "india", "romesco", "shallot"] as const)[i])} />
      ))}
      <rect x={872} y={700} width={50} height={50} fill={c("shallot")} />
      <rect x={926} y={700} width={50} height={50} fill={c("india")} />
      <rect x={898} y={650} width={50} height={50} fill={c("hague")} />
      {/* blocks on the floor */}
      <rect x={728} y={714} width={56} height={56} fill={c("india")} />
      <rect x={742} y={662} width={52} height={52} fill={c("shallot")} />
    </>
  );
}

function Bathroom() {
  const dado = 438;
  let tiles = "";
  for (let y = dado + 52; y < FLOOR - PLINTH; y += 52) tiles += `M0 ${y}H${W}`;
  for (let x = 52; x < W; x += 52) tiles += `M${x} ${dado}V${FLOOR - PLINTH}`;
  return (
    <>
      <rect width={W} height={H} fill={c("oldwhite")} />
      {/* India Yellow tiles */}
      <rect y={dado} width={W} height={FLOOR - dado} fill={c("india")} />
      <path d={tiles} stroke={c("aulait")} strokeWidth={3} fill="none" />
      <rect y={dado - 12} width={W} height={14} fill={c("aulait")} />
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("oldwhite")} b={c("bancha")} />
      <Plinth />
      {/* window and blind */}
      <path d={arch(330, 400, 150, 330)} fill={c("aulait")} />
      <path d={arch(330, 386, 130, 300)} fill={c("lulworth")} />
      <path d={arch(330, 244, 130, 158)} fill={c("romesco")} />
      <path d={scallops(200, 460, 244, 7, 20, 2)} fill={c("romesco")} />
      {/* mirror and basin */}
      <circle cx={960} cy={268} r={128} fill={c("romesco")} />
      <circle cx={960} cy={268} r={104} fill={c("aulait")} />
      <path d="M908 232A70 70 0 0 1 988 196" fill="none" stroke={c("lulworth")} strokeWidth={10} strokeLinecap="round" />
      <path d="M918 770 934 600H986L1002 770Z" fill={c("aulait")} />
      <path d="M848 556H1072C1068 612 1030 636 960 636 890 636 852 612 848 556Z" fill={c("aulait")} />
      <rect x={952} y={504} width={16} height={56} fill={c("romesco")} />
      <path d="M960 508H1008" stroke={c("romesco")} strokeWidth={14} strokeLinecap="round" />
      {/* bath */}
      <path d="M690 530V462C690 416 756 416 756 462V478" fill="none" stroke={c("aulait")} strokeWidth={15} strokeLinecap="round" />
      <path d="M150 548H790C788 650 736 722 640 722H300C204 722 152 650 150 548Z" fill={c("romesco")} />
      <rect x={130} y={526} width={680} height={26} rx={13} fill={c("aulait")} />
      <path d="M268 716 250 770H294L312 716ZM672 716 690 770H646L628 716Z" fill={c("aulait")} />
      <rect x={230} y={552} width={92} height={108} rx={10} fill={c("india")} />
      <rect x={230} y={620} width={92} height={18} fill={c("aulait")} />
      <rect x={230} y={796} width={520} height={66} fill={c("india")} />
    </>
  );
}

const art: Record<string, () => React.ReactNode> = {
  entrance: Entrance,
  hallway: Hallway,
  kitchen: Kitchen,
  "living-room": LivingRoom,
  bedroom: Bedroom,
  "childrens-bedroom": ChildrensBedroom,
  bathroom: Bathroom,
};

export function RoomArt({
  slug,
  title,
  className,
  crop = "xMidYMax slice",
}: {
  slug: string;
  title: string;
  className?: string;
  crop?: string;
}) {
  const Art = art[slug];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={crop} role="img" aria-label={title} className={className}>
      <Art />
    </svg>
  );
}
