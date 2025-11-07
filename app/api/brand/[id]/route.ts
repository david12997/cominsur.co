import { BrandService } from '@/backend/services/brand.services';
import { NextResponse } from 'next/server';


/**
 * GET /api/brand/[id]
 * Next.js App Router expects named exports for HTTP methods.
 * Handler signature: (request, { params }) where params.{paramName} is available.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const MyBrandService = new BrandService();
        const { id } = await params || {};

        if (!id) {
            return NextResponse.json({ error: 'Missing brand id' }, { status: 400 });
        }

        const brand = await MyBrandService.getBrandById(id);

        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        
        return NextResponse.json({ data:brand.data });

    } catch (err) {
        console.error('[api/brand/[id]/route] GET error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}