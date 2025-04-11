
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MatchNotFound = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">המשחק לא נמצא</h2>
      <Link to="/">
        <Button>
          <ChevronRight className="ml-2 h-4 w-4" />
          חזור לדף הבית
        </Button>
      </Link>
    </div>
  );
};

export default MatchNotFound;
