import React, {useState} from 'react';
import './App.css';
import {PivotalUser, submitToken} from "./services/pivotal";
import {LoginComponent} from "./components/LoginComponent";
import useLocalStorage from "./services/localstorage";

export function App() {
    const [xToken, setXtoken] = useLocalStorage('xToken', '');
    const [pivotalState, setPivotalState] = useLocalStorage('pivotalState', {} as PivotalUser);
    const [hint, setHint] = useState('');

    async function submitTokenHandler(xtoken: string) {
        const user = await submitToken(xtoken);
        if (user.error) {
            setHint(user.error);
        } else {
            setXtoken(xtoken);
            setPivotalState(user);
        }
    }

    if (!xToken) {
        return <LoginComponent submitToken={submitTokenHandler}/>;
    } else {
        return (
            <main>
                <ul>
                    <li></li>
                </ul>
            </main>
        );
    }
}
