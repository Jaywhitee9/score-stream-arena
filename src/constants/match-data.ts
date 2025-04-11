
// Sample data - in a real app, this would come from an API
export const MATCH_DATA = {
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
export const RECOMMENDED_MATCHES = [
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
