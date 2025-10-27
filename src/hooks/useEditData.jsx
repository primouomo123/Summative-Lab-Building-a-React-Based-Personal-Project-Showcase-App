import { useState } from "react";

/* I created this custom hook to handle editing data with loading and error states
and I wanted to practice creating custom hooks in React */
function useEditData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateData = (url, productToUpdate) => {
        setLoading(true);
        setError(null);
        
        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToUpdate)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            setLoading(false);
            return data;
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
            throw err;
        });
    };

    return { updateData, loading, error };
}

export default useEditData;