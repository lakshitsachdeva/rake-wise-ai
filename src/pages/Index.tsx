import { Button } from "@/components/ui/enhanced-button"
import { Link } from "react-router-dom"
import { Train, BarChart3, Brain, TrendingUp, ArrowRight } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-primary">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-6">
                <Train className="h-12 w-12 mr-4 animate-slide-in" />
                <h1 className="text-5xl font-bold animate-fade-in">
                  SAIL Rake Formation DSS
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
                AI/ML-powered Decision Support System for optimizing rake formation strategies 
                at Bokaro Steel Plant. Intelligent logistics optimization for maximum efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/dashboard">
                  <Button variant="hero" size="xl" className="min-w-[200px]">
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="secondary" size="xl" className="min-w-[200px] bg-white/20 text-white border-white/30 hover:bg-white/30">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-12">
            <div className="bg-gradient-card shadow-elegant p-6 rounded-lg border-0 animate-fade-in">
              <BarChart3 className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Live monitoring of rake formations, loading points, and material inventory
              </p>
            </div>
            
            <div className="bg-gradient-card shadow-elegant p-6 rounded-lg border-0 animate-fade-in">
              <Brain className="h-8 w-8 text-accent mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">AI Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Machine learning algorithms for optimal rake formation and cost reduction
              </p>
            </div>
            
            <div className="bg-gradient-card shadow-elegant p-6 rounded-lg border-0 animate-fade-in">
              <TrendingUp className="h-8 w-8 text-success mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Cost Savings</h3>
              <p className="text-sm text-muted-foreground">
                Minimize logistics costs, reduce demurrage, and optimize resource allocation
              </p>
            </div>
            
            <div className="bg-gradient-card shadow-elegant p-6 rounded-lg border-0 animate-fade-in">
              <Train className="h-8 w-8 text-warning mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Smart Formation</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent rake composition based on orders, priorities, and constraints
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Logistics Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From material availability to final dispatch, our AI system optimizes every step 
              of the rake formation process for maximum efficiency and cost savings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Dynamic Planning</h4>
                  <p className="text-muted-foreground">
                    Real-time evaluation of material availability, order priorities, and operational constraints
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Brain className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Intelligent Recommendations</h4>
                  <p className="text-muted-foreground">
                    AI-powered suggestions for optimal material sourcing, rake composition, and dispatch timing
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-success/10 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Cost Optimization</h4>
                  <p className="text-muted-foreground">
                    Minimize freight costs, reduce penalties, and maximize capacity utilization across all operations
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-card shadow-elegant p-8 rounded-lg border-0">
              <h3 className="text-xl font-bold text-foreground mb-6">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Reduce rake formation time by up to 30%
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Minimize freight and demurrage costs
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Optimize loading point utilization
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                  Improve delivery SLA compliance
                </li>
              </ul>
              
              <Link to="/dashboard" className="block mt-6">
                <Button variant="industrial" className="w-full">
                  Explore the System
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
