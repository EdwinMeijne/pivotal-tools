import React, {useState} from 'react';
import './App.css';
import {PivotalUser, submitToken} from "./services/pivotal";
import {Login} from "./components/Login";

export function App() {
    const [pivotalState, setPivotalState] = useState({} as PivotalUser);
    const [hint, setHint] = useState('');

    async function submitTokenHandler(xtoken: string) {
        const user = await submitToken(xtoken);
        console.info('user:', user);
        if (user.error) {
            setHint(user.error);
        } else {
            setPivotalState(user);
        }
    }

    if (!pivotalState.api_token) {
        return <Login submitToken={submitTokenHandler} hint={hint} />;
    } else {
        return (
            <main>
                <ul>
                    {pivotalState.projects.map(project => {
                        return (
                            <li key={project.project_id}>
                                {project.project_name}
                            </li>
                        );
                    })}
                </ul>
            </main>
        );
    }
}
