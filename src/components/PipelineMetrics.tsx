import { motion } from "framer-motion";
import { Activity, Zap, Clock, ArrowRight, Cpu, Volume2, Mic } from "lucide-react";

const pipelineStages = [
  { name: "Speech-to-Text", icon: Mic, avgMs: 118, color: "text-info", bgColor: "bg-info/10" },
  { name: "Language Detection", icon: Activity, avgMs: 15, color: "text-primary", bgColor: "bg-primary/10" },
  { name: "LLM Reasoning", icon: Cpu, avgMs: 195, color: "text-accent", bgColor: "bg-accent/10" },
  { name: "Tool Execution", icon: Zap, avgMs: 42, color: "text-warning", bgColor: "bg-warning/10" },
  { name: "Text-to-Speech", icon: Volume2, avgMs: 98, color: "text-success", bgColor: "bg-success/10" },
];

const recentRequests = [
  { id: 1, text: "Book appointment tomorrow", lang: "EN", stt: 115, llm: 187, tts: 95, total: 397 },
  { id: 2, text: "मुझे डॉक्टर से मिलना है", lang: "HI", stt: 122, llm: 210, tts: 102, total: 434 },
  { id: 3, text: "நாளை மருத்துவரை பார்க்க", lang: "TA", stt: 130, llm: 198, tts: 110, total: 438 },
  { id: 4, text: "Cancel my 2 PM slot", lang: "EN", stt: 105, llm: 165, tts: 88, total: 358 },
  { id: 5, text: "Reschedule to Friday", lang: "EN", stt: 108, llm: 178, tts: 91, total: 377 },
];

export function PipelineMetrics() {
  const totalAvg = pipelineStages.reduce((sum, s) => sum + s.avgMs, 0);

  return (
    <div className="space-y-6">
      {/* Pipeline overview */}
      <div className="rounded-xl border border-border bg-card shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Pipeline Latency</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Average end-to-end breakdown</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
            totalAvg < 450 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}>
            <Zap className="w-4 h-4" />
            {totalAvg}ms avg
          </div>
        </div>

        {/* Pipeline flow */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {pipelineStages.map((stage, i) => (
            <div key={stage.name} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl ${stage.bgColor} border border-border min-w-[120px]`}
              >
                <stage.icon className={`w-5 h-5 ${stage.color}`} />
                <span className="text-xs font-medium text-foreground text-center">{stage.name}</span>
                <span className={`text-lg font-display font-bold ${stage.color}`}>{stage.avgMs}ms</span>
              </motion.div>
              {i < pipelineStages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Latency bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>0ms</span>
            <span className="text-destructive font-medium">Target: 450ms</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalAvg / 500) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-primary rounded-full"
            />
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-destructive"
              style={{ left: `${(450 / 500) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recent requests table */}
      <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-display font-semibold text-foreground">Recent Requests</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Latency breakdown per request</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Request</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Lang</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">STT</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">LLM</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">TTS</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Total</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentRequests.map((req, i) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-3 text-foreground font-medium">{req.text}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {req.lang}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{req.stt}ms</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{req.llm}ms</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{req.tts}ms</td>
                  <td className="px-4 py-3 text-center font-bold font-display text-foreground">{req.total}ms</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      req.total < 450 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {req.total < 450 ? "✓ Pass" : "✗ Slow"}
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
