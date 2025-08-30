import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapView from "./pages/MapView";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OutdoorEnthusiast from "./pages/OutdoorEnthusiast";
import EventPlanner from "./pages/EventPlanner";
import Agriculture from "./pages/Agriculture";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/globe" element={<Dashboard />} />
          <Route path="/outdoor-enthusiast" element={<OutdoorEnthusiast />} />
          <Route path="/event-planner" element={<EventPlanner />} />
          <Route path="/farmer" element={<Agriculture />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
