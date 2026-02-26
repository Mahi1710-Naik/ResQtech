
"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Battery, Signal, ShieldCheck, Settings2, Trash2, Plus } from "lucide-react";
import { MOCK_DEVICES } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";

export default function DevicesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <Header title="Registered Devices" />
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Provision New Device
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_DEVICES.map((device) => (
          <Card key={device.id} className="border-none shadow-sm overflow-hidden hover:ring-2 hover:ring-primary/10 transition-all">
            <CardHeader className="flex flex-row items-start justify-between pb-2 bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{device.name}</CardTitle>
                  <CardDescription className="text-xs">{device.id}</CardDescription>
                </div>
              </div>
              <StatusBadge status={device.status} />
            </CardHeader>
            <CardContent className="space-y-4 pt-4 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <Battery className="h-3 w-3" /> Battery
                  </p>
                  <p className="text-sm font-bold">{device.batteryLevel}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <Signal className="h-3 w-3" /> Connectivity
                  </p>
                  <p className="text-sm font-bold">4G LTE (High)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Security
                  </p>
                  <p className="text-sm font-bold">Encrypted</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <Settings2 className="h-3 w-3" /> Profile
                  </p>
                  <p className="text-sm font-bold">{device.accessibilityMode}</p>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">Configure</Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
