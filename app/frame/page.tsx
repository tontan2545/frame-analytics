import Link from "next/link";

export default function ExamplesIndexPage() {
  return (
    <div className="p-2 flex flex-col gap-2">
      <b>Frames from FramesHub</b>
      <ul>
        <li>
          <Link className="underline" href="/frame/trending">
            Trending
          </Link>
        </li>
        {/* <li>
          <Link className="underline" href="/examples/latest">
            Latest
          </Link>
        </li> */}
      </ul>
    </div>
  );
}
