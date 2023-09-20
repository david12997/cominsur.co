export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';

export async function GET(req: Request, res: Response) {


    try{
        
        
        const search = new URL(req.url).searchParams.get('search'); 
        const limit = new URL(req.url).searchParams.get('limit'); 
        const offset = new URL(req.url).searchParams.get('offset'); 


        
        if(search === null || search === undefined) return NextResponse.json({status:400,message:'pattern search reference not found'});
        if(limit === null || limit === undefined) return NextResponse.json({status:400,message:'limit reference not found'});
        if(offset === null || offset === undefined) return NextResponse.json({status:400,message:'pagination offset not found'});

       //search with like operator
        const [rows,fields] = await DB.query('SELECT * FROM `referencias` WHERE nombre LIKE ? or referencia LIKE ? LIMIT ? OFFSET ?',['%'+search+'%','%'+search+'%',parseInt(limit),parseInt(offset)]);
        
        
        
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