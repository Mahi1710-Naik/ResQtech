"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Smartphone, 
  BrainCircuit, 
  AlertTriangle,
  ArrowLeft,
  MessageSquare,
  CheckCircle,
  Volume2
} from "lucide-react";
import Link from "next/link";
import { MOCK_ALERTS, LOCATION_HISTORY, SAFE_ZONES, DANGER_AREAS } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { genAIAssistedAlertTriage, type GenAIAssistedAlertTriageOutput } from "@/ai/flows/gen-ai-assisted-alert-triage-flow";

export default function AlertDetailPage() {
  const { id } = useParams();
  const alert = MOCK_ALERTS.find(a => a.id === id);
  const [triageData, setTriageData] = useState<GenAIAssistedAlertTriageOutput | null>(null);
  const [loadingTriage, setLoadingTriage] = useState(false);

  useEffect(() => {
    if (alert) {
      runTriage();
    }
  }, [alert]);

  const runTriage = async () => {
    if (!alert) return;
    setLoadingTriage(true);
    try {
      const result = await genAIAssistedAlertTriage({
        userName: alert.userName,
        deviceName: alert.deviceName,
        alertTimestamp: alert.timestamp,
        currentLocation: {
          latitude: alert.location.lat,
          longitude: alert.location.lng,
          timestamp: alert.timestamp
        },
        locationHistory: LOCATION_HISTORY.map(l => ({
          latitude: l.latitude,
          longitude: l.longitude,
          timestamp: l.timestamp
        })),
        safeZones: SAFE_ZONES,
        dangerAreas: DANGER_AREAS
      });
      setTriageData(result);
    } catch (error) {
      console.error("Triage error", error);
    } finally {
      setLoadingTriage(false);
    }
  };

  if (!alert) return <div>Alert not found</div>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/alerts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Header title={`Incident: ${alert.id}`} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Emergency Overview</CardTitle>
                <CardDescription>Direct device metadata and location</CardDescription>
              </div>
              <StatusBadge status={alert.status} />
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Device</p>
                  <p className="font-medium">{alert.deviceName} ({alert.deviceId})</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Time Triggered</p>
                  <p className="font-medium">{new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Last Coordinates</p>
                  <p className="font-medium">{alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Audio Feed</p>
                  <p className="font-medium text-accent">Connected (Listen Live)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Triage Panel */}
          <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <CardTitle>AI Triage Analysis</CardTitle>
              </div>
              {triageData && <StatusBadge status={triageData.urgencyLevel as any} />}
            </CardHeader>
            <CardContent>
              {loadingTriage ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <BrainCircuit className="h-10 w-10 text-primary animate-pulse" />
                  <p className="text-sm font-medium animate-pulse">Analyzing incident context...</p>
                </div>
              ) : triageData ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Incident Summary
                    </h4>
                    <p className="text-sm leading-relaxed">{triageData.summary}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-accent" />
                        Risk Assessment
                      </h4>
                      <p className="text-sm">{triageData.locationRiskAssessment}</p>
                    </div>
                    <div className="rounded-lg bg-primary text-white p-4 shadow-md">
                      <h4 className="text-xs font-bold uppercase mb-2 flex items-center gap-2 text-white/80">
                        <ShieldAlert className="h-3 w-3" />
                        Recommended Action
                      </h4>
                      <p className="text-sm font-medium">{triageData.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Button onClick={runTriage} className="w-full">Initialize Triage</Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Response Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-accent hover:bg-accent/90">Dispatch Nearest Police</Button>
              <Button variant="outline" className="w-full">Notify Trusted Contacts</Button>
              <Button variant="secondary" className="w-full">Initiate Live Intercom</Button>
              <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Device Activity</CardTitle>
              <CardDescription>Recent status changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "11:15", event: "Emergency Button Pressed" },
                  { time: "11:14", event: "Entering Isolated Park Area" },
                  { time: "11:00", event: "Exited Home Safe Zone" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="text-muted-foreground font-mono">{log.time}</span>
                    <span className="font-medium">{log.event}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}