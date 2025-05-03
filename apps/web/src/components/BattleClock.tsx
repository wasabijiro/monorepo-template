"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@workspace/shadcn/lib/utils";

// Define the component props interface
interface BattleClockProps {
	totalSeconds: number;
	challengeSeconds: number;
}

// Helper function to format seconds to HH:MM:SS
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hours, minutes, secs]
    .map(val => val.toString().padStart(2, "0"))
    .join(":");
};

// 7セグメントLED風の数字コンポーネント
const SevenSegmentDisplay = ({
  value,
  isChallenge,
  toggle
}: {
  value: string;
  isChallenge: boolean;
  toggle: boolean
}) => {
  // セグメントの色を決定
  const segmentColor = isChallenge
    ? toggle ? "#ff0066" : "#cc0044"
    : "#14b8a6";

  const shadowColor = isChallenge
    ? "rgba(255, 0, 102, 0.8)"
    : "rgba(20, 184, 166, 0.8)";

  return (
    <div className="flex">
      {value.split("").map((char, i) => (
        <div key={i} className="relative mx-1">
          {char === ":" ? (
            <div className="flex flex-col justify-center items-center h-full">
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{
                  backgroundColor: segmentColor,
                  boxShadow: `0 0 10px ${shadowColor}`
                }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: segmentColor,
                  boxShadow: `0 0 10px ${shadowColor}`
                }}
              />
            </div>
          ) : (
            <div
              className="w-14 h-24 relative"
              style={{
                filter: `drop-shadow(0 0 6px ${shadowColor})`
              }}
            >
              {/* 上部セグメント */}
              <div
                className={`absolute top-0 left-2 right-2 h-2 ${char === "1" || char === "4" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 右上セグメント */}
              <div
                className={`absolute top-1 right-0 w-2 h-10 ${char === "5" || char === "6" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 右下セグメント */}
              <div
                className={`absolute bottom-1 right-0 w-2 h-10 ${char === "2" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 下部セグメント */}
              <div
                className={`absolute bottom-0 left-2 right-2 h-2 ${char === "1" || char === "4" || char === "7" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 左下セグメント */}
              <div
                className={`absolute bottom-1 left-0 w-2 h-10 ${char === "1" || char === "3" || char === "4" || char === "5" || char === "7" || char === "9" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 左上セグメント */}
              <div
                className={`absolute top-1 left-0 w-2 h-10 ${char === "1" || char === "2" || char === "3" || char === "7" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />

              {/* 中央セグメント */}
              <div
                className={`absolute top-11 left-2 right-2 h-2 ${char === "0" || char === "1" || char === "7" ? "opacity-20" : ""}`}
                style={{ backgroundColor: segmentColor }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function BattleClock({
  totalSeconds,
  challengeSeconds,
}: BattleClockProps) {
  // State to track remaining seconds
  const [remaining, setRemaining] = useState(totalSeconds);

  // State to control animation at the end
  const [isComplete, setIsComplete] = useState(false);

  // Toggle for flashing effect in challenge phase
  const [toggle, setToggle] = useState(false);

  // Determine current phase
  const isChallenge = remaining <= challengeSeconds;

  // Calculate progress percentage for the progress bar - タイマーが進むと増加するように変更
  const progressPercentage = useMemo(() => {
    // 経過時間のパーセンテージ (0%→100%に向かって増加)
    return ((totalSeconds - remaining) / totalSeconds) * 100;
  }, [remaining, totalSeconds]);

  // チャレンジフェーズの境界位置を計算
  const challengeBoundaryPercent = useMemo(() => {
    return ((totalSeconds - challengeSeconds) / totalSeconds) * 100;
  }, [totalSeconds, challengeSeconds]);

  // タイマーの終了とリセット処理
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let resetTimer: NodeJS.Timeout;

    if (isComplete) {
      // アニメーションが終わった後に新しいサイクルを開始
      resetTimer = setTimeout(() => {
        setIsComplete(false);
        setRemaining(totalSeconds); // 新しいサイクル開始
      }, 1500);
    } else if (remaining <= 0) {
      // 0秒になったらアニメーション開始
      setIsComplete(true);
    } else {
      // 通常のカウントダウン
      timer = setInterval(() => {
        setRemaining(prev => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(resetTimer);
    };
  }, [remaining, isComplete, totalSeconds]);

  // Effect for the flashing toggle in challenge phase
  useEffect(() => {
    if (!isChallenge) return;

    const flashTimer = setInterval(() => {
      setToggle(prev => !prev);
    }, 500);

    return () => clearInterval(flashTimer);
  }, [isChallenge]);

  // Prepare confetti elements for completion animation
  const confettiElements = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 0.5;
      const randomRotation = Math.random() * 360;

      return (
        <motion.div
          key={index}
          className="absolute text-yellow-500"
          initial={{
            x: "50%",
            y: "50%",
            scale: 0,
            rotate: 0
          }}
          animate={{
            x: `${randomX}%`,
            y: `${randomY}%`,
            scale: [0, 1.5, 0],
            rotate: randomRotation
          }}
          transition={{
            duration: 1,
            delay: randomDelay,
            ease: "easeOut"
          }}
          style={{
            fontSize: `${Math.random() * 2 + 1}rem`
          }}
        >
          ✨
        </motion.div>
      );
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="relative w-[100vw] h-[25vh] flex flex-col justify-center items-center overflow-hidden bg-black"
        animate={isComplete ? {
          backgroundColor: ["rgba(0,0,0,0.9)", "rgba(255,255,255,1)", "rgba(0,0,0,0.9)"],
          opacity: [1, 1, 1] // 変更: 完了時も非表示にしない
        } : {}}
        transition={{ duration: isComplete ? 1 : 0, times: [0, 0.3, 1] }}
      >
        {isComplete && confettiElements}

        <div className="flex justify-center items-center flex-1">
          <SevenSegmentDisplay
            value={formatTime(remaining)}
            isChallenge={isChallenge}
            toggle={toggle}
          />
        </div>

        <div className="w-full px-8 pb-4 relative">
          <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden relative">
            <div
              className="absolute h-full w-1 bg-white opacity-50 z-10"
              style={{ left: `${challengeBoundaryPercent}%` }}
            />

            <motion.div
              className={cn(
                "h-full rounded-full",
                isChallenge ? "bg-red-500" : "bg-teal-500"
              )}
              style={{ width: `${progressPercentage}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
