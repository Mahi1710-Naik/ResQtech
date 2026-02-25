"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Zap, Signal, HardDrive, ShieldCheck, Accessibility, Radio, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EngineeringPage() {
  const hardwareSpecs = [
    { component: "Central SoC", model: "ESP32-S3 (AI Vector)", status: "Active" },
    { component: "LTE Module", model: "SIM7600 (4G/VoLTE)", status: "Standby" },
    { component: "Motion Sensor", model: "MPU6050 (6-Axis)", status: "Monitoring" },
    { component: "Bio-Sensor", model: "MAX30102 (HR/SpO2)", status: "Active" },
    { component: "Edge AI Mic", model: "INMP441 (I2S)", status: "Listening" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <Header title="Engineering Blueprint" />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Firmware & Architecture Docs */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>System Architecture</CardTitle>
                <CardDescription>IoT Stack & Power Strategy</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <h4 className="font-bold text-slate-800">1. Power Optimization</h4>
                <p className="text-muted-foreground">Utilizing ESP32 <b>Deep Sleep</b> with ULP (Ultra Low Power) coprocessor. Wake sources: MPU6050 interrupt (motion) and GPIO 34 (physical button).</p>
                
                <h4 className="font-bold text-slate-800">2. Edge AI Processing</h4>
                <p className="text-muted-foreground">Running TFLite Micro for keyword spotting ("HELP", "MUDAD") directly on the S3 core. I2S DMA buffers feed 16kHz audio frames to the inference engine.</p>
                
                <h4 className="font-bold text-slate-800">3. PWD Integration</h4>
                <p className="text-muted-foreground">Haptic feedback profiles mapped to different alert statuses. Deaf users receive distinct vibration patterns (Morse-encoded) for "Police Dispatched" vs "SOS Triggered".</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Firmware Registry (MicroPython)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-slate-950 p-6 text-emerald-400 font-mono text-xs overflow-x-auto">
                <pre>{`# Guardian Beacon Core v1.2.0
import machine, time, network
from sensors import MPU6050, MAX30102
from comms import SIM7600

def trigger_sos(cause):
    print(f"SOS TRIGGERED: {cause}")
    gps_data = sim.get_gps()
    sim.send_sms("112", f"SOS! {cause} at {gps_data}")
    firebase.post_alert(cause, gps_data, sensors.get_vitals())
    haptics.alert_pattern("CRITICAL")

# Interrupt for Button
btn = machine.Pin(34, machine.Pin.IN)
btn.irq(trigger=machine.Pin.IRQ_FALLING, handler=lambda t: trigger_sos("Button"))

# Fall Detection Logic
while True:
    accel = mpu.get_acceleration()
    if accel.magnitude > FALL_THRESHOLD:
        time.sleep(2)
        if not mpu.is_moving():
            trigger_sos("Fall Detected")
    time.sleep(0.1)`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Panels */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Hardware Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hardwareSpecs.map((hw, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                  <div>
                    <p className="font-semibold">{hw.component}</p>
                    <p className="text-[10px] text-muted-foreground">{hw.model}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{hw.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-primary" />
                Inclusive I/O Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs font-bold text-slate-700">Deaf Mode</p>
                <p className="text-[10px] text-muted-foreground">Vibration: Long-Long-Short (SOS Sent)</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs font-bold text-slate-700">Blind Mode</p>
                <p className="text-[10px] text-muted-foreground">Audio: High-pitch Tone (GPS Lock)</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs font-bold text-slate-700">Mute Mode</p>
                <p className="text-[10px] text-muted-foreground">Input: Triple-Tap Gesture SOS</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider flex items-center gap-2">
                <Radio className="h-4 w-4 text-accent" />
                Regulatory Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between"><span>BIS Certification</span><span className="text-green-600 font-bold">Passed</span></div>
              <div className="flex justify-between"><span>WPC ETA</span><span className="text-green-600 font-bold">Active</span></div>
              <div className="flex justify-between"><span>SAR Compliance</span><span className="text-slate-400 font-bold">Testing</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}