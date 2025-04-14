// "use client";

// import React, { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";

// interface ContinuousWaveVisualizerProps {
//   visualizerBars?: number;
//   className?: string;
// }

// /**
//  * A simple, continuous wave visualizer that animates on its own.
//  * No start/stop logic—bars just move indefinitely after mounting.
//  */
// export function Listening({
//   visualizerBars = 48,
//   className
// }: ContinuousWaveVisualizerProps) {
//   // Each element of waveHeights is a % value for how tall each bar should be
//   const [waveHeights, setWaveHeights] = useState<number[]>(
//     // Start all bars at a minimal height (e.g. 5%)
//     () => Array.from({ length: visualizerBars }, () => 5)
//   );

//   useEffect(() => {
//     // Update the waveform periodically
//     const intervalTime = 200; // ms
//     const waveInterval = setInterval(() => {
//       setWaveHeights(
//         Array.from({ length: visualizerBars }, () => {
//           // For example, random heights in [5..95]%
//           const min = 5;
//           const max = 95;
//           return Math.floor(Math.random() * (max - min + 1)) + min;
//         })
//       );
//     }, intervalTime);

//     return () => clearInterval(waveInterval);
//   }, [visualizerBars]);

//   return (
//     <div className={cn("flex items-end gap-0.5 w-64 h-4", className)}>
//       {waveHeights.map((height, i) => (
//         <div
//           key={i}
//           className="w-0.5 rounded-full bg-white/60 dark:bg-white/60 transition-all duration-200 ease-out"
//           style={{
//             height: `${height}%`
//           }}
//         />
//       ))}
//     </div>
//   );
// }
