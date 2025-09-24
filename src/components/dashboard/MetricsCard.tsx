import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  status?: "success" | "warning" | "destructive" | "neutral"
  icon?: React.ReactNode
  className?: string
}

export const MetricsCard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  status = "neutral",
  icon,
  className
}: MetricsCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <Card className={cn(
      "bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border-0",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1">
            {status !== "neutral" && (
              <Badge variant={status === "success" ? "success" : status}>
                {status === "success" ? "Optimal" : status === "warning" ? "Attention" : "Critical"}
              </Badge>
            )}
            {trend && trendValue && (
              <div className={cn(
                "flex items-center space-x-1 text-xs",
                trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
              )}>
                <TrendIcon className="h-3 w-3" />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}