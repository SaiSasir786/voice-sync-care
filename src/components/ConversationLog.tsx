import { motion } from "framer-motion";
import { Mic, Bot, MessageSquare } from "lucide-react";

const mockMessages = [
  { role: "system" as const, text: "Session started · Language auto-detect enabled", time: "10:30 AM" },
  { role: "user" as const, text: "मुझे कल डॉक्टर से मिलना है", lang: "Hindi", time: "10:32 AM" },
  { role: "agent" as const, text: "कौन से डॉक्टर से मिलना चाहेंगे? Dr. Sharma या Dr. Patel उपलब्ध हैं।", lang: "Hindi", time: "10:32 AM" },
  { role: "user" as const, text: "Dr. Sharma, 10 बजे", lang: "Hindi", time: "10:33 AM" },
  { role: "agent" as const, text: "Dr. Sharma कल 10:00 AM को उपलब्ध हैं। क्या मैं अपॉइंटमेंट बुक करूं?", lang: "Hindi", time: "10:33 AM" },
  { role: "user" as const, text: "हाँ, बुक कर दीजिए", lang: "Hindi", time: "10:33 AM" },
  { role: "agent" as const, text: "✅ आपकी अपॉइंटमेंट Dr. Sharma के साथ कल 10:00 AM को बुक हो गई है।", lang: "Hindi", time: "10:33 AM" },
];

export function ConversationLog() {
  return (
    <div className="rounded-2xl border border-glass glass-strong shadow-elevated h-full flex flex-col">
      <div className="px-6 py-4 border-b border-glass bg-gradient-radial">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h2 className="text-base font-display font-bold text-foreground">Conversation Log</h2>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1 font-medium">Session #2847 · Multi-language</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-h-[520px]">
        {mockMessages.map((msg, i) => {
          if (msg.role === "system") {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="flex justify-center"
              >
                <span className="text-[10px] text-muted-foreground bg-muted/60 px-3 py-1 rounded-full font-medium">
                  {msg.text}
                </span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex gap-2.5 ${msg.role === "agent" ? "justify-start" : "justify-end"}`}
            >
              {msg.role === "agent" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-glow-sm">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
              <div className="max-w-[85%]">
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "agent"
                      ? "bg-card border border-glass rounded-tl-md shadow-soft text-foreground"
                      : "bg-accent/10 border border-accent/15 rounded-tr-md text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {msg.lang && (
                    <span className="text-[10px] text-primary/60 font-medium">{msg.lang}</span>
                  )}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mic className="w-3.5 h-3.5 text-accent" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Memory summary */}
      <div className="px-4 py-3 border-t border-glass bg-muted/20">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Patient Memory</p>
        <div className="flex flex-wrap gap-1.5">
          {["Hindi preferred", "Dr. Sharma", "Apollo Hospital", "3 past visits"].map(tag => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-primary/5 text-primary border border-primary/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
