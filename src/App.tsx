import React from 'react';
import './App.css';
import {PivotalUser,} from "./services/pivotal";
import {Login} from "./components/Login";
import {useStateWithLocalStorage} from "./services/localstorage";
import {Logout} from "./components/Logout";

export function App() {
    const [userState, setUserState] = useStateWithLocalStorage<PivotalUser>('userState');

    if (!userState.api_token) {
        return <Login loginSuccessHandler={setUserState}/>;
    } else {
        return (
            <main>
                <Logout/>
                <ul>
                    {
                        userState.projects.map(project => {
                            return <li key={project.project_id}>{project.project_name}</li>
                        })
                    }
                </ul>
            </main>
        );
    }

}
