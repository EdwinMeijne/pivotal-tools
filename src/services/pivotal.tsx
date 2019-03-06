import React, {useState} from "react";
import {Login} from "../components/Login";

export interface PivotalAccount {
    id: number;
    name: string;
}

export interface PivotalProject {
    project_id: number;
    project_name: string;
    project_color: string;
    favorite: true;
    role: string;
    selected: boolean;
    members: {
        [key: string]: QResult;
    }
}

export enum QResult {
    unstarted,
    pending,
    done,
    error,
}

export interface MemberAddCall {
    project: PivotalProject,
    email: string,
    result: QResult,
}

export interface PivotalUser {
    error? : string;
    api_token: string;
    name: string;
    accounts: PivotalAccount[];
    email: string;
}

export async function submitToken(xtoken: string) {
    try {
        const response = await fetch(`https://www.pivotaltracker.com/services/v5/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/json",
                "X-TrackerToken": xtoken,
            },
        });
        return await response.json();
    } catch (e) {
        return { error: 'Something went wrong' };
    }
}

export async function addEmailToProjectId(email: string, projectId: number, xtoken: string, role = 'member'): Promise<any> {
    return fetch(`https://www.pivotaltracker.com/services/v5/projects/${projectId}/memberships`, {
        method: 'POST',
        headers: {
            "Content-Type": "Application/json",
            "X-TrackerToken": xtoken,
        },
        body: JSON.stringify({email, role}),
    })
        .then(response => response.json());
}

    // https://www.pivotaltracker.com/services/v5/projects/2240560/memberships

    // https://www.pivotaltracker.com/accounts/639516/memberships/create_project_memberships