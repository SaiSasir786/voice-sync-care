import { motion } from "framer-motion";
import { useMemo } from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
}

export function WaveformVisualizer({ isActive }: WaveformVisualizerProps) {
  const bars = useMemo(() => Array.from({ length: 48 }, (_, i) => ({
    i,
    maxH: 8 + Math.sin(i * 0.3) * 20 + Math.random() * 20,
    delay: i * 0.015,
    duration: 0.3 + Math.random() * 0.5,
  })), []);

  return (
    <div className="flex items-center justify-center gap-[2px] h-14">
      {bars.map((bar) => {
        const distFromCenter = Math.abs(bar.i - 24) / 24;
        const heightScale = 1 - distFromCenter * 0.6;
        return (
          <motion.div
            key={bar.i}
            className={`rounded-full transition-colors duration-500 ${
              isActive
                ? "bg-gradient-primary"
                : "bg-border"
            }`}
            style={{ width: 3, background: isActive ? `linear-gradient(to top, hsl(174, 62%, 40%), hsl(220, 70%, 55%))` : undefined }}
            animate={{
              height: isActive
                ? [6, bar.maxH * heightScale, 6]
                : 4,
              opacity: isActive ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{
              duration: isActive ? bar.duration : 0.4,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              delay: bar.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
