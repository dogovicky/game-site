import { useEffect, useState } from "react";


export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!url) return;

        setLoading(true);

        fetch(url)
            .then((res) => {
                if(!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((json) => {
                setData(json);
                console.log(json)
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => setLoading(false));

    }, [url]);

    return { data, error, loading };

}