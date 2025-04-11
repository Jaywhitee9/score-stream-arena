
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MatchHeaderProps {
  homeTeam: string;
  awayTeam: string;
}

const MatchHeader = ({ homeTeam, awayTeam }: MatchHeaderProps) => {
  return (
    <>
      <div className="mb-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
          <ChevronRight className="ml-1 h-4 w-4" />
          חזרה לדף הבית
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">{homeTeam} נגד {awayTeam}</h1>
    </>
  );
};

export default MatchHeader;
