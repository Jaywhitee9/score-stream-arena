
// Types for streaming system
export type StreamType = 'iframe' | 'hls' | 'rtmp' | 'custom';
export type StreamQuality = 'SD' | 'HD' | '4K';
export type StreamStatus = 'working' | 'offline' | 'unknown';

export interface StreamSource {
  id: string;
  url: string;
  type: StreamType;
  quality: StreamQuality;
  status: StreamStatus;
  lastChecked: Date;
}

// Mock function to get available streams for a match
export const getStreamsForMatch = async (matchId: string): Promise<StreamSource[]> => {
  // In a real app, this would fetch from a backend API
  console.log(`Fetching streams for match: ${matchId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock streams - in production this would come from the backend
  return [
    {
      id: 's1',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      type: 'iframe',
      quality: 'HD',
      status: 'working',
      lastChecked: new Date()
    },
    {
      id: 's2',
      url: 'https://example.com/stream.m3u8',
      type: 'hls',
      quality: 'HD',
      status: 'working',
      lastChecked: new Date()
    }
  ];
};

// Function to test if a stream is working
export const testStream = async (stream: StreamSource): Promise<boolean> => {
  // In a real app, this would actually test the stream
  console.log(`Testing stream: ${stream.url}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock result - in production this would actually test the connection
  return Math.random() > 0.2; // 80% chance of success for demo
};

// Function to get the best available stream for a match
export const getBestStream = async (matchId: string): Promise<StreamSource | null> => {
  const streams = await getStreamsForMatch(matchId);
  
  if (streams.length === 0) {
    return null;
  }
  
  // Filter for working streams
  const workingStreams = streams.filter(stream => stream.status === 'working');
  
  if (workingStreams.length === 0) {
    return null;
  }
  
  // Sort by quality (4K > HD > SD)
  const sortedStreams = workingStreams.sort((a, b) => {
    if (a.quality === '4K' && b.quality !== '4K') return -1;
    if (a.quality === 'HD' && b.quality === 'SD') return -1;
    return 0;
  });
  
  return sortedStreams[0];
};

// Function to handle stream errors and fallback
export const handleStreamError = async (matchId: string, failedStreamId: string): Promise<StreamSource | null> => {
  console.log(`Stream ${failedStreamId} failed for match ${matchId}, finding alternative...`);
  
  // Get all streams and filter out the failed one
  const streams = await getStreamsForMatch(matchId);
  const alternativeStreams = streams.filter(stream => stream.id !== failedStreamId);
  
  if (alternativeStreams.length === 0) {
    return null;
  }
  
  // Find a working alternative
  for (const stream of alternativeStreams) {
    const isWorking = await testStream(stream);
    if (isWorking) {
      return stream;
    }
  }
  
  return null;
};
