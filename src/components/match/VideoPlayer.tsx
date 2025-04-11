
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Pause, Play, Volume2, VolumeX, RefreshCw, MonitorSmartphone } from 'lucide-react';
import BettingOdds from './BettingOdds';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

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
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // This would be configurable in admin panel
  const bettingOddsPosition = isMobile ? 'bottom-right' : 'bottom-right';
  
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
  
  // Auto-update simulation - in a real app, this would connect to a websocket or polling mechanism
  useEffect(() => {
    if (!autoUpdateEnabled) return;
    
    // Simulate periodic checking for stream updates
    const updateInterval = setInterval(() => {
      console.log("Checking for match updates...");
      // In a real app, this would make an API call to check for updates
      setLastUpdated(new Date());
      
      // Notify user of update (occasionally)
      if (Math.random() > 0.7) {
        toast({
          title: "שידור עודכן",
          description: "המידע החי מתעדכן בזמן אמת",
          duration: 3000,
        });
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(updateInterval);
  }, [autoUpdateEnabled, toast]);
  
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
    const container = document.querySelector('.video-container');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    }
  };
  
  const handleRetry = () => {
    setStreamError(false);
    // Add logic to retry loading the stream
    toast({
      title: "מנסה להתחבר מחדש",
      description: "מנסה לטעון את השידור מחדש",
    });
  };
  
  const toggleAutoUpdate = () => {
    setAutoUpdateEnabled(!autoUpdateEnabled);
    toast({
      title: !autoUpdateEnabled ? "עדכון אוטומטי מופעל" : "עדכון אוטומטי כבוי",
      description: !autoUpdateEnabled ? "המידע יתעדכן אוטומטית" : "המידע לא יתעדכן אוטומטית",
    });
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

  // Handle touch events better on mobile
  useEffect(() => {
    if (isMobile) {
      const container = document.querySelector('.video-container');
      
      const handleTouchStart = () => {
        setShowControls(true);
      };
      
      const handleTouchEnd = () => {
        // Delay hiding controls to allow for interaction
        setTimeout(() => setShowControls(false), 3000);
      };
      
      if (container) {
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        
        return () => {
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }
  }, [isMobile]);
  
  return (
    <div className="relative video-container rounded-lg overflow-hidden" 
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
    >
      {adBlockDetected ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black p-4 z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">זיהינו שאתה משתמש בחוסם פרסומות</h3>
          <p className="text-muted-foreground text-center text-sm md:text-base mb-4 md:mb-6">
            אנא כבה את חוסם הפרסומות כדי להמשיך לצפות בתוכן ללא תשלום.
          </p>
          <Button 
            variant="default" 
            onClick={() => setAdBlockDetected(false)}
            className="px-4 md:px-6 text-sm md:text-base"
          >
            כיביתי את חוסם הפרסומות
          </Button>
        </div>
      ) : streamError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-4 z-10">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">שגיאה בטעינת השידור</h3>
          <p className="text-muted-foreground text-center text-sm md:text-base mb-4 md:mb-6">
            לא הצלחנו לטעון את השידור. נסה שוב או בחר מקור אחר.
          </p>
          <Button 
            variant="default" 
            onClick={handleRetry}
            className="px-4 md:px-6 text-sm md:text-base flex items-center gap-2"
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
                playsInline // Better mobile experience
              >
                <source src={streamUrl} type={streamSource === 'hls' ? 'application/x-mpegURL' : 'video/mp4'} />
                מנגן הוידאו לא נתמך בדפדפן זה.
              </video>
            ) : (
              <div className="text-white flex flex-col items-center justify-center p-4">
                <p className="text-base md:text-xl mb-2 text-center">מקור השידור לא זמין כרגע</p>
                <p className="text-xs md:text-sm text-muted-foreground text-center">אנא נסה שוב מאוחר יותר</p>
              </div>
            )}
          </div>
          
          {/* Auto-update indicator */}
          {autoUpdateEnabled && (
            <div className="absolute top-2 right-2 bg-black/50 rounded-md px-2 py-1 text-xs text-white flex items-center gap-1 z-20">
              <span className="h-1.5 w-1.5 bg-accent rounded-full animate-pulse"></span>
              עדכון אוטומטי פעיל
            </div>
          )}
          
          {/* Custom Video Controls - always visible on mobile with tap to hide/show */}
          {(streamSource === 'hls' || streamSource === 'rtmp' || streamSource === 'custom') && 
            (showControls || isMobile) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 flex items-center transition-opacity duration-300 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>
              
              <div className="flex-1" />
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                onClick={toggleAutoUpdate}
              >
                <MonitorSmartphone className={`h-4 w-4 md:h-5 md:w-5 ${autoUpdateEnabled ? 'text-accent' : 'text-white'}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-8 w-8 md:h-10 md:w-10"
                onClick={handleFullscreen}
              >
                <Maximize className="h-4 w-4 md:h-5 md:w-5" />
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
