"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@workspace/shadcn/components/card";
import { cn } from "@workspace/shadcn/lib/utils";
import { formatCurrency } from "../utils/format";
import { CoinCardProps } from "@/types/coincard";



export function CoinCard({
  address,
  symbol,
  name,
  description,
  logoUrl,
  marketCap,
  isFavorite: initialIsFavorite,
  onToggleFavorite
}: CoinCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(address);
    }
  };

  return (
    <Card className="w-full overflow-hidden dark:bg-slate-800 border-gray-700">
      <div className="flex p-4">
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <div className="relative w-16 h-16">
            <Image
              src={logoUrl}
              alt={`${symbol} logo`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <CardHeader className="p-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-md bg-blue-950 px-2 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-500/20">
                  {symbol}
                </span>
                <CardTitle className="text-lg font-bold text-white">{name}</CardTitle>
              </div>
              <button
                className="text-gray-400 hover:text-yellow-400 focus:outline-none"
                onClick={handleToggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star className={cn(
                  "h-5 w-5",
                  isFavorite ? "fill-yellow-400 text-yellow-400" : "fill-transparent"
                )} />
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <CardDescription className="line-clamp-2 text-gray-400 text-sm mb-2">
              {description}
            </CardDescription>
            <div className="text-sm font-medium text-gray-300">
              {formatCurrency(marketCap)}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
