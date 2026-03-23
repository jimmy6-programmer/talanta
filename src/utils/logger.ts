type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data })
    };

    // In production, you might send to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service like DataDog, LogRocket, etc.
      console.log(JSON.stringify(logEntry));
    } else {
      // Development logging
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m'  // Red
      };
      const reset = '\x1b[0m';

      console.log(`${colors[level]}[${timestamp}] ${level.toUpperCase()}: ${message}${reset}`);
      if (data) {
        console.log(data);
      }
    }
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }
}

export const logger = new Logger();