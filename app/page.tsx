import RecentFrames from "@/components/recent-frames";
import TrendingFrames from "@/components/trending-frames";
import TrendingIntervalSelect from "@/components/trending-interval-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Flame } from "lucide-react";
import { Suspense } from "react";

type Props = {
  searchParams: {
    interval?: string;
  };
};

export default async function Home({ searchParams: { interval } }: Props) {
  return (
    <main className="px-40 py-20">
      <div className="absolute -z-50 top-0 mx-auto w-1/2 h-1/2 bg-primary/50 blur-[256px] opacity-75 rounded-full -z-1" />
      <div className="absolute -z-50 top-0 left-1/2 w-1/2 h-1/2 bg-blue-500/50 blur-[256px] opacity-45 rounded-full -z-1" />
      <div className="space-y-20">
        <div className="flex flex-col items-center w-full space-y-4">
          <div className="flex gap-6 items-center">
            <h1 className="text-[64px] leading-[105%] font-medium text-center">
              A place where frames
              <br />
              are <span className="text-primary font-bold">discovered</span>
            </h1>
          </div>
          <h2 className="font-light">
            Discover curated frames from the community, view insights, and get
            inspired.
          </h2>
        </div>
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Flame className="size-6 text-red-500" />
              <p className="text-xl font-medium">Trending</p>
            </div>
            <TrendingIntervalSelect interval={interval} />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 9 }).map(() => (
                    <Skeleton
                      key="trending-skeleton"
                      className="w-full h-60 rounded-md"
                    />
                  ))}
                </>
              }
            >
              <TrendingFrames interval={interval} />
            </Suspense>
          </div>
        </div>
        <div className="space-y-12">
          <div className="flex gap-2 items-center">
            <Clock className="size-6" />
            <p className="text-xl font-medium">Recent</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Suspense
              fallback={
                <>
                  {Array.from({ length: 9 }).map(() => (
                    <Skeleton
                      key="recent-skeleton"
                      className="w-full h-60 rounded-md"
                    />
                  ))}
                </>
              }
            >
              <RecentFrames />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
