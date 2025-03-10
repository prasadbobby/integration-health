// src/app/api/chat/[type]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { message, sessionId } = await req.json();
    const chatType = params.type;
    
    // Connect to Python backend
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5002';
    
    const pythonResponse = await fetch(`${pythonBackendUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        type: chatType, 
        query: message 
      }),
    });
    
    if (!pythonResponse.ok) {
      throw new Error(`Python backend returned status: ${pythonResponse.status}`);
    }
    
    const data = await pythonResponse.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { status: "error", response: 'Failed to process request' },
      { status: 500 }
    );
  }
}