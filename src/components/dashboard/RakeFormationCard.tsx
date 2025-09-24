import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/enhanced-button"
import { Progress } from "@/components/ui/progress"
import { Train, MapPin, Package, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RakeFormationCardProps {
  rakeId: string
  destination: string
  loadingPoint: string
  capacity: number
  currentLoad: number
  materials: Array<{
    type: string
    quantity: number
    priority: "high" | "medium" | "low"
  }>
  status: "planning" | "loading" | "ready" | "dispatched"
  estimatedCost: number
  estimatedTime: string
  onOptimize?: () => void
  onDispatch?: () => void
}

export const RakeFormationCard = ({
  rakeId,
  destination,
  loadingPoint,
  capacity,
  currentLoad,
  materials,
  status,
  estimatedCost,
  estimatedTime,
  onOptimize,
  onDispatch
}: RakeFormationCardProps) => {
  const loadPercentage = (currentLoad / capacity) * 100
  
  const statusConfig = {
    planning: { 
      label: "Planning", 
      variant: "secondary" as const, 
      icon: AlertCircle,
      color: "text-muted-foreground"
    },
    loading: { 
      label: "Loading", 
      variant: "warning" as const, 
      icon: Package,
      color: "text-warning"
    },
    ready: { 
      label: "Ready", 
      variant: "success" as const, 
      icon: CheckCircle,
      color: "text-success"
    },
    dispatched: { 
      label: "Dispatched", 
      variant: "default" as const, 
      icon: Train,
      color: "text-primary"
    }
  }

  const currentStatus = statusConfig[status]
  const StatusIcon = currentStatus.icon

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-foreground">
            Rake {rakeId}
          </CardTitle>
          <Badge variant={currentStatus.variant} className="flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            {currentStatus.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Destination & Loading Point */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="text-sm font-medium">{destination}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Loading Point</p>
              <p className="text-sm font-medium">{loadingPoint}</p>
            </div>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity Utilization</span>
            <span className="font-medium">{currentLoad}T / {capacity}T</span>
          </div>
          <Progress value={loadPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {loadPercentage.toFixed(1)}% loaded
          </p>
        </div>

        {/* Materials */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Materials</p>
          <div className="grid grid-cols-1 gap-1">
            {materials.slice(0, 3).map((material, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <span className="text-sm">{material.type}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{material.quantity}T</span>
                  <Badge 
                    variant={material.priority === "high" ? "destructive" : material.priority === "medium" ? "warning" : "secondary"}
                    className="text-xs"
                  >
                    {material.priority}
                  </Badge>
                </div>
              </div>
            ))}
            {materials.length > 3 && (
              <p className="text-xs text-muted-foreground px-2">
                +{materials.length - 3} more materials
              </p>
            )}
          </div>
        </div>

        {/* Cost & Time Estimates */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Estimated Cost</p>
            <p className="text-sm font-bold text-foreground">₹{estimatedCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Est. Dispatch Time</p>
            <p className="text-sm font-medium text-foreground">{estimatedTime}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          {status === "planning" && onOptimize && (
            <Button variant="industrial" size="sm" onClick={onOptimize} className="flex-1">
              Optimize
            </Button>
          )}
          {status === "ready" && onDispatch && (
            <Button variant="hero" size="sm" onClick={onDispatch} className="flex-1">
              Dispatch
            </Button>
          )}
          {status === "loading" && (
            <Button variant="outline" size="sm" disabled className="flex-1">
              Loading in Progress...
            </Button>
          )}
          {status === "dispatched" && (
            <Button variant="outline" size="sm" disabled className="flex-1">
              Dispatched
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}