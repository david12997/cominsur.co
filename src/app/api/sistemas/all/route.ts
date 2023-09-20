export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';

export async function GET(req: Request, res: Response) {


    try{
        
        const [rows,fields] = await DB.query('SELECT * FROM sistemas');

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
            message:'server error or systems not found',
            error:e
        });
        
    }


}