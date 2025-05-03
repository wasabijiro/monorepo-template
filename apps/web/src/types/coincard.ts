export interface CoinCardProps {
  address: string;
  symbol: string;
  name: string;
  createdAt: Date;
  isFavorite: boolean;
  logoUrl: string;
  description: string;
  marketCap: number;   // 49750 → $49.75K 表示
  onToggleFavorite?: (id: string) => void;
}
