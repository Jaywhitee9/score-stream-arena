
import VideoPlayer from '@/components/match/VideoPlayer';
import MatchInfo from '@/components/match/MatchInfo';
import MatchActions from '@/components/match/MatchActions';
import AdBanner from '@/components/home/AdBanner';

interface MatchContentProps {
  matchId: string;
  matchTitle: string;
  streamUrl: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished';
}

const MatchContent = ({
  matchId,
  matchTitle,
  streamUrl,
  homeTeam,
  awayTeam,
  league,
  date,
  time,
  venue,
  homeScore,
  awayScore,
  status
}: MatchContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <VideoPlayer 
        matchId={matchId} 
        matchTitle={matchTitle}
        streamUrl={streamUrl}
      />
      
      <MatchActions />
      
      <AdBanner type="header" />
      
      <MatchInfo 
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        league={league}
        date={date}
        time={time}
        venue={venue}
        homeScore={homeScore}
        awayScore={awayScore}
        status={status}
      />
    </div>
  );
};

export default MatchContent;
