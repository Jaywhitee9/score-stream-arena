
import { Link } from 'react-router-dom';
import { Activity, Dumbbell, TrendingUp, Info, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card py-8 px-4 mt-10 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 overflow-hidden bg-primary rounded-full flex items-center justify-center">
                <Activity className="h-5 w-5 text-white absolute" style={{ right: '2px' }} />
                <Dumbbell className="h-5 w-5 text-white absolute" style={{ left: '2px' }} />
              </div>
              <h3 className="text-xl font-bold">ספורט סטרים</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              הפלטפורמה המובילה לצפייה במשחקי כדורגל וכדורסל בשידור חי.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  כדורגל
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  כדורסל
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  מבצעים מיוחדים
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  VIP מנוי
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">אודות</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ספורט סטרים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
