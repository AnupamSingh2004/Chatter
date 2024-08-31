import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RecoilRoot} from "recoil";
import {SocketProvider} from "@/Context/SocketContext.jsx";

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <RecoilRoot>
        <SocketProvider>
            <App/>
        </SocketProvider>

    </RecoilRoot>
    // </StrictMode>,
)
