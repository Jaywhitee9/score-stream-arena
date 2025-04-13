
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/home/AdBanner';
import FeaturedMatches from '@/components/home/FeaturedMatches';
import LeagueFilter from '@/components/home/LeagueFilter';
import MatchCard from '@/components/home/MatchCard';
import { Loader2 } from 'lucide-react';
import { fetchMatches } from '@/services/api';

const Index = () => {
  const [filters, setFilters] = useState({
    sportType: 'all',
    status: 'all',
    league: 'all',
    country: 'all',
  });
  
  // Use React Query to fetch match data
  const { data: matches, isLoading, error } = useQuery({
    queryKey: ['matches', filters],
    queryFn: () => fetchMatches({
      sportType: filters.sportType !== 'all' ? filters.sportType as 'soccer' | 'basketball' : undefined,
      status: filters.status !== 'all' ? filters.status as 'live' | 'upcoming' | 'finished' : undefined,
      league: filters.league !== 'all' ? filters.league : undefined,
    }),
    staleTime: 60000, // 1 minute
  });
  
  // Handle filter changes
  const handleFilterChange = (newFilters: {
    sportType: string;
    status: string;
    league: string;
    country: string;
  }) => {
    setFilters(newFilters);
  };
  
  // Show error toast if fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "שגיאה בטעינת המשחקים",
        description: "אירעה שגיאה בטעינת המשחקים, אנא נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    }
  }, [error]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <AdBanner type="header" />
        
        <FeaturedMatches />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <LeagueFilter onFilterChange={handleFilterChange} />
            
            <h2 className="text-xl font-bold mb-4">כל המשחקים</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches && matches.length > 0 ? (
                  matches.map((match) => (
                    <MatchCard key={match.id} {...match} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    לא נמצאו משחקים התואמים את החיפוש
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="hidden md:block">
            <AdBanner type="sidebar" className="sticky top-24" />
          </div>
        </div>
      </main>
      
      <AdBanner type="footer" />
      <Footer />
    </div>
  );
};

export default Index;
