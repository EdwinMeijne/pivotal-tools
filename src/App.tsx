import React, {useState} from 'react';
import './App.css';
import PivotalTokenInput, {PivotalState} from "./PivotalTokenInput";


export function App() {
  const [pivotalState, setPivotalData] = useState({ xtoken: '', user: {} });

  if (!pivotalState.xtoken) {
    return (
      <main>
        <h1>Login</h1>
        <PivotalTokenInput setPivotalData={setPivotalData}/>
      </main>
    );
  } else {
    return (
      <main>
        <h1>Login with user:</h1>
        <pre>{pivotalState.xtoken}</pre>
      </main>
    );
  }
}
