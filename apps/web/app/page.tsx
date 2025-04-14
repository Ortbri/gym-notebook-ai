import { HoverBorderGradient } from "@/components/hover-border-gradient";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt">
      {/* SECTION 1 */}
      <section className="flex flex-col items-center justify-center gap-4 text-center mx-auto max-w-xl h-screen">
        <h1 className="text-6xl font-bold ">Log 3x faster, only one press.</h1>
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
      <section className="">{/* features */}</section>
      {/* SECTION 3 */}
      <section>{/* demo */}</section>
      {/* SECTION 4 */}
      <section>{/* testimonials */}</section>
      <footer className=" pb-4 pt-14">
        <p className="text-muted-foreground text-center text-xs">
          &copy; 2025 Gym Notebook AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
