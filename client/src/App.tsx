import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Star, MessageCircle } from 'lucide-react';
import ZodiacScene from './components/ZodiacScene';
import { HoroscopeCard } from './components/HoroscopeCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import DailyPrediction from './pages/DailyPrediction';

const rashis = [
  { name: 'Mesha (Aries)', element: 'Fire', date: 'March 21 - April 19', lord: 'Mars', symbol: '♈' },
  { name: 'Vrishabha (Taurus)', element: 'Earth', date: 'April 20 - May 20', lord: 'Venus', symbol: '♉' },
  { name: 'Mithuna (Gemini)', element: 'Air', date: 'May 21 - June 20', lord: 'Mercury', symbol: '♊' },
  { name: 'Karka (Cancer)', element: 'Water', date: 'June 21 - July 22', lord: 'Moon', symbol: '♋' },
  { name: 'Simha (Leo)', element: 'Fire', date: 'July 23 - August 22', lord: 'Sun', symbol: '♌' },
  { name: 'Kanya (Virgo)', element: 'Earth', date: 'August 23 - September 22', lord: 'Mercury', symbol: '♍' },
  { name: 'Tula (Libra)', element: 'Air', date: 'September 23 - October 22', lord: 'Venus', symbol: '♎' },
  { name: 'Vrishchika (Scorpio)', element: 'Water', date: 'October 23 - November 21', lord: 'Mars', symbol: '♏' },
  { name: 'Dhanu (Sagittarius)', element: 'Fire', date: 'November 22 - December 21', lord: 'Jupiter', symbol: '♐' },
  { name: 'Makara (Capricorn)', element: 'Earth', date: 'December 22 - January 19', lord: 'Saturn', symbol: '♑' },
  { name: 'Kumbha (Aquarius)', element: 'Air', date: 'January 20 - February 18', lord: 'Saturn', symbol: '♒' },
  { name: 'Meena (Pisces)', element: 'Water', date: 'February 19 - March 20', lord: 'Jupiter', symbol: '♓' },
];

function Home() {
  const navigate = useNavigate();
  const [selectedRashi, setSelectedRashi] = useState(rashis[0]);
  const [activeTab, setActiveTab] = useState('rashi');

  const handleDailyPrediction = () => {
    navigate('/daily-prediction', { state: { rashi: selectedRashi } });
  };

  return (
    <div className="min-h-screen bg-[#000308] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-screen"
      >
        <div className="absolute inset-0 z-10">
          <ZodiacScene activeTab={activeTab as "rashi" | "planets" | undefined} />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 drop-shadow-[0_0_15px_rgba(255,165,0,0.3)]">
                Vedic Astrology Guide
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Moon className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mt-4">
              Explore the ancient wisdom of Vedic astrology through an interactive cosmic journey
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-6xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="bg-black/30 backdrop-blur-lg border-neutral-800/50 hover:bg-black/40 transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                  Kundali & Horoscope Generation
                </CardTitle>
                <CardDescription>
                  Comprehensive birth chart analysis covering all 12 houses, with insights on career, relationships, and personal growth
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border-neutral-800/50 hover:bg-black/40 transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Moon className="w-5 h-5 text-blue-400" />
                  </motion.div>
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized gemstone suggestions and ritual recommendations with detailed benefits and importance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border-neutral-800/50 hover:bg-black/40 transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  Spiritual Content Delivery
                </CardTitle>
                <CardDescription>
                  Customized meditation and workout suggestions aligned with your horoscope, plus personalized sleep content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border-neutral-800/50 hover:bg-black/40 transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  Spiritual Chatbot
                </CardTitle>
                <CardDescription>
                  Interactive chatbot providing spiritual advice and detailed explanations of predictions
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <div className="max-w-6xl mx-auto backdrop-blur-lg bg-black/30 rounded-xl p-6 border border-neutral-800/50">
            <Tabs 
              defaultValue="rashi" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-black/50 backdrop-blur-lg border border-neutral-800/50">
                <TabsTrigger value="rashi" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Star className="w-4 h-4 mr-2" />
                  Rashi
                </TabsTrigger>
                <TabsTrigger value="planets" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Sun className="w-4 h-4 mr-2" />
                  Planets
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="rashi" className="mt-8">
                    <div className="grid gap-8">
                      <div className="flex flex-col items-center space-y-8">
                        <Select
                          onValueChange={(value) => {
                            const rashi = rashis.find(r => r.name === value);
                            if (rashi) setSelectedRashi(rashi);
                          }}
                        >
                          <SelectTrigger className="w-[320px] bg-black/50 backdrop-blur-lg border-neutral-800">
                            <SelectValue placeholder="Select your Rashi" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-neutral-800 text-white">
                            {rashis.map((rashi) => (
                              <SelectItem key={rashi.name} value={rashi.name} className="text-white">
                                <span className="flex items-center">
                                  <span className="mr-2">{rashi.symbol}</span>
                                  {rashi.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <HoroscopeCard
                          sign={selectedRashi.name}
                          date={selectedRashi.date}
                          element={selectedRashi.element}
                          lord={selectedRashi.lord}
                          symbol={selectedRashi.symbol}
                        />

                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="bg-primary/20 border-primary/50 hover:bg-primary/30 group"
                            onClick={handleDailyPrediction}
                          >
                            <Star className="w-4 h-4 mr-2 group-hover:text-yellow-400 transition-colors" />
                            Daily Prediction
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="planets" className="mt-8">
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { name: 'Sun (Surya)', quality: 'Soul, Authority', color: 'yellow-500', description: 'Represents the soul, ego, and vital life force. Rules over personal power and self-expression.' },
                          { name: 'Moon (Chandra)', quality: 'Mind, Emotions', color: 'blue-400', description: 'Governs emotions, intuition, and the subconscious mind. Influences daily moods and emotional well-being.' },
                          { name: 'Mars (Mangal)', quality: 'Energy, Courage', color: 'yellow-500', description: 'The planet of action, energy, and determination. Brings courage and competitive spirit.' },
                          { name: 'Mercury (Budha)', quality: 'Intelligence', color: 'blue-400', description: 'Rules communication, intellect, and analytical abilities. Influences learning and commerce.' },
                          { name: 'Jupiter (Guru)', quality: 'Wisdom, Fortune', color: 'yellow-500', description: 'The great benefic, bringing wisdom, prosperity, and spiritual growth. Expands whatever it touches.' },
                          { name: 'Venus (Shukra)', quality: 'Love, Luxury', color: 'blue-400', description: 'Governs love, beauty, and pleasure. Influences relationships and artistic expression.' },
                          { name: 'Saturn (Shani)', quality: 'Discipline, Karma', color: 'yellow-500', description: 'The karmic teacher, bringing discipline and life lessons. Rules over time and responsibilities.' },
                          { name: 'Rahu', quality: 'Materialistic desires', color: 'blue-400', description: 'The north node of the Moon, representing worldly desires and material evolution.' },
                          { name: 'Ketu', quality: 'Spirituality', color: 'yellow-500', description: 'The south node of the Moon, bringing spiritual insight and liberation from materialism.' },
                        ].map((planet) => (
                          <motion.div
                            key={planet.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card className="bg-black/50 backdrop-blur-lg border-neutral-800 p-6 h-full hover:bg-black/60 transition-colors group">
                              <h3 className={`text-xl font-bold text-${planet.color} mb-2 group-hover:scale-105 transition-transform`}>
                                {planet.name}
                              </h3>
                              <p className="text-neutral-400 mb-2">{planet.quality}</p>
                              <p className="text-sm text-neutral-500">{planet.description}</p>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daily-prediction" element={<DailyPrediction />} />
      </Routes>
    </Router>
  );
}

export default App;