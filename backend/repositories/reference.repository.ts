import { NewRequests } from "@/helpers/request.data";
import Reference from "../model/reference.model";
import { DB } from "../db/config";

export class ReferenceRepository {
    async GetAllReferences(limit:number,offset: number): Promise<{
        method: string;
        success: boolean;
        data?: Reference[];
        error?: { message: string; source: 'db' | 'api' | 'both'; details?: any };
    }> {
        let dbError: any = null;

        // 1) Try database first (support optional dynamic limit/offset as parameters)
        try {
            if (!DB) throw new Error('Database client not configured');

            let sql = 'SELECT * FROM reference';
            let params: any[] = [];

            if (limit >= 0) {
            sql += ' LIMIT ? OFFSET ?';
            params = [limit, offset];
            }

            let result: any;
            if (typeof (DB as any).query === 'function') {

                // many drivers accept params as second argument
                result = params.length ? await (DB as any).query(sql, params) : await (DB as any).query(sql);

            } else if (typeof (DB as any).execute === 'function') {
                result = params.length ? await (DB as any).execute(sql, params) : await (DB as any).execute(sql);

            } else if (typeof (DB as any).raw === 'function') {

                // raw usually requires building the query string; ensure numbers to avoid injection
                if (limit >= 0) {
                    result = await (DB as any).raw(`SELECT * FROM reference LIMIT ${Number(limit)} OFFSET ${Number(offset)}`);
                } else {
                    result = await (DB as any).raw('SELECT * FROM reference');
                }
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
            return { method: 'DB', success: true, data: rows as Reference[] };
            }
            // if DB returned empty, fall through to API
        } catch (err) {
            dbError = err;
            console.warn('GetAllReferences: DB lookup failed or returned no rows, falling back to API', err);
        }

        // 2) Fall back to API call
        try {
            const [response] = await NewRequests([
                `${process.env.NEXT_PUBLIC_API_URL}//cominsur/items/reference?offset=${offset}&limit=${limit}`,
            ], 'GET');

            // Accept either { data: [...] } or an array directly
            if (response && typeof response === 'object' && 'data' in response && Array.isArray((response as any).data)) {
                return { method: 'API', success: true, data: (response as any).data as Reference[] };
            }
            if (Array.isArray(response)) {
                return { method: 'API', success: true, data: response as Reference[] };
            }

            const apiProblem = { message: 'Unexpected API response structure', response };
            console.warn('GetAllReferences:', apiProblem);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve references from API',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiResponse: response },
                },
            };
        } catch (apiErr) {
            console.error('GetAllReferences: API call failed', apiErr);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve references from DB and API',
                    source: dbError ? 'both' : 'api',
                    details: {
                        dbError: dbError ? (dbError.message ?? dbError) : null,
                        apiError: (apiErr as any)?.message ?? apiErr,
                    },
                },
            };
        }
    }

    async GetReferenceById(id: number | string): Promise<{
        method: string;
        success: boolean;
        data?: Reference | null;
        error?: { message: string; source: 'db' | 'api' | 'both'; details?: any };
    }> {
        let dbError: any = null;

        // 1) Try DB by id
        try {
            if (!DB) throw new Error('Database client not configured');

            let result: any;
            const sql = 'SELECT * FROM reference WHERE id = ? LIMIT 1';
            if (typeof (DB as any).query === 'function') {
                result = await (DB as any).query(sql, [id]);
            } else if (typeof (DB as any).execute === 'function') {
                result = await (DB as any).execute(sql, [id]);
            } else if (typeof (DB as any).raw === 'function') {
                result = await (DB as any).raw('SELECT * FROM reference WHERE id = ' + Number(id));
            } else {
                throw new Error('Unsupported DB client (no query/execute/raw)');
            }

            // normalize
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

            const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
            if (row) return { method: 'DB', success: true, data: row as Reference };
            // else fall through to API
        } catch (err) {
            dbError = err;
            console.warn('GetReferenceById: DB lookup failed or returned no row, falling back to API', err);
        }

        // 2) API fallback
        try {
            const [response] = await NewRequests([
                `${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/reference/${id}`,
            ], 'GET');

            // Accept either { data: {...} } or a direct object
            if (response && typeof response === 'object' && 'data' in response && response.data) {
                return { method: 'API', success: true, data: response.data as Reference };
            }
            if (response && typeof response === 'object') {
                return { method: 'API', success: true, data: response as Reference };
            }

            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Unexpected API response structure for reference by id',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiResponse: response },
                },
            };
        } catch (apiErr) {
            console.error('GetReferenceById: API call failed', apiErr);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve reference by id from DB and API',
                    source: dbError ? 'both' : 'api',
                    details: {
                        dbError: dbError ? (dbError.message ?? dbError) : null,
                        apiError: (apiErr as any)?.message ?? apiErr,
                    },
                },
            };
        }
    }

    async GetReferencesBySystem(systemId: number | string, limit:number,offset: number): Promise<{
        method: string;
        success: boolean;
        data?: Reference[];
        error?: { message: string; source: 'db' | 'api' | 'both'; details?: any };
    }> {
        let dbError: any = null;
        // 1) Try database first (support optional dynamic limit/offset as parameters)
        try {
            if (!DB) throw new Error('Database client not configured');
            let sql = 'SELECT * FROM reference WHERE id_system = ?';
            let params: any[] = [systemId];
            if (limit >= 0) {
            sql += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);
            }
            let result: any;
            if (typeof (DB as any).query === 'function') {
                // many drivers accept params as second argument
                result = params.length ? await (DB as any).query(sql, params) : await (DB as any).query(sql);
            }
            else if (typeof (DB as any).execute === 'function') {
                result = params.length ? await (DB as any).execute(sql, params) : await (DB as any).execute(sql);
            }
            else if (typeof (DB as any).raw === 'function') {
                // raw usually requires building the query string; ensure numbers to avoid injection
                if (limit >= 0) {
                    result = await (DB as any).raw(`SELECT * FROM reference WHERE id_system = ${Number(systemId)} LIMIT ${Number(limit)} OFFSET ${Number(offset)}`);
                } else {
                    result = await (DB as any).raw(`SELECT * FROM reference WHERE id_system = ${Number(systemId)}`);
                }
            }
            else {
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
                return { method: 'DB', success: true, data: rows as Reference[] };
            }
            // if DB returned empty, fall through to API
        } catch (err) {
            dbError = err;
            console.warn('GetReferencesBySystem: DB lookup failed or returned no rows, falling back to API', err);
        }
        // 2) Fall back to API call
        try {
            const [response] = await NewRequests([
                `${process.env.NEXT_PUBLIC_API_URL}/cominsur/items/reference?filter[id_system]=${systemId}&offset=${offset}&limit=${limit}`,
            ], 'GET');
            // Accept either { data: [...] } or an array directly
            if (response && typeof response === 'object' && 'data' in response && Array.isArray((response as any).data)) {
                return { method: 'API', success: true, data: (response as any).data as Reference[] };
            }
            if (Array.isArray(response)) {
                return { method: 'API', success: true, data: response as Reference[] };
            }
            const apiProblem = { message: 'Unexpected API response structure', response };
            console.warn('GetReferencesBySystem:', apiProblem);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'Failed to retrieve references from API',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiResponse: response },
                },
            };
        } catch (apiErr) {
            console.error('GetReferencesBySystem: API call failed', apiErr);
            return {
                method: 'API',
                success: false,
                error: {
                    message: 'API call failed',
                    source: dbError ? 'both' : 'api',
                    details: { dbError: dbError?.message ?? null, apiError: apiErr },
                },
            };
        }
    }
}


export const MyReferenceRepository = new ReferenceRepository();
