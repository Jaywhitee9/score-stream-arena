
import { MatchProps } from '@/components/home/MatchCard';

// Types for API responses
interface ApiSportsResponse {
  data: {
    leagues: League[];
    matches: ApiMatch[];
  };
}

interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
  sportType: 'soccer' | 'basketball';
}

interface ApiMatch {
  id: string;
  homeTeam: {
    name: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    logo?: string;
  };
  league: {
    id: string;
    name: string;
    country: string;
  };
  date: string;
  time: string;
  venue: string;
  status: string;
  sportType: 'soccer' | 'basketball';
  streamLinks?: StreamLink[];
}

interface StreamLink {
  id: string;
  url: string;
  quality: 'SD' | 'HD' | '4K';
  type: 'iframe' | 'hls' | 'rtmp' | 'custom';
  isWorking: boolean;
  lastChecked: string;
}

// Mock API functions - These would connect to real APIs in production
export const fetchLeagues = async (sportType?: 'soccer' | 'basketball'): Promise<League[]> => {
  // In a real app, this would call an actual API
  console.log(`Fetching ${sportType || 'all'} leagues...`);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return [
    { id: 'il1', name: 'ליגת העל הישראלית', country: 'ישראל', sportType: 'soccer' },
    { id: 'il2', name: 'ליגת העל בכדורסל', country: 'ישראל', sportType: 'basketball' },
    { id: 'eng1', name: 'פרמייר ליג', country: 'אנגליה', sportType: 'soccer' },
    { id: 'esp1', name: 'לה ליגה', country: 'ספרד', sportType: 'soccer' },
    { id: 'ger1', name: 'בונדסליגה', country: 'גרמניה', sportType: 'soccer' },
    { id: 'ita1', name: 'סרייה א', country: 'איטליה', sportType: 'soccer' },
    { id: 'nba', name: 'NBA', country: 'ארה"ב', sportType: 'basketball' },
    { id: 'euro', name: 'יורוליג', country: 'אירופה', sportType: 'basketball' },
  ].filter(league => !sportType || league.sportType === sportType);
};

export const fetchMatches = async (filters: {
  sportType?: 'soccer' | 'basketball';
  league?: string;
  status?: 'live' | 'upcoming' | 'finished';
  date?: string;
}): Promise<MatchProps[]> => {
  // In a real app, this would call an actual API
  console.log('Fetching matches with filters:', filters);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data - in a real app, this would come from the API
  const allMatches: MatchProps[] = [
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
  
  // Apply filters
  return allMatches.filter(match => {
    if (filters.sportType && match.sportType !== filters.sportType) return false;
    if (filters.league && !match.league.includes(filters.league)) return false;
    if (filters.status && match.status !== filters.status) return false;
    if (filters.date && match.date !== filters.date) return false;
    return true;
  });
};

export const fetchMatchDetails = async (matchId: string): Promise<any> => {
  // In a real app, this would call an actual API
  console.log(`Fetching details for match: ${matchId}`);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Check if we have this match in our mock data
  if (matchId === '1') {
    return {
      id: '1',
      homeTeam: 'מכבי תל אביב',
      awayTeam: 'הפועל ירושלים',
      league: 'ליגת העל הישראלית',
      sportType: 'basketball',
      date: '21.04.25',
      time: '19:00',
      status: 'live',
      venue: 'היכל מנורה מבטחים, תל אביב',
      homeScore: 76,
      awayScore: 68,
      streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL
      streamLinks: [
        { 
          id: 's1',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          quality: 'HD',
          type: 'iframe',
          isWorking: true,
          lastChecked: '2025-04-13T14:00:00Z'
        },
        { 
          id: 's2',
          url: 'https://example.com/stream.m3u8',
          quality: 'HD',
          type: 'hls',
          isWorking: true,
          lastChecked: '2025-04-13T14:05:00Z'
        }
      ]
    };
  } else if (matchId === '4') {
    return {
      id: '4',
      homeTeam: 'מנצ\'סטר יונייטד',
      awayTeam: 'ליברפול',
      league: 'פרמייר ליג',
      sportType: 'soccer',
      date: '21.04.25',
      time: '17:30',
      status: 'live',
      venue: 'אולד טראפורד, מנצ\'סטר',
      homeScore: 1,
      awayScore: 1,
      streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder URL
      streamLinks: [
        { 
          id: 's3',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          quality: 'HD',
          type: 'iframe',
          isWorking: true,
          lastChecked: '2025-04-13T14:10:00Z'
        }
      ]
    };
  }
  
  // Match not found
  return null;
};

// Function to fetch streaming links for a match
export const fetchStreamLinks = async (matchId: string): Promise<StreamLink[]> => {
  // In a real app, this would call an actual API
  console.log(`Fetching stream links for match: ${matchId}`);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Mock data
  if (matchId === '1') {
    return [
      { 
        id: 's1',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        quality: 'HD',
        type: 'iframe',
        isWorking: true,
        lastChecked: '2025-04-13T14:00:00Z'
      },
      { 
        id: 's2',
        url: 'https://example.com/stream.m3u8',
        quality: 'HD',
        type: 'hls',
        isWorking: true,
        lastChecked: '2025-04-13T14:05:00Z'
      }
    ];
  } else if (matchId === '4') {
    return [
      { 
        id: 's3',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        quality: 'HD',
        type: 'iframe',
        isWorking: true,
        lastChecked: '2025-04-13T14:10:00Z'
      }
    ];
  }
  
  // No streams found
  return [];
};

// Admin API for managing streams
export const addStreamLink = async (matchId: string, streamLink: Omit<StreamLink, 'id' | 'lastChecked'>): Promise<StreamLink> => {
  // In a real app, this would call an admin API endpoint
  console.log(`Adding stream link for match: ${matchId}`, streamLink);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the created stream with an ID
  return {
    ...streamLink,
    id: `s${Date.now()}`,
    isWorking: true,
    lastChecked: new Date().toISOString()
  };
};

export const updateStreamLink = async (matchId: string, streamId: string, streamLink: Partial<StreamLink>): Promise<StreamLink> => {
  // In a real app, this would call an admin API endpoint
  console.log(`Updating stream link ${streamId} for match: ${matchId}`, streamLink);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the updated stream
  return {
    id: streamId,
    url: streamLink.url || 'https://example.com/stream.m3u8',
    quality: streamLink.quality || 'HD',
    type: streamLink.type || 'hls',
    isWorking: streamLink.isWorking !== undefined ? streamLink.isWorking : true,
    lastChecked: new Date().toISOString()
  };
};

export const removeStreamLink = async (matchId: string, streamId: string): Promise<boolean> => {
  // In a real app, this would call an admin API endpoint
  console.log(`Removing stream link ${streamId} for match: ${matchId}`);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return success
  return true;
};

// Function to check if a stream is working
export const checkStreamStatus = async (streamUrl: string, type: 'iframe' | 'hls' | 'rtmp' | 'custom'): Promise<boolean> => {
  // In a real app, this would attempt to connect to the stream and verify it's working
  console.log(`Checking stream status for ${type} stream: ${streamUrl}`);
  
  // Simulating API response delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response - in a real app this would actually test the stream
  return Math.random() > 0.2; // 80% chance of success for demo
};
