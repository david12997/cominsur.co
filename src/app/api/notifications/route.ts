export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: Request, res: Response) {

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const { data,password } = await req.json();
    const parseData = JSON.parse(data);

    let messageReferencias:string = "";
    for(let i=0; i < parseData.referencias.length; i++){

        let paquetes:string;
        if(parseData.referencias[i].cantidad_paquetes === "No informado"){
            paquetes = "";
        }else{
            paquetes = "- Paquetes: "+parseData.referencias[i].cantidad_paquetes;
        }
        messageReferencias += `  Ref 👉 ${parseData.referencias[i].referencia} ${paquetes}
        `;
    }
    
    const Cotizacion = `🔴 NUEVA COTIZACIÓN 🔴 
    \n\n
    DATOS CLIENTE👇
    Nombre 👉 ${parseData.cliente}  
    Contacto 👉 ${parseData.contacto}  
    \n\n
    DATOS COTIZACIÓN📝👇 
    🪟 Sistema: ${parseData.sistema}
    🔴 Referencias: 
    ${messageReferencias}  
    
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