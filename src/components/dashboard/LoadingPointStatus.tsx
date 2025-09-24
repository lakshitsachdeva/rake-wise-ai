import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Factory, Users, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingPointStatusProps {
  pointId: string
  name: string
  capacity: number
  currentUtilization: number
  activeRakes: number
  queueLength: number
  avgLoadingTime: string
  status: "available" | "busy" | "maintenance" | "offline"
  nextAvailable?: string
}

export const LoadingPointStatus = ({
  pointId,
  name,
  capacity,
  currentUtilization,
  activeRakes,
  queueLength,
  avgLoadingTime,
  status,
  nextAvailable
}: LoadingPointStatusProps) => {
  const utilizationPercentage = (currentUtilization / capacity) * 100
  
  const statusConfig = {
    available: { 
      label: "Available", 
      variant: "success" as const,
      bgClass: "bg-success/10 border-success/20"
    },
    busy: { 
      label: "Busy", 
      variant: "warning" as const,
      bgClass: "bg-warning/10 border-warning/20"
    },
    maintenance: { 
      label: "Maintenance", 
      variant: "destructive" as const,
      bgClass: "bg-destructive/10 border-destructive/20"
    },
    offline: { 
      label: "Offline", 
      variant: "secondary" as const,
      bgClass: "bg-muted/20 border-muted"
    }
  }

  const currentStatus = statusConfig[status]

  return (
    <Card className={cn(
      "bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border",
      currentStatus.bgClass
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Factory className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base font-bold">{name}</CardTitle>
              <p className="text-xs text-muted-foreground">Point {pointId}</p>
            </div>
          </div>
          <Badge variant={currentStatus.variant}>
            {currentStatus.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Utilization Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity Utilization</span>
            <span className="font-medium">{currentUtilization}/{capacity} wagons</span>
          </div>
          <Progress value={utilizationPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {utilizationPercentage.toFixed(1)}% utilized
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Active Rakes</p>
              <p className="text-sm font-bold text-foreground">{activeRakes}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Avg Load Time</p>
              <p className="text-sm font-medium text-foreground">{avgLoadingTime}</p>
            </div>
          </div>
        </div>

        {/* Queue Information */}
        {queueLength > 0 && (
          <div className="flex items-center justify-between p-2 bg-warning/10 rounded-md border border-warning/20">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Queue: {queueLength} rakes waiting</span>
            </div>
          </div>
        )}

        {/* Next Available Time */}
        {status === "busy" && nextAvailable && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">Next Available</p>
            <p className="text-sm font-medium text-foreground">{nextAvailable}</p>
          </div>
        )}

        {/* Maintenance Info */}
        {status === "maintenance" && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-destructive font-medium">Under Maintenance</p>
            <p className="text-xs text-muted-foreground">Estimated completion: {nextAvailable || "TBD"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}