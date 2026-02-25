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
  Volume2,
  Accessibility,
  Activity
} from "lucide-react";
import Link from "next/link";
import { MOCK_ALERTS, LOCATION_HISTORY, SAFE_ZONES, DANGER_AREAS, MOCK_DEVICES } from "@/app/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { genAIAssistedAlertTriage, type GenAIAssistedAlertTriageOutput } from "@/ai/flows/gen-ai-assisted-alert-triage-flow";

export default function AlertDetailPage() {
  const { id } = useParams();
  const alert = MOCK_ALERTS.find(a => a.id === id);
  const device = MOCK_DEVICES.find(d => d.id === alert?.deviceId);
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
        triggerType: alert.triggerType,
        currentLocation: {
          latitude: alert.location.lat,
          longitude: alert.location.lng,
        },
        sensorSnapshot: alert.sensorSnapshot,
        locationHistory: LOCATION_HISTORY.map(l => ({
          latitude: l.latitude,
          longitude: l.longitude,
          timestamp: l.timestamp
        })),
        accessibilityMode: device?.accessibilityMode
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
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/alerts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Header title={`Incident Analysis: ${alert.id}`} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Emergency Event: {alert.triggerType}</CardTitle>
                  <CardDescription>Sensor telemetry at time of trigger</CardDescription>
                </div>
              </div>
              <StatusBadge status={alert.status} />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-primary" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Heart Rate</p>
                </div>
                <p className="text-xl font-bold">{alert.sensorSnapshot.heartRate} BPM</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Accessibility className="h-4 w-4 text-primary" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">User Mode</p>
                </div>
                <p className="text-xl font-bold">{device?.accessibilityMode || 'Standard'}</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Coordinates</p>
                </div>
                <p className="text-sm font-bold">{alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-indigo-50 border-l-4 border-l-indigo-600">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-indigo-900">AI Intelligent Triage</CardTitle>
              </div>
              {triageData && <StatusBadge status={triageData.urgencyLevel as any} />}
            </CardHeader>
            <CardContent>
              {loadingTriage ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <BrainCircuit className="h-10 w-10 text-indigo-600 animate-pulse" />
                  <p className="text-sm font-medium animate-pulse text-indigo-900/60">Cross-referencing sensor logs & history...</p>
                </div>
              ) : triageData ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold flex items-center gap-2 mb-2 text-indigo-900">
                      <MessageSquare className="h-4 w-4" />
                      Incident Summary
                    </h4>
                    <p className="text-sm leading-relaxed text-indigo-950/80">{triageData.summary}</p>
                  </div>
                  
                  {triageData.pwdContext && (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="text-xs font-bold text-amber-800 uppercase mb-1 flex items-center gap-2">
                        <Accessibility className="h-3 w-3" />
                        Accessibility Guidance
                      </h4>
                      <p className="text-xs text-amber-900/80">{triageData.pwdContext}</p>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow-sm border border-indigo-100">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        Risk Analysis
                      </h4>
                      <p className="text-sm text-slate-600">{triageData.riskAnalysis}</p>
                    </div>
                    <div className="rounded-lg bg-indigo-600 text-white p-4 shadow-md">
                      <h4 className="text-xs font-bold uppercase mb-2 flex items-center gap-2 text-indigo-100">
                        <ShieldAlert className="h-3 w-3" />
                        Action Priority
                      </h4>
                      <p className="text-sm font-medium">{triageData.recommendedAction}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Button onClick={runTriage} className="w-full bg-indigo-600 hover:bg-indigo-700">Re-run Triage</Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Responder Toolkit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-accent hover:bg-accent/90">Deploy Emergency Unit</Button>
              <Button variant="outline" className="w-full">Flash Device Haptics</Button>
              <Button variant="secondary" className="w-full flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Live Ambient Audio
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-sm">Health Vital Stream</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">SpO2 Level</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Battery</span>
                <span className="font-bold">42%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}