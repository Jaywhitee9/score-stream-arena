
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Football, Basketball, Globe, ChevronDown, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

// Sample leagues data
const SOCCER_LEAGUES = [
  { id: 's1', name: 'ליגת העל הישראלית', country: 'ישראל' },
  { id: 's2', name: 'פרמייר ליג', country: 'אנגליה' },
  { id: 's3', name: 'לה ליגה', country: 'ספרד' },
  { id: 's4', name: 'בונדסליגה', country: 'גרמניה' },
  { id: 's5', name: 'סרייה א', country: 'איטליה' },
];

const BASKETBALL_LEAGUES = [
  { id: 'b1', name: 'ליגת העל בכדורסל', country: 'ישראל' },
  { id: 'b2', name: 'NBA', country: 'ארה"ב' },
  { id: 'b3', name: 'יורוליג', country: 'אירופה' },
];

const COUNTRIES = [
  { id: 'c1', name: 'ישראל', flag: '🇮🇱' },
  { id: 'c2', name: 'אנגליה', flag: '🇬🇧' },
  { id: 'c3', name: 'ספרד', flag: '🇪🇸' },
  { id: 'c4', name: 'גרמניה', flag: '🇩🇪' },
  { id: 'c5', name: 'איטליה', flag: '🇮🇹' },
  { id: 'c6', name: 'ארה"ב', flag: '🇺🇸' },
  { id: 'c7', name: 'אירופה', flag: '🇪🇺' },
];

interface LeagueFilterProps {
  onFilterChange: (filters: {
    sportType: string;
    status: string;
    league: string;
    country: string;
  }) => void;
}

const LeagueFilter = ({ onFilterChange }: LeagueFilterProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'soccer' | 'basketball'>('all');
  const [activeStatus, setActiveStatus] = useState<'all' | 'live' | 'upcoming'>('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const handleTabChange = (tab: 'all' | 'soccer' | 'basketball') => {
    setActiveTab(tab);
    onFilterChange({
      sportType: tab,
      status: activeStatus,
      league: selectedLeague,
      country: selectedCountry,
    });
  };

  const handleStatusChange = (status: 'all' | 'live' | 'upcoming') => {
    setActiveStatus(status);
    onFilterChange({
      sportType: activeTab,
      status: status,
      league: selectedLeague,
      country: selectedCountry,
    });
  };

  const handleLeagueSelect = (leagueId: string) => {
    setSelectedLeague(leagueId);
    onFilterChange({
      sportType: activeTab,
      status: activeStatus,
      league: leagueId,
      country: selectedCountry,
    });
  };

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
    onFilterChange({
      sportType: activeTab,
      status: activeStatus,
      league: selectedLeague,
      country: countryId,
    });
  };

  const getSelectedLeagueName = () => {
    if (selectedLeague === 'all') return 'כל הליגות';
    
    const soccerLeague = SOCCER_LEAGUES.find(l => l.id === selectedLeague);
    const basketballLeague = BASKETBALL_LEAGUES.find(l => l.id === selectedLeague);
    
    return soccerLeague?.name || basketballLeague?.name || 'כל הליגות';
  };

  const getSelectedCountryName = () => {
    if (selectedCountry === 'all') return 'כל המדינות';
    const country = COUNTRIES.find(c => c.id === selectedCountry);
    return country ? `${country.flag} ${country.name}` : 'כל המדינות';
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Sport Type Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2">
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTabChange('all')}
          className="whitespace-nowrap"
        >
          <Globe className="ml-2 h-4 w-4" />
          הכל
        </Button>
        <Button
          variant={activeTab === 'soccer' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTabChange('soccer')}
          className="whitespace-nowrap"
        >
          <Football className="ml-2 h-4 w-4" />
          כדורגל
        </Button>
        <Button
          variant={activeTab === 'basketball' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleTabChange('basketball')}
          className="whitespace-nowrap"
        >
          <Basketball className="ml-2 h-4 w-4" />
          כדורסל
        </Button>
        
        {/* Status Filters */}
        <Button
          variant={activeStatus === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => handleStatusChange('all')}
          className="whitespace-nowrap mr-auto"
        >
          הכל
        </Button>
        <Button
          variant={activeStatus === 'live' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange('live')}
          className="whitespace-nowrap"
        >
          שידור חי
        </Button>
        <Button
          variant={activeStatus === 'upcoming' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleStatusChange('upcoming')}
          className="whitespace-nowrap"
        >
          בקרוב
        </Button>
      </div>
      
      {/* League and Country Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <Globe className="ml-2 h-4 w-4" />
                {getSelectedCountryName()}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <Input
                placeholder="חיפוש מדינה..."
                className="mb-2"
              />
            </div>
            <DropdownMenuItem onClick={() => handleCountrySelect('all')}>
              <Globe className="ml-2 h-4 w-4" />
              כל המדינות
            </DropdownMenuItem>
            {COUNTRIES.map(country => (
              <DropdownMenuItem key={country.id} onClick={() => handleCountrySelect(country.id)}>
                <span className="ml-2">{country.flag}</span>
                {country.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                {activeTab === 'soccer' ? (
                  <Football className="ml-2 h-4 w-4" />
                ) : activeTab === 'basketball' ? (
                  <Basketball className="ml-2 h-4 w-4" />
                ) : (
                  <Search className="ml-2 h-4 w-4" />
                )}
                {getSelectedLeagueName()}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="p-2">
              <Input
                placeholder="חיפוש ליגה..."
                className="mb-2"
              />
            </div>
            <DropdownMenuItem onClick={() => handleLeagueSelect('all')}>
              <Search className="ml-2 h-4 w-4" />
              כל הליגות
            </DropdownMenuItem>
            
            {(activeTab === 'all' || activeTab === 'soccer') && (
              <>
                {SOCCER_LEAGUES.map(league => (
                  <DropdownMenuItem key={league.id} onClick={() => handleLeagueSelect(league.id)}>
                    <Football className="ml-2 h-4 w-4" />
                    {league.name}
                    <span className="mr-auto text-xs text-muted-foreground">
                      {league.country}
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            )}
            
            {(activeTab === 'all' || activeTab === 'basketball') && (
              <>
                {BASKETBALL_LEAGUES.map(league => (
                  <DropdownMenuItem key={league.id} onClick={() => handleLeagueSelect(league.id)}>
                    <Basketball className="ml-2 h-4 w-4" />
                    {league.name}
                    <span className="mr-auto text-xs text-muted-foreground">
                      {league.country}
                    </span>
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LeagueFilter;
