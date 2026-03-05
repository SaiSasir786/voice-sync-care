import { motion } from "framer-motion";
import { Megaphone, Clock, Users, Play, Pause, CheckCircle2, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  type: "reminder" | "followup" | "vaccination";
  status: "active" | "paused" | "completed";
  patients: number;
  completed: number;
  language: string;
  nextRun: string;
}

const mockCampaigns: Campaign[] = [
  { id: "C-001", name: "Tomorrow's Appointment Reminders", type: "reminder", status: "active", patients: 45, completed: 28, language: "Multi", nextRun: "6:00 PM Today" },
  { id: "C-002", name: "Post-Surgery Follow-up (Week 2)", type: "followup", status: "active", patients: 12, completed: 7, language: "Hindi", nextRun: "9:00 AM Tomorrow" },
  { id: "C-003", name: "Flu Vaccination Drive", type: "vaccination", status: "paused", patients: 200, completed: 0, language: "English", nextRun: "Paused" },
  { id: "C-004", name: "Dental Checkup Reminders", type: "reminder", status: "completed", patients: 30, completed: 30, language: "Tamil", nextRun: "Completed" },
];

const typeStyles = {
  reminder: { bg: "bg-info/10", text: "text-info", border: "border-info/20" },
  followup: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  vaccination: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
};

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  paused: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-muted-foreground border-border",
};

export function CampaignPanel() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const toggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "paused" : c.status === "paused" ? "active" : c.status }
          : c
      )
    );
  };

  const stats = {
    active: campaigns.filter((c) => c.status === "active").length,
    totalPatients: campaigns.reduce((s, c) => s + c.patients, 0),
    totalCompleted: campaigns.reduce((s, c) => s + c.completed, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Campaigns", value: stats.active, icon: Megaphone, color: "text-primary" },
          { label: "Total Patients", value: stats.totalPatients, icon: Users, color: "text-accent" },
          { label: "Calls Completed", value: stats.totalCompleted, icon: Phone, color: "text-success" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-sm p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign, i) => {
          const style = typeStyles[campaign.type];
          const progress = campaign.patients > 0 ? (campaign.completed / campaign.patients) * 100 : 0;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`${style.bg} ${style.text} ${style.border} text-xs capitalize`}>
                      {campaign.type}
                    </Badge>
                    <Badge variant="outline" className={`${statusStyles[campaign.status]} text-xs capitalize`}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mt-2">{campaign.name}</h3>
                </div>
                {campaign.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCampaign(campaign.id)}
                    className="h-8 w-8 p-0"
                  >
                    {campaign.status === "active" ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{campaign.completed} / {campaign.patients} patients contacted</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full bg-gradient-primary rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {campaign.nextRun}
                  </span>
                  <span className="text-muted-foreground">🌐 {campaign.language}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Example outbound script */}
      <div className="rounded-xl border border-border bg-card shadow-md p-6">
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">Outbound Script Preview</h2>
        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm text-foreground space-y-2">
          <p className="text-muted-foreground">// Agent initiates call</p>
          <p><span className="text-primary font-semibold">Agent:</span> "Hello, this is a reminder from 2Care clinic about your appointment with Dr. Sharma tomorrow at 10 AM."</p>
          <p><span className="text-accent font-semibold">Patient:</span> "Can we move it to Friday?"</p>
          <p><span className="text-primary font-semibold">Agent:</span> "Let me check Dr. Sharma's availability on Friday..."</p>
          <p className="text-muted-foreground">// Tool call: checkAvailability(doctor="Sharma", date="Friday")</p>
          <p><span className="text-primary font-semibold">Agent:</span> "Dr. Sharma is available at 10 AM and 3 PM on Friday. Which would you prefer?"</p>
        </div>
      </div>
    </div>
  );
}
