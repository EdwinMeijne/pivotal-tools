import React from 'react';

export function Logout() {
    function logout() {
        window.localStorage.clear();
        window.location.reload();
    }

    return <button onClick={logout}>LOGOUT</button>
}