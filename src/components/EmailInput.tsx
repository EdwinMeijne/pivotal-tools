import React from 'react';

export function EmailInput({setEmails}: {setEmails: (emails: string[]) => void}) {
    let emailRef = React.createRef<HTMLTextAreaElement>();

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEmails(emailRef.current
            ? emailRef.current.value
                .split('\n')
                .map((mail: string) => mail.trim())
                .filter(mail => mail.includes('@'))
            : []);
    }

    return (
        <section>
            <form onSubmit={submitForm}>
                <label>
                    <h1>Enter email addresses</h1>
                    <textarea ref={emailRef}
                              cols={30}
                              rows={10}
                    />
                <label>
                </label>
                    <div>
                        <button type="submit">Save emails!</button>
                    </div>
                </label>
            </form>
        </section>
    );
}