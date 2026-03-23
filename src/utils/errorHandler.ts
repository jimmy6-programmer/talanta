import { logger } from './logger';
import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: any, context: string = 'API') {
  logger.error(`${context} Error:`, {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode || 500,
    isOperational: error.isOperational !== false
  });

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  return NextResponse.json(
    {
      error: isDevelopment ? error.message : 'Internal server error'
    },
    { status: 500 }
  );
}

export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error, 'API Handler');
    }
  };
}