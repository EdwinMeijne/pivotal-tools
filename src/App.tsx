import React from 'react';
import './App.css';
import {PivotalUser,} from "./services/pivotal";
import {Login} from "./components/Login";
import {useStateWithLocalStorage} from "./services/localstorage";

export function App() {
    const [pivotalState, setPivotalState] = useStateWithLocalStorage<PivotalUser>('pivotalState');

    if (!pivotalState.api_token) {
        return <Login loginSuccessHandler={setPivotalState}/>;
    } else {
        return (
            <main>
                <ul>
                    {
                        pivotalState.projects.map(project => {
                            return <li key={project.project_id}>{project.project_name}</li>
                        })
                    }
                </ul>
            </main>
        );
    }

}
