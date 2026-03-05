import { motion } from "framer-motion";
import { Megaphone, Clock, Users, Play, Pause, Phone, Calendar, ArrowUpRight, Bell, Syringe, Stethoscope } from "lucide-react";
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
  description: string;
}

const mockCampaigns: Campaign[] = [
  { id: "C-001", name: "Tomorrow's Reminders", type: "reminder", status: "active", patients: 45, completed: 28, language: "Multi", nextRun: "6:00 PM Today", description: "Automated appointment reminder calls for tomorrow's schedule" },
  { id: "C-002", name: "Post-Surgery Follow-up", type: "followup", status: "active", patients: 12, completed: 7, language: "Hindi", nextRun: "9:00 AM Tomorrow", description: "Week 2 follow-up calls for post-surgery patients" },
  { id: "C-003", name: "Flu Vaccination Drive", type: "vaccination", status: "paused", patients: 200, completed: 0, language: "English", nextRun: "Paused", description: "Seasonal flu vaccination outreach campaign" },
  { id: "C-004", name: "Dental Checkup Reminders", type: "reminder", status: "completed", patients: 30, completed: 30, language: "Tamil", nextRun: "Completed", description: "6-month dental checkup follow-up calls" },
];

const typeConfig = {
  reminder: { icon: Bell, bg: "bg-info/8", text: "text-info", border: "border-info/15", gradient: "from-info/20 to-info/5" },
  followup: { icon: Stethoscope, bg: "bg-primary/8", text: "text-primary", border: "border-primary/15", gradient: "from-primary/20 to-primary/5" },
  vaccination: { icon: Syringe, bg: "bg-success/8", text: "text-success", border: "border-success/15", gradient: "from-success/20 to-success/5" },
};

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  paused: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-muted text-muted-foreground border-border",
};

export function CampaignPanel() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const toggleCampaign = (id: string) => {
    setCampaigns(prev =>
      prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "paused" as const : c.status === "paused" ? "active" as const : c.status } : c)
    );
  };

  const stats = [
    { label: "Active Campaigns", value: campaigns.filter(c => c.status === "active").length, icon: Megaphone, color: "text-primary", bg: "bg-primary/8" },
    { label: "Total Patients", value: campaigns.reduce((s, c) => s + c.patients, 0), icon: Users, color: "text-accent", bg: "bg-accent/8" },
    { label: "Calls Completed", value: campaigns.reduce((s, c) => s + c.completed, 0), icon: Phone, color: "text-success", bg: "bg-success/8" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-glass glass-strong shadow-soft p-5 flex items-center gap-4 hover:shadow-elevated transition-shadow group"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map((campaign, i) => {
          const config = typeConfig[campaign.type];
          const TypeIcon = config.icon;
          const progress = campaign.patients > 0 ? (campaign.completed / campaign.patients) * 100 : 0;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-glass glass-strong shadow-soft overflow-hidden hover:shadow-elevated transition-all group"
            >
              {/* Card header gradient */}
              <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className={`w-5 h-5 ${config.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${config.bg} ${config.text} ${config.border} text-[10px] capitalize rounded-md px-2`}>
                          {campaign.type}
                        </Badge>
                        <Badge variant="outline" className={`${statusStyles[campaign.status]} text-[10px] capitalize rounded-md px-2`}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-display font-bold text-foreground">{campaign.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{campaign.description}</p>
                    </div>
                  </div>
                  {campaign.status !== "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCampaign(campaign.id)}
                      className="h-9 w-9 p-0 rounded-xl border-glass hover:shadow-soft"
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
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">{campaign.completed} / {campaign.patients} contacted</span>
                    <span className={`font-bold ${progress === 100 ? "text-success" : "text-foreground"}`}>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-gradient-primary rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" /> {campaign.nextRun}
                    </span>
                    <span className="text-muted-foreground font-medium">🌐 {campaign.language}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Outbound script */}
      <div className="rounded-2xl border border-glass glass-strong shadow-elevated overflow-hidden">
        <div className="px-6 py-4 border-b border-glass bg-gradient-radial">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <h2 className="text-base font-display font-bold text-foreground">Outbound Script Preview</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 font-medium">Sample AI agent conversation flow</p>
        </div>
        <div className="p-6">
          <div className="bg-muted/30 rounded-xl border border-glass p-5 space-y-3 font-mono text-sm">
            <p className="text-muted-foreground text-xs">// Agent initiates outbound call</p>
            <div className="flex gap-3 items-start">
              <span className="text-primary font-bold text-xs bg-primary/8 px-2 py-0.5 rounded shrink-0">AGENT</span>
              <p className="text-foreground">"Hello, this is a reminder from 2Care clinic about your appointment with Dr. Sharma tomorrow at 10 AM."</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-accent font-bold text-xs bg-accent/8 px-2 py-0.5 rounded shrink-0">PATIENT</span>
              <p className="text-foreground">"Can we move it to Friday?"</p>
            </div>
            <p className="text-muted-foreground text-xs">// Tool call: checkAvailability(doctor="Sharma", date="Friday")</p>
            <div className="flex gap-3 items-start">
              <span className="text-primary font-bold text-xs bg-primary/8 px-2 py-0.5 rounded shrink-0">AGENT</span>
              <p className="text-foreground">"Dr. Sharma is available at 10 AM and 3 PM on Friday. Which would you prefer?"</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-accent font-bold text-xs bg-accent/8 px-2 py-0.5 rounded shrink-0">PATIENT</span>
              <p className="text-foreground">"3 PM works."</p>
            </div>
            <p className="text-muted-foreground text-xs">// Tool call: rescheduleAppointment(id="APT-001", date="Friday", time="3:00 PM")</p>
            <div className="flex gap-3 items-start">
              <span className="text-success font-bold text-xs bg-success/8 px-2 py-0.5 rounded shrink-0">AGENT</span>
              <p className="text-foreground">"Done! Your appointment has been rescheduled to Friday at 3 PM with Dr. Sharma. ✅"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
