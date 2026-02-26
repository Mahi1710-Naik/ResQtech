
"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, Bell, Accessibility, Cpu, Globe, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <Header title="System Settings" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Emergency Protocols
              </CardTitle>
              <CardDescription>Configure how SOS triggers are handled.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Automatic Police Dispatch</Label>
                  <p className="text-xs text-muted-foreground">Notify authorities immediately upon Critical alerts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Silent SOS Mode</Label>
                  <p className="text-xs text-muted-foreground">Keep the watch screen and speaker off during SOS.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Fake Power Off</Label>
                  <p className="text-xs text-muted-foreground">Simulate shutdown while keeping tracking active.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-primary" />
                Inclusive Preferences
              </CardTitle>
              <CardDescription>Tailor the hardware experience for PWD users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">High Intensity Haptics</Label>
                  <p className="text-xs text-muted-foreground">Stronger vibration patterns for Deaf users.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Voice Activation (Keyword)</Label>
                  <p className="text-xs text-muted-foreground">Allow "Help" to trigger SOS via Edge AI.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Device Management
              </CardTitle>
              <CardDescription>Firmware and hardware level configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">OTA Updates</Label>
                  <p className="text-xs text-muted-foreground">Automatically download firmware v1.3.0.</p>
                </div>
                <Button variant="outline" size="sm">Update Now</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Cloud Logging</Label>
                  <p className="text-xs text-muted-foreground">Store detailed telemetry logs in Firebase.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-destructive/5 border border-destructive/10">
            <CardHeader>
              <CardTitle className="text-base text-destructive flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Advanced Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">Resetting system keys will unpair all connected Guardian Beacon watches.</p>
              <Button variant="destructive" className="w-full">Revoke All Device Tokens</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
