import { type CoinCardProps } from "../types/coincard";

// Mock data for previous champion coins
export const mockChampionCoins: CoinCardProps[] = [
  {
    address: "0x9876543210abcdef9876543210abcdef98765432",
    symbol: "PEPE",
    name: "PEPE SATOSHI",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "The legendary first meme coin to reach 1B market cap in 2023. Famous for its rapid rise and community strength.",
    marketCap: 985000, // $985K
    onToggleFavorite: undefined
  },
  {
    address: "0x5432109876abcdef5432109876abcdef54321098",
    symbol: "DOGE",
    name: "DOGE EMPEROR",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    isFavorite: true,
    logoUrl: "/icon.png",
    description: "The champion that started it all. A revolutionary token that captured the zeitgeist of the 2021 bull run.",
    marketCap: 1250000, // $1.25M
    onToggleFavorite: undefined
  },
  {
    address: "0x13579abcdef24680abcdef13579abcdef13579ab",
    symbol: "SHIB",
    name: "SHIBA MAXI",
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "One of the most successful meme tokens of all time, known for its devoted community and ecosystem development.",
    marketCap: 890000, // $890K
    onToggleFavorite: undefined
  }
];
