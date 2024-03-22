import React from "react";
import { Button } from "../ui/button";
import Search from "./search";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center px-10 py-3 backdrop-blur-lg border-b-[1px] border-transparent duration-300 transition-all hover:border-secondary bg-background/20">
      <p>Logo</p>
      <Search />
      <div />
    </div>
  );
};

export default Header;
