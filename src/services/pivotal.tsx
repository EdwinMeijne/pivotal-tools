import React from "react";

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
    unstarted = "unstarted",
    pending = "pending",
    done = "done",
    error = "error",
}

export interface MemberAddCall {
    project: PivotalProject,
    email: string,
    result: QResult,
}

export interface PivotalUser {
    error? : string;
    api_token: string;
    bitbucket_keypair: string;
    bitbucket_token: string;
    bitbucket_refresh: string;
    name: string;
    accounts: PivotalAccount[];
    email: string;
    projects: PivotalProject[];
}

export async function fetchUserData(xtoken: string): Promise<any | { error: string }> {
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