
import { NextResponse } from 'next/server';


/**
 * GET /api/brand
 */
export async function GET( ) {
    try {
        
        return NextResponse.json({ state:"success" }, { status: 200 });

    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}