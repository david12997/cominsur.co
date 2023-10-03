export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';
import twilio from 'twilio';

export async function POST(req: Request, res: Response) {

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const { cliente,telefono,message } = await req.json();

    
    const Cotizacion = `🔴 NUEVA MENSAJE 🔴 
    \n\n
    DATOS CLIENTE👇
    Nombre 👉 ${cliente}  
    Contacto 👉 ${telefono}  
    \n\n
    MENSAJE📝👇 
    ${message}

    `;

  try {
    
    const message = await client.messages.create({
      from: 'whatsapp:'+process.env.TWILO_NUMBER, // replace with your Twilio WhatsApp number
      to: 'whatsapp:'+process.env.NUMBER_NOTIFICATION, // replace with the recipient's WhatsApp number
      body: Cotizacion, // replace with your message

    });
    

    return NextResponse.json({
        message: 'Nueva cotización realizada',
        messageId: message.sid,
        status:200

    });

  } catch (error) {
    
    console.error(error);
    return NextResponse.json({
      error: 'Failed to send message',
      status:500
    });
  }
}