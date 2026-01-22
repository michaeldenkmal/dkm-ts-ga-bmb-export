import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ToastCenterProvider} from "./dkm_comps/ToastCenterContext.tsx";

import {initIDbConf} from "@at.dkm/dkm-ts-lib-websrvc/lib/IDbConf";
import {dispatchErrorEvt} from "./dkm_comps/global_event_util.ts";

const myurl = document.location.href;


if (myurl.startsWith("http://localhost:517")) {
    initIDbConf(myurl, "", {
        "wa_ga_anwlst": "http://localhost:8084"
        // "wa_ga_gastv":"http://localhost:8084",
        // "wa_ga_anwlst":"http://localhost:8084",
        // "dkmMVC":"http://localhost:8084",
        // "wa_ga_grpvw23":"http://localhost:8084"
    })
    setupReactRoot();
} else {
    // TODO
    initIDbConf(myurl, "", {
        //[DKMFAKT_APPDKMFAKT_CONTEXT]: "http://localhost:8000"
        // "wa_ga_gastv":"http://localhost:8084",
        // "wa_ga_anwlst":"http://localhost:8084",
        // "dkmMVC":"http://localhost:8084",
        // "wa_ga_grpvw23":"http://localhost:8084"
    })
    setupReactRoot();
}

window.onerror = function (msg, url, line, col, error) {
    const errinfo = `colno=${col}, filename=${url}, lineno=${line}},${msg}, err=${error as any}`
    document.body.innerHTML = errinfo;
}

window.addEventListener("unhandledrejection", function (event) {
    dispatchErrorEvt({
        msg: event.reason,
    })
});


function setupReactRoot() {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <ToastCenterProvider>
                <App/>
            </ToastCenterProvider>
        </StrictMode>,
    )
}
