
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Pause, Play, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import BettingOdds from './BettingOdds';

interface VideoPlayerProps {
  matchId: string;
  matchTitle: string;
  streamUrl: string;
}

type StreamSource = 'iframe' | 'hls' | 'rtmp' | 'custom';

const VideoPlayer = ({ matchId, matchTitle, streamUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [streamSource, setStreamSource] = useState<StreamSource>('iframe');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // This would be configurable in admin panel
  const bettingOddsPosition = 'bottom-right';
  
  // Determine stream source based on URL
  useEffect(() => {
    if (streamUrl.includes('youtube.com') || streamUrl.includes('embed')) {
      setStreamSource('iframe');
    } else if (streamUrl.includes('.m3u8')) {
      setStreamSource('hls');
    } else if (streamUrl.includes('rtmp://')) {
      setStreamSource('rtmp');
    } else {
      setStreamSource('custom');
    }
  }, [streamUrl]);
  
  // Handle playback controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const handleRetry = () => {
    setStreamError(false);
    // Add logic to retry loading the stream
  };
  
  // Simulating adBlock detection - in a real implementation this would be more sophisticated
  useEffect(() => {
    // Mock adblock detection
    setTimeout(() => {
      // Random check - 30% chance of detecting adblock for demo purposes
      if (Math.random() < 0.3) {
        setAdBlockDetected(true);
      }
    }, 3000);
  }, []);
  
  return (
    <div className="relative video-container" 
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {adBlockDetected ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-4 z-10">
          <h3 className="text-xl font-bold text-white mb-4">זיהינו שאתה משתמש בחוסם פרסומות</h3>
          <p className="text-muted-foreground text-center mb-6">
            אנא כבה את חוסם הפרסומות כדי להמשיך לצפות בתוכן ללא תשלום.
          </p>
          <Button 
            variant="default" 
            onClick={() => setAdBlockDetected(false)}
            className="px-6"
          >
            כיביתי את חוסם הפרסומות
          </Button>
        </div>
      ) : streamError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-4 z-10">
          <h3 className="text-xl font-bold text-white mb-4">שגיאה בטעינת השידור</h3>
          <p className="text-muted-foreground text-center mb-6">
            לא הצלחנו לטעון את השידור. נסה שוב או בחר מקור אחר.
          </p>
          <Button 
            variant="default" 
            onClick={handleRetry}
            className="px-6 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            נסה שוב
          </Button>
        </div>
      ) : (
        <>
          {/* Video Player based on stream type */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {streamSource === 'iframe' && streamUrl ? (
              <iframe 
                src={streamUrl}
                title={matchTitle}
                allowFullScreen
                className="w-full h-full"
                onError={() => setStreamError(true)}
              />
            ) : streamSource === 'hls' || streamSource === 'rtmp' || streamSource === 'custom' ? (
              <video
                ref={videoRef}
                className="w-full h-full"
                autoPlay={isPlaying}
                muted={isMuted}
                controls={false}
                poster="/placeholder.svg"
                onError={() => setStreamError(true)}
              >
                <source src={streamUrl} type={streamSource === 'hls' ? 'application/x-mpegURL' : 'video/mp4'} />
                מנגן הוידאו לא נתמך בדפדפן זה.
              </video>
            ) : (
              <div className="text-white flex flex-col items-center justify-center">
                <p className="text-xl mb-2">מקור השידור לא זמין כרגע</p>
                <p className="text-sm text-muted-foreground">אנא נסה שוב מאוחר יותר</p>
              </div>
            )}
          </div>
          
          {/* Custom Video Controls */}
          {(streamSource === 'hls' || streamSource === 'rtmp' || streamSource === 'custom') && showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center transition-opacity duration-300">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="flex-1" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={handleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          {/* Betting Odds Overlay */}
          <BettingOdds matchId={matchId} position={bettingOddsPosition} />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
