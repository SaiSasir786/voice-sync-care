import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, Globe, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaveformVisualizer } from "./WaveformVisualizer";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
];

export function VoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [detectedLang, setDetectedLang] = useState("en");
  const [transcript, setTranscript] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [latency, setLatency] = useState<number | null>(null);

  const simulateConversation = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("");
      setAgentResponse("");
      setLatency(null);

      // Simulate STT
      setTimeout(() => {
        setTranscript("Book an appointment with Dr. Sharma tomorrow at 10 AM");
        setDetectedLang("en");

        // Simulate LLM + TTS
        setTimeout(() => {
          setAgentResponse(
            "I've found Dr. Sharma available tomorrow at 10:00 AM. Shall I confirm the appointment?"
          );
          setLatency(387);
          setIsListening(false);
        }, 800);
      }, 1200);
    } else {
      setIsListening(false);
    }
  }, [isListening]);

  const toggleCall = () => {
    setIsInCall(!isInCall);
    if (isInCall) {
      setIsListening(false);
      setTranscript("");
      setAgentResponse("");
      setLatency(null);
    }
  };

  const currentLang = languages.find((l) => l.code === detectedLang)!;

  return (
    <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-display font-semibold text-foreground">Voice Console</h2>
          {isInCall && (
            <Badge variant="outline" className="border-success/40 text-success bg-success/5 text-xs">
              Live Session
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
            <Globe className="w-3.5 h-3.5" />
            {currentLang.flag} {currentLang.label}
          </div>
          {latency !== null && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              latency < 450 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}>
              ⚡ {latency}ms
            </div>
          )}
        </div>
      </div>

      {/* Waveform area */}
      <div className="relative flex flex-col items-center justify-center py-12 px-6 min-h-[320px]">
        {/* Pulse rings */}
        <AnimatePresence>
          {isListening && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-40 h-40 rounded-full border-2 border-primary/30"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute w-40 h-40 rounded-full border-2 border-primary/20"
              />
            </>
          )}
        </AnimatePresence>

        {/* Main mic button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={simulateConversation}
          disabled={!isInCall}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? "bg-gradient-primary shadow-glow"
              : isInCall
              ? "bg-primary/10 border-2 border-primary/30 hover:bg-primary/20"
              : "bg-muted border-2 border-border cursor-not-allowed"
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-primary-foreground" />
          ) : (
            <Mic className={`w-8 h-8 ${isInCall ? "text-primary" : "text-muted-foreground"}`} />
          )}
        </motion.button>

        {/* Waveform */}
        <div className="mt-8 w-full max-w-md">
          <WaveformVisualizer isActive={isListening} />
        </div>

        {/* Status text */}
        <p className="mt-4 text-sm text-muted-foreground">
          {!isInCall
            ? "Start a call to begin voice interaction"
            : isListening
            ? "Listening..."
            : "Tap microphone to speak"}
        </p>
      </div>

      {/* Transcript & Response */}
      <div className="border-t border-border px-6 py-4 space-y-3">
        {transcript && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Mic className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-muted rounded-lg rounded-tl-none px-4 py-2.5 text-sm text-foreground">
              {transcript}
            </div>
          </motion.div>
        )}
        {agentResponse && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 justify-end"
          >
            <div className="bg-primary/10 rounded-lg rounded-tr-none px-4 py-2.5 text-sm text-foreground">
              {agentResponse}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-4 h-4 text-primary-foreground" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Call controls */}
      <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-border bg-muted/30">
        <Button
          onClick={toggleCall}
          size="lg"
          className={`rounded-full px-8 font-display font-semibold ${
            isInCall
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              : "bg-gradient-primary hover:opacity-90 text-primary-foreground"
          }`}
        >
          {isInCall ? (
            <>
              <PhoneOff className="w-5 h-5 mr-2" /> End Call
            </>
          ) : (
            <>
              <Phone className="w-5 h-5 mr-2" /> Start Call
            </>
          )}
        </Button>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-card rounded-lg border border-border p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setDetectedLang(lang.code)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                detectedLang === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
