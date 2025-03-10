// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5002';
    
    const response = await fetch(`${pythonBackendUrl}/health`, {
      method: 'GET',
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Python backend health check failed' },
        { status: 503 }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      status: 'ok',
      nextjs: 'healthy',
      python: data.status || 'connected'
    });
    
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to connect to Python backend' },
      { status: 503 }
    );
  }
}