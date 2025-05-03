"use client";

import { useState } from "react";
import { CoinCard } from "./CoinCard";
import { mockCoins } from "../mock/mockCoins";
import { type CoinCardProps } from "../types/coincard";
import { ChevronDown, RotateCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/shadcn/components/dropdown-menu";
import { Button } from "@workspace/shadcn/components/button";
import { cn } from "@workspace/shadcn/lib/utils";

type SortType = "marketCap" | "new";

export function CoinList() {
  const [coins, setCoins] = useState<CoinCardProps[]>(mockCoins);
  const [sortType, setSortType] = useState<SortType>("marketCap");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleToggleFavorite = (address: string) => {
    setCoins(prevCoins =>
      prevCoins.map(coin =>
        coin.address === address
          ? { ...coin, isFavorite: !coin.isFavorite }
          : coin
      )
    );
  };

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleToggleWatchlist = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Sort and filter coins based on the selected sort type and watchlist toggle
  const filteredAndSortedCoins = () => {
    let filtered = coins;

    if (showOnlyFavorites) {
      filtered = filtered.filter(coin => coin.isFavorite);
    }

    switch (sortType) {
      case "marketCap":
        return [...filtered].sort((a, b) => b.marketCap - a.marketCap);
      case "new":
        return [...filtered].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      default:
        return filtered;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Coin List</h1>

      <div className="flex justify-between items-center mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              {sortType === "marketCap" ? "Market cap" : "New"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleSort("new")}>
              New
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("marketCap")}>
              Market cap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className={cn(
              "bg-slate-800 border-slate-700 hover:bg-slate-700",
              showOnlyFavorites && "text-yellow-400"
            )}
            onClick={handleToggleWatchlist}
          >
            ⭐️
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RotateCw className={cn(
              "h-5 w-5",
              isRefreshing && "animate-spin"
            )} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedCoins().map((coin) => (
          <CoinCard
            key={coin.address}
            {...coin}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
