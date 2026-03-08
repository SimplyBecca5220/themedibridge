import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import BottomNav from "./components/BottomNav";
import SyncHeader from "./components/SyncHeader";
import DevTestPanel from "./components/DevTestPanel";
import HomePage from "./pages/HomePage";
import TriagePage from "./pages/TriagePage";
import SavingsPage from "./pages/SavingsPage";
import EducationPage from "./pages/EducationPage";
import ExportPage from "./pages/ExportPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <div className="mx-auto min-h-dvh max-w-lg">
            <SyncHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/triage" element={<TriagePage />} />
              <Route path="/savings" element={<SavingsPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/export" element={<ExportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <DevTestPanel />
          <BottomNav />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
