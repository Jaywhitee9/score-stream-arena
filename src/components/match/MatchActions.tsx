
import { Button } from '@/components/ui/button';
import { Share2, Award, Users } from 'lucide-react';

const MatchActions = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" className="flex-1">
        <Share2 className="ml-2 h-4 w-4" />
        שתף משחק
      </Button>
      <Button size="sm" variant="outline" className="flex-1">
        <Award className="ml-2 h-4 w-4" />
        נחש תוצאה
      </Button>
      <Button size="sm" variant="default" className="flex-1">
        <Users className="ml-2 h-4 w-4" />
        הפוך לVIP
      </Button>
    </div>
  );
};

export default MatchActions;
