
import AdBanner from '@/components/home/AdBanner';
import RecommendedMatches from '@/components/match/RecommendedMatches';
import { MatchProps } from '@/components/home/MatchCard';

interface SideContentProps {
  recommendedMatches: MatchProps[];
}

const SideContent = ({ recommendedMatches }: SideContentProps) => {
  return (
    <div className="space-y-6">
      <AdBanner type="sidebar" />
      <RecommendedMatches matches={recommendedMatches} />
    </div>
  );
};

export default SideContent;
