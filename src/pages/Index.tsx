import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Calendar, BarChart3, Megaphone, Activity, Sparkles } from "lucide-react";
import { VoiceAgent } from "@/components/VoiceAgent";
import { AppointmentDashboard } from "@/components/AppointmentDashboard";
import { PipelineMetrics } from "@/components/PipelineMetrics";
import { CampaignPanel } from "@/components/CampaignPanel";
import { ConversationLog } from "@/components/ConversationLog";

const navItems = [
  { id: "voice", label: "Voice Agent", icon: Mic, desc: "Real-time voice AI" },
  { id: "appointments", label: "Appointments", icon: Calendar, desc: "Manage bookings" },
  { id: "metrics", label: "Pipeline", icon: BarChart3, desc: "Latency & metrics" },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, desc: "Outbound calls" },
] as const;

type TabId = typeof navItems[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("voice");

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-glass glass-strong">
        <div className="container flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight">
                <span className="text-gradient">2Care</span>
                <span className="text-foreground">.ai</span>
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">
                Voice AI Platform
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 glass rounded-2xl p-1.5 border border-glass shadow-soft">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-primary rounded-xl shadow-glow-sm"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Mobile nav */}
          <nav className="flex md:hidden items-center gap-1 glass rounded-xl p-1 border border-glass">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative p-2.5 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 bg-gradient-primary rounded-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <item.icon className="w-4 h-4 relative z-10" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-glass shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">AI Ready</span>
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Tab header */}
      <div className="container pt-8 pb-2">
        <AnimatePresence mode="wait">
          {navItems.filter(n => n.id === activeTab).map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-sm">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">{item.label}</h2>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <main className="container py-6 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "voice" && (
            <motion.div key="voice" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <VoiceAgent />
                </div>
                <div className="lg:col-span-2">
                  <ConversationLog />
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "appointments" && (
            <motion.div key="appointments" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <AppointmentDashboard />
            </motion.div>
          )}
          {activeTab === "metrics" && (
            <motion.div key="metrics" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <PipelineMetrics />
            </motion.div>
          )}
          {activeTab === "campaigns" && (
            <motion.div key="campaigns" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease: "easeOut" }}>
              <CampaignPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
