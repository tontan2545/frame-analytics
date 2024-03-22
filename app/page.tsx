import { Scan } from "lucide-react";

export default function Home() {
  return (
    <main className="px-40 py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex gap-6 items-center">
            <div className="rounded-md p-2 bg-secondary w-max">
              <Scan className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-semibold">Featured Frames</h1>
          </div>
          <h2>Discover the latest curated frames created by our community.</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />

          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />

          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />
          <div className="aspect-video bg-secondary rounded-lg w-full" />
        </div>
      </div>
    </main>
  );
}
