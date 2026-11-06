import { PageHero } from "@/components/PageHero";
import { PaintLink } from "@/components/PaintLink";

export default function NotFound() {
  return (
    <PageHero color="lulworth" ink="hague" hem={false} title="wrong door." lead="This room hasn’t been built yet. Let’s get you back to the hall.">
      <div className="mt-8">
        <PaintLink href="/">back to the hall</PaintLink>
      </div>
    </PageHero>
  );
}
