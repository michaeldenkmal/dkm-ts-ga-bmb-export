// file: ga_bmb_ws.ts
import {DkmUrlBuilder} from "@at.dkm/dkm-ts-lib-websrvc/lib/dkm_url_builder";

const CONTEXT_NAME="wa_ga_anwlst";
const WS_APP_NAME="ws_ga_anwlst";
const RES_NAME="ga_bmb";


export function buildWebSrvcUrl(funcName: string,pathParams?:string[]) {
    return DkmUrlBuilder.buildFullWebSrvcUrl({
        pathParams: pathParams ||[],
        funcName,
        WS_APP_NAME,
        RES_NAME,
        CONTEXT_NAME
    });
}

export interface ExportBmbByZrPars{
    von:Date
    bis:Date
    ignoreErrorsAndLog:boolean
}



/*
// @POST
// @Consumes(Array(MediaType.APPLICATION_JSON))
// @Produces(Array(MediaType.APPLICATION_JSON))
// @Path("/get_uebstell_grd_by_wb_id")
interface GetUebstellGrdByWbIdParams{
    wbId:number
}

export function getUebstellGrdByWbId(wbId:number):Promise<anmwlst_m.UebstellGrdCbxRec[]> {
    const url = buildWebSrvcUrl("get_uebstell_grd_by_wb_id",[]);
    const data:GetUebstellGrdByWbIdParams = {
        wbId
    }
    return createPostPromise(url, data);
}
*/
