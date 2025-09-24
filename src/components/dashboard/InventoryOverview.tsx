import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package2, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MaterialStock {
  type: string
  current: number
  capacity: number
  reserved: number
  status: "adequate" | "low" | "critical" | "excess"
  location: string
}

interface InventoryOverviewProps {
  materials: MaterialStock[]
  totalCapacity: number
  totalCurrent: number
  className?: string
}

export const InventoryOverview = ({
  materials,
  totalCapacity,
  totalCurrent,
  className
}: InventoryOverviewProps) => {
  const overallUtilization = (totalCurrent / totalCapacity) * 100

  const getStatusColor = (status: MaterialStock["status"]) => {
    switch (status) {
      case "adequate":
        return "text-success"
      case "low":
        return "text-warning"
      case "critical":
        return "text-destructive"
      case "excess":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusVariant = (status: MaterialStock["status"]) => {
    switch (status) {
      case "adequate":
        return "success" as const
      case "low":
        return "warning" as const
      case "critical":
        return "destructive" as const
      case "excess":
        return "default" as const
      default:
        return "secondary" as const
    }
  }

  const getStatusIcon = (status: MaterialStock["status"]) => {
    switch (status) {
      case "adequate":
        return CheckCircle
      case "low":
      case "critical":
        return AlertCircle
      case "excess":
        return TrendingUp
      default:
        return Package2
    }
  }

  return (
    <Card className={cn("bg-gradient-card shadow-card border-0", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package2 className="h-5 w-5 text-primary" />
          <span>Material Inventory Overview</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Capacity */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Stockyard Utilization</span>
            <span className="font-medium">{totalCurrent.toLocaleString()}T / {totalCapacity.toLocaleString()}T</span>
          </div>
          <Progress value={overallUtilization} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {overallUtilization.toFixed(1)}% capacity utilized
          </p>
        </div>

        {/* Material List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Material Status</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {materials.map((material, index) => {
              const utilization = (material.current / material.capacity) * 100
              const available = material.current - material.reserved
              const StatusIcon = getStatusIcon(material.status)
              
              return (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={cn("h-4 w-4", getStatusColor(material.status))} />
                      <span className="font-medium text-sm">{material.type}</span>
                    </div>
                    <Badge variant={getStatusVariant(material.status)} className="text-xs">
                      {material.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                    <div>
                      <span className="block">Current</span>
                      <span className="font-medium text-foreground">{material.current.toLocaleString()}T</span>
                    </div>
                    <div>
                      <span className="block">Available</span>
                      <span className="font-medium text-foreground">{available.toLocaleString()}T</span>
                    </div>
                    <div>
                      <span className="block">Reserved</span>
                      <span className="font-medium text-foreground">{material.reserved.toLocaleString()}T</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Progress value={utilization} className="h-1" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{material.location}</span>
                      <span className="text-muted-foreground">{utilization.toFixed(0)}% full</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}