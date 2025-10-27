import React, { useState, useEffect } from "react";

/* I've created this custom hook to handle retrieving data with loading and error states
and I wanted to practice creating custom hooks in React */
function useRetrieveData(url) {
    const [retrieveData, setData] = useState(null);
    const [retrieveLoading, setLoading] = useState(true);
    const [retrieveError, setRetrieveError] = useState(null);

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
            setRetrieveError(err.message);
            console.log(err);
        })
        .finally(() => setLoading(false));

    }, [url])

    return { retrieveData, retrieveLoading, retrieveError };
}

export default useRetrieveData;