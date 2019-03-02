import React from 'react';
import {PivotalProject} from "../services/pivotal";

export function AddEmailToProject({emails, projects}: {emails: string[], projects: PivotalProject[]}) {


    return (
        <section>
            <h1>
                Adding following emails to the following projects:
            </h1>
            <h2>Emails:</h2>
            <ul>
                {emails.map(email => <li>{email}</li>)}
            </ul>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => <li>{project.project_name}</li>)}
            </ul>
        </section>
    );
}