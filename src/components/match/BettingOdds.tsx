
import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface BettingOddsProps {
  matchId: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

interface Odds {
  homeWin: string;
  draw: string;
  awayWin: string;
  updatedAt: string;
}

const BettingOdds = ({ matchId, position }: BettingOddsProps) => {
  const [odds, setOdds] = useState<Odds>({
    homeWin: '2.10',
    draw: '3.40',
    awayWin: '2.90',
    updatedAt: 'עכשיו'
  });
  
  useEffect(() => {
    // In a real implementation, this would fetch odds from a betting API
    // For now, we'll simulate odds updates every 30 seconds
    const interval = setInterval(() => {
      setOdds({
        homeWin: (2 + Math.random() * 0.5).toFixed(2),
        draw: (3 + Math.random() * 1).toFixed(2),
        awayWin: (2.5 + Math.random() * 0.7).toFixed(2),
        updatedAt: 'עכשיו'
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, [matchId]);
  
  const positionClass = `betting-overlay betting-overlay-${position}`;
  
  return (
    <div className={positionClass}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold flex items-center">
          <TrendingUp className="h-3 w-3 ml-1" />
          יחס הימורים חי
        </h4>
        <span className="text-[10px] text-muted-foreground">
          {odds.updatedAt}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-xs font-bold bg-blue-500/30 px-2 py-1 rounded mb-1">1</div>
          <div className="text-sm font-bold">{odds.homeWin}</div>
        </div>
        <div>
          <div className="text-xs font-bold bg-gray-500/30 px-2 py-1 rounded mb-1">X</div>
          <div className="text-sm font-bold">{odds.draw}</div>
        </div>
        <div>
          <div className="text-xs font-bold bg-red-500/30 px-2 py-1 rounded mb-1">2</div>
          <div className="text-sm font-bold">{odds.awayWin}</div>
        </div>
      </div>
    </div>
  );
};

export default BettingOdds;
