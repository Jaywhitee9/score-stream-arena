
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard, { MatchProps } from "./MatchCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data
const FEATURED_MATCHES: MatchProps[] = [
  {
    id: '1',
    homeTeam: 'מכבי תל אביב',
    awayTeam: 'הפועל ירושלים',
    league: 'ליגת העל הישראלית',
    sportType: 'basketball',
    date: '21.04.25',
    time: '19:00',
    status: 'live',
  },
  {
    id: '2',
    homeTeam: 'מכבי חיפה',
    awayTeam: 'הפועל באר שבע',
    league: 'ליגת העל הישראלית',
    sportType: 'soccer',
    date: '21.04.25',
    time: '20:30',
    status: 'upcoming',
  },
  {
    id: '3',
    homeTeam: 'ברצלונה',
    awayTeam: 'ריאל מדריד',
    league: 'לה ליגה',
    sportType: 'soccer',
    date: '22.04.25',
    time: '21:00',
    status: 'upcoming',
  },
  {
    id: '4',
    homeTeam: 'מנצ\'סטר יונייטד',
    awayTeam: 'ליברפול',
    league: 'פרמייר ליג',
    sportType: 'soccer',
    date: '21.04.25',
    time: '17:30',
    status: 'live',
  },
  {
    id: '5',
    homeTeam: 'לוס אנג\'לס לייקרס',
    awayTeam: 'בוסטון סלטיקס',
    league: 'NBA',
    sportType: 'basketball',
    date: '23.04.25',
    time: '04:00',
    status: 'upcoming',
  }
];

const FeaturedMatches = () => {
  return (
    <Tabs defaultValue="all" className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">משחקים מובילים</h2>
        <TabsList>
          <TabsTrigger value="all">הכל</TabsTrigger>
          <TabsTrigger value="live">שידור חי</TabsTrigger>
          <TabsTrigger value="upcoming">בקרוב</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="all" className="mt-0">
        <div className="relative">
          <div className="flex overflow-x-auto space-x-4 pb-4 px-2 -mx-2 scrollbar-hide">
            {FEATURED_MATCHES.map((match) => (
              <div key={match.id} className="min-w-[280px] max-w-[320px]">
                <MatchCard {...match} />
              </div>
            ))}
          </div>
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
            <Button size="icon" variant="outline" className="rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
            <Button size="icon" variant="outline" className="rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="live" className="mt-0">
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {FEATURED_MATCHES.filter(match => match.status === 'live').map((match) => (
            <div key={match.id} className="min-w-[280px] max-w-[320px]">
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-0">
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {FEATURED_MATCHES.filter(match => match.status === 'upcoming').map((match) => (
            <div key={match.id} className="min-w-[280px] max-w-[320px]">
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FeaturedMatches;
