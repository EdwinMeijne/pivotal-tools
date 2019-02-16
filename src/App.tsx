import React, {useState} from 'react';
import './App.css';
import PivotalTokenInput, {PivotalState} from "./PivotalTokenInput";

interface PivotalAccount {
    id: number,
    name: string,
}

interface PivotalProject {
    project_id: number,
    project_name: string,
    project_color: string,
    favorite: true,
    role: string,
}

interface PivotalUser {
    name: string,
    accounts: PivotalAccount[],
    projects: PivotalProject[],
    email: string,
}

const initialState: {
    xtoken?: string,
    user?: PivotalUser
} = {};

export function App() {
    const [pivotalState, setPivotalData] = useState(initialState);

    if (!pivotalState.xtoken) {
        return (
            <main>
                <h1>Login</h1>
                <PivotalTokenInput setPivotalData={setPivotalData}/>
            </main>
        );
    } else {
        return (
            <main>
                <h1>Welcome, {pivotalState.user.name}</h1>
            </main>
        );
    }
}
