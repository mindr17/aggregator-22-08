import { useCallback, useState } from 'react';

const useHttp = () => {
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoad(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setLoad(false);

            return data;
        } catch (err) {
            setLoad(false);
            setError(err.message);
            throw err;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { load, request, error, clearError };
};

export default useHttp;
