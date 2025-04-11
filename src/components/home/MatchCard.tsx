
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon,
  Activity,
  Dumbbell,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export interface MatchProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  sportType: 'soccer' | 'basketball';
  date: string;
  time: string;
  status: 'live' | 'upcoming' | 'finished';
  homeLogo?: string; 
  awayLogo?: string;
}

const MatchCard = ({ 
  id, 
  homeTeam, 
  awayTeam, 
  league, 
  sportType, 
  date, 
  time, 
  status,
  homeLogo,
  awayLogo
}: MatchProps) => {
  const isLive = status === 'live';
  const isMobile = useIsMobile();
  
  return (
    <Link to={`/match/${id}`}>
      <div className={`${isLive ? "match-card-live" : "match-card"} hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-1.5">
            <span className={`${sportType === 'soccer' ? 'soccer-badge' : 'basketball-badge'} flex items-center text-[10px] md:text-xs`}>
              {sportType === 'soccer' ? (
                <Activity className="h-3 w-3 inline-block ml-1" />
              ) : (
                <Dumbbell className="h-3 w-3 inline-block ml-1" />
              )}
              {sportType === 'soccer' ? 'כדורגל' : 'כדורסל'}
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground truncate max-w-24 md:max-w-32">
              {league}
            </span>
          </div>
          {isLive ? (
            <span className="live-badge flex items-center gap-1 text-[10px] md:text-xs">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-white rounded-full animate-pulse"></span>
              שידור חי
            </span>
          ) : (
            <div className="flex items-center text-[10px] md:text-xs text-muted-foreground">
              <CalendarIcon className="h-2.5 w-2.5 md:h-3 md:w-3 ml-1" />
              {date}
              <ClockIcon className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1.5 ml-1" />
              {time}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center py-2 md:py-3">
          <div className="flex items-center gap-1.5 md:gap-2">
            {homeLogo ? (
              <img src={homeLogo} alt={homeTeam} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            ) : (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold">
                {homeTeam.substring(0, 2)}
              </div>
            )}
            <span className="text-sm md:text-base font-medium truncate max-w-20 md:max-w-none">{homeTeam}</span>
          </div>
          <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-md bg-background/50 text-xs md:text-sm font-bold">
            VS
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-sm md:text-base font-medium truncate max-w-20 md:max-w-none">{awayTeam}</span>
            {awayLogo ? (
              <img src={awayLogo} alt={awayTeam} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            ) : (
              <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold">
                {awayTeam.substring(0, 2)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
