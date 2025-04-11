
import { InfoIcon } from "lucide-react";

interface AdBannerProps {
  type: 'header' | 'footer' | 'sidebar';
  className?: string;
}

const AdBanner = ({ type, className }: AdBannerProps) => {
  const bannerClass = `ad-banner ad-banner-${type} ${className || ''}`;
  
  return (
    <div className={bannerClass}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="bg-secondary p-2 rounded-md flex items-center text-xs text-muted-foreground">
          <InfoIcon className="h-3 w-3 ml-1" />
          מיקום למודעה
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
