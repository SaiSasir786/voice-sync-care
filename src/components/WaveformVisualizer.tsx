import { motion } from "framer-motion";
import { useMemo } from "react";

interface WaveformVisualizerProps {
  isActive: boolean;
}

export function WaveformVisualizer({ isActive }: WaveformVisualizerProps) {
  const bars = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);

  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {bars.map((i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${isActive ? "bg-primary" : "bg-border"}`}
          animate={{
            height: isActive
              ? [8, Math.random() * 40 + 8, 8]
              : 8,
          }}
          transition={{
            duration: isActive ? 0.4 + Math.random() * 0.4 : 0.3,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            delay: i * 0.02,
            ease: "easeInOut",
          }}
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  );
}
