'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function TestButtonPage() {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Button Functionality Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current State: {isMaximized ? 'Maximized' : 'Normal'}</h2>
        
        <Button
          variant="default"
          size="lg"
          onClick={() => setIsMaximized(!isMaximized)}
          className="mb-4"
        >
          {isMaximized ? <Minimize2 className="mr-2" /> : <Maximize2 className="mr-2" />}
          Toggle Maximize State
        </Button>
        
        <div className={`mt-4 p-4 rounded-lg ${isMaximized ? 'bg-green-100' : 'bg-gray-100'}`}>
          <p>This is a test component to verify the maximize button functionality.</p>
          {isMaximized && (
            <div className="mt-4 p-2 bg-green-200 rounded">
              <p className="font-semibold text-green-800">Maximized!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
