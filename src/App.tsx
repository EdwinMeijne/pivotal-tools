import React, {useState} from 'react';
import './App.css';
import {
    PivotalProject,
    PivotalUser,
} from "./services/pivotal";
import {Login} from "./components/Login";

export function App() {
    const [pivotalState, setPivotalState] = useState({} as PivotalUser);
    const [pivotalProjects, setPivotalProjects] = useState([] as PivotalProject[]);

    if (!pivotalState.api_token) {
        return <Login loginSuccessHandler={setPivotalState}/>;
    } else {
        return (
            <main>
                <ul>
                    {
                        pivotalProjects.map(project => {
                            return <li key={project.project_id}>{project.project_name}</li>
                        })
                    }
              </ul>
          </main>
        );
    }

}
