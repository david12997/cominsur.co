export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import sendMail from '@/services/mail';


export async function POST(req: Request, res: Response) {

    const { cliente,telefono , message } = await req.json();

  try {

    const Cotizacion = `🔴 NUEVA MENSAJE 🔴 
    \n\n
    DATOS CLIENTE👇
    Nombre 👉 ${cliente}  
    Contacto 👉 ${telefono}  
    \n\n
    MENSAJE📝👇 
    ${message}

    `;

    
    const mailSend = await sendMail({
        to: 'ventas@cominsur.co',
        subject: 'NUEVO MENSAJE',
        text: Cotizacion,
      });
  
    return NextResponse.json({
        status:200,
        message: 'Nueva mensaje enviado',
        data:mailSend

    });

  } catch (error) {
    
    console.error(error);
    return NextResponse.json({
      error: 'Failed to send email',
      status:500
    });
  }
}