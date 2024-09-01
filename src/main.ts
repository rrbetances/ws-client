import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt" placeholder="Json web token" />
    <button id="btn-connect">Connect</button>
    <br/>
    <span id="server-status">offline</span>
    
    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`
//connectToServer();

const jwt = document.querySelector<HTMLInputElement>('#jwt')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if(jwt.value.trim().length <= 0) return alert('Enter a valid token');

  connectToServer(jwt.value.trim());
});



