
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/home/AdBanner';
import AuthModal from '@/components/auth/AuthModal';
import MatchHeader from '@/components/match/MatchHeader';
import MatchContent from '@/components/match/MatchContent';
import SideContent from '@/components/match/SideContent';
import MatchNotFound from '@/components/match/MatchNotFound';
import { fetchMatchDetails, fetchMatches } from '@/services/api';
import { Loader2 } from 'lucide-react';

const MatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);
  
  // Fetch match details
  const { 
    data: match, 
    isLoading: isLoadingMatch, 
    error: matchError 
  } = useQuery({
    queryKey: ['match', id],
    queryFn: () => fetchMatchDetails(id!),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  });
  
  // Fetch recommended matches
  const { 
    data: recommendedMatches, 
    isLoading: isLoadingRecommended 
  } = useQuery({
    queryKey: ['recommendedMatches', match?.sportType],
    queryFn: () => fetchMatches({
      sportType: match?.sportType as 'soccer' | 'basketball',
      status: 'live',
    }),
    enabled: !!match,
    staleTime: 60000, // 1 minute
    select: (data) => data.filter(m => m.id !== id).slice(0, 5),
  });
  
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
  
  // Show error toast if fetch fails
  useEffect(() => {
    if (matchError) {
      toast({
        title: "שגיאה בטעינת המשחק",
        description: "אירעה שגיאה בטעינת פרטי המשחק, אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    }
  }, [matchError]);
  
  // Loading state
  if (isLoadingMatch) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold">טוען את פרטי המשחק...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Match not found
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
          
          <SideContent recommendedMatches={recommendedMatches || []} />
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
