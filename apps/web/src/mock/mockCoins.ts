import { type CoinCardProps } from "../types/coincard";

// Mock data for coins
export const mockCoins: CoinCardProps[] = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    symbol: "BONK",
    name: "BONK MUSK",
    createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), // 19 days ago
    isFavorite: true,
    logoUrl: "/icon.png",
    description: "A community-driven meme token inspired by Elon Musk's love for Dogecoin. BONK MUSK aims to revolutionize the meme coin ecosystem with fun engagement and utility.",
    marketCap: 44540, // $44.54K
    onToggleFavorite: undefined
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    symbol: "TDDY",
    name: "Tariff Daddy",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "Welcome to the memetic resistance. Welcome to the satirical side of geopolitics.",
    marketCap: 49700, // $49.7K
    onToggleFavorite: undefined
  },
  {
    address: "0x7890abcdef1234567890abcdef1234567890abcd",
    symbol: "MBGA",
    name: "MAKE BONKS GREAT AGAIN",
    createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), // 17 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "A political parody token aimed at uniting the crypto community behind making meme coins great again. Features community governance and meme contests.",
    marketCap: 46060, // $46.06K
    onToggleFavorite: undefined
  },
  {
    address: "0xef1234567890abcdef1234567890abcdef123456",
    symbol: "BONK",
    name: "BONKCHAMP",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "The champion of all BONK tokens. Features enhanced tokenomics, auto-compounding staking rewards, and weekly community airdrops.",
    marketCap: 43600, // $43.6K
    onToggleFavorite: undefined
  },
  {
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    symbol: "LF",
    name: "Liquid Fire",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "Easter is basically the day of the celebration of the transformation of consciousness, when consciousness is transformed into the higher self.",
    marketCap: 49750, // $49.75K
    onToggleFavorite: undefined
  },
  {
    address: "0x90abcdef1234567890abcdef1234567890abcdef",
    symbol: "WTG",
    name: "Watergate",
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
    isFavorite: false,
    logoUrl: "/icon.png",
    description: "A historical token commemorating the famous political scandal. August 9, 1974. Features governance proposals and political transparency initiatives.",
    marketCap: 41630, // $41.63K
    onToggleFavorite: undefined
  }
];
