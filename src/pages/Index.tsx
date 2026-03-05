import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, Globe, Activity, Calendar, BarChart3, Megaphone, Settings } from "lucide-react";
import { VoiceAgent } from "@/components/VoiceAgent";
import { AppointmentDashboard } from "@/components/AppointmentDashboard";
import { PipelineMetrics } from "@/components/PipelineMetrics";
import { CampaignPanel } from "@/components/CampaignPanel";
import { ConversationLog } from "@/components/ConversationLog";

const navItems = [
  { id: "voice", label: "Voice Agent", icon: Mic },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "metrics", label: "Pipeline", icon: BarChart3 },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
] as const;

type TabId = typeof navItems[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("voice");

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-foreground tracking-tight">2Care.ai</h1>
              <p className="text-xs text-muted-foreground">Voice AI Agent</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-primary rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <AnimatePresence mode="wait">
          {activeTab === "voice" && (
            <motion.div key="voice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <VoiceAgent />
                </div>
                <div>
                  <ConversationLog />
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "appointments" && (
            <motion.div key="appointments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <AppointmentDashboard />
            </motion.div>
          )}
          {activeTab === "metrics" && (
            <motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <PipelineMetrics />
            </motion.div>
          )}
          {activeTab === "campaigns" && (
            <motion.div key="campaigns" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <CampaignPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
