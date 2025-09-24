import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/enhanced-button"
import { Brain, TrendingUp, DollarSign, Clock, Target, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Recommendation {
  id: string
  type: "cost" | "efficiency" | "capacity" | "route" | "priority"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  potentialSavings?: number
  implementationTime?: string
  confidence: number
}

interface AIRecommendationsProps {
  recommendations: Recommendation[]
  isLoading?: boolean
  onImplement?: (recommendationId: string) => void
  onDismiss?: (recommendationId: string) => void
}

export const AIRecommendations = ({
  recommendations,
  isLoading = false,
  onImplement,
  onDismiss
}: AIRecommendationsProps) => {
  const getTypeIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "cost":
        return DollarSign
      case "efficiency":
        return TrendingUp
      case "capacity":
        return Target
      case "route":
        return Target
      case "priority":
        return Clock
      default:
        return Lightbulb
    }
  }

  const getTypeColor = (type: Recommendation["type"]) => {
    switch (type) {
      case "cost":
        return "text-success"
      case "efficiency":
        return "text-accent"
      case "capacity":
        return "text-primary"
      case "route":
        return "text-warning"
      case "priority":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getImpactVariant = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "destructive" as const
      case "medium":
        return "warning" as const
      case "low":
        return "secondary" as const
      default:
        return "secondary" as const
    }
  }

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-accent animate-pulse-glow" />
          <span>AI Optimization Recommendations</span>
          {isLoading && (
            <Badge variant="secondary" className="animate-pulse">
              Analyzing...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recommendations available</p>
            <p className="text-xs">System is learning from current operations</p>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recommendations.map((recommendation) => {
            const TypeIcon = getTypeIcon(recommendation.type)
            
            return (
              <div 
                key={recommendation.id} 
                className="p-4 bg-gradient-subtle rounded-lg border border-border/50 hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className={cn("p-2 rounded-full bg-background shadow-sm", getTypeColor(recommendation.type))}>
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-foreground">
                        {recommendation.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getImpactVariant(recommendation.impact)} className="text-xs">
                          {recommendation.impact} impact
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {recommendation.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {recommendation.description}
                    </p>
                    
                    {(recommendation.potentialSavings || recommendation.implementationTime) && (
                      <div className="flex items-center space-x-4 text-xs">
                        {recommendation.potentialSavings && (
                          <div className="flex items-center space-x-1 text-success">
                            <DollarSign className="h-3 w-3" />
                            <span>₹{recommendation.potentialSavings.toLocaleString()} potential savings</span>
                          </div>
                        )}
                        {recommendation.implementationTime && (
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{recommendation.implementationTime}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      {onImplement && (
                        <Button 
                          variant="industrial" 
                          size="sm" 
                          onClick={() => onImplement(recommendation.id)}
                          className="text-xs h-8"
                        >
                          Implement
                        </Button>
                      )}
                      {onDismiss && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDismiss(recommendation.id)}
                          className="text-xs h-8"
                        >
                          Dismiss
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}