import { cn } from "@/lib/utils";

type StatusType = 'Online' | 'Offline' | 'Emergency' | 'Active' | 'Resolved' | 'Dispatched' | 'Low' | 'Medium' | 'High' | 'Critical' | 'Pending';

export function StatusBadge({ status }: { status: StatusType }) {
  const getColors = (s: StatusType) => {
    switch (s) {
      case 'Emergency':
      case 'Active':
      case 'Critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Online':
      case 'Resolved':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium':
      case 'High':
      case 'Dispatched':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Offline':
      case 'Pending':
        return 'bg-muted text-muted-foreground border-muted-foreground/10';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors",
      getColors(status)
    )}>
      <span className={cn(
        "mr-1.5 h-1.5 w-1.5 rounded-full",
        status === 'Emergency' || status === 'Active' ? 'animate-pulse bg-current' : 'bg-current'
      )} />
      {status}
    </span>
  );
}