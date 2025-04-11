
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VideoPlayer from '@/components/match/VideoPlayer';
import MatchInfo from '@/components/match/MatchInfo';
import AdBanner from '@/components/home/AdBanner';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Share2, 
  Award,
  Users 
} from 'lucide-react';
import MatchCard, { MatchProps } from '@/components/home/MatchCard';

// Sample data - in a real app, this would come from an API
const MATCH_DATA = {
  '1': {
    id: '1',
    homeTeam: 'מכבי תל אביב',
    awayTeam: 'הפועל ירושלים',
    league: 'ליגת העל הישראלית',
    sportType: 'basketball' as const,
    date: '21.04.25',
    time: '19:00',
    status: 'live' as const,
    venue: 'היכל מנורה מבטחים, תל אביב',
    homeScore: 76,
    awayScore: 68,
    streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL
  },
  '4': {
    id: '4',
    homeTeam: 'מנצ\'סטר יונייטד',
    awayTeam: 'ליברפול',
    league: 'פרמייר ליג',
    sportType: 'soccer' as const,
    date: '21.04.25',
    time: '17:30',
    status: 'live' as const,
    venue: 'אולד טראפורד, מנצ\'סטר',
    homeScore: 1,
    awayScore: 1,
    streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL
  },
};

// Sample recommended matches
const RECOMMENDED_MATCHES: MatchProps[] = [
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
    id: '7',
    homeTeam: 'באיירן מינכן',
    awayTeam: 'דורטמונד',
    league: 'בונדסליגה',
    sportType: 'soccer',
    date: '21.04.25',
    time: '18:30',
    status: 'live',
  },
];

const MatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);
  
  // Set up timer to track viewing time
  useEffect(() => {
    if (!match) return;
    
    // In a real app, this would check if user is logged in
    const isLoggedIn = false;
    
    // If not logged in, show auth modal after X minutes (3 minutes for demo)
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 180000); // 3 minutes
      
      // Clean up timer
      return () => clearTimeout(timer);
    }
  }, [match]);
  
  // Simulate fetching match data
  useEffect(() => {
    if (id && MATCH_DATA[id as keyof typeof MATCH_DATA]) {
      setMatch(MATCH_DATA[id as keyof typeof MATCH_DATA]);
    } else {
      // Handle invalid match ID - redirect to home in a real app
      console.error("Match not found");
    }
  }, [id]);
  
  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">המשחק לא נמצא</h2>
            <Link to="/">
              <Button>
                <ChevronRight className="ml-2 h-4 w-4" />
                חזור לדף הבית
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
            <ChevronRight className="ml-1 h-4 w-4" />
            חזרה לדף הבית
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{match.homeTeam} נגד {match.awayTeam}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              matchId={match.id} 
              matchTitle={`${match.homeTeam} vs ${match.awayTeam}`}
              streamUrl={match.streamUrl}
            />
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Share2 className="ml-2 h-4 w-4" />
                שתף משחק
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Award className="ml-2 h-4 w-4" />
                נחש תוצאה
              </Button>
              <Button size="sm" variant="default" className="flex-1">
                <Users className="ml-2 h-4 w-4" />
                הפוך לVIP
              </Button>
            </div>
            
            <AdBanner type="header" />
            
            <MatchInfo 
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              league={match.league}
              date={match.date}
              time={match.time}
              venue={match.venue}
              homeScore={match.homeScore}
              awayScore={match.awayScore}
              status={match.status}
            />
          </div>
          
          <div className="space-y-6">
            <AdBanner type="sidebar" />
            
            <div>
              <h3 className="text-lg font-bold mb-3">משחקים מומלצים</h3>
              <div className="space-y-3">
                {RECOMMENDED_MATCHES.map((recMatch) => (
                  <MatchCard key={recMatch.id} {...recMatch} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AdBanner type="footer" />
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab="register"
      />
    </div>
  );
};

export default MatchPage;
