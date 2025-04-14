'use client';

import { cn } from '@/lib/utils';
import { ChartArea, Mail, PencilLineIcon, Sparkles } from 'lucide-react';
import React from 'react';

interface NotebookV2Props {
  className?: string;
  children?: React.ReactNode;
  icon?: 'settings' | 'save' | 'plus' | 'mail' | null;
}

export default function NotebookV2({ className, children, icon = null }: NotebookV2Props) {
  const getIcon = () => {
    if (!icon) return null;
    
    switch (icon) {
      case 'settings':
        return <ChartArea size={18} className="text-gray-700" />;
      case 'save':
        return <PencilLineIcon size={18} className="text-gray-700" />;
      case 'plus':
        return <Sparkles size={18} className="text-gray-700" />;
      case 'mail':
        return <Mail size={18} className="text-gray-700" />;
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={cn("flex flex-col items-center justify-center w-full", className)}
    >
      <div className="w-full max-w-4xl mx-auto relative transform transition-transform duration-1000 border-l-[30px] border-border" 
        style={{
          borderImageSource: "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI0MS44NnB4IiBoZWlnaHQ9IjUyLjMyNnB4IiB2aWV3Qm94PSIwIDAgNDEuODYgNTIuMzI2IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0MS44NiA1Mi4zMjYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0wLDB2MjBoNDEuODZ2LTIwSDB6IE0wLDIwdjE1LjE2M2g3LjA5N2MwLjUwMS00Ljk4OSw0LjcxMi04Ljg4NCw5LjgzMy04Ljg4NGM1LjQ1OCwwLDkuODg0LDQuNDI1LDkuODg0LDkuODg0cy00LjQyNSw5Ljg4NC05Ljg4NCw5Ljg4NGMtNS4xMjEsMC05LjMzMi0zLjg5NS05LjgzMy04Ljg4NEgwdjE3LjE2M2g0MS44NlYyMEgweiIvPjwvc3ZnPg==')",
          borderImageSlice: "5% 0% 5% 100%",
          borderImageWidth: "0px 0px 0px 30px",
          borderImageRepeat: "repeat",
        }}>
        <div className="relative m-0 p-8 border-none rounded-r-xl text-2xl"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 0) 0 20px / 100% 40px white "
          }}>
          
          {/* Icon in top-right corner (if provided) */}
          {icon && (
            <div className="absolute top-3 right-3 z-10">
              <div className="p-2 rounded-full bg-background bg-opacity-70 hover:bg-opacity-100 transition-all shadow-inner">
                {getIcon()}
              </div>
            </div>
          )}
          
          {/* Red line on the left */}
          <div className="absolute top-0 left-12 h-full w-[1px] border-l border-pink-300 border-dashed"></div>
          
          {children || (
            <>
              {/* Empty notebook page */}
              <div className="h-full w-full"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
