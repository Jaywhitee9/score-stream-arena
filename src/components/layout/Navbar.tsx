
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Activity, 
  Dumbbell, 
  Search, 
  Menu, 
  X, 
  User, 
  Globe 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHebrew, setIsHebrew] = useState(true);

  const toggleLanguage = () => {
    setIsHebrew(!isHebrew);
    // In a real implementation, this would update the app's language context
    document.body.style.direction = isHebrew ? 'ltr' : 'rtl';
  };

  return (
    <div className="navbar py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden bg-primary rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-white absolute" style={{ right: '2px' }} />
              <Dumbbell className="h-5 w-5 text-white absolute" style={{ left: '2px' }} />
            </div>
            <span className="text-xl font-bold hidden md:inline-block">
              {isHebrew ? 'ספורט סטרים' : 'SportStream'}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center max-w-xl">
          <div className="relative w-full max-w-sm">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={isHebrew ? "חיפוש קבוצות ומשחקים..." : "Search teams and matches..."} 
              className="pr-8 w-full" 
            />
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="language-selector" 
            onClick={toggleLanguage}
          >
            <Globe className="h-4 w-4" />
            <span>{isHebrew ? 'EN' : 'עב'}</span>
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            {isHebrew ? 'התחברות' : 'Login'}
          </Button>
          <Button size="sm">
            {isHebrew ? 'הרשמה' : 'Sign Up'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-5 w-5" /> : 
              <Menu className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-4 border-t border-border mt-3 animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder={isHebrew ? "חיפוש קבוצות ומשחקים..." : "Search teams and matches..."} 
                className="pr-8 w-full" 
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="language-selector" 
                onClick={toggleLanguage}
              >
                <Globe className="h-4 w-4" />
                <span>{isHebrew ? 'EN' : 'עב'}</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <User className="h-4 w-4 ml-2" />
                {isHebrew ? 'התחברות' : 'Login'}
              </Button>
              <Button size="sm" className="flex-1">
                {isHebrew ? 'הרשמה' : 'Sign Up'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
