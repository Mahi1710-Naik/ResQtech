"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, ShieldAlert, Signal, Battery, Navigation } from "lucide-react";
import { MOCK_DEVICES } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

export default function LiveMapPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-6 pb-0">
        <Header title="Live Tracking Map" />
      </div>
      
      <div className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* Device Sidebar */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2">
          {MOCK_DEVICES.map(device => (
            <Card key={device.id} className={`cursor-pointer transition-all border-none shadow-sm hover:ring-2 hover:ring-primary/20 ${device.status === 'Emergency' ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${device.status === 'Emergency' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold truncate max-w-[120px]">{device.name}</span>
                  </div>
                  <StatusBadge status={device.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Battery className="h-3 w-3" />
                    {device.batteryLevel}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    Excellent
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mock Map View */}
        <div className="flex-1 relative rounded-2xl overflow-hidden bg-slate-200 shadow-inner group">
          <div 
            className="absolute inset-0 opacity-50 bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://picsum.photos/seed/map/1200/800")' }} 
            data-ai-hint="city map"
          />
          
          {/* Map Grid Overlay */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black/10" />
            ))}
          </div>

          {/* Device Markers */}
          {MOCK_DEVICES.map((device, i) => (
            <div 
              key={device.id}
              className="absolute transition-all duration-1000"
              style={{ 
                top: `${20 + (i * 15)}%`, 
                left: `${30 + (i * 20)}%` 
              }}
            >
              <div className="relative group cursor-pointer">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-xl ${device.status === 'Emergency' ? 'animate-bounce' : ''}`}>
                  <div className={`h-8 w-8 rounded-full border-2 border-white overflow-hidden shadow-inner`}>
                    <img src={`https://picsum.photos/seed/${device.id}/100`} alt={device.name} />
                  </div>
                </div>
                {device.status === 'Emergency' && (
                  <div className="absolute -inset-2 border-2 border-destructive rounded-full animate-ping pointer-events-none" />
                )}
                
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  <Card className="border-none shadow-2xl p-2 bg-white/90 backdrop-blur-sm">
                    <p className="text-xs font-bold">{device.ownerName}</p>
                    <p className="text-[10px] text-muted-foreground">{device.status} • {device.batteryLevel}% Bat</p>
                  </Card>
                </div>
              </div>
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="bg-white shadow-lg"><Navigation className="h-4 w-4" /></Button>
            <Button size="icon" variant="secondary" className="bg-white shadow-lg font-bold text-lg">+</Button>
            <Button size="icon" variant="secondary" className="bg-white shadow-lg font-bold text-lg">-</Button>
          </div>

          <div className="absolute top-6 right-6">
            <Card className="bg-white/80 backdrop-blur-md border-none shadow-lg">
              <CardContent className="p-3">
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-green-500" /> Online</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-destructive" /> Emergency</div>
                  <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-slate-400" /> Safe Zone</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}