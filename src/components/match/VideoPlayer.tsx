
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import BettingOdds from './BettingOdds';

interface VideoPlayerProps {
  matchId: string;
  matchTitle: string;
  streamUrl: string;
}

const VideoPlayer = ({ matchId, matchTitle, streamUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  
  // This would be configurable in admin panel
  const bettingOddsPosition = 'bottom-right';
  
  // Simulating adBlock detection - in a real implementation this would be more sophisticated
  useState(() => {
    // Mock adblock detection
    setTimeout(() => {
      // Random check - 30% chance of detecting adblock for demo purposes
      if (Math.random() < 0.3) {
        setAdBlockDetected(true);
      }
    }, 3000);
  });
  
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
      ) : (
        <>
          {/* Video Player - this would be an iframe in production */}
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {streamUrl ? (
              <iframe 
                src={streamUrl}
                title={matchTitle}
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="text-white flex flex-col items-center justify-center">
                <p className="text-xl mb-2">מקור השידור לא זמין כרגע</p>
                <p className="text-sm text-muted-foreground">אנא נסה שוב מאוחר יותר</p>
              </div>
            )}
          </div>
          
          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center transition-opacity duration-300">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="flex-1" />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
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
