import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CinematicTextIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 頂部細橫線：frame 10-30 scaleX 0→1
  const topLineScale = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 第一行小字：frame 30-55 opacity 0→1
  const line1Opacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 第二行大字：frame 60-90 opacity 0→1 + translateY 10→0（用 spring）
  const line2Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 22, stiffness: 70 },
  });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(line2Spring, [0, 1], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 第三行小字：frame 100-125 opacity 0→1
  const line3Opacity = interpolate(frame, [100, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 底部細橫線：frame 130-150 scaleX 0→1
  const bottomLineScale = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 頂部細橫線 */}
      <div
        style={{
          width: 160,
          height: 1,
          background: "#ffffff",
          transform: `scaleX(${topLineScale})`,
          transformOrigin: "center",
          marginBottom: 28,
        }}
      />

      {/* 第一行小字 */}
      <div
        style={{
          opacity: line1Opacity,
          fontSize: 18,
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontWeight: 400,
          letterSpacing: "8px",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        UPTec STUDIO PRESENTS
      </div>

      {/* 第二行大字 */}
      <div
        style={{
          opacity: line2Opacity,
          transform: `translateY(${line2Y}px)`,
          fontSize: 72,
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontWeight: 300,
          lineHeight: 1.15,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        故事從此開始
      </div>

      {/* 第三行小字 */}
      <div
        style={{
          opacity: line3Opacity,
          fontSize: 18,
          color: "#aaaaaa",
          fontFamily: "sans-serif",
          fontWeight: 400,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        敬請期待
      </div>

      {/* 底部細橫線 */}
      <div
        style={{
          width: 160,
          height: 1,
          background: "#ffffff",
          transform: `scaleX(${bottomLineScale})`,
          transformOrigin: "center",
        }}
      />
    </AbsoluteFill>
  );
};