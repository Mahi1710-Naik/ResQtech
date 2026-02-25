"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Activity, Smartphone, Users, ChevronRight } from "lucide-react";
import { MOCK_ALERTS, MOCK_DEVICES } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeAlerts = MOCK_ALERTS.filter(a => a.status === 'Active');
  const onlineDevices = MOCK_DEVICES.filter(d => d.status === 'Online');

  const stats = [
    { label: "Active Emergencies", value: activeAlerts.length, icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Online Devices", value: onlineDevices.length, icon: Smartphone, color: "text-primary", bg: "bg-primary/10" },
    { label: "Alert History", value: "248", icon: Activity, color: "text-accent", bg: "bg-accent/10" },
    { label: "Trusted Contacts", value: "1,240", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <Header title="Dashboard Overview" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={cn("rounded-md p-2", stat.bg)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Emergencies</CardTitle>
                <CardDescription>Real-time feed of reported SOS alerts</CardDescription>
              </div>
              <Link href="/dashboard/alerts">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_ALERTS.length > 0 ? (
                MOCK_ALERTS.map(alert => (
                  <div 
                    key={alert.id} 
                    className="group relative flex items-center justify-between rounded-lg border border-transparent bg-muted/30 p-4 transition-all hover:border-destructive/20 hover:bg-destructive/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <ShieldAlert className="h-5 w-5 text-destructive animate-pulse" />
                      </div>
                      <div>
                        <p className="font-semibold">{alert.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.deviceName} • {mounted ? new Date(alert.timestamp).toLocaleTimeString() : "..."}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={alert.status} />
                      <Link href={`/dashboard/alerts/${alert.id}`}>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <Activity className="mb-2 h-10 w-10 opacity-20" />
                  <p>No active emergencies at this time</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Device Monitoring</CardTitle>
            <CardDescription>Watch health and connectivity status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_DEVICES.map(device => (
                <div key={device.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      device.status === 'Online' ? 'bg-green-500' : device.status === 'Emergency' ? 'bg-destructive' : 'bg-muted-foreground'
                    )} />
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-[10px] text-muted-foreground">Battery: {device.batteryLevel}%</p>
                    </div>
                  </div>
                  <StatusBadge status={device.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
