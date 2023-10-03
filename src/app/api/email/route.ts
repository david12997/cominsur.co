export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import sendMail from '@/services/mail';


export async function POST(req: Request, res: Response) {

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
    
    const mailSend = await sendMail({
        to: 'ventas@cominsur.co',
        subject: 'NUEVA COTIZACIÓN',
        text: Cotizacion,
      });
  
    return NextResponse.json({
        status:200,
        message: 'Nueva cotización realizada',
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