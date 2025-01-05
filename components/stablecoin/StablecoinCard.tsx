import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  ExternalLink 
} from 'lucide-react';

interface StablecoinCardProps {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  holders: number;
  yield: number;
  onClick?: () => void;
}

export function StablecoinCard({
  name,
  symbol,
  price,
  marketCap,
  holders,
  yield: yieldValue,
  onClick
}: StablecoinCardProps) {
  return (
    <Card 
      variant="interactive" 
      className="transition-all duration-200 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{name}</h3>
            <p className="text-sm text-gray-400">{symbol}</p>
          </div>
          <div className="bg-[#2A2A2A] px-2 py-1 rounded">
            <p className="text-[#E2FF66] text-sm font-medium">
              {yieldValue}% APY
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Price
            </p>
            <p className="text-white font-medium">
              ${price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Market Cap
            </p>
            <p className="text-white font-medium">
              ${marketCap.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Holders
            </p>
            <p className="text-white font-medium">
              {holders.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" variant="outline" fullWidth>
            Trade
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="px-2"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://explorer.solana.com/address/...`, '_blank');
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}