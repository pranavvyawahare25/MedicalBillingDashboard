import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AlertItem {
  id: string | number;
  name: string;
  value: string;
  status: "warning" | "error";
}

interface AlertCardProps {
  title: string;
  count: number;
  description: string;
  items: AlertItem[];
  icon: "alert" | "calendar";
  onClick?: () => void;
}

export function AlertCard({ title, count, description, items, icon, onClick }: AlertCardProps) {
  return (
    <Card 
      className="overflow-hidden transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:border-primary/50"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          {icon === "alert" ? (
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          ) : (
            <Calendar className="h-5 w-5 text-red-500" />
          )}
        </div>
        <p className="text-3xl font-bold mb-2">{count}</p>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.name}</span>
              <Badge variant={item.status === "error" ? "destructive" : "outline"}>
                {item.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
