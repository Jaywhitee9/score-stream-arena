
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon,
  Activity,
  Dumbbell,
} from 'lucide-react';

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
  
  return (
    <Link to={`/match/${id}`}>
      <div className={isLive ? "match-card-live" : "match-card"}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={sportType === 'soccer' ? 'soccer-badge' : 'basketball-badge'}>
              {sportType === 'soccer' ? (
                <Activity className="h-3 w-3 inline-block ml-1" />
              ) : (
                <Dumbbell className="h-3 w-3 inline-block ml-1" />
              )}
              {sportType === 'soccer' ? 'כדורגל' : 'כדורסל'}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-32">
              {league}
            </span>
          </div>
          {isLive ? (
            <span className="live-badge">שידור חי</span>
          ) : (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 ml-1" />
              {date}
              <ClockIcon className="h-3 w-3 mr-2 ml-1" />
              {time}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            {homeLogo ? (
              <img src={homeLogo} alt={homeTeam} className="w-6 h-6 object-contain" />
            ) : (
              <div className="w-6 h-6 bg-muted rounded-full" />
            )}
            <span className="font-medium">{homeTeam}</span>
          </div>
          <span className="px-2 py-1 rounded-md bg-background text-sm font-bold">
            VS
          </span>
          <div className="flex items-center gap-2">
            <span className="font-medium">{awayTeam}</span>
            {awayLogo ? (
              <img src={awayLogo} alt={awayTeam} className="w-6 h-6 object-contain" />
            ) : (
              <div className="w-6 h-6 bg-muted rounded-full" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
