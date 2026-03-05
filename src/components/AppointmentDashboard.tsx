import { motion } from "framer-motion";
import { Calendar, Clock, User, Stethoscope, CheckCircle2, XCircle, RefreshCw, Search } from "lucide-react";
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
}

const mockAppointments: Appointment[] = [
  { id: "APT-001", patient: "Rahul Verma", doctor: "Dr. Sharma", specialty: "Cardiology", date: "2026-03-06", time: "10:00 AM", status: "confirmed", language: "Hindi" },
  { id: "APT-002", patient: "Priya Kumar", doctor: "Dr. Patel", specialty: "Dermatology", date: "2026-03-06", time: "11:30 AM", status: "pending", language: "English" },
  { id: "APT-003", patient: "Anand Raj", doctor: "Dr. Sundaram", specialty: "Orthopedics", date: "2026-03-06", time: "2:00 PM", status: "rescheduled", language: "Tamil" },
  { id: "APT-004", patient: "Meera Singh", doctor: "Dr. Sharma", specialty: "Cardiology", date: "2026-03-07", time: "9:00 AM", status: "confirmed", language: "Hindi" },
  { id: "APT-005", patient: "John Doe", doctor: "Dr. Patel", specialty: "Dermatology", date: "2026-03-07", time: "3:00 PM", status: "cancelled", language: "English" },
  { id: "APT-006", patient: "Kavitha Rajan", doctor: "Dr. Sundaram", specialty: "Orthopedics", date: "2026-03-08", time: "10:30 AM", status: "confirmed", language: "Tamil" },
];

const doctors = [
  { name: "Dr. Sharma", specialty: "Cardiology", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM"] },
  { name: "Dr. Patel", specialty: "Dermatology", slots: ["10:00 AM", "11:30 AM", "3:00 PM"] },
  { name: "Dr. Sundaram", specialty: "Orthopedics", slots: ["9:30 AM", "1:00 PM", "4:30 PM"] },
];

const statusStyles: Record<Appointment["status"], string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  rescheduled: "bg-info/10 text-info border-info/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusIcons: Record<Appointment["status"], typeof CheckCircle2> = {
  confirmed: CheckCircle2,
  pending: Clock,
  rescheduled: RefreshCw,
  cancelled: XCircle,
};

export function AppointmentDashboard() {
  const [search, setSearch] = useState("");
  const filtered = mockAppointments.filter(
    (a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: mockAppointments.length,
    confirmed: mockAppointments.filter((a) => a.status === "confirmed").length,
    pending: mockAppointments.filter((a) => a.status === "pending").length,
    cancelled: mockAppointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-foreground" },
          { label: "Confirmed", value: stats.confirmed, color: "text-success" },
          { label: "Pending", value: stats.pending, color: "text-warning" },
          { label: "Cancelled", value: stats.cancelled, color: "text-destructive" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card shadow-sm p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-3xl font-display font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-foreground">Appointments</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients or doctors..."
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((apt, i) => {
              const StatusIcon = statusIcons[apt.status];
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Stethoscope className="w-3 h-3" /> {apt.doctor} · {apt.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm font-medium text-foreground">{apt.date}</p>
                      <p className="text-xs text-muted-foreground">{apt.time}</p>
                    </div>
                    <Badge variant="outline" className={`${statusStyles[apt.status]} text-xs capitalize gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {apt.status}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-display font-semibold text-foreground">Doctor Availability</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Tomorrow's open slots</p>
          </div>
          <div className="divide-y divide-border">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="px-6 py-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {doc.slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20"
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
