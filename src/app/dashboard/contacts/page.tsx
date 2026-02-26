
"use client";

import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, ShieldCheck, Mail, MapPin, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ContactsPage() {
  const contacts = [
    { name: "Rahul Sharma", relation: "Father", phone: "+91 98765 43210", email: "rahul.s@example.com", status: "Primary" },
    { name: "Priya Singh", relation: "Sister", phone: "+91 87654 32109", email: "priya.s@example.com", status: "Secondary" },
    { name: "Local Police (Delhi)", relation: "Emergency Authority", phone: "112", email: "support@police.gov.in", status: "Official" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <Header title="Trusted Contacts" />
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Trusted Contact
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Emergency Response Network
            </CardTitle>
            <CardDescription>These individuals will be notified instantly when an SOS is triggered.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-white hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback className="bg-primary/5 text-primary font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.relation} • {contact.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-primary/5 border-dashed border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Network Strategy</CardTitle>
            <CardDescription>How the Beacon alert reaches responders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</div>
                Instant SMS Broadcast
              </h4>
              <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                A localized SMS with your exact coordinates is sent to all 3 contacts simultaneously via the SIM7600 module.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</div>
                VoIP Call Escalation
              </h4>
              <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                If no contact acknowledges the alert within 60 seconds, a pre-recorded emergency call is initiated to the primary contact.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</div>
                Local Authority Bridge
              </h4>
              <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                The incident is securely logged and made available to the nearest police station dashboard (ERSS 112).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
