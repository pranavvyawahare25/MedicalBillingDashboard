import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useTranslate } from "@/hooks/use-translate";

type ColorVariant = 'blue' | 'green' | 'purple' | 'red';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeText?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: ColorVariant;
}

const variantStyles: Record<ColorVariant, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/50",
  green: "bg-green-50 dark:bg-green-950/50",
  purple: "bg-purple-50 dark:bg-purple-950/50",
  red: "bg-red-50 dark:bg-red-950/50"
};

const iconStyles: Record<ColorVariant, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
  purple: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
  red: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
};

export function StatsCard({
  title,
  value,
  change,
  changeText,
  icon,
  onClick,
  className,
  variant = 'blue'
}: StatsCardProps) {
  const t = useTranslate();
  
  return (
    <Card
      className={cn(
        "p-6 hover:shadow-lg transition-shadow cursor-pointer border-none",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
          {(change !== undefined || changeText) && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              {change !== undefined && (
                <>
                  {change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 text-green-500 dark:text-green-400 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 text-red-500 dark:text-red-400 mr-1" />
                  )}
                  <span className={cn(
                    change >= 0 
                      ? "text-green-500 dark:text-green-400" 
                      : "text-red-500 dark:text-red-400"
                  )}>
                    {Math.abs(change)}%
                  </span>
                  <span className="ml-1 text-muted-foreground">{t('dashboard.vsLastMonth')}</span>
                </>
              )}
              {changeText && !change && (
                <span className="text-muted-foreground">{changeText}</span>
              )}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            iconStyles[variant]
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
