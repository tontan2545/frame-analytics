import TrendingFrames from "@/components/trending-frames";
import { Skeleton } from "@/components/ui/skeleton";
import { Scan } from "lucide-react";
import { Suspense } from "react";

export default async function Home() {
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
          <Suspense
            fallback={
              <>
                {Array.from({ length: 6 }).map(() => (
                  <Skeleton
                    key="trending-skeleton"
                    className="w-full h-60 rounded-md"
                  />
                ))}
              </>
            }
          >
            <TrendingFrames />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
