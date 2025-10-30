export const NewRequests = async (urls: string[], method: string, body?: string[], auth?: string) => {
    try {
        if (!urls || urls.length === 0) return [];

        const promises = urls.map((url: string, index: number) => {
            // validate URL
            try {
                // allow relative URLs too; if invalid, skip
                new URL(url);
            } catch (e) {
                console.warn('[NewRequests] invalid URL, skipping fetch:', url);
                return Promise.resolve(null);
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: auth || `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
            };

            const init: RequestInit = method === 'GET'
                ? { method, cache: 'no-store', headers }
                : {
                        method,
                        cache: 'no-store',
                        headers,
                        body: body ? body[index] || JSON.stringify({ limit: 10, offset: 0 }) : JSON.stringify({ limit: 10, offset: 0 }),
                    };

            return fetch(url, init)
                .then((res) => {
                    if (!res.ok) {
                        console.warn('[NewRequests] non-ok response', res.status, url);
                        return null;
                    }
                    return res.json().catch((e) => {
                        console.warn('[NewRequests] failed to parse JSON from', url, e);
                        return null;
                    });
                })
                .catch((err) => {
                    // don't throw — return null for this entry and log the error
                    console.error('[NewRequests] fetch error for', url, err?.message || err);
                    return null;
                });
        });

        return await Promise.all(promises);
    } catch (error) {
        console.error('[NewRequests] unexpected error', error);
        return [];
    }
};