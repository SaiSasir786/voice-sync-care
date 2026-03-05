import { motion } from "framer-motion";
import { Activity, Zap, Clock, ArrowRight, Cpu, Volume2, Mic, Globe, CheckCircle2, AlertTriangle, TrendingDown } from "lucide-react";

const pipelineStages = [
  { name: "STT", fullName: "Speech-to-Text", icon: Mic, avgMs: 118, color: "text-info", bgColor: "bg-info/8", borderColor: "border-info/15" },
  { name: "Lang", fullName: "Language Detection", icon: Globe, avgMs: 15, color: "text-primary", bgColor: "bg-primary/8", borderColor: "border-primary/15" },
  { name: "LLM", fullName: "AI Reasoning", icon: Cpu, avgMs: 195, color: "text-accent", bgColor: "bg-accent/8", borderColor: "border-accent/15" },
  { name: "Tools", fullName: "Tool Execution", icon: Zap, avgMs: 42, color: "text-warning", bgColor: "bg-warning/8", borderColor: "border-warning/15" },
  { name: "TTS", fullName: "Text-to-Speech", icon: Volume2, avgMs: 98, color: "text-success", bgColor: "bg-success/8", borderColor: "border-success/15" },
];

const recentRequests = [
  { id: 1, text: "Book appointment tomorrow", lang: "EN", stt: 115, llm: 187, tts: 95, total: 397 },
  { id: 2, text: "मुझे डॉक्टर से मिलना है", lang: "HI", stt: 122, llm: 210, tts: 102, total: 434 },
  { id: 3, text: "நாளை மருத்துவரை பார்க்க", lang: "TA", stt: 130, llm: 198, tts: 110, total: 438 },
  { id: 4, text: "Cancel my 2 PM slot", lang: "EN", stt: 105, llm: 165, tts: 88, total: 358 },
  { id: 5, text: "Reschedule to Friday", lang: "EN", stt: 108, llm: 178, tts: 91, total: 377 },
  { id: 6, text: "Dr. Patel available tomorrow?", lang: "EN", stt: 112, llm: 172, tts: 94, total: 378 },
];

export function PipelineMetrics() {
  const totalAvg = pipelineStages.reduce((sum, s) => sum + s.avgMs, 0);
  const passRate = recentRequests.filter(r => r.total < 450).length / recentRequests.length * 100;

  return (
    <div className="space-y-6">
      {/* Top summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Avg Latency", value: `${totalAvg}ms`, sub: "End-to-end pipeline", icon: Clock, color: totalAvg < 450 ? "text-success" : "text-destructive", bg: totalAvg < 450 ? "bg-success/8" : "bg-destructive/8" },
          { label: "Pass Rate", value: `${passRate.toFixed(0)}%`, sub: "Under 450ms target", icon: CheckCircle2, color: "text-success", bg: "bg-success/8" },
          { label: "Slowest Stage", value: "LLM 195ms", sub: "AI reasoning bottleneck", icon: TrendingDown, color: "text-warning", bg: "bg-warning/8" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-glass glass-strong shadow-soft p-5 group hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className={`text-3xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline flow */}
      <div className="rounded-2xl border border-glass glass-strong shadow-elevated p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h2 className="text-base font-display font-bold text-foreground">Pipeline Breakdown</h2>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
            totalAvg < 450 ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}>
            <Zap className="w-4 h-4" />
            {totalAvg}ms total
          </div>
        </div>

        {/* Visual pipeline */}
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2">
          {pipelineStages.map((stage, i) => {
            const widthPct = (stage.avgMs / totalAvg) * 100;
            return (
              <div key={stage.name} className="flex items-center gap-3 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col items-center gap-3 px-5 py-4 rounded-2xl ${stage.bgColor} border ${stage.borderColor} min-w-[130px] hover:shadow-soft transition-shadow group`}
                >
                  {/* Proportional bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
                    <div className={`h-full bg-gradient-primary opacity-30`} style={{ width: `${widthPct}%` }} />
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stage.bgColor} border ${stage.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stage.icon className={`w-5 h-5 ${stage.color}`} />
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] font-semibold text-muted-foreground block">{stage.fullName}</span>
                    <span className={`text-xl font-display font-bold ${stage.color} block mt-1`}>{stage.avgMs}ms</span>
                  </div>
                </motion.div>
                {i < pipelineStages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-border flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Latency bar */}
        <div className="mt-6 pt-4 border-t border-glass">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="font-medium">0ms</span>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3 text-destructive" />
              <span className="font-bold text-destructive">Target: 450ms</span>
            </div>
          </div>
          <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalAvg / 500) * 100, 100)}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-primary rounded-full"
            />
            <div className="absolute top-0 bottom-0 w-0.5 bg-destructive/60" style={{ left: `${(450 / 500) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {pipelineStages.map(stage => (
              <div key={stage.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${stage.bgColor} border ${stage.borderColor}`} />
                {stage.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent requests */}
      <div className="rounded-2xl border border-glass glass-strong shadow-elevated overflow-hidden">
        <div className="px-6 py-4 border-b border-glass bg-gradient-radial">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="text-base font-display font-bold text-foreground">Request Log</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 font-medium">Per-request latency breakdown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass bg-muted/20">
                {["Request", "Lang", "STT", "LLM", "TTS", "Total", "Status"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass">
              {recentRequests.map((req, i) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-muted/10 transition-colors group"
                >
                  <td className="px-5 py-3.5 text-foreground font-medium">{req.text}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">{req.lang}</span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">{req.stt}ms</td>
                  <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">{req.llm}ms</td>
                  <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">{req.tts}ms</td>
                  <td className="px-5 py-3.5 font-bold font-display text-foreground">{req.total}ms</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      req.total < 450 ? "bg-success/10 text-success border border-success/15" : "bg-destructive/10 text-destructive border border-destructive/15"
                    }`}>
                      {req.total < 450 ? <><CheckCircle2 className="w-3 h-3" /> Pass</> : <><AlertTriangle className="w-3 h-3" /> Slow</>}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
