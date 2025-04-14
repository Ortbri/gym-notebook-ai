"use client";

import { CheckCircle2, Dumbbell, Keyboard, Mic } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function NotebookContent() {
  const [micActive, setMicActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);

  // Automatically run the animation sequence on component mount
  useEffect(() => {
    // Start the mic pulse animation
    setTimeout(() => {
      setMicActive(true);
    }, 500);
    
    // Show user message and turn off mic
    setTimeout(() => {
      setShowMessage(true);
      setMicActive(false);
    }, 2000);
    
    // Show workout log after message appears
    setTimeout(() => {
      setShowWorkout(true);
    }, 3500);
    
    // No reset - content remains visible
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="z-10 top-0 left-0">
        <div className="relative h-[560px] w-[280px] sm:h-[640px] sm:w-[320px] md:h-[720px] md:w-[360px] lg:h-[800px] lg:w-[400px] flex items-center justify-center">
          <Image
            src="/iphone.png"
            alt="gym"
            fill
            className="z-10 object-contain"
          />
          <div className="absolute top-10 inset-0 flex flex-col items-start justify-between p-8 text-black font-medium">
            <div className="w-full space-y-4">
              <p className="font-medium">Today&apos;s Workout</p>
              {/* user message */}
              <div className="space-y-4">
                {/* User message (sent) */}
                {showMessage && (
                  <div className="flex w-full justify-end animate-[fadeSlideIn_0.5s_ease-in-out]">
                    <div className="relative max-w-[80%]">
                      <div className="rounded-[18px] py-2 px-4 bg-foreground text-black">
                        <p className="text-sm text-white">
                          I just did 185 x 5 for bench press on first set
                        </p>
                      </div>
                      {/* Triangle for the chat bubble */}
                      <div
                        className="absolute bottom-0 right-[-8px] h-[20px] w-[20px] bg-foreground"
                        style={{
                          borderBottomLeftRadius: '13px 14px',
                        }}
                      />
                      {/* Overlay to create the cutout effect */}
                      <div
                        className="absolute bottom-0 right-[-26px] h-[20px] w-[26px] bg-white"
                        style={{
                          borderBottomLeftRadius: '14px',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* AI message (received) */}
                {/* <div className="flex w-full justify-start">
                  <div className="relative max-w-[80%]">
                    <div className="rounded-[18px] py-2 px-4 bg-gray-200 text-black">
                      <p className="text-sm">
                        Great job! Would you like me to log that for your workout?
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 left-[-8px] h-[20px] w-[20px] bg-gray-200"
                      style={{
                        borderBottomRightRadius: '16px 14px',
                      }}
                    />

                    <div
                      className="absolute bottom-0 left-[-26px] h-[20px] w-[26px] bg-white"
                      style={{
                        borderBottomRightRadius: '10px',
                      }}
                    />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="w-full gap-2 flex flex-col">
              {/* workout log */}
              {showWorkout && (
                <div className="bg-white w-full animate-[slideUp_0.5s_ease-in-out]">
                  <div className="flex w-full">
                    <div className="bg-white border w-full border-gray-200 py-4 px-4 rounded-xl">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Dumbbell className="w-4 h-4 text-foreground" />
                          <p className="text-sm font-bold">Bench Press</p>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2">
                          <p className="text-xs">Set 1: 185 lbs × 5 reps</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <p>Saved to today&apos;s workout</p>
                      
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* bottom bar */}
              <div className="flex items-center justify-between gap-2 flex-row z-10">
                <div 
                  className={`p-3 border border-gray-200 rounded-full flex items-center justify-center transition-all duration-300 ${micActive ? 'bg-foreground ' : 'bg-white'}`}
                >
                  <Mic className={`w-5 h-5 transition-colors ${micActive ? 'text-white' : 'text-black'}`} />
                </div>
                <div className="p-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <Keyboard className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotebookContent;
