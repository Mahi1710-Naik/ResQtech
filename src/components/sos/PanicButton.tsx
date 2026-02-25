"use client";

import { useState, useEffect, useRef } from "react";
import { Power, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PanicButton() {
  const [count, setCount] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePress = () => {
    setCount((prev) => prev + 1);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Window for presses: if no press within 2 seconds, reset the counter
    timerRef.current = setTimeout(() => {
      if (!isTriggered) setCount(0);
    }, 2000);
  };

  useEffect(() => {
    if (count >= 4 && !isTriggered) {
      setIsTriggered(true);
      triggerAlert();
    }
  }, [count, isTriggered]);

  const triggerAlert = () => {
    toast({
      variant: "destructive",
      title: "SOS ALERT TRIGGERED",
      description: "Emergency signal with GPS coordinates sent to nearest police station.",
    });
    // In a real production app, you would add a document to the 'alerts' collection here
  };

  const reset = () => {
    setIsTriggered(false);
    setCount(0);
  };

  return (
    <Card className="w-full max-w-xs mx-auto border-2 border-primary/20 shadow-xl overflow-hidden bg-white">
      <div className="h-2 bg-primary" />
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">Guardian Device</CardTitle>
        <CardDescription>Simulate Power Button</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 py-6">
        <div className="relative">
          <Button
            variant={isTriggered ? "destructive" : "outline"}
            size="icon"
            className={cn(
              "h-28 w-28 rounded-full border-4 transition-all duration-300 shadow-lg",
              count > 0 && !isTriggered ? "scale-110 border-primary shadow-primary/20" : "",
              isTriggered ? "animate-pulse ring-4 ring-destructive/30 border-white" : "border-primary/20"
            )}
            onClick={handlePress}
          >
            <Power className={cn("h-12 w-12", isTriggered ? "text-white" : "text-primary")} />
          </Button>
          
          {!isTriggered && count > 0 && (
            <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-md animate-in zoom-in">
              {count}
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          {isTriggered ? (
            <div className="flex flex-col items-center text-destructive">
              <ShieldAlert className="h-10 w-10 mb-2 animate-bounce" />
              <p className="font-bold text-lg tracking-tight uppercase">SOS ACTIVE</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Nearest Police Notified</p>
              <Button variant="link" size="sm" onClick={reset} className="text-muted-foreground mt-4 hover:text-primary">
                False Alarm? Reset
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {count === 0 ? "Standby Mode" : "Emergency Sequence"}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {count === 0 ? "Press button 4 times rapidly" : `Need ${4 - count} more presses`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
