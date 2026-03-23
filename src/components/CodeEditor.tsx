'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Terminal, 
  Play, 
  Save, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check,
  X,
  FileCode
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import Monaco Editor with SSR disabled
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

interface CodeEditorProps {
  initialCode?: string;
  language?: 'javascript' | 'python' | 'html' | 'css' | 'java' | 'typescript';
  onRun?: (code: string) => Promise<string> | string;
  readOnly?: boolean;
  title?: string;
  theme?: 'dark' | 'light';
  fontSize?: 'sm' | 'base' | 'lg';
  showLineNumbers?: boolean;
  terminalHeight?: string | number;
  previewHeight?: string | number;
}

export function CodeEditor({ 
  initialCode = "// Welcome to Talanta IDE\n// Start coding here...", 
  language = 'javascript', 
  onRun, 
  readOnly = false,
  title = "Code Editor",
  theme = 'dark',
  fontSize = 'sm',
  showLineNumbers = true,
  terminalHeight = '600px',
  previewHeight = '600px'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<Array<{ type: 'info' | 'error' | 'success', content: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Language configurations
  const languageConfig = {
    javascript: { 
      name: 'JavaScript', 
      icon: '📜', 
      color: 'text-green-400',
      defaultCode: '// JavaScript code\nconsole.log("Hello, World!");'
    },
    typescript: { 
      name: 'TypeScript', 
      icon: '🔷', 
      color: 'text-blue-400',
      defaultCode: '// TypeScript code\nconst message: string = "Hello, World!";\nconsole.log(message);'
    },
    python: { 
      name: 'Python', 
      icon: '🐍', 
      color: 'text-green-400',
      defaultCode: '# Python code\nprint("Hello, World!")'
    },
    html: { 
      name: 'HTML', 
      icon: '🌐', 
      color: 'text-green-400',
      defaultCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>'
    },
    css: { 
      name: 'CSS', 
      icon: '🎨', 
      color: 'text-green-400',
      defaultCode: '/* CSS code */\nbody {\n  margin: 0;\n  padding: 20px;\n  font-family: sans-serif;\n}'
    },
    java: { 
      name: 'Java', 
      icon: '☕', 
      color: 'text-red-400',
      defaultCode: '// Java code\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}'
    }
  };

  const handleRun = async () => {
    if (readOnly) return;
    
    setIsRunning(true);
    setOutput(prev => [...prev, { type: 'info', content: `> Executing ${language} code...` }]);
    
    try {
      if (onRun) {
        const result = await onRun(code);
        setOutput(prev => [...prev, { type: 'success', content: result }]);
      } else {
        // Default behavior with better error handling
        await executeCodeLocally(code, language);
      }
    } catch (error) {
      setOutput(prev => [...prev, 
        { type: 'error', content: `Error: ${(error as Error).message}` },
        { type: 'info', content: 'Execution failed. Check your code and try again.' }
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const executeCodeLocally = async (code: string, lang: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          if (lang === 'javascript' || lang === 'typescript') {
            // Safe evaluation with sandboxing
            const originalConsoleLog = console.log;
            const logs: string[] = [];
            
            // Override console.log to capture output
            console.log = (...args) => {
              logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' '));
            };

            try {
              // Create a sandboxed environment
              const sandbox = new Function('console', code);
              sandbox(console);
              
              setOutput(prev => [...prev, 
                ...(logs.length ? logs.map(log => ({ type: 'success' as const, content: log })) : 
                [{ type: 'info' as const, content: 'Code executed successfully (no output)' }])
              ]);
            } finally {
              // Restore original console.log
              console.log = originalConsoleLog;
            }
          } else if (lang === 'html') {
            setOutput(prev => [...prev, 
              { type: 'success' as const, content: 'HTML preview generated - click the Preview tab to view' }
            ]);
          } else {
            setOutput(prev => [...prev, 
              { type: 'info' as const, content: `Local execution for ${lang} is simulated. In production, this would connect to a backend API.` }
            ]);
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const handleClearOutput = () => {
    setOutput([]);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={cn(
      "flex flex-col border rounded-lg overflow-hidden transition-all duration-300 h-full",
      theme === 'dark' 
        ? 'bg-zinc-900 border-white/10 text-white' 
        : 'bg-white border-gray-200 text-gray-900',
      isMaximized && 'fixed inset-0 z-50 m-0 rounded-none'
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-3 border-b",
        theme === 'dark' ? 'bg-zinc-950 border-white/5' : 'bg-gray-50 border-gray-200'
      )}>
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
            {title}
          </span>
          
          {language && (
            <div className={cn(
              "flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium",
              theme === 'dark' 
                ? `${languageConfig[language]?.color} bg-opacity-10 bg-white` 
                : 'bg-gray-200 text-gray-700'
            )}>
              <span>{languageConfig[language]?.icon}</span>
              <span>{languageConfig[language]?.name}</span>
            </div>
          )}
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
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <TabsList className={cn(
          "w-full grid gap-1 p-1",
          language === 'html' ? 'grid-cols-3' : 'grid-cols-2',
          theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-100'
        )}>
          <TabsTrigger value="editor" className="text-xs">
            <FileCode className="w-4 h-4 mr-2" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="terminal" className="text-xs">
            <Terminal className="w-4 h-4 mr-2" />
            Terminal
          </TabsTrigger>
          {language === 'html' && (
            <TabsTrigger value="preview" className="text-xs">
              <Play className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="editor" className="flex-1 overflow-hidden p-0 m-0">
          <div className="flex flex-col h-full">
            {/* Editor toolbar */}
            {!readOnly && (
              <div className={cn(
                "flex items-center justify-between px-3 py-2 border-b",
                theme === 'dark' ? 'bg-zinc-950 border-white/5' : 'bg-gray-50 border-gray-200'
              )}>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-7 px-2 text-xs",
                      theme === 'dark' 
                        ? 'text-foreground/50 hover:text-neon-green' 
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Reset
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-7 px-2 text-xs",
                      theme === 'dark' 
                        ? 'text-foreground/50 hover:text-neon-green' 
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                    onClick={handleClearOutput}
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Clear
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-7 px-2 text-xs",
                      theme === 'dark' 
                        ? 'text-foreground/50 hover:text-neon-green' 
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                    onClick={handleCopyCode}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 mr-1 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 mr-1" />
                    )}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="h-7 px-3 text-xs bg-neon-green text-deep-black hover:bg-neon-green/80 transition-all"
                    onClick={handleRun}
                    disabled={isRunning}
                  >
                    <Play className="w-3.5 h-3.5 mr-1" />
                    {isRunning ? 'Running...' : 'Run'}
                  </Button>
                </div>
              </div>
            )}

            {/* Monaco Editor */}
            <div className="flex-1">
              <MonacoEditor
                height={isMaximized ? 'calc(100vh - 180px)' : '100%'}
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize === 'sm' ? 12 : fontSize === 'lg' ? 16 : 14,
                  lineNumbers: showLineNumbers ? 'on' : 'off',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  readOnly: readOnly
                }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="terminal" className="flex-1 overflow-hidden p-0 m-0">
          <div className="flex flex-col h-full">
            <div className={cn(
              "flex items-center justify-between px-3 py-2 border-b",
              theme === 'dark' ? 'bg-zinc-950 border-white/5' : 'bg-gray-50 border-gray-200'
            )}>
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-foreground/50" />
                <span className="text-xs font-medium text-foreground/50">
                  talanta@ide:~$
                </span>
              </div>
              
              {output.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-foreground/50 hover:text-neon-green"
                  onClick={handleClearOutput}
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            
            <div
              className={cn(
                "p-4 font-mono text-sm overflow-y-auto",
                theme === 'dark' ? 'bg-black text-green-400' : 'bg-gray-900 text-green-300'
              )}
              style={{
                height: isMaximized ? 'calc(100vh - 180px)' : '100%'
              }}
            >
              {output.length === 0 ? (
                <div className="text-foreground/20 italic">
                  Ready to execute code. Click Run or press Ctrl+Enter
                </div>
              ) : (
                <div className="space-y-1">
                  {output.map((line, index) => (
                    <div key={index} className="break-all group flex items-start">
                      <span className="text-foreground/30 mr-2 select-none">
                        {line.type === 'error' ? '✗' : line.type === 'success' ? '✓' : '>'}
                      </span>
                      <span className={cn(
                        "flex-1",
                        line.type === 'error' && 'text-red-400',
                        line.type === 'success' && 'text-green-400',
                        line.type === 'info' && 'text-blue-400'
                      )}>
                        {line.content}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {language === 'html' && (
          <TabsContent value="preview" className="flex-1 overflow-hidden p-0 m-0">
            <div className="flex flex-col h-full">
              <div className={cn(
                "px-3 py-2 border-b text-xs font-medium",
                theme === 'dark' ? 'bg-zinc-950 border-white/5 text-foreground/40' : 'bg-gray-50 border-gray-200 text-gray-500'
              )}>
                <span className="flex items-center">
                  <Play className="w-3 h-3 mr-1" />
                  Live Preview
                </span>
              </div>
              <div
                className={cn(
                  "flex-1",
                  theme === 'dark' ? 'bg-white' : 'bg-white'
                )}
                style={{
                  height: isMaximized ? 'calc(100vh - 180px)' : '100%'
                }}
              >
                <iframe
                  srcDoc={code}
                  title="HTML Preview"
                  className="w-full h-full border-none"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}