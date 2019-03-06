import React, {useEffect, useState} from 'react';
import './App.css';
import {
    addEmailToProjectId,
    MemberAddCall,
    PivotalProject,
    PivotalUser,
    QResult,
    submitToken
} from "./services/pivotal";
import {Login} from "./components/Login";
import {ProjectSelector} from "./components/ProjectSelector";
import {EmailInput} from './components/EmailInput';
import {AddEmailToProjectState} from "./components/AddEmailToProjectState";

const PIVOTAL_API_DELAY = 500;

export function App() {
    const [pivotalState, setPivotalState] = useState({} as PivotalUser);
    const [pivotalProjects, setPivotalProjects] = useState([] as PivotalProject[]);
    const [memberAddCalls, setMemberAddCalls] = useState([] as MemberAddCall[]);
    const [hint, setHint] = useState('');

    if (!pivotalState.api_token) {
        return <Login submitToken={submitTokenHandler} hint={hint}/>;
    } else {
        return (
            <main>
                <ProjectSelector pivotalProjects={pivotalProjects} selectProject={selectProject}/>
                <EmailInput addEmails={addEmails}/>
                <AddEmailToProjectState memberAddCalls={memberAddCalls}/>
            </main>
        );
    }

    // TODO maybe move this logic down again? Whats the best setup here
    async function submitTokenHandler(xtoken: string) {
        const user = await submitToken(xtoken);
        console.info('user:', user);
        if (user.error) {
            setHint(user.error);
        } else {
            setPivotalState(user);
            setPivotalProjects(user.projects);
        }
    }

    function selectProject(project: PivotalProject) {
        setPivotalProjects(state => {
            return state.map(stateProject => {
                return {
                    ...stateProject,
                    selected: project.project_id === stateProject.project_id
                        ? !stateProject.selected
                        : stateProject.selected,
                };
            });
        });
    }

    function addEmails(emails: string[]) {
        const emailProjectCalls = emails.reduce((callsArr, email) => {
            return callsArr.concat(pivotalProjects
                .filter(pro => pro.selected)
                .reduce((subCallArr, project) => {
                    return subCallArr.concat([{
                        result: QResult.unstarted,
                        project,
                        email,
                    }]);
                }, [] as MemberAddCall[]));
        }, [] as MemberAddCall[]);

        emailProjectCalls.forEach((call, index) => {
            setTimeout(() => {
                addEmailToProjectId(call.email, call.project.project_id, pivotalState.api_token)
                    .then(result => {
                        console.log('result', result);
                        setMemberAddCalls(state => {
                            return state.map(({email, project, ...rest}) => {
                                if (email == call.email && project && call.project) {
                                    return {
                                        ...rest,
                                        email,
                                        project,
                                        result: QResult.done,
                                    }
                                }
                                return {
                                    ...rest,
                                    email,
                                    project,
                                }
                            });
                        });
                    });
            }, index * PIVOTAL_API_DELAY);

            setMemberAddCalls(emailProjectCalls);
        });
    }
}
