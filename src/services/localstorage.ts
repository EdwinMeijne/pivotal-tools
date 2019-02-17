import {Dispatch} from "react";
import * as React from "react";

export default function useLocalStorage(
    key: string,
    initialValue: string | {} = ''
): [string, Dispatch<string | {}>] {
    const [item, setValue] = React.useState(() => {
        const stored = localStorage.getItem(key);
        return !!stored ? JSON.parse(stored) : initialValue;
    });

    const setItem = (newValue: string | {}) => {
        setValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [item, setItem];
}
