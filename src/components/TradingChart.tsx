"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'dark' | 'light';
  height?: string | number;
  timeframe?: string;
}

export default function TradingChart({
  symbol = "FX:EURUSD",
  interval = "D",
  theme = "dark",
  height = "700px",
  timeframe = "D"
}: TradingChartProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Log state and button info
  useEffect(() => {
    console.log('TradingChart isMaximized:', isMaximized);
    if (buttonRef.current) {
      console.log('Button element:', buttonRef.current);
      console.log('Button offsetTop:', buttonRef.current.offsetTop);
      console.log('Button offsetLeft:', buttonRef.current.offsetLeft);
    }
  }, [isMaximized]);

  // Convert height to string if it's a number
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create a unique ID for the chart container
    const containerId = `tradingview_chart_${Math.random().toString(36).substr(2, 9)}`;
    chartContainerRef.current.id = containerId;

    // Load TradingView widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "${interval}",
        "timezone": "Etc/UTC",
        "theme": "${theme}",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "${containerId}"
      }
    `;

    chartContainerRef.current.appendChild(script);

    return () => {
      // Cleanup script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, interval, theme]);

  return (
    <div className={cn(
      "flex flex-col border rounded-lg overflow-hidden transition-all duration-300 h-full",
      theme === 'dark' 
        ? 'bg-zinc-900 border-white/10 text-white' 
        : 'bg-white border-gray-200 text-gray-900',
      isMaximized && 'fixed inset-0 z-50 m-0 rounded-none'
    )}>
      {/* Header with maximize button */}
      <div className={cn(
        "flex items-center justify-between p-3 border-b",
        theme === 'dark' ? 'bg-zinc-950 border-white/5' : 'bg-gray-50 border-gray-200'
      )} style={{ position: 'relative', zIndex: 100 }}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={cn(
            "text-xs font-medium",
            theme === 'dark' ? 'text-foreground/70' : 'text-gray-600'
          )}>
            Trading Chart
          </span>
          
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium",
            theme === 'dark' 
              ? 'text-green-400 bg-opacity-10 bg-white' 
              : 'bg-gray-200 text-gray-700'
          )}>
            <span>📈</span>
            <span>{symbol}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 w-8 p-0",
              theme === 'dark' 
                ? 'text-foreground/50 hover:text-neon-green' 
                : 'text-gray-500 hover:text-gray-900'
            )}
            onClick={() => {
              console.log('Maximize button clicked');
              setIsMaximized(!isMaximized);
            }}
            style={{ 
              pointerEvents: 'auto',
              zIndex: 9999
            }}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* TradingView Chart */}
      <div 
        ref={chartContainerRef}
        className="flex-1 relative" 
        style={{ 
          height: isMaximized ? 'calc(100vh - 100px)' : (heightStyle === "100%" ? '100%' : heightStyle), 
          zIndex: 1
        }}
      />
    </div>
  );
}