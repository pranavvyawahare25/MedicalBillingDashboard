import { Bell, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslate } from "@/hooks/use-translate";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const t = useTranslate();

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ["/api/notifications"],
    queryFn: async () => {
      const res = await fetch("/api/notifications", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
  });

  const [alertsCount] = useState(notifications.length);

  const getPageTitle = () => {
    const path = location.split("/")[1] || "dashboard";
    return t(path);
  };

  return (
    <div className="border-b border-border bg-background p-4 flex items-center justify-between sticky top-0 z-10 h-16">
      <h2 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h2>
      <div className="flex items-center space-x-3 ml-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={theme === "dark" ? t('switchToLight') : t('switchToDark')}
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {alertsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                  {alertsCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('notifications')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <DropdownMenuItem disabled>{t('noNotifications')}</DropdownMenuItem>
            ) : (
              notifications.map((notification: any) => (
                <DropdownMenuItem key={notification.id}>
                  {notification.message}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
