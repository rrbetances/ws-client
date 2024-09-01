import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (jwt: string) => {
    const manager = new Manager('https://teslo-shop-production-357f.up.railway.app/socket.io/socket.io.js', 
        {
            extraHeaders: {
                authentication: jwt
            }
        }
    );

    socket?.removeAllListeners();
    socket = manager.socket('/');
    

    AddListener();

    
}

const AddListener = () => {
    const clientsUl = document.querySelector('#clients-ul');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUl = document.querySelector('#messages-ul');
    const serverStatusLabel = document.querySelector('#server-status');


    socket.on('connect', ()=> {
        serverStatusLabel!.innerHTML = 'Connected';
    });

    socket.on('disconnect', ()=> {
        serverStatusLabel!.innerHTML = 'Disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';

        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        });

        clientsUl!.innerHTML = clientsHtml;
    })

    messageForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput?.value.trim().length! <= 0) return;

        socket.emit('message-from-client', {id: 'Yo', message: messageInput?.value});

        messageInput!.value = '';
    })

    socket.on('message-from-server' , (payload: { fullName: string, message: string }) => {

        const message = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `
        const li = document.createElement('li');
        li.innerHTML = message;

        messagesUl?.append(li);
    })
}
