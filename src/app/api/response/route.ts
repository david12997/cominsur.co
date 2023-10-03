export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function POST(req: Request, res: Response) {


    return new Response(`
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Message>
                <Body>
                    Sistema de cotizaciones COMINSUR 
                Escribe "1" para relacionar el sistema con este número de WhatsApp
                </Body>
            </Message>
        </Response>
        
    `, {
        headers: {
            'content-type': 'text/xml;charset=UTF-8',
        },
        
    });

}