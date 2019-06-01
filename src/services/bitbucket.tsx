import React from "react";

export interface BitbucketResponse {
    error?: string;
    access_token?: string,
    refresh_token?: string,
}

// TODO: add error handling
export async function fetchBitbucketToken(keysecret: string): Promise<BitbucketResponse> {
    try {
        const response = await fetch("https://bitbucket.org/site/oauth2/access_token", {
            body: "grant_type=client_credentials",
            headers: {
                Authorization: "Basic " + btoa(keysecret),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        });

        return response.json();
    } catch {
        return {};
    }
}