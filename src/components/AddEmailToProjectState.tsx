import React, {useState} from 'react';
import {addEmailToProjectId, MemberAddCall, PivotalProject} from "../services/pivotal";

export function AddEmailToProjectState({memberAddCalls}: { memberAddCalls: MemberAddCall[] }) {
    return <section>
        <h1>
            Adding following emails to the following projects:
        </h1>
        <ul>
            {memberAddCalls.map(call => <li>{call.project.project_name}: {call.email} - {call.result}</li>)}
        </ul>
    </section>;
}