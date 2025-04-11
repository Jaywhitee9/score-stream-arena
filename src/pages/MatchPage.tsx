
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/home/AdBanner';
import AuthModal from '@/components/auth/AuthModal';
import MatchHeader from '@/components/match/MatchHeader';
import MatchContent from '@/components/match/MatchContent';
import SideContent from '@/components/match/SideContent';
import MatchNotFound from '@/components/match/MatchNotFound';
import { MATCH_DATA, RECOMMENDED_MATCHES } from '@/constants/match-data';

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
          <MatchNotFound />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <MatchHeader homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MatchContent 
            matchId={match.id}
            matchTitle={`${match.homeTeam} vs ${match.awayTeam}`}
            streamUrl={match.streamUrl}
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
          
          <SideContent recommendedMatches={RECOMMENDED_MATCHES} />
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
