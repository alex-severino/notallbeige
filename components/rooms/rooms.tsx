import { paint as c } from "@/content/site";
import {
  arch,
  Checks,
  Curtain,
  FloorLamp,
  Frame,
  Frieze,
  PedestalTable,
  Pendant,
  Rug,
  scallops,
  ShellChair,
  Sofa,
  TableLamp,
  Vase,
  wavy,
} from "./parts";

const W = 1200;
const H = 900;
const FLOOR = 770;

function Skirting({ fill = c("aulait") }: { fill?: string }) {
  return <rect y={FLOOR - 20} width={W} height={20} fill={fill} />;
}

function RomescoDining() {
  return (
    <>
      <rect width={W} height={H} fill={c("romesco")} />
      <Frieze width={W} depth={64} fill={c("calamine")} count={16} />
      <Frame x={84} y={196} w={214} h={286} frame={c("aulait")} mat={c("lulworth")}>
        <circle cx={107} cy={112} r={72} fill={c("india")} />
        <rect y={196} width={214} height={90} fill={c("hague")} />
      </Frame>
      <Frame x={902} y={196} w={214} h={286} frame={c("aulait")} mat={c("shallot")}>
        <path d={arch(107, 286, 74, 226)} fill={c("romesco")} />
        <circle cx={107} cy={140} r={30} fill={c("india")} />
      </Frame>
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={c("hague")} />
      <Skirting />
      {/* end chairs */}
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(${600 + side * 452} ${FLOOR}) scale(${side === 1 ? 1 : -1} 1)`}>
          <rect x={26} y={-370} width={40} height={370} rx={20} fill={c("hague")} />
          <rect x={-112} y={-196} width={178} height={38} rx={19} fill={c("shallot")} />
          <rect x={-108} y={-170} width={24} height={170} rx={12} fill={c("hague")} />
        </g>
      ))}
      {/* table and cloth */}
      <path d="M312 640 296 770H334L352 640ZM888 640 904 770H866L848 640Z" fill={c("hague")} />
      <rect x={256} y={530} width={688} height={16} rx={8} fill={c("hague")} />
      <rect x={268} y={542} width={664} height={84} fill={c("calamine")} />
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x={268 + i * (664 / 13)} y={542} width={664 / 26} height={84} fill={c("shallot")} />
      ))}
      <path d={scallops(268, 932, 626, 13, 26, 2)} fill={c("india")} />
      {/* table top */}
      <Vase x={600} y={530} s={0.6} body={c("hague")} stem={c("aulait")} bloomA={c("shallot")} bloomB={c("lulworth")} />
      {[420, 780].map((x) => (
        <g key={x}>
          <path d={`M${x - 24} 530H${x + 24}L${x + 8} 500V430H${x - 8}V500Z`} fill={c("india")} />
          <rect x={x - 7} y={372} width={14} height={60} rx={7} fill={c("aulait")} />
        </g>
      ))}
      <Pendant x={600} y={246} width={350} shade={c("india")} fringe={c("hague")} cord={c("aulait")} />
    </>
  );
}

function LulworthBedroom() {
  const lobes = [
    { x: 340, top: 300 },
    { x: 470, top: 244 },
    { x: 600, top: 212 },
    { x: 730, top: 244 },
    { x: 860, top: 300 },
  ];
  return (
    <>
      <rect width={W} height={H} fill={c("lulworth")} />
      <Frieze width={W} depth={54} fill={c("aulait")} count={22} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={c("hague")} />
      <Skirting />
      {lobes.map((lobe, i) => (
        <rect key={lobe.x} x={lobe.x - 66} y={lobe.top} width={132} height={FLOOR - lobe.top - 60} rx={66} fill={i % 2 ? c("aulait") : c("india")} />
      ))}
      {/* bed */}
      <rect x={272} y={700} width={26} height={70} fill={c("hague")} />
      <rect x={902} y={700} width={26} height={70} fill={c("hague")} />
      <rect x={252} y={560} width={696} height={160} rx={44} fill={c("calamine")} />
      <path d="M252 626H948V672H252Z" fill={c("romesco")} />
      <rect x={292} y={478} width={288} height={118} rx={54} fill={c("aulait")} />
      <rect x={620} y={478} width={288} height={118} rx={54} fill={c("aulait")} />
      <rect x={476} y={510} width={248} height={92} rx={44} fill={c("shallot")} />
      {/* bedside */}
      {[120, 1080].map((x, i) => (
        <g key={x}>
          <PedestalTable x={x} y={FLOOR} width={170} height={236} top={c("hague")} leg={c("romesco")} />
          <TableLamp x={x} y={FLOOR - 236} s={0.9} shade={i ? c("romesco") : c("shallot")} fringe={c("india")} base={c("aulait")} />
        </g>
      ))}
      <Rug x={170} y={796} width={860} height={78} a={c("shallot")} b={c("romesco")} stripes={19} />
    </>
  );
}

function IndiaHall() {
  const steps = 7;
  const tread = 76;
  const rise = 60;
  const edge = 548;
  let stairs = `M${edge} ${FLOOR}`;
  for (let i = 1; i <= steps; i++) stairs += `V${FLOOR - i * rise}H${edge - i * tread}`;
  stairs += `V${FLOOR}Z`;
  return (
    <>
      <rect width={W} height={H} fill={c("india")} />
      <Frieze width={W} depth={58} fill={c("hague")} count={20} />
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={c("hague")} />
      <Skirting fill={c("hague")} />
      {/* stairs */}
      <rect y={FLOOR - steps * rise} width={edge - steps * tread} height={steps * rise} fill={c("hague")} />
      <path d={stairs} fill={c("hague")} />
      {Array.from({ length: steps }, (_, i) => {
        const x = edge - (i + 1) * tread;
        const y = FLOOR - (i + 1) * rise;
        return (
          <g key={i}>
            <rect x={x} y={y} width={tread} height={rise} fill={c("romesco")} />
            <rect x={x} y={y} width={tread} height={10} fill={c("shallot")} />
            <rect x={x + 34} y={y - 196} width={7} height={196} fill={c("aulait")} />
          </g>
        );
      })}
      <path d={`M${edge - 2} ${FLOOR - 246}L${edge - steps * tread - 80} ${FLOOR - steps * rise - 256}`} stroke={c("aulait")} strokeWidth={16} strokeLinecap="round" />
      {/* door */}
      <path d={arch(930, FLOOR, 174, 600)} fill={c("hague")} />
      <path d={arch(930, FLOOR, 146, 572)} fill={c("romesco")} />
      <path d={`M784 ${FLOOR - 426}A146 146 0 0 1 1076 ${FLOOR - 426}Z`} fill={c("lulworth")} />
      <g fill={c("hague")}>
        <rect x={784} y={FLOOR - 432} width={292} height={12} />
        <rect x={924} y={FLOOR - 572} width={12} height={146} />
        <path d={`M926 ${FLOOR - 426}L824 ${FLOOR - 526}L834 ${FLOOR - 534}L934 ${FLOOR - 430}ZM934 ${FLOOR - 426}L1036 ${FLOOR - 526}L1026 ${FLOOR - 534}L926 ${FLOOR - 430}Z`} />
      </g>
      <rect x={816} y={FLOOR - 388} width={100} height={158} fill={c("shallot")} />
      <rect x={944} y={FLOOR - 388} width={100} height={158} fill={c("shallot")} />
      <rect x={816} y={FLOOR - 196} width={100} height={158} fill={c("shallot")} />
      <rect x={944} y={FLOOR - 196} width={100} height={158} fill={c("shallot")} />
      <circle cx={1054} cy={FLOOR - 212} r={13} fill={c("india")} />
      {/* console and mirror */}
      <circle cx={660} cy={310} r={112} fill={c("aulait")} />
      <circle cx={660} cy={310} r={94} fill={c("lulworth")} />
      <path d="M612 268A68 68 0 0 1 700 250" fill="none" stroke={c("aulait")} strokeWidth={10} strokeLinecap="round" />
      <PedestalTable x={660} y={FLOOR} width={230} height={262} top={c("romesco")} leg={c("hague")} />
      <Vase x={660} y={FLOOR - 262} s={0.56} body={c("aulait")} stem={c("hague")} bloomA={c("romesco")} bloomB={c("shallot")} />
    </>
  );
}

const spines: [number, number, string][] = [
  [30, 150, "india"], [24, 128, "aulait"], [36, 158, "lulworth"], [22, 136, "hague"], [32, 146, "shallot"],
  [26, 120, "calamine"], [40, 160, "bancha"], [24, 142, "india"], [30, 132, "aulait"], [34, 154, "hague"],
  [22, 124, "lulworth"], [38, 148, "shallot"],
];

function Shelf({ x, y, width, offset }: { x: number; y: number; width: number; offset: number }) {
  const out: React.ReactNode[] = [];
  let cursor = x;
  let i = offset;
  while (cursor < x + width) {
    const [w, h, name] = spines[i % spines.length];
    if (cursor + w > x + width) break;
    out.push(<rect key={i} x={cursor} y={y - h} width={w} height={h} fill={c(name as "india")} />);
    cursor += w + 2;
    i++;
  }
  return <>{out}</>;
}

function HagueStudy() {
  const shelves = [270, 440, 610];
  return (
    <>
      <rect width={W} height={H} fill={c("hague")} />
      <Frieze width={W} depth={56} fill={c("shallot")} count={20} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={c("bancha")} />
      <Skirting fill={c("calamine")} />
      {/* bookcase with a painted back */}
      <rect x={60} y={96} width={650} height={FLOOR - 96} fill={c("aulait")} />
      <rect x={76} y={112} width={618} height={FLOOR - 112 - 16} fill={c("romesco")} />
      {shelves.map((y) => (
        <rect key={y} x={76} y={y} width={618} height={12} fill={c("aulait")} />
      ))}
      <rect x={380} y={112} width={12} height={FLOOR - 128} fill={c("aulait")} />
      <Shelf x={90} y={270} width={150} offset={0} />
      <circle cx={306} cy={228} r={42} fill={c("india")} />
      <Shelf x={404} y={270} width={278} offset={3} />
      <Shelf x={90} y={440} width={276} offset={6} />
      <Vase x={540} y={440} s={0.52} body={c("aulait")} stem={c("lulworth")} bloomA={c("india")} bloomB={c("shallot")} />
      <Shelf x={90} y={610} width={110} offset={2} />
      <path d={arch(290, 610, 58, 142)} fill={c("hague")} />
      <Shelf x={404} y={610} width={278} offset={8} />
      <rect x={100} y={700} width={250} height={26} fill={c("india")} />
      <rect x={118} y={674} width={210} height={26} fill={c("lulworth")} />
      <rect x={140} y={648} width={150} height={26} fill={c("aulait")} />
      <rect x={420} y={648} width={120} height={106} fill={c("hague")} />
      <rect x={560} y={648} width={120} height={106} fill={c("hague")} />
      <circle cx={528} cy={700} r={7} fill={c("india")} />
      <circle cx={572} cy={700} r={7} fill={c("india")} />
      {/* wall art and chair */}
      <Frame x={850} y={176} w={190} h={244} frame={c("aulait")} mat={c("india")}>
        <circle cx={95} cy={92} r={58} fill={c("romesco")} />
        <rect y={170} width={190} height={74} fill={c("hague")} />
      </Frame>
      <Rug x={716} y={796} width={484} height={78} a={c("romesco")} b={c("calamine")} stripes={13} />
      <ShellChair x={930} y={FLOOR + 6} s={0.94} a={c("shallot")} b={c("calamine")} seat={c("india")} leg={c("aulait")} />
      <FloorLamp x={1124} y={FLOOR} s={0.92} height={430} shade={c("india")} stripe={c("aulait")} fringe={c("romesco")} stem={c("aulait")} />
    </>
  );
}

function CalamineDrawing() {
  return (
    <>
      <rect width={W} height={H} fill={c("calamine")} />
      <Frieze width={W} depth={56} fill={c("romesco")} count={20} />
      <rect y={FLOOR} width={W} height={H - FLOOR} fill={c("hague")} />
      <Skirting />
      <path d={wavy(430, 282, 150, 174, 11, 0.075)} fill={c("romesco")} />
      <path d={wavy(430, 282, 112, 134, 11, 0.075)} fill={c("lulworth")} />
      <Curtain x={920} top={54} width={280} height={FLOOR - 54 + 44} a={c("romesco")} b={c("shallot")} pelmet={c("hague")} fringe={c("hague")} />
      <FloorLamp x={826} y={FLOOR} s={0.86} height={470} shade={c("lulworth")} stripe={c("aulait")} fringe={c("hague")} stem={c("hague")} />
      <Rug x={78} y={796} width={740} height={78} a={c("lulworth")} b={c("aulait")} stripes={17} />
      <Sofa x={420} y={FLOOR + 8} width={700} body={c("bancha")} back={c("bancha")} base={c("hague")} />
      <rect x={196} y={546} width={120} height={118} rx={26} fill={c("india")} transform="rotate(-9 256 605)" />
      <rect x={530} y={552} width={122} height={112} rx={26} fill={c("shallot")} transform="rotate(8 591 608)" />
      <rect x={622} y={560} width={96} height={100} rx={24} fill={c("romesco")} transform="rotate(-6 670 610)" />
      <PedestalTable x={420} y={FLOOR + 76} width={330} height={120} top={c("india")} leg={c("romesco")} />
      <Vase x={420} y={FLOOR - 44} s={0.46} body={c("aulait")} stem={c("hague")} bloomA={c("romesco")} bloomB={c("shallot")} />
    </>
  );
}

function BanchaKitchen() {
  const plates = [
    { x: 126, r: 54, fill: "romesco" },
    { x: 246, r: 42, fill: "lulworth" },
    { x: 340, r: 32, fill: "india" },
    { x: 868, r: 32, fill: "lulworth" },
    { x: 960, r: 44, fill: "india" },
    { x: 1078, r: 52, fill: "hague" },
  ] as const;
  const doors = [24, 196, 368, 748, 920, 1062];
  return (
    <>
      <rect width={W} height={H} fill={c("shallot")} />
      <Frieze width={W} depth={54} fill={c("bancha")} count={22} />
      <Checks x={0} y={344} width={W} height={198} size={49.5} a={c("aulait")} b={c("calamine")} />
      <Checks x={0} y={FLOOR} width={W} height={H - FLOOR} size={65} a={c("aulait")} b={c("romesco")} />
      {/* shelf */}
      {[{ x: 60, w: 340 }, { x: 800, w: 340 }].map((shelf) => (
        <rect key={shelf.x} x={shelf.x} y={300} width={shelf.w} height={14} fill={c("hague")} />
      ))}
      {plates.map((plate) => (
        <g key={plate.x}>
          <circle cx={plate.x} cy={300 - plate.r} r={plate.r} fill={c("aulait")} />
          <circle cx={plate.x} cy={300 - plate.r} r={plate.r * 0.62} fill={c(plate.fill)} />
        </g>
      ))}
      {/* base units */}
      <rect y={542} width={W} height={228} fill={c("bancha")} />
      <rect y={526} width={W} height={18} fill={c("aulait")} />
      {doors.map((x, i) => {
        const width = i === 5 ? 118 : 150;
        return (
          <g key={x}>
            <rect x={x} y={566} width={width} height={186} fill={c("hague")} />
            <rect x={x + 8} y={574} width={width - 16} height={170} fill={c("bancha")} />
            <circle cx={x + width / 2} cy={600} r={9} fill={c("india")} />
          </g>
        );
      })}
      {/* range and hood */}
      <path d="M432 120H768L812 344H388Z" fill={c("romesco")} />
      <rect x={388} y={344} width={424} height={20} fill={c("aulait")} />
      <rect x={456} y={494} width={288} height={276} fill={c("hague")} />
      <rect x={456} y={478} width={288} height={18} fill={c("aulait")} />
      {[496, 556, 616, 676].map((x) => (
        <circle key={x} cx={x + 14} cy={530} r={15} fill={c("india")} />
      ))}
      <rect x={480} y={574} width={240} height={164} rx={10} fill={c("aulait")} />
      <rect x={498} y={592} width={204} height={128} rx={6} fill={c("lulworth")} />
      <rect x={520} y={556} width={160} height={10} rx={5} fill={c("india")} />
      <Pendant x={190} y={180} width={190} shade={c("india")} fringe={c("hague")} cord={c("hague")} />
      <Pendant x={1010} y={180} width={190} shade={c("india")} fringe={c("hague")} cord={c("hague")} />
    </>
  );
}

const art: Record<string, () => React.ReactNode> = {
  "romesco-dining-room": RomescoDining,
  "lulworth-blue-bedroom": LulworthBedroom,
  "india-yellow-hall": IndiaHall,
  "hague-blue-study": HagueStudy,
  "calamine-drawing-room": CalamineDrawing,
  "bancha-kitchen": BanchaKitchen,
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
