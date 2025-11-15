import { useState, useEffect } from 'react';
import { FRONT_URL } from '../utils';

export function useFrenchDict() {
    const storage_key = 'frenchDict';
    const [frenchDict, setFrenchDict] = useState<any>(()=>{
        return JSON.parse(window.localStorage.getItem(storage_key) ?? '[]');
    });

    useEffect(() => {
        if(frenchDict.length > 0){
            return;
        }
        fetch(`${FRONT_URL}/french-words.json`).then((res) =>
            res.json().then((data) => {
                window.localStorage.setItem(storage_key, JSON.stringify(data));
                setFrenchDict(data);
            }));
    }, []);

    return frenchDict;
}
