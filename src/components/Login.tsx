import React, {useState} from 'react';
import {fetchUserData, PivotalUser} from "../services/pivotal";
import {fetchBitbucketToken} from "../services/bitbucket";

export function Login({loginSuccessHandler}: { loginSuccessHandler: (user: PivotalUser) => void }) {
    const [hint, setHint] = useState('');

    let tokenRef = React.createRef<HTMLInputElement>();
    let bitbucketRef = React.createRef<HTMLInputElement>();

    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            tokenRef.current &&
            tokenRef.current.value &&
            bitbucketRef.current &&
            bitbucketRef.current.value
        ) {
            const user = await fetchUserData(tokenRef.current.value);
            const bitbucket = await fetchBitbucketToken(bitbucketRef.current.value);

            if (user.error) {
                console.log('error', user.error);
                setHint(user.error);
            } else {
                if (bitbucket.error) {
                    console.log('bitbucket error', bitbucket.error);
                    setHint(bitbucket.error);
                } else {
                    loginSuccessHandler({
                        ...user,
                        bitbucket_refresh: bitbucket.refresh_token,
                        bitbucket_token: bitbucket.access_token,
                        bitbucket_keypair: bitbucketRef.current.value,
                    });

                }
            }
        }
    }

    return (
        <section>
            <form onSubmit={submitForm}>
                <label>
                    API Token:
                </label>
                <input
                    type="text"
                    name="xToken"
                    placeholder="API Token"
                    ref={tokenRef}
                    defaultValue=""
                />
                <label>
                    Bitbucket Key:Secret:
                </label>
                <input
                    type="text"
                    name="bitbucket"
                    placeholder="Bitbucket Key:Secret"
                    ref={bitbucketRef}
                    defaultValue=""
                />
                <label>
                    <button type="submit">SUBMIT</button>
                </label>
            </form>
            {hint ? <p>{hint}</p> : ''}
        </section>
    );
}