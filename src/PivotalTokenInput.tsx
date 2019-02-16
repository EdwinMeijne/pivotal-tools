import React, {useState} from 'react';

export interface PivotalState {
    xtoken: string;
    user: {
        name?: string;
    }
}

function PivotalTokenInput(props: { setPivotalData: (event: PivotalState) => void }) {
    const [hint, setHint] = useState('');
    const {setPivotalData} = props;
    let xtokenRef = React.createRef<HTMLInputElement>();

    function handleSubmit(event: React.FormEvent, xtokenElement: React.RefObject<HTMLInputElement> | null) {
        event.preventDefault();

        if (xtokenElement && xtokenElement.current) {
            let {value: xtoken} = xtokenElement.current;

            return fetch(`https://www.pivotaltracker.com/services/v5/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "Application/json",
                    "X-TrackerToken": xtoken,
                },
            })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        setHint(response.possible_fix);
                    } else {
                        setPivotalData({
                            xtoken,
                            user: response,
                        });
                    }
                });

        }
    }

    return (
        <form onSubmit={($event) => handleSubmit($event, xtokenRef)}>
            {!!hint &&
                <div>{hint}</div>
            }
            <div>
                <label>
                    <h3>Pivotal Tracker X-Token:</h3>
                    <input
                        type="text"
                        id="xtoken"
                        placeholder="Pivotal API token"
                        ref={xtokenRef}
                        defaultValue=""/>
                </label>
            </div>
            <div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    );
}

export default PivotalTokenInput;