export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';

export async function GET(req: Request, res: Response) {


    try{
        
        
        const page = new URL(req.url).searchParams.get('page'); 
        
        if(page === null || page === undefined) return NextResponse.json({status:400,message:'page not found'});

        const [rows,fields] = await DB.query('SELECT * FROM pages WHERE name = ?',[page]);

        return NextResponse.json({
            status:200,
            message:'success',
            data:rows
        });

    }
    catch(e){

        return NextResponse.json({
            status:500,
            message:'server error or page not found',
            error:e
        });
        
    }


}