import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  // Aquí podrías validar y reenviar al backend real si lo deseas
  // Por ahora, responde con éxito simulado:
  return NextResponse.json({ ok: true, ...data }, { status: 201 })
}
