import { GlowingEffect } from "@/components/glowing-effect";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
// import Pricing from "@/components/Pricing";


import TextSeperator from "@/components/TextSeperator";
import { Box, Search, Settings, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-14">
      {/* SECTION 1 */}
      <section className="flex flex-col items-center justify-center gap-4 text-center mx-auto  h-screen">
        <h1 className="text-6xl font-bold ">
          Log Workouts
          <span className="block mt-4">3x faster.</span>
        </h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <h4 className="text-2xl font-bold ">gym notebook</h4>
          <p className="text-muted-foreground ">AI powered workout tracking</p>
        </div>

        <HoverBorderGradient
          containerClassName="rounded-full cursor-pointer"
          as="button"
          className="bg-black  flex items-center space-x-2"
        >
          <span>Join Waitlist</span>
        </HoverBorderGradient>
      </section>
      {/* SECTION 2 */}
      <section className="flex flex-col items-center justify-center gap-14 max-w-7xl mx-auto">
        {/* features */}
        <TextSeperator text="Features" />
        {/* grid */}
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[40rem] xl:grid-rows-2 mx-4">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Box className="h-4 w-4 text-neutral-400" />}
            title="Do things the right way"
            description="Running out of copy so I'll write anything."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Settings className="h-4 w-4 text-neutral-400" />}
            title="The best AI code editor ever."
            description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<Sparkles className="h-4 w-4 text-neutral-400" />}
            title="You should buy Aceternity UI Pro"
            description="It's the best money you'll ever spend"
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Sparkles className="h-4 w-4 text-neutral-400" />}
            title="This card is also built by Cursor"
            description="I'm not even kidding. Ask my mom if you don't believe me."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Search className="h-4 w-4 text-neutral-400" />}
            title="Coming soon on Aceternity UI"
            description="I'm writing the code as I record this, no shit."
          />
        </ul>
      </section>
      <section className="flex flex-col items-center justify-center gap-14 max-w-7xl mx-auto">
        <TextSeperator text="Pricing" />
        {/* <Pricing /> */}
      </section>
      {/* FOOTER */}
      <footer className=" pb-4 pt-14">
        <p className="text-muted-foreground text-center text-xs">
          &copy; 2025 Gym Notebook AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
/* -------------------------------------------------------------------------- */
/*                                    grid                                    */
/* -------------------------------------------------------------------------- */
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[20rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5  text-xl/[1.375rem] font-semibold text-balance  md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   pricing                                  */
/* -------------------------------------------------------------------------- */
