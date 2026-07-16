import { useState, useEffect } from 'react';

export function useFrenchDict() {
    const [frenchDict, setFrenchDict] = useState<any[]>([]);

    useEffect(() => {
        fetch('/french-words.json').then((res) =>
            res.json().then((data) => {
                setFrenchDict(data);
            }));
    }, []);

    return frenchDict;
}
