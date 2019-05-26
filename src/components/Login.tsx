import React, {useState} from 'react';
import {fetchUserData, PivotalUser} from "../services/pivotal";

export function Login({loginSuccessHandler}: { loginSuccessHandler: (user: PivotalUser) => void }) {
    const [hint, setHint] = useState('');

    let tokenRef = React.createRef<HTMLInputElement>();

    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (tokenRef.current && tokenRef.current.value) {
            const user = await fetchUserData(tokenRef.current.value);

            if (user.error) {
                console.log('error', user.error);
                setHint(user.error);
            } else {
                loginSuccessHandler(user);
            }
        }
    }

    return (
        <section>
            <form onSubmit={submitForm}>
                <label>
                    API Token
                    <input type="text" name="xToken" placeholder="API Token" ref={tokenRef} defaultValue=""/>
                </label>
                <label>
                    <button type="submit">SUBMIT</button>
                </label>
            </form>
            {hint ? <p>{hint}</p> : ''}
        </section>
    );
}