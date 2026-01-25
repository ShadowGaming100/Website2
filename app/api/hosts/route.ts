import { NextResponse } from 'next/server';
import { Host } from '@/types/host';
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const baseUrl = `${new URL(request.url).origin}/data/hosts.json`;
    const response = await fetch(baseUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hosts data: ${response.status} ${response.statusText}`);
    }
    
    const hosts: Host[] = await response.json();
    
    if (id) {
      const host = hosts.find((h: Host) => h.id === parseInt(id));
      if (!host) {
        return NextResponse.json({ error: 'Host not found' }, { status: 404 });
      }
      return NextResponse.json(host);
    }
    
    return NextResponse.json(hosts);
  } catch (error) {
    console.error('Error reading hosts data:', error);
    return NextResponse.json({ error: 'Failed to load hosts data' }, { status: 500 });
  }
}
