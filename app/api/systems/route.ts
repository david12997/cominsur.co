
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
            // Don't throw — return a consistent JSON payload with error details.
            const error = systems?.error ?? { message: 'No systems available' };
            return NextResponse.json({ data: systems?.data ?? null, error }, { status: 200 });
        }

        // Successful response (systems.data should be an array)
        return NextResponse.json({ data: systems.data ?? [] }, { status: 200 });
    } catch (err) {
        console.error('[api/systems] GET error', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}