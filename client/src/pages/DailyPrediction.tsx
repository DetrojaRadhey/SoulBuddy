import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Loader, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import ZodiacScene from '@/components/ZodiacScene';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserDetails {
  name: string;
  birthDate: Date | undefined;
  birthTime: string;
  gender: string;
  state: string;
  city: string;
}

export default function DailyPrediction() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    birthDate: undefined,
    birthTime: '',
    gender: '',
    state: '',
    city: '',
  });

  const handleSubmitForm = async () => {
    if (!userDetails.name || !userDetails.birthDate || !userDetails.birthTime || 
        !userDetails.gender || !userDetails.state || !userDetails.city) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_HTTP_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: `Generate a daily prediction for a person with the following details:
            Name: ${userDetails.name}
            Birth Date: ${format(userDetails.birthDate, 'PPP')}
            Birth Time: ${userDetails.birthTime}
            Gender: ${userDetails.gender}
            Location: ${userDetails.city}, ${userDetails.state}`
        }),
      });

      const data = await response.json();
      setMessages([
        {
          type: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ]);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setInput('');
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { type: 'user', content: message, timestamp: new Date() },
    ]);

    try {
      const response = await fetch(`${import.meta.env.VITE_HTTP_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: `Follow up question: ${message}\nPlease provide an answer based on the previous prediction.`
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { type: 'assistant', content: data.message, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000308] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen"
      >
        <div className="absolute inset-0 z-10">
          <ZodiacScene activeTab="rashi" />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-black/50 backdrop-blur-lg border-neutral-800 overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => navigate('/')}
                      variant="ghost"
                      className="text-white hover:text-primary hover:bg-primary/20"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-center text-white">Daily Prediction</CardTitle>
                <CardDescription className="text-center text-neutral-200">
                  Get your personalized daily astrological prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showForm ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-white">Full Name</Label>
                      <Input
                        placeholder="Enter your name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Birth Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal bg-neutral-900/50 border-neutral-800',
                              !userDetails.birthDate ? 'text-neutral-400' : 'text-white'
                            )}
                          >
                            {userDetails.birthDate ? (
                              format(userDetails.birthDate, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800">
                          <Calendar
                            mode="single"
                            selected={userDetails.birthDate}
                            onSelect={(date) => setUserDetails({ ...userDetails, birthDate: date })}
                            initialFocus
                            className="text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Birth Time</Label>
                      <Input
                        type="time"
                        value={userDetails.birthTime}
                        onChange={(e) => setUserDetails({ ...userDetails, birthTime: e.target.value })}
                        className="bg-neutral-900/50 border-neutral-800 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Gender</Label>
                      <Select
                        value={userDetails.gender}
                        onValueChange={(value) => setUserDetails({ ...userDetails, gender: value })}
                      >
                        <SelectTrigger className="bg-neutral-900/50 border-neutral-800 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-neutral-800">
                          <SelectItem value="male" className="text-white">Male</SelectItem>
                          <SelectItem value="female" className="text-white">Female</SelectItem>
                          <SelectItem value="other" className="text-white">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">State</Label>
                      <Input
                        placeholder="Enter your state"
                        value={userDetails.state}
                        onChange={(e) => setUserDetails({ ...userDetails, state: e.target.value })}
                        className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">City</Label>
                      <Input
                        placeholder="Enter your city"
                        value={userDetails.city}
                        onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                        className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-400"
                      />
                    </div>

                    <Button
                      onClick={handleSubmitForm}
                      disabled={isLoading}
                      className="w-full bg-primary/20 border-primary/50 hover:bg-primary/30 text-white"
                    >
                      {isLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        'Get Prediction'
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {messages.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              'p-4 rounded-lg text-white', // Changed text color to white
                              message.type === 'user'
                                ? 'bg-primary/20 border border-primary/30 ml-8'
                                : 'bg-neutral-900/50 border border-neutral-800 mr-8'
                            )}
                          >
                            {message.type === 'assistant' && (
                              <Star className="w-4 h-4 text-primary mb-2" />
                            )}
                            <div className="text-sm leading-relaxed">
                              {message.content}
                            </div>
                          </motion.div>
                        ))}
                        {isLoading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center py-2"
                          >
                            <Loader className="w-4 h-4 animate-spin" />
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>

                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Ask a follow-up question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage(input);
                          }
                        }}
                        className="bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-400"
                      />
                      <Button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary/20 border-primary/50 hover:bg-primary/30"
                      >
                        {isLoading ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 