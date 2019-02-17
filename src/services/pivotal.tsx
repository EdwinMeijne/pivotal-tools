import React, {useState} from "react";
import {LoginComponent} from "../components/LoginComponent";

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

export interface PivotalUser {
    name: string,
    accounts: PivotalAccount[],
    projects: PivotalProject[],
    email: string,
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
