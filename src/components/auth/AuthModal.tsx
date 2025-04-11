
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {activeTab === 'login' ? 'התחברות' : 'הרשמה'}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {activeTab === 'login' 
              ? 'התחבר לחשבונך כדי לקבל גישה מלאה לשידורים שלנו' 
              : 'צור חשבון חדש וקבל גישה חופשית לשידורים למשך 3 חודשים'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue={defaultTab} 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">התחברות</TabsTrigger>
            <TabsTrigger value="register">הרשמה</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone">מספר טלפון</Label>
              <Input id="login-phone" type="tel" placeholder="הזן מספר טלפון" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">סיסמה</Label>
              <Input id="login-password" type="password" placeholder="הזן סיסמה" />
            </div>
            <Button className="w-full">התחבר</Button>
            <div className="text-center text-sm text-muted-foreground">
              <a href="#" className="underline hover:text-primary">שכחת סיסמה?</a>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-username">שם משתמש</Label>
              <Input id="register-username" placeholder="הזן שם משתמש" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-phone">מספר טלפון</Label>
              <Input id="register-phone" type="tel" placeholder="הזן מספר טלפון" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">סיסמה</Label>
              <Input id="register-password" type="password" placeholder="בחר סיסמה" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">אימות סיסמה</Label>
              <Input id="register-confirm-password" type="password" placeholder="הזן סיסמה שוב" />
            </div>
            <Button className="w-full">הרשם</Button>
            <div className="text-center text-xs text-muted-foreground">
              בלחיצה על הרשם אתה מאשר את <a href="#" className="underline hover:text-primary">תנאי השימוש</a> ו<a href="#" className="underline hover:text-primary">מדיניות הפרטיות</a> שלנו
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
