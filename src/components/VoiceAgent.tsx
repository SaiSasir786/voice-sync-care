import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, PhoneOff, Globe, Volume2, Waves, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaveformVisualizer } from "./WaveformVisualizer";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
];

const pipelineSteps = ["Listening", "Processing STT", "Detecting Language", "AI Reasoning", "Generating Speech"];

export function VoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [detectedLang, setDetectedLang] = useState("en");
  const [transcript, setTranscript] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [latency, setLatency] = useState<number | null>(null);
  const [pipelineStep, setPipelineStep] = useState(-1);
  const [callDuration, setCallDuration] = useState(0);

  // Call timer
  useEffect(() => {
    if (!isInCall) { setCallDuration(0); return; }
    const interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, [isInCall]);

  const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const simulateConversation = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("");
      setAgentResponse("");
      setLatency(null);
      setPipelineStep(0);

      setTimeout(() => {
        setPipelineStep(1);
        setTimeout(() => {
          setPipelineStep(2);
          setTranscript("Book an appointment with Dr. Sharma tomorrow at 10 AM");
          setDetectedLang("en");
          setTimeout(() => {
            setPipelineStep(3);
            setTimeout(() => {
              setPipelineStep(4);
              setAgentResponse(
                "I've found Dr. Sharma available tomorrow at 10:00 AM. Shall I confirm the appointment for you?"
              );
              setLatency(387);
              setIsListening(false);
              setTimeout(() => setPipelineStep(-1), 2000);
            }, 300);
          }, 400);
        }, 300);
      }, 800);
    } else {
      setIsListening(false);
      setPipelineStep(-1);
    }
  }, [isListening]);

  const toggleCall = () => {
    setIsInCall(!isInCall);
    if (isInCall) {
      setIsListening(false);
      setTranscript("");
      setAgentResponse("");
      setLatency(null);
      setPipelineStep(-1);
    }
  };

  const currentLang = languages.find((l) => l.code === detectedLang)!;

  return (
    <div className="rounded-2xl border border-glass glass-strong shadow-elevated overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-glass bg-gradient-radial">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary" />
            <h2 className="text-base font-display font-bold text-foreground">Voice Console</h2>
          </div>
          {isInCall && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-success/30 text-success bg-success/5 text-[11px] font-semibold gap-1.5 px-2.5 py-0.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live · {formatDuration(callDuration)}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 border border-glass text-xs font-semibold text-muted-foreground">
            <Globe className="w-3.5 h-3.5 text-primary" />
            {currentLang.flag} {currentLang.label}
          </div>
          {latency !== null && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                latency < 450 ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              ⚡ {latency}ms
            </motion.div>
          )}
        </div>
      </div>

      {/* Main voice area */}
      <div className="relative flex flex-col items-center justify-center py-16 px-6 min-h-[380px] bg-gradient-radial">
        {/* Orbiting dots when listening */}
        <AnimatePresence>
          {isListening && (
            <>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`ring-${i}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1 + i * 0.3, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute w-32 h-32 rounded-full border border-primary/20"
                />
              ))}
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                  style={{
                    transformOrigin: "0 0",
                    left: "50%",
                    top: "50%",
                    marginLeft: `${40 + i * 20}px`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Mic button */}
        <motion.button
          whileHover={{ scale: isInCall ? 1.06 : 1 }}
          whileTap={{ scale: isInCall ? 0.94 : 1 }}
          onClick={simulateConversation}
          disabled={!isInCall}
          className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
            isListening
              ? "bg-gradient-primary shadow-glow"
              : isInCall
              ? "bg-card border-2 border-primary/30 hover:border-primary/60 shadow-elevated hover:shadow-glow-sm"
              : "bg-muted border-2 border-border cursor-not-allowed opacity-50"
          }`}
        >
          {isListening ? (
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Waves className="w-9 h-9 text-primary-foreground" />
            </motion.div>
          ) : (
            <Mic className={`w-9 h-9 ${isInCall ? "text-primary" : "text-muted-foreground"}`} />
          )}
        </motion.button>

        {/* Waveform */}
        <div className="mt-10 w-full max-w-lg">
          <WaveformVisualizer isActive={isListening} />
        </div>

        {/* Pipeline indicator */}
        <div className="mt-6 flex items-center gap-1">
          {pipelineSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <motion.div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= pipelineStep
                    ? "bg-primary w-8"
                    : "bg-border w-4"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground font-medium">
          {pipelineStep >= 0 ? pipelineSteps[pipelineStep] + "..." : !isInCall ? "Start a call to begin" : "Tap microphone to speak"}
        </p>
      </div>

      {/* Transcript & Response */}
      <AnimatePresence>
        {(transcript || agentResponse) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-glass px-6 py-5 space-y-4 bg-muted/20"
          >
            {transcript && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-medium mb-1">Patient · {currentLang.label}</p>
                  <div className="bg-card border border-glass rounded-2xl rounded-tl-md px-4 py-3 text-sm text-foreground shadow-soft">
                    {transcript}
                  </div>
                </div>
              </motion.div>
            )}
            {agentResponse && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-3 justify-end"
              >
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground font-medium mb-1">AI Agent · {latency}ms</p>
                  <div className="bg-gradient-primary/5 border border-primary/10 rounded-2xl rounded-tr-md px-4 py-3 text-sm text-foreground shadow-soft">
                    {agentResponse}
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                  <Volume2 className="w-4 h-4 text-primary-foreground" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 px-6 py-5 border-t border-glass bg-card/50">
        <Button
          onClick={toggleCall}
          size="lg"
          className={`rounded-2xl px-10 py-6 font-display font-bold text-base transition-all duration-300 ${
            isInCall
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
              : "bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow-sm hover:shadow-glow"
          }`}
        >
          {isInCall ? (
            <><PhoneOff className="w-5 h-5 mr-2.5" /> End Call</>
          ) : (
            <><Phone className="w-5 h-5 mr-2.5" /> Start Call</>
          )}
        </Button>

        <div className="flex items-center gap-0.5 glass rounded-xl border border-glass p-1 shadow-soft">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setDetectedLang(lang.code)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                detectedLang === lang.code
                  ? "bg-gradient-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
