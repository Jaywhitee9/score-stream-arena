
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  TrendingUp,
  DollarSign,
  PlaySquare,
  Eye,
  UserPlus,
} from 'lucide-react';

// Sample stats data
const STATS_DATA = {
  totalUsers: 12453,
  activeSubscriptions: 3258,
  totalRevenue: 65247,
  activeStreams: 24,
  totalViews: 342789,
  newUsersToday: 128,
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(STATS_DATA);
  
  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      
      <div className="flex-1 mr-64 py-6 px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">לוח בקרה</h1>
          <p className="text-muted-foreground">
            ברוך הבא, מנהל | {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                משתמשים רשומים
              </CardTitle>
              <CardDescription>סה"כ משתמשים במערכת</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                <span className="text-green-500 font-medium">5.2%</span> מהחודש שעבר
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                מנויים פעילים
              </CardTitle>
              <CardDescription>מנויי VIP פעילים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                <span className="text-green-500 font-medium">12.8%</span> מהחודש שעבר
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                סה"כ הכנסות
              </CardTitle>
              <CardDescription>הכנסות כוללות (NIS)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} ₪</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                <span className="text-green-500 font-medium">8.4%</span> מהחודש שעבר
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PlaySquare className="h-5 w-5 text-red-500" />
                שידורים פעילים
              </CardTitle>
              <CardDescription>שידורים פעילים כרגע</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeStreams}</div>
              <div className="text-xs text-muted-foreground mt-1">
                מתוך 35 משחקים מתוכננים להיום
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                סה"כ צפיות
              </CardTitle>
              <CardDescription>צפיות מצטברות</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                <span className="text-green-500 font-medium">15.1%</span> מהחודש שעבר
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-purple-500" />
                משתמשים חדשים
              </CardTitle>
              <CardDescription>נרשמו היום</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.newUsersToday}</div>
              <div className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                <span className="text-green-500 font-medium">3.7%</span> מאתמול
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="performance">ביצועים</TabsTrigger>
            <TabsTrigger value="active-users">משתמשים פעילים</TabsTrigger>
            <TabsTrigger value="revenue">הכנסות</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>ביצועי אתר</CardTitle>
                <CardDescription>
                  ניתוח צפיות ומשתמשים בחודש האחרון
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  גרף ביצועים יוצג כאן
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active-users">
            <Card>
              <CardHeader>
                <CardTitle>משתמשים פעילים</CardTitle>
                <CardDescription>
                  ניתוח משתמשים פעילים לפי זמן
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  גרף משתמשים פעילים יוצג כאן
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>הכנסות</CardTitle>
                <CardDescription>
                  ניתוח הכנסות לפי מקור
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  גרף הכנסות יוצג כאן
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
