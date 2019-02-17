import React from 'react';

export function Login({submitToken, hint}: { submitToken: (token: string) => void, hint: string}) {
    let tokenRef = React.createRef<HTMLInputElement>();

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(tokenRef.current && tokenRef.current.value) {
            submitToken(tokenRef.current.value);
        }
    }

    return (
        <div>
            <header>
                <h1>Login to PivotalTracker</h1>
                <p>Retrieve your pivotal API token from your profile page, and use it to login to Pivotal Tools.</p>
            </header>
            <main>
                <form onSubmit={submitForm}>
                    <label>
                        API Token
                        <input type="text" name="xToken" placeholder="API Token" ref={tokenRef} />
                    </label>
                    <label>
                        <button type="submit">SUBMIT</button>
                    </label>
                </form>
                <p>{hint ? <p>{hint}</p> : ''}</p>
            </main>
        </div>
    );
}