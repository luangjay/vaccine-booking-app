"use client";

import { type Hospital } from "@/api/hospitals";
import { cn } from "@/lib/utils";
import { OpenInFull } from "@mui/icons-material";
import { Dialog, DialogContent, Rating } from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import CardContent from "./CardContent";

type CardProps = {
  hospital: Hospital;
  rating?: number | null;
  onRatingChange?: (hospitalName: string, rating: number | null) => void;
};

export default function Card({ hospital, rating, onRatingChange }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHover = (e: React.SyntheticEvent) => {
    setIsHovered(e.type === "mouseover");
  };

  const handleDialogOpen = () => void setIsDialogOpen(true);
  const handleDialogClose = () => void setIsDialogOpen(false);

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-xl bg-white font-mono shadow-lg hover:bg-neutral-200 hover:shadow-2xl"
      onMouseOver={handleHover}
      onMouseOut={handleHover}
    >
      <button
        className={cn(
          "absolute right-4 top-4 z-10 rounded-full border bg-white p-2 hover:bg-background/90",
          !isHovered && "hidden"
        )}
        onClick={handleDialogOpen}
      >
        <OpenInFull />
      </button>
      <CardContent hospital={hospital} />
      <div className="flex items-center justify-end px-4 pb-5 text-right text-foreground/60">
        <Rating
          value={rating ?? null}
          onChange={(_, rating) => {
            if (onRatingChange && hospital.title) {
              onRatingChange(hospital.title, rating);
            }
          }}
        />
      </div>
      <Dialog
        fullWidth
        keepMounted
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="rounded-inherit relative aspect-[3/2] w-full">
            <Image
              className="object-cover"
              quality={100}
              src={hospital.image ?? ""}
              alt={hospital.title ?? ""}
              fill
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
