export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';

export async function GET(req: Request, res: Response) {


    try{
        
        
        const idReference = new URL(req.url).searchParams.get('idRef'); 
        
        if(idReference === null || idReference === undefined) return NextResponse.json({status:400,message:'id reference not found'});
      

        const [rows,fields] = await DB.query('SELECT * FROM referencias WHERE id = ? ',[idReference]);
        
        
        
        return NextResponse.json({
            status:200,
            message:'success',
            data:rows
        });

    }
    catch(e){

        return NextResponse.json({
            status:500,
            message:'server error or system not found',
            error:e
        });
        
    }


}