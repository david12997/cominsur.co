
import { SystemService } from '@/backend/services/system.services';
import { NextResponse } from 'next/server';



/**
 * GET /api/systems
 */
export async function GET(_: Request) {
    try {
        const MySystemService = new SystemService();
        const systems = await MySystemService.getAllSystems();

        // Expecting an object like { success: boolean, data: any }
        if (!systems || !systems.success) {
            // Return whatever data or message the service provided, default to 404
            return NextResponse.json(
               {data:systems.data}
            );
        }

        // Successful response
        return NextResponse.json({ data: systems.data }, { status: 200 });
    } catch (err) {
        console.error('[api/systems] GET error', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}