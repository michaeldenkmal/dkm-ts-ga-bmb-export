import './App.css'

import "./index.css";
import type {MayBeDate} from "@at.dkm/dkm-ts-lib-gen/lib/may_be_types";
import NativeDateInput from "./dkm_comps/NativeDateInput.tsx";
import {useState} from "react";
import * as ga_bmb_ws from "./ws/ga_bmb_ws.ts";
import useFileDownload from "./ws/useFileDownload.ts";
import {DKM_BUILD_VERSION} from "./version.ts";




function App() {
    const [s_von, s_setVon] = useState<MayBeDate>();
    const [s_bis, s_setBis] = useState<MayBeDate>();
    const theFileDownload = useFileDownload()
    const [s_isLoading, s_setIsLoading] = useState(false)



    function calcBtnStartDisabled():boolean {
        if (!s_von) {
            return true;
        }
        if (!s_bis) {
            return true;
        }
        return false;
    }

    async function btnStartClick(debug:boolean) {
        if (!s_von || !s_bis) {
            return;
        }
        const url:string = debug ?
            ga_bmb_ws.buildWebSrvcUrl("export_bmb_by_zr_debug")
            : ga_bmb_ws.buildWebSrvcUrl("export_bmb_by_zr");
        const payLoad:ga_bmb_ws.ExportBmbByZrPars = {
            von: s_von, bis:s_bis
        }
        const filename  =debug ? "export_bmb_by_zr_debug.csv":"export_bmb_by_zr.csv";
        theFileDownload.resetError();
        s_setIsLoading(true);
        await theFileDownload.downloadFile(url, {
                filename,
                payload:payLoad,
                downloadMethod: "POST"
            })
        s_setIsLoading(false)
    }
    function renderLoading() {
        if (s_isLoading) {
            return <div>wird generiert...</div>
        }
    }
    return (
        <div className={"text-center m-4 "}>
            <div className={"error"}>{theFileDownload.getError()}</div>
            <div className={"status"}>{renderLoading()}</div>
            <div className={"text-right"}>{DKM_BUILD_VERSION} </div>
            <h1 className={"dkm-h1 text-left"}>BMB Abwesenheiten exportieren</h1>
            <div className={""}>
                <fieldset className={"flex gap-1"}>
                    <div className={"w-50"}>
                    <label className={"mr-2"}>von</label>
                    <NativeDateInput value={s_von}
                                     onChange={v=> s_setVon(v)}/>
                    </div>
                    <div className={"w-50"}>
                        <label className={"mr-2"} >bis</label>
                        <NativeDateInput value={s_bis}
                                         onChange={v=> s_setBis(v)}/>
                    </div>
                    <div className={""}>
                        <button className={"dkm-button"} disabled={calcBtnStartDisabled()}
                                onClick={()=> btnStartClick(false)}
                        >Download Starten</button>
                    </div>
                    <div className={""}>
                        <button className={"dkm-button"} disabled={calcBtnStartDisabled()}
                                onClick={()=>btnStartClick(true)}
                        >Download mit erweiterten Infos Starten</button>
                    </div>
                </fieldset>
            </div>
            <div>

            </div>
        </div>
    )
}

export default App
