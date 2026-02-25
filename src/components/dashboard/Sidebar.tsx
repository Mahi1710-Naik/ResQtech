"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Map as MapIcon, 
  Smartphone, 
  Users, 
  Settings,
  LogOut,
  Bell,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ShieldAlert, label: 'Emergencies', href: '/dashboard/alerts' },
  { icon: MapIcon, label: 'Live Map', href: '/dashboard/map' },
  { icon: Radio, label: 'SOS Simulation', href: '/dashboard/sos-simulation' },
  { icon: Smartphone, label: 'Devices', href: '/dashboard/devices' },
  { icon: Users, label: 'Trusted Contacts', href: '/dashboard/contacts' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShieldAlert className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">Guardian Beacon</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate">Jane Doe</p>
            <p className="text-[10px] text-muted-foreground">Responder</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
