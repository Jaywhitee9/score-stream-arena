
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PlaySquare,
  Users,
  Settings,
  BarChart3,
  Globe,
  BellRing,
  LogOut,
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'לוח בקרה',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/admin'
    },
    {
      title: 'ניהול משחקים',
      icon: <PlaySquare className="h-5 w-5" />,
      href: '/admin/matches'
    },
    {
      title: 'ניהול משתמשים',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/users'
    },
    {
      title: 'ניהול פרסומות',
      icon: <Globe className="h-5 w-5" />,
      href: '/admin/ads'
    },
    {
      title: 'אנליטיקס',
      icon: <BarChart3 className="h-5 w-5" />,
      href: '/admin/analytics'
    },
    {
      title: 'התראות',
      icon: <BellRing className="h-5 w-5" />,
      href: '/admin/notifications'
    },
    {
      title: 'הגדרות',
      icon: <Settings className="h-5 w-5" />,
      href: '/admin/settings'
    },
  ];
  
  return (
    <div className="bg-sidebar h-screen w-64 border-l border-sidebar-border fixed top-0 right-0 overflow-y-auto py-6 px-3">
      <div className="text-2xl font-bold text-center mb-8 text-sidebar-foreground">
        Admin Panel
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      
      <div className="pt-6 mt-6 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>יציאה לאתר</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
