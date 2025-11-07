import { NewRequests } from "@/helpers/request.data";
import System from "../model/system.model";
import { DB } from "../db/config";

export class SystemRepository {
    async GetAllSystems(): Promise<{
        method: string;
        success: boolean;
        data?: System[];
        error?: { message: string; source: 'db' | 'api' | 'both'; details?: any };
    }> {
        let dbError: any = null;

        // 1) Try database first
        try {
            if (!DB) throw new Error('Database client not configured');

            let result: any;
            if (typeof (DB as any).query === 'function') {
                result = await (DB as any).query('SELECT * FROM system');
            } else if (typeof (DB as any).execute === 'function') {
                result = await (DB as any).execute('SELECT * FROM system');
            } else if (typeof (DB as any).raw === 'function') {
                result = await (DB as any).raw('SELECT * FROM system');
            } else {
                throw new Error('Unsupported DB client (no query/execute/raw)');
            }

            // normalize rows for various drivers
            let rows: any;
            if (result && Array.isArray(result) && Array.isArray(result[0])) {
                rows = result[0];
            } else if (result && Array.isArray(result)) {
                rows = result;
            } else if (result && (result as any).rows) {
                rows = (result as any).rows;
            } else {
                rows = result;
            }

            if (Array.isArray(rows) && rows.length > 0) {
                return { method: 'DB', success: true, data: rows as System[] };
            }
            // if DB returned empty, fall through to API
        } catch (err) {
            dbError = err;
            console.warn('GetAllSystems: DB lookup failed or returned no rows, falling back to API', err);
        }

        // 2) Fall back to API call
        try {
            const [response] = await NewRequests(
                [`${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/system`],
                'GET'
            );

            // Accept either { data: [...] } or an array directly
            if (response && typeof response === 'object' && 'data' in response && Array.isArray((response as any).data)) {
                return { method: 'API', success: true, data: (response as any).data as System[] };
            }
            if (Array.isArray(response)) {
                return { method: 'API', success: true, data: response as System[] };
            }

            const apiProblem = { message: 'Unexpected API response structure', response };
            console.warn('GetAllSystems:', apiProblem);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve systems from API',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiResponse: response },
                },
            };
        } catch (apiErr) {
            console.error('GetAllSystems: API call failed', apiErr);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve systems from DB and API',
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

export const MySystemRepository = new SystemRepository();