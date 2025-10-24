import React, { useState, useEffect } from "react";

function useRetrieveData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
        .then(r => {
            if (!r.ok) {
                throw new Error(`Error retrieving data: ${r.status}`);
            }

            return r.json();
        })
        .then(setData)
        .catch(err => {
            setError(err.message);
            console.log(err);
        })
        .finally(() => setLoading(false));

    }, [url])

    return { data, loading, error };
}

export default useRetrieveData;