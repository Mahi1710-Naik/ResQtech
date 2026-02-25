"use client";

import { Header } from "@/components/dashboard/Header";
import { PanicButton } from "@/components/sos/PanicButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Watch, Info } from "lucide-react";

export default function SOSSimulationPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-slate-50">
      <Header title="SOS Device Simulation" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle>Mobile App Interface</CardTitle>
              </div>
              <CardDescription>
                Simulating the Guardian Beacon app running on a smartphone.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <PanicButton />
              
              <div className="mt-12 max-w-md text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-2">
                  <Info className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">How it works</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In a real emergency, the physical power button sequence is captured by the background service. 
                  This simulator mimics that behavior: click the Power icon 4 times within 2 seconds to trigger 
                  a critical alert to responders and police.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Watch className="h-5 w-5 text-primary" />
                <CardTitle>Watch Integration</CardTitle>
              </div>
              <CardDescription>The same logic applies to the Guardian Beacon Smartwatch.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border-2 border-dashed border-primary/20 p-8 flex flex-col items-center justify-center bg-muted/20">
                <div className="h-32 w-32 rounded-full border-4 border-slate-300 flex items-center justify-center bg-slate-100 shadow-inner mb-4">
                  <div className="h-24 w-24 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center">
                    <PanicButton />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Watch UI Simulation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-accent/5">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider">Device Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">GPS Connectivity</span>
                <span className="text-green-600 font-bold flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Excellent
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Battery Level</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Police Protocol</span>
                <span className="font-bold">Active</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">Trigger History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground italic">
                No alerts triggered in the last 24 hours.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
