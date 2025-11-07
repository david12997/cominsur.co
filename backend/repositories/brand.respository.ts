import { NewRequests } from "@/helpers/request.data";
import Brand from "../model/brand.model";
import { DB } from "../db/config";

export class BrandRepository {


    async GetBrandById(id: number): Promise<{method: string; success: boolean; data?: Brand | null; error?: { message: string; source: 'db' | 'api' | 'both'; details?: any };}> {
        let dbError: any = null;

        // 1) Try database first
        try {
            if (!DB) throw new Error('Database client not configured');

            // support common node mysql / mysql2 / knex-like return shapes
            let result: any;
            if (typeof (DB as any).query === 'function') {
                result = await (DB as any).query('SELECT * FROM brand WHERE id = ?', [id]);
            } else if (typeof (DB as any).execute === 'function') {
                result = await (DB as any).execute('SELECT * FROM brand WHERE id = ?', [id]);
            } else if (typeof (DB as any).raw === 'function') {
                // knex-like
                result = await (DB as any).raw('SELECT * FROM brand WHERE id = ?', [id]);
            } else {
                throw new Error('Unsupported DB client (no query/execute/raw)');
            }

            // normalize rows (mysql2 returns [rows, fields], some drivers return rows directly)
            let rows = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;
            if (Array.isArray(rows) && rows.length > 0) {
                // assume the row shape matches Brand
                return { method: 'DB', success: true, data: rows[0] as Brand };
            }
            // if DB returned empty, fall through to API
        } catch (err) {
            dbError = err;
            console.warn('GetBrandById: DB lookup failed, falling back to API', err);
        }

        // 2) Fall back to API call
        try {
            const [response] = await NewRequests(
                [`${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/brand/${id}`],
                'GET'
            );

            if (response && typeof response === 'object' && 'data' in response) {
                return { method: 'API', success: true, data: response.data as Brand };
            }

            // unexpected API response structure
            const apiProblem = { message: 'Unexpected API response structure', response };
            console.warn('GetBrandById:', apiProblem);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve brand from API',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiResponse: response },
                },
            };
        } catch (apiErr) {
            console.error('GetBrandById: API call failed', apiErr);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve brand from DB and API',
                    source: dbError ? 'both' : 'api',
                    details: {
                        dbError: dbError ? (dbError.message ?? dbError) : null,
                        apiError: (apiErr as any)?.message ?? apiErr,
                    },
                },
            };
        }
    }

}

export const MyBrandRepository = new BrandRepository();