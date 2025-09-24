import { useState } from "react"
import { MetricsCard } from "@/components/dashboard/MetricsCard"
import { RakeFormationCard } from "@/components/dashboard/RakeFormationCard"
import { LoadingPointStatus } from "@/components/dashboard/LoadingPointStatus"
import { InventoryOverview } from "@/components/dashboard/InventoryOverview"
import { AIRecommendations } from "@/components/dashboard/AIRecommendations"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Train, 
  Factory, 
  TrendingUp, 
  Package, 
  Clock, 
  DollarSign,
  BarChart3,
  Settings,
  RefreshCw
} from "lucide-react"

// Mock data for demonstration
const mockMetrics = {
  totalRakes: 156,
  activeRakes: 42,
  completedToday: 18,
  avgLoadingTime: "4.2h",
  costSavings: 125000,
  efficiency: 87.5
}

const mockRakes = [
  {
    rakeId: "RK001",
    destination: "CMO Stockyard A",
    loadingPoint: "LP-001",
    capacity: 2500,
    currentLoad: 2200,
    materials: [
      { type: "Hot Rolled Coils", quantity: 1200, priority: "high" as const },
      { type: "Cold Rolled Sheets", quantity: 800, priority: "medium" as const },
      { type: "Galvanized Sheets", quantity: 200, priority: "low" as const }
    ],
    status: "loading" as const,
    estimatedCost: 85000,
    estimatedTime: "2h 30m"
  },
  {
    rakeId: "RK002",
    destination: "Customer Site B",
    loadingPoint: "LP-002",
    capacity: 2200,
    currentLoad: 2200,
    materials: [
      { type: "Steel Pipes", quantity: 1500, priority: "high" as const },
      { type: "Steel Bars", quantity: 700, priority: "medium" as const }
    ],
    status: "ready" as const,
    estimatedCost: 72000,
    estimatedTime: "Ready"
  },
  {
    rakeId: "RK003",
    destination: "Port Terminal",
    loadingPoint: "LP-003",
    capacity: 3000,
    currentLoad: 800,
    materials: [
      { type: "Iron Ore", quantity: 800, priority: "medium" as const }
    ],
    status: "planning" as const,
    estimatedCost: 95000,
    estimatedTime: "6h 15m"
  }
]

const mockLoadingPoints = [
  {
    pointId: "LP-001",
    name: "Main Loading Bay 1",
    capacity: 4,
    currentUtilization: 3,
    activeRakes: 2,
    queueLength: 1,
    avgLoadingTime: "4.2h",
    status: "busy" as const,
    nextAvailable: "2h 15m"
  },
  {
    pointId: "LP-002",
    name: "Express Loading Bay",
    capacity: 2,
    currentUtilization: 0,
    activeRakes: 0,
    queueLength: 0,
    avgLoadingTime: "3.8h",
    status: "available" as const
  },
  {
    pointId: "LP-003",
    name: "Heavy Material Bay",
    capacity: 3,
    currentUtilization: 1,
    activeRakes: 1,
    queueLength: 2,
    avgLoadingTime: "5.1h",
    status: "busy" as const,
    nextAvailable: "4h 30m"
  }
]

const mockMaterials = [
  {
    type: "Hot Rolled Coils",
    current: 15000,
    capacity: 20000,
    reserved: 3000,
    status: "adequate" as const,
    location: "Stockyard A"
  },
  {
    type: "Cold Rolled Sheets",
    current: 2500,
    capacity: 12000,
    reserved: 1200,
    status: "low" as const,
    location: "Stockyard B"
  },
  {
    type: "Steel Pipes",
    current: 800,
    capacity: 5000,
    reserved: 600,
    status: "critical" as const,
    location: "Stockyard C"
  },
  {
    type: "Galvanized Sheets",
    current: 8500,
    capacity: 8000,
    reserved: 500,
    status: "excess" as const,
    location: "Stockyard A"
  }
]

const mockRecommendations = [
  {
    id: "rec-001",
    type: "cost" as const,
    title: "Optimize Material Loading Sequence",
    description: "Reorder loading sequence for RK003 to reduce loading time by 15% and save ₹12,000 in operational costs.",
    impact: "high" as const,
    potentialSavings: 12000,
    implementationTime: "30 minutes",
    confidence: 92
  },
  {
    id: "rec-002",
    type: "efficiency" as const,
    title: "Combine Low-Priority Orders",
    description: "Merge 3 pending low-priority orders into a single rake to improve capacity utilization by 23%.",
    impact: "medium" as const,
    potentialSavings: 8500,
    implementationTime: "2 hours",
    confidence: 87
  },
  {
    id: "rec-003",
    type: "route" as const,
    title: "Alternative Route Selection",
    description: "Use alternate route for CMO deliveries to avoid peak traffic and reduce delivery time by 1.5 hours.",
    impact: "medium" as const,
    implementationTime: "Immediate",
    confidence: 78
  }
]

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elegant border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">SAIL Rake Formation DSS</h1>
              <p className="text-white/80 text-sm">Bokaro Steel Plant - Intelligent Logistics Optimization</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 shadow-card">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="rakes" className="flex items-center space-x-2">
              <Train className="h-4 w-4" />
              <span>Rake Formation</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center space-x-2">
              <Factory className="h-4 w-4" />
              <span>Operations</span>
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>AI Optimization</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <MetricsCard
                title="Total Rakes"
                value={mockMetrics.totalRakes}
                subtitle="In system"
                icon={<Train className="h-4 w-4" />}
                status="neutral"
              />
              <MetricsCard
                title="Active Rakes"
                value={mockMetrics.activeRakes}
                subtitle="Currently loading"
                trend="up"
                trendValue="+5 from yesterday"
                icon={<Package className="h-4 w-4" />}
                status="success"
              />
              <MetricsCard
                title="Completed Today"
                value={mockMetrics.completedToday}
                subtitle="Dispatched"
                trend="up"
                trendValue="+12%"
                icon={<TrendingUp className="h-4 w-4" />}
                status="success"
              />
              <MetricsCard
                title="Avg Load Time"
                value={mockMetrics.avgLoadingTime}
                subtitle="Per rake"
                trend="down"
                trendValue="-0.3h"
                icon={<Clock className="h-4 w-4" />}
                status="success"
              />
              <MetricsCard
                title="Cost Savings"
                value={`₹${(mockMetrics.costSavings / 1000).toFixed(0)}K`}
                subtitle="This month"
                trend="up"
                trendValue="+18%"
                icon={<DollarSign className="h-4 w-4" />}
                status="success"
              />
              <MetricsCard
                title="Efficiency"
                value={`${mockMetrics.efficiency}%`}
                subtitle="Overall system"
                trend="up"
                trendValue="+2.3%"
                icon={<BarChart3 className="h-4 w-4" />}
                status="success"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Rake Formations */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-gradient-card shadow-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Train className="h-5 w-5 text-primary" />
                      <span>Recent Rake Formations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {mockRakes.slice(0, 2).map((rake) => (
                        <RakeFormationCard key={rake.rakeId} {...rake} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Inventory Overview */}
              <div>
                <InventoryOverview
                  materials={mockMaterials}
                  totalCapacity={45000}
                  totalCurrent={26800}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rakes" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockRakes.map((rake) => (
                <RakeFormationCard 
                  key={rake.rakeId} 
                  {...rake}
                  onOptimize={() => console.log(`Optimizing ${rake.rakeId}`)}
                  onDispatch={() => console.log(`Dispatching ${rake.rakeId}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockLoadingPoints.map((point) => (
                <LoadingPointStatus key={point.pointId} {...point} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <AIRecommendations
              recommendations={mockRecommendations}
              onImplement={(id) => console.log(`Implementing recommendation ${id}`)}
              onDismiss={(id) => console.log(`Dismissing recommendation ${id}`)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}