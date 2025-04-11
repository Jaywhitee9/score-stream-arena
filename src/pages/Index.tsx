
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/home/AdBanner';
import FeaturedMatches from '@/components/home/FeaturedMatches';
import LeagueFilter from '@/components/home/LeagueFilter';
import MatchCard, { MatchProps } from '@/components/home/MatchCard';

// Sample matches data
const ALL_MATCHES: MatchProps[] = [
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
  },
  {
    id: '6',
    homeTeam: 'יובנטוס',
    awayTeam: 'מילאן',
    league: 'סרייה א',
    sportType: 'soccer',
    date: '22.04.25',
    time: '21:45',
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
  {
    id: '8',
    homeTeam: 'הפועל תל אביב',
    awayTeam: 'מכבי נתניה',
    league: 'ליגת העל הישראלית',
    sportType: 'soccer',
    date: '24.04.25',
    time: '20:00',
    status: 'upcoming',
  },
];

const Index = () => {
  const [filters, setFilters] = useState({
    sportType: 'all',
    status: 'all',
    league: 'all',
    country: 'all',
  });
  
  const handleFilterChange = (newFilters: {
    sportType: string;
    status: string;
    league: string;
    country: string;
  }) => {
    setFilters(newFilters);
  };
  
  // Apply filters to matches
  const filteredMatches = ALL_MATCHES.filter(match => {
    // Filter by sport type
    if (filters.sportType !== 'all' && match.sportType !== filters.sportType) {
      return false;
    }
    
    // Filter by status
    if (filters.status === 'live' && match.status !== 'live') {
      return false;
    }
    if (filters.status === 'upcoming' && match.status !== 'upcoming') {
      return false;
    }
    
    // Filter by league
    if (filters.league !== 'all' && !match.league.includes(filters.league)) {
      return false;
    }
    
    // More filters would be implemented here in a real app
    
    return true;
  });
  
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  לא נמצאו משחקים התואמים את החיפוש
                </div>
              )}
            </div>
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
