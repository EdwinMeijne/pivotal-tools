import React, {Dispatch, useEffect} from "react";

export function useStateWithLocalStorage<T>(localStorageKey: string): [T, Dispatch<React.SetStateAction<T>>] {
    const storedVal = localStorage.getItem(localStorageKey);
    const [value, setValue] = React.useState<T>(storedVal ? JSON.parse(storedVal) : {});

    useEffect(() => {
        if (value) {
            localStorage.setItem(localStorageKey, JSON.stringify(value));
        }
    }, [value]);

    return [value, setValue];
}
