
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Calendar, 
  Clock,
  MapPin,
  Users,
  Activity,
  MessageSquare
} from "lucide-react";

interface MatchInfoProps {
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'upcoming' | 'finished';
  homeLogo?: string;
  awayLogo?: string;
}

const MatchInfo = ({
  homeTeam,
  awayTeam,
  league,
  date,
  time,
  venue,
  homeScore,
  awayScore,
  status,
  homeLogo,
  awayLogo
}: MatchInfoProps) => {
  const isLive = status === 'live';
  
  // Placeholder for match stats in a real app, these would come from an API
  const matchStats = {
    possession: { home: 64, away: 36 },
    shots: { home: 12, away: 6 },
    shotsOnTarget: { home: 5, away: 2 },
    corners: { home: 7, away: 3 },
    fouls: { home: 4, away: 8 }
  };
  
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Trophy className="h-4 w-4 ml-2 text-primary" />
            <h3 className="text-sm font-medium">{league}</h3>
          </div>
          
          {isLive && (
            <div className="live-badge">
              שידור חי
            </div>
          )}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-center text-center min-w-24">
            {homeLogo ? (
              <img src={homeLogo} alt={homeTeam} className="w-16 h-16 object-contain mb-2" />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-full mb-2" />
            )}
            <h3 className="font-bold">{homeTeam}</h3>
          </div>
          
          <div className="px-2 py-4 rounded-md min-w-28 text-center">
            {isLive || status === 'finished' ? (
              <div className="text-3xl font-bold mb-1">
                {homeScore ?? 0} - {awayScore ?? 0}
              </div>
            ) : (
              <div className="text-2xl font-bold mb-2">VS</div>
            )}
            
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 ml-1" />
                {date}
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 ml-1" />
                {time}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center min-w-24">
            {awayLogo ? (
              <img src={awayLogo} alt={awayTeam} className="w-16 h-16 object-contain mb-2" />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-full mb-2" />
            )}
            <h3 className="font-bold">{awayTeam}</h3>
          </div>
        </div>
        
        {venue && (
          <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center">
            <MapPin className="h-4 w-4 ml-1" />
            {venue}
          </div>
        )}
      </div>
      
      <Separator />
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stats" className="text-xs">
            <Activity className="h-3 w-3 ml-1" />
            סטטיסטיקה
          </TabsTrigger>
          <TabsTrigger value="lineups" className="text-xs">
            <Users className="h-3 w-3 ml-1" />
            הרכבים
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-xs">
            <MessageSquare className="h-3 w-3 ml-1" />
            צ'אט
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="p-4 space-y-3">
          {isLive || status === 'finished' ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{matchStats.possession.home}%</span>
                <span className="text-sm text-muted-foreground">שליטה</span>
                <span className="text-sm font-bold">{matchStats.possession.away}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${matchStats.possession.home}%` }}></div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-semibold text-right">{matchStats.shots.home}</div>
                <div className="text-center text-muted-foreground">בעיטות</div>
                <div className="font-semibold text-left">{matchStats.shots.away}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-semibold text-right">{matchStats.shotsOnTarget.home}</div>
                <div className="text-center text-muted-foreground">בעיטות למסגרת</div>
                <div className="font-semibold text-left">{matchStats.shotsOnTarget.away}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-semibold text-right">{matchStats.corners.home}</div>
                <div className="text-center text-muted-foreground">קרנות</div>
                <div className="font-semibold text-left">{matchStats.corners.away}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-semibold text-right">{matchStats.fouls.home}</div>
                <div className="text-center text-muted-foreground">עבירות</div>
                <div className="font-semibold text-left">{matchStats.fouls.away}</div>
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              סטטיסטיקה תהיה זמינה כאשר המשחק יתחיל
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="lineups" className="p-4">
          <div className="text-center text-muted-foreground py-4">
            מידע על הרכבים יעודכן בקרוב
          </div>
        </TabsContent>
        
        <TabsContent value="chat" className="p-4">
          <div className="text-center text-muted-foreground py-4">
            צ'אט אוהדים - בקרוב
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchInfo;
