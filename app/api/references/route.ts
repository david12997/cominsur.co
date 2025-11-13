import { ReferenceService } from '@/backend/services/reference.services';
import { NextResponse } from 'next/server';

/**
 * GET /api/reference
 * Supports optional query params: limit, offset
 */
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('limit');
        const offsetParam = url.searchParams.get('offset');

        const limit = limitParam ? parseInt(limitParam, 10) : -1;
        const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

        const svc = new ReferenceService();
        const refs = await svc.getAllReferences(limit, offset);

        if (!refs || !refs.success) {
            // Return whatever data or message the service provided
            return NextResponse.json({ data: refs?.data ?? null, error: refs?.error ?? null }, { status: 200 });
        }

        return NextResponse.json({ data: refs.data }, { status: 200 });
    } catch (err) {
        console.error('[api/reference] GET error', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
