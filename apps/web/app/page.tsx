import NotebookContent from "@/components/NotebookContent";
import NotebookV2 from "@/components/NotebookV2";
import WaitlistSignup from "@/components/WaitlistSignup";

export default function Home() {
  return (
    <div>
      {/* section 1 */}
      <section className="items-center justify-center mt-14 flex flex-col gap-4 mx-2">
        <div className="relative items-center justify-center flex flex-col">
          <div className="bg-foreground px-2 py-1 rounded-full text-background font-bold text-sm justify-center items-center self-center ">
            beta
          </div>
          <h1 className="text-7xl font-extrabold text-center">Gym Notebook </h1>
        </div>

        <p className="text-2xl text-center">
          A notebook for your gym workouts with a sprinkle of ai
        </p>
        <NotebookV2 className="">
          <NotebookContent />
        </NotebookV2>
      </section>
      {/* section 2 */}
      <section className="items-center justify-center mt-14 flex flex-col gap-4 py-10">
        <h1 className="text-4xl font-extrabold text-center">Features</h1>
        <p className="text-2xl text-center">
          Log. Generate. View Stats. Thats it.
        </p>
        <div className="flex-col grid grid-cols-1 lg:grid-cols-3 gap-4 mx-2">
          <NotebookV2 className="" icon="save">
            <h2 className="text-2xl font-extrabold">Log</h2>
            <p className="text-lg">Log your workouts with ease.</p>
          </NotebookV2>

          <NotebookV2 className="" icon="plus">
            <h2 className="text-2xl font-extrabold">Generate</h2>
            <p className="text-lg">
              AI generated workouts based on muscle groups.
            </p>
          </NotebookV2>
          <NotebookV2 className="" icon="settings">
            <h2 className="text-2xl font-extrabold">Stats</h2>
            <p className="text-lg">View your progress over time.</p>
          </NotebookV2>
        </div>
      </section>
      {/* section 3 */}
      <section className="items-center justify-center mt-14 flex flex-col gap-4 py-10 mx-2 ">
        <h2 className="text-4xl font-extrabold text-center">
          Get Early Access
        </h2>
        <p className="text-xl mb-6 text-center">
          Join our waitlist to be the first to experience Gym Notebook when we
          launch.
        </p>
        <div className="w-full max-w-xl mx-auto">
          <NotebookV2 className="">
            <WaitlistSignup />
          </NotebookV2>
        </div>
      </section>
    </div>
  );
}
