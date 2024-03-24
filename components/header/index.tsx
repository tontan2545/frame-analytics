import React from "react";
import { Button } from "../ui/button";
import Search from "./search";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-10 py-3 backdrop-blur-lg border-b-[1px] border-transparent duration-300 transition-all hover:border-secondary bg-background/20">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </Link>
      <Search />
      <div />
    </div>
  );
};

export default Header;
