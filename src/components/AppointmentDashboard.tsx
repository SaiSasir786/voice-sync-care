import { motion } from "framer-motion";
import { Calendar, Clock, User, Stethoscope, CheckCircle2, XCircle, RefreshCw, Search, ArrowUpRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "cancelled" | "rescheduled" | "pending";
  language: string;
  avatar: string;
}

const mockAppointments: Appointment[] = [
  { id: "APT-001", patient: "Rahul Verma", doctor: "Dr. Sharma", specialty: "Cardiology", date: "2026-03-06", time: "10:00 AM", status: "confirmed", language: "HI", avatar: "RV" },
  { id: "APT-002", patient: "Priya Kumar", doctor: "Dr. Patel", specialty: "Dermatology", date: "2026-03-06", time: "11:30 AM", status: "pending", language: "EN", avatar: "PK" },
  { id: "APT-003", patient: "Anand Raj", doctor: "Dr. Sundaram", specialty: "Orthopedics", date: "2026-03-06", time: "2:00 PM", status: "rescheduled", language: "TA", avatar: "AR" },
  { id: "APT-004", patient: "Meera Singh", doctor: "Dr. Sharma", specialty: "Cardiology", date: "2026-03-07", time: "9:00 AM", status: "confirmed", language: "HI", avatar: "MS" },
  { id: "APT-005", patient: "John Doe", doctor: "Dr. Patel", specialty: "Dermatology", date: "2026-03-07", time: "3:00 PM", status: "cancelled", language: "EN", avatar: "JD" },
  { id: "APT-006", patient: "Kavitha Rajan", doctor: "Dr. Sundaram", specialty: "Orthopedics", date: "2026-03-08", time: "10:30 AM", status: "confirmed", language: "TA", avatar: "KR" },
];

const doctors = [
  { name: "Dr. Sharma", specialty: "Cardiology", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"], available: 4, total: 6 },
  { name: "Dr. Patel", specialty: "Dermatology", slots: ["10:00 AM", "11:30 AM", "3:00 PM"], available: 3, total: 5 },
  { name: "Dr. Sundaram", specialty: "Orthopedics", slots: ["9:30 AM", "1:00 PM", "4:30 PM"], available: 3, total: 4 },
];

const statusConfig = {
  confirmed: { bg: "bg-success/10", text: "text-success", border: "border-success/20", icon: CheckCircle2 },
  pending: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", icon: Clock },
  rescheduled: { bg: "bg-info/10", text: "text-info", border: "border-info/20", icon: RefreshCw },
  cancelled: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20", icon: XCircle },
};

const avatarColors = [
  "from-primary to-accent",
  "from-accent to-info",
  "from-success to-primary",
  "from-warning to-destructive",
];

export function AppointmentDashboard() {
  const [search, setSearch] = useState("");
  const filtered = mockAppointments.filter(
    (a) => a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Bookings", value: mockAppointments.length, change: "+12%", icon: Calendar, color: "text-foreground", iconColor: "text-primary" },
    { label: "Confirmed", value: mockAppointments.filter(a => a.status === "confirmed").length, change: "+8%", icon: CheckCircle2, color: "text-success", iconColor: "text-success" },
    { label: "Pending", value: mockAppointments.filter(a => a.status === "pending").length, change: "-3%", icon: Clock, color: "text-warning", iconColor: "text-warning" },
    { label: "Cancelled", value: mockAppointments.filter(a => a.status === "cancelled").length, change: "-15%", icon: XCircle, color: "text-destructive", iconColor: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-glass glass-strong shadow-soft p-5 group hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-success">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <p className={`text-3xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div className="lg:col-span-2 rounded-2xl border border-glass glass-strong shadow-elevated overflow-hidden">
          <div className="px-6 py-4 border-b border-glass flex items-center justify-between bg-gradient-radial">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <h2 className="text-base font-display font-bold text-foreground">All Appointments</h2>
            </div>
            <div className="relative w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 h-9 text-sm rounded-xl bg-muted/40 border-glass"
              />
            </div>
          </div>
          <div className="divide-y divide-glass">
            {filtered.map((apt, i) => {
              const config = statusConfig[apt.status];
              const Icon = config.icon;
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-sm font-bold text-primary-foreground shadow-sm`}>
                      {apt.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{apt.patient}</p>
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">{apt.language}</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Stethoscope className="w-3 h-3" /> {apt.doctor} · {apt.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{apt.time}</p>
                      <p className="text-[11px] text-muted-foreground">{apt.date}</p>
                    </div>
                    <Badge variant="outline" className={`${config.bg} ${config.text} ${config.border} text-[11px] capitalize gap-1 rounded-lg px-2.5`}>
                      <Icon className="w-3 h-3" />
                      {apt.status}
                    </Badge>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="rounded-2xl border border-glass glass-strong shadow-elevated overflow-hidden">
          <div className="px-6 py-4 border-b border-glass bg-gradient-radial">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" />
              <h2 className="text-base font-display font-bold text-foreground">Doctor Availability</h2>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 font-medium">Tomorrow · Open slots</p>
          </div>
          <div className="divide-y divide-glass">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="px-6 py-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center shadow-sm`}>
                      <Stethoscope className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground">{doc.specialty}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-primary">{doc.available}/{doc.total} slots</span>
                </div>
                {/* Availability bar */}
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${(doc.available / doc.total) * 100}%` }} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {doc.slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-success/8 text-success border border-success/15 hover:bg-success/15 transition-colors cursor-pointer"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
