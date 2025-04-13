
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  Loader2,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  Plus,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { fetchMatchDetails, addStreamLink, updateStreamLink, removeStreamLink, checkStreamStatus } from '@/services/api';

const ManageStreams = () => {
  const { id } = useParams<{ id: string }>();
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newStreamType, setNewStreamType] = useState<'iframe' | 'hls' | 'rtmp' | 'custom'>('iframe');
  const [newStreamQuality, setNewStreamQuality] = useState<'SD' | 'HD' | '4K'>('HD');
  const [editingStream, setEditingStream] = useState<any>(null);
  const queryClient = useQueryClient();
  
  // Fetch match details
  const { 
    data: match, 
    isLoading: isLoadingMatch, 
    error: matchError 
  } = useQuery({
    queryKey: ['adminMatch', id],
    queryFn: () => fetchMatchDetails(id!),
    enabled: !!id,
  });
  
  // Add stream mutation
  const addStreamMutation = useMutation({
    mutationFn: () => addStreamLink(id!, {
      url: newStreamUrl,
      type: newStreamType,
      quality: newStreamQuality,
    }),
    onSuccess: () => {
      toast({
        title: "הקישור נוסף בהצלחה",
        description: "קישור השידור נוסף למשחק",
      });
      setNewStreamUrl('');
      queryClient.invalidateQueries({ queryKey: ['adminMatch', id] });
    },
    onError: () => {
      toast({
        title: "שגיאה בהוספת הקישור",
        description: "אירעה שגיאה בהוספת קישור השידור, אנא נסה שוב",
        variant: "destructive",
      });
    }
  });
  
  // Update stream mutation
  const updateStreamMutation = useMutation({
    mutationFn: () => updateStreamLink(id!, editingStream.id, {
      url: editingStream.url,
      type: editingStream.type,
      quality: editingStream.quality,
    }),
    onSuccess: () => {
      toast({
        title: "הקישור עודכן בהצלחה",
        description: "קישור השידור עודכן",
      });
      setEditingStream(null);
      queryClient.invalidateQueries({ queryKey: ['adminMatch', id] });
    },
    onError: () => {
      toast({
        title: "שגיאה בעדכון הקישור",
        description: "אירעה שגיאה בעדכון קישור השידור, אנא נסה שוב",
        variant: "destructive",
      });
    }
  });
  
  // Remove stream mutation
  const removeStreamMutation = useMutation({
    mutationFn: (streamId: string) => removeStreamLink(id!, streamId),
    onSuccess: () => {
      toast({
        title: "הקישור הוסר בהצלחה",
        description: "קישור השידור הוסר מהמשחק",
      });
      queryClient.invalidateQueries({ queryKey: ['adminMatch', id] });
    },
    onError: () => {
      toast({
        title: "שגיאה בהסרת הקישור",
        description: "אירעה שגיאה בהסרת קישור השידור, אנא נסה שוב",
        variant: "destructive",
      });
    }
  });
  
  // Check stream status mutation
  const checkStreamMutation = useMutation({
    mutationFn: (stream: any) => checkStreamStatus(stream.url, stream.type),
    onSuccess: (isWorking, stream) => {
      toast({
        title: isWorking ? "הקישור תקין" : "הקישור אינו תקין",
        description: isWorking ? "קישור השידור נבדק ונמצא תקין" : "קישור השידור נבדק ואינו עובד כרגע",
        variant: isWorking ? "default" : "destructive",
      });
      
      // Update stream status in the UI
      if (match && match.streamLinks) {
        const updatedLinks = match.streamLinks.map((link: any) => 
          link.id === stream.id ? { ...link, isWorking } : link
        );
        
        queryClient.setQueryData(['adminMatch', id], {
          ...match,
          streamLinks: updatedLinks
        });
      }
    },
    onError: () => {
      toast({
        title: "שגיאה בבדיקת הקישור",
        description: "אירעה שגיאה בבדיקת קישור השידור, אנא נסה שוב",
        variant: "destructive",
      });
    }
  });
  
  // Loading state
  if (isLoadingMatch) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold">טוען את פרטי המשחק...</h2>
          </div>
        </div>
      </div>
    );
  }
  
  // Match not found
  if (!match) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">המשחק לא נמצא</h2>
            <Link to="/admin/matches">
              <Button>
                <ArrowLeft className="ml-2 h-4 w-4" />
                חזרה לרשימת המשחקים
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <Link to="/admin/matches" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="ml-1 h-4 w-4" />
            חזרה לרשימת המשחקים
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            ניהול שידורים: {match.homeTeam} נגד {match.awayTeam}
          </h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="ml-2 h-4 w-4" />
                הוסף קישור שידור
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>הוספת קישור שידור חדש</DialogTitle>
                <DialogDescription>
                  הכנס את פרטי קישור השידור למשחק {match.homeTeam} נגד {match.awayTeam}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="streamUrl" className="text-sm font-medium">
                    כתובת השידור
                  </label>
                  <Input
                    id="streamUrl"
                    placeholder="https://"
                    value={newStreamUrl}
                    onChange={(e) => setNewStreamUrl(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="streamType" className="text-sm font-medium">
                      סוג השידור
                    </label>
                    <Select 
                      value={newStreamType} 
                      onValueChange={(value: any) => setNewStreamType(value)}
                    >
                      <SelectTrigger id="streamType">
                        <SelectValue placeholder="סוג השידור" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iframe">Iframe</SelectItem>
                        <SelectItem value="hls">HLS (m3u8)</SelectItem>
                        <SelectItem value="rtmp">RTMP</SelectItem>
                        <SelectItem value="custom">מותאם אישית</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="streamQuality" className="text-sm font-medium">
                      איכות השידור
                    </label>
                    <Select 
                      value={newStreamQuality} 
                      onValueChange={(value: any) => setNewStreamQuality(value)}
                    >
                      <SelectTrigger id="streamQuality">
                        <SelectValue placeholder="איכות השידור" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SD">SD</SelectItem>
                        <SelectItem value="HD">HD</SelectItem>
                        <SelectItem value="4K">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">ביטול</Button>
                </DialogClose>
                <Button 
                  onClick={() => addStreamMutation.mutate()} 
                  disabled={!newStreamUrl || addStreamMutation.isPending}
                >
                  {addStreamMutation.isPending && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                  הוסף קישור
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>פרטי המשחק</CardTitle>
            <CardDescription>
              ליגה: {match.league} | תאריך: {match.date} | שעה: {match.time}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">קבוצת בית</p>
                <p>{match.homeTeam}</p>
              </div>
              <div>
                <p className="text-sm font-medium">קבוצת חוץ</p>
                <p>{match.awayTeam}</p>
              </div>
              <div>
                <p className="text-sm font-medium">סטטוס</p>
                <p>{match.status === 'live' ? 'שידור חי' : match.status === 'upcoming' ? 'בקרוב' : 'הסתיים'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">אצטדיון</p>
                <p>{match.venue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>קישורי שידור</CardTitle>
            <CardDescription>
              ניהול קישורי השידור למשחק
            </CardDescription>
          </CardHeader>
          <CardContent>
            {match.streamLinks && match.streamLinks.length > 0 ? (
              <div className="space-y-4">
                {match.streamLinks.map((stream: any) => (
                  <div key={stream.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      {stream.isWorking ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 ml-2" />
                      )}
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{stream.url}</p>
                          <span className="mx-2 text-muted-foreground">|</span>
                          <span className="text-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {stream.type.toUpperCase()}
                          </span>
                          <span className="ml-2 text-sm px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                            {stream.quality}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          נבדק לאחרונה: {new Date(stream.lastChecked).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => checkStreamMutation.mutate(stream)}
                        disabled={checkStreamMutation.isPending}
                      >
                        {checkStreamMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setEditingStream(stream)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>עריכת קישור שידור</DialogTitle>
                            <DialogDescription>
                              ערוך את פרטי קישור השידור
                            </DialogDescription>
                          </DialogHeader>
                          
                          {editingStream && (
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <label htmlFor="editStreamUrl" className="text-sm font-medium">
                                  כתובת השידור
                                </label>
                                <Input
                                  id="editStreamUrl"
                                  placeholder="https://"
                                  value={editingStream.url}
                                  onChange={(e) => setEditingStream({
                                    ...editingStream,
                                    url: e.target.value
                                  })}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <label htmlFor="editStreamType" className="text-sm font-medium">
                                    סוג השידור
                                  </label>
                                  <Select 
                                    value={editingStream.type} 
                                    onValueChange={(value: any) => setEditingStream({
                                      ...editingStream,
                                      type: value
                                    })}
                                  >
                                    <SelectTrigger id="editStreamType">
                                      <SelectValue placeholder="סוג השידור" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="iframe">Iframe</SelectItem>
                                      <SelectItem value="hls">HLS (m3u8)</SelectItem>
                                      <SelectItem value="rtmp">RTMP</SelectItem>
                                      <SelectItem value="custom">מותאם אישית</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid gap-2">
                                  <label htmlFor="editStreamQuality" className="text-sm font-medium">
                                    איכות השידור
                                  </label>
                                  <Select 
                                    value={editingStream.quality} 
                                    onValueChange={(value: any) => setEditingStream({
                                      ...editingStream,
                                      quality: value
                                    })}
                                  >
                                    <SelectTrigger id="editStreamQuality">
                                      <SelectValue placeholder="איכות השידור" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="SD">SD</SelectItem>
                                      <SelectItem value="HD">HD</SelectItem>
                                      <SelectItem value="4K">4K</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">ביטול</Button>
                            </DialogClose>
                            <Button 
                              onClick={() => updateStreamMutation.mutate()} 
                              disabled={!editingStream?.url || updateStreamMutation.isPending}
                            >
                              {updateStreamMutation.isPending && (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              )}
                              שמור שינויים
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>מחיקת קישור שידור</DialogTitle>
                            <DialogDescription>
                              האם אתה בטוח שברצונך למחוק את קישור השידור?
                            </DialogDescription>
                          </DialogHeader>
                          
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">ביטול</Button>
                            </DialogClose>
                            <Button 
                              variant="destructive"
                              onClick={() => removeStreamMutation.mutate(stream.id)}
                              disabled={removeStreamMutation.isPending}
                            >
                              {removeStreamMutation.isPending && (
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                              )}
                              מחק קישור
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">אין קישורי שידור למשחק זה</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="ml-2 h-4 w-4" />
                      הוסף קישור שידור
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {/* Same dialog content as above */}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageStreams;
