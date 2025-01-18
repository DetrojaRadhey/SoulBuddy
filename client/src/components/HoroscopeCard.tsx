import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Moon, Star, Sparkles } from "lucide-react";

interface HoroscopeCardProps {
  sign: string;
  date: string;
  element: string;
  lord: string;
  symbol: string;
}

const elementColors = {
  Fire: 'bg-red-500/20 text-red-400 border-red-500/30',
  Water: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Air: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  Earth: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export function HoroscopeCard({ sign, date, element, lord, symbol }: HoroscopeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <Card className="bg-black/50 backdrop-blur-lg border-neutral-800 text-white overflow-hidden group hover:bg-black/60 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span 
                className="text-4xl text-primary"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {symbol}
              </motion.span>
              <div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{sign}</CardTitle>
                <CardDescription className="text-neutral-400">{date}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={elementColors[element as keyof typeof elementColors]}>
              {element}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 group/item">
              <Sparkles className="w-5 h-5 text-yellow-500 group-hover/item:text-yellow-400 transition-colors" />
              <span className="text-neutral-200 group-hover/item:text-yellow-400 transition-colors">Element: {element}</span>
            </div>
            <div className="flex items-center gap-2 group/item">
              <Moon className="w-5 h-5 text-blue-400 group-hover/item:text-blue-300 transition-colors" />
              <span className="text-neutral-200 group-hover/item:text-blue-300 transition-colors">Ruling Planet: {lord}</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-primary mt-1" />
              <div className="space-y-2">
                <h4 className="font-semibold group-hover:text-primary transition-colors">Daily Prediction</h4>
                <p className="text-neutral-300 leading-relaxed">
                  The cosmic energies align favorably today. {lord}'s influence brings positive vibrations,
                  suggesting a good time for personal growth and spiritual advancement. Focus on activities
                  that resonate with your {element.toLowerCase()} element.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}