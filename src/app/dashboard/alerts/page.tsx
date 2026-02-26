
"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, MapPin, Clock, Search, Filter, ArrowUpRight } from "lucide-react";
import { MOCK_ALERTS } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function AlertsListPage() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <Header title="Emergency Incident Log" />

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Comprehensive history of SOS triggers and responses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter by user or ID..." className="pl-9 h-9" />
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground font-medium border-b">
                  <th className="text-left p-4">Incident ID</th>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Trigger</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {MOCK_ALERTS.map((alert) => (
                  <tr key={alert.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-primary">{alert.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">{alert.userName}</p>
                        <p className="text-[10px] text-muted-foreground">{alert.deviceName}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-destructive/10 rounded text-destructive">
                          <ShieldAlert className="h-3 w-3" />
                        </div>
                        <span className="font-medium">{alert.triggerType}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={alert.status} />
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/dashboard/alerts/${alert.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                          Analyze <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
