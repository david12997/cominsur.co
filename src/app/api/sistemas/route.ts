export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';

export async function GET(req: Request, res: Response) {


    try{
        
        
        const idSystem = new URL(req.url).searchParams.get('id'); 
        
        if(idSystem === null || idSystem === undefined) return NextResponse.json({status:400,message:'id System not found'});

        const [rows,fields] = await DB.query('SELECT * FROM sistemas WHERE id = ?',[idSystem]);

        return NextResponse.json({
            status:200,
            message:'success',
            data:rows
        });

    }
    catch(e){

        console.log(e);
        return NextResponse.json({
            status:500,
            message:'server error or system not found',
            error:e
        });
        
    }


}