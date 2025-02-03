import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuLabel,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { FaSort } from "react-icons/fa";

export function DropdownMenuRadioGroupDemo({
    position,
    setPosition,
    handleSort,
  }: {
    position: string;
    setPosition: (position: string) => void;
    handleSort: (value: string) => void;
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} size={"sm"}>
            Sort by
            <FaSort />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={(value) => {
              setPosition(value);
              handleSort(value);
            }}
          >
            <DropdownMenuLabel>Price</DropdownMenuLabel>
            <DropdownMenuRadioItem value="lowtohigh">
              Lowest to Highest
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hightolow">
              Highest to Lowest
            </DropdownMenuRadioItem>
            <DropdownMenuLabel>Other</DropdownMenuLabel>
            <DropdownMenuRadioItem value="discounted">
              Discounted
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }