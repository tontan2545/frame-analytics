"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { CommandLoading } from "cmdk";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const Search = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [searchedData, setSearchedData] = useState<
    {
      hash: string;
      frames: Frame[];
      author: Author;
      embeds: Embed[];
    }[]
  >([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setSearchedData([]);
      setDebouncedValue("");
    }
    const debouncedFn = setTimeout(async () => {
      if (!query) return;
      const data = await (await fetch(`/api/query/${encodeURI(query)}`)).json();
      setSearchedData(data);
      setDebouncedValue(query);
    }, 500);

    return () => clearTimeout(debouncedFn);
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const loading = debouncedValue !== query;

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="w-96 justify-between px-2"
        onClick={() => setOpen(true)}
      >
        <p className="font-light text-secondary-foreground/70 ml-3">
          Search frames
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search frames"
          onKeyDownCapture={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              setOpen(false);
            }
          }}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!loading && (
            <CommandEmpty>
              {searchedData.length === 0 && query.length > 0
                ? "No frames found"
                : "Search frames by frame name"}
            </CommandEmpty>
          )}
          {loading && (
            <CommandLoading className="flex justify-center py-6">
              <Loader2 className="size-6 animate-spin" />
            </CommandLoading>
          )}
          <CommandGroup>
            {!loading &&
              searchedData.map((frame) => (
                <CommandItem
                  key={`frame-${frame.hash}`}
                  value={frame.hash}
                  onSelect={() => {
                    router.push(`/${frame.hash}`);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between gap-4">
                    <img
                      src={frame.frames[0].image}
                      className="aspect-video h-32 object-cover rounded-md"
                    />
                    <div className="space-y-2">
                      <div>
                        <p className="text-lg font-semibold text-secondary-foreground">
                          {frame.frames[0].title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {frame.hash}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <img
                          src={frame.author.pfp_url}
                          className="size-5 rounded-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          {frame.author.display_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
