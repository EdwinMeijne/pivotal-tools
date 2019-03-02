import React, {useState} from 'react';
import './App.css';
import {PivotalProject, PivotalUser, submitToken} from "./services/pivotal";
import {Login} from "./components/Login";
import {ProjectSelector} from "./components/ProjectSelector";
import {EmailInput} from './components/EmailInput';

export function App() {
    const [pivotalState, setPivotalState] = useState({} as PivotalUser);
    const [emailState, setEmailState] = useState([] as string[]);
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
        return <Login submitToken={submitTokenHandler} hint={hint}/>;
    } else {
        return (
            <main>
                <ProjectSelector pivotalProjects={pivotalState.projects} selectProject={selectProject}/>
                <EmailInput setEmails={setEmails}></EmailInput>
            </main>
        );
    }

    function selectProject(project: PivotalProject) {
        setPivotalState(state => {
            return {
                ...state,
                projects: state.projects.map(stateProject => {
                    return {
                        ...stateProject,
                        selected: project.project_id === stateProject.project_id
                            ? !stateProject.selected
                            : stateProject.selected,
                    };
                }),
            }
        });
    }

    function setEmails(emails: string[]) {
        console.log('emails!', emails);
        setEmailState(emails);
    }
}
