
import MatchCard, { MatchProps } from '@/components/home/MatchCard';

interface RecommendedMatchesProps {
  matches: MatchProps[];
}

const RecommendedMatches = ({ matches }: RecommendedMatchesProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3">משחקים מומלצים</h3>
      <div className="space-y-3">
        {matches.map((match) => (
          <MatchCard key={match.id} {...match} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedMatches;
