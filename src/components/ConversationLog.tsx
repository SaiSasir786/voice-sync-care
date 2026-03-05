import { motion } from "framer-motion";
import { Mic, Volume2, Bot } from "lucide-react";

const mockMessages = [
  { role: "user" as const, text: "मुझे कल डॉक्टर से मिलना है", lang: "hi", time: "10:32 AM" },
  { role: "agent" as const, text: "कौन से डॉक्टर से मिलना चाहेंगे? Dr. Sharma या Dr. Patel?", lang: "hi", time: "10:32 AM" },
  { role: "user" as const, text: "Dr. Sharma, 10 बजे", lang: "hi", time: "10:33 AM" },
  { role: "agent" as const, text: "Dr. Sharma कल 10:00 AM को उपलब्ध हैं। क्या मैं अपॉइंटमेंट बुक करूं?", lang: "hi", time: "10:33 AM" },
  { role: "user" as const, text: "हाँ, बुक कर दीजिए", lang: "hi", time: "10:33 AM" },
  { role: "agent" as const, text: "✅ आपकी अपॉइंटमेंट Dr. Sharma के साथ कल 10:00 AM को बुक हो गई है।", lang: "hi", time: "10:33 AM" },
];

export function ConversationLog() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-md h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-display font-semibold text-foreground">Conversation Log</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Recent voice interactions</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mockMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`flex gap-2 ${msg.role === "agent" ? "justify-start" : "justify-end"}`}
          >
            {msg.role === "agent" && (
              <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                msg.role === "agent"
                  ? "bg-primary/5 border border-primary/10 rounded-tl-none text-foreground"
                  : "bg-accent/10 border border-accent/10 rounded-tr-none text-foreground"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-muted-foreground mt-1 block">{msg.time}</span>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Mic className="w-3.5 h-3.5 text-accent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
