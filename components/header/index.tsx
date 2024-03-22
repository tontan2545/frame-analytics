import React from "react";
import { Button } from "../ui/button";
import Search from "./search";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between items-center px-10 py-6">
      <p>Logo</p>
      <Search />
      <div />
    </div>
  );
};

export default Header;
