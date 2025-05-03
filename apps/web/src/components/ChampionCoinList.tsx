"use client";

import { useState } from "react";
import { ChampionCoinCard } from "./ChampionCoinCard";
import { mockChampionCoins } from "../mock/mockChampionCoins";
import { type CoinCardProps } from "../types/coincard";
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw } from "lucide-react";
import { Button } from "@workspace/shadcn/components/button";
import { cn } from "@workspace/shadcn/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/shadcn/components/dropdown-menu";

type SortType = "marketCap" | "new";

export function ChampionCoinList() {
  const [coins, setCoins] = useState<CoinCardProps[]>(mockChampionCoins);
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

  // Scroll handler for the horizontal scroll container
  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('champion-scroll-container');
    if (container) {
      const scrollAmount = 300; // Adjust as needed
      const scrollPosition = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
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
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-4">Previous Champions</h2>

      <div className="flex justify-between items-center mb-4">
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

        <div className="flex items-center gap-2">
          {/* Watchlist toggle */}
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

          {/* Refresh button */}
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

          {/* Scroll buttons */}
          <Button
            variant="outline"
            size="icon"
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        id="champion-scroll-container"
        className="flex overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4">
          {filteredAndSortedCoins().map((coin) => (
            <div key={coin.address} className="min-w-[300px] max-w-[300px] flex">
              <div className="w-full">
                <ChampionCoinCard
                  {...coin}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
