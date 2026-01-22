import {_prepareDataForJsonPost} from "@at.dkm/dkm-ts-lib-websrvc/lib/websrvc";
import {useState} from "react";

interface UseFileDownloadOpts {
    downloadMethod:"GET"|"POST"
    filename:string
    fetchInit?: RequestInit;
    payload?:any
    includeCred?:boolean
}

interface UseFileDownLoadRes {
    downloadFile:(url: string, opts: UseFileDownloadOpts)=> Promise<void>
    getError:()=>string
    resetError:()=>void
}

export default function useFileDownload():UseFileDownLoadRes {
    const [s_error,s_setError] = useState("");

    async function downloadFile(url: string, opts: UseFileDownloadOpts): Promise<void> {
        let response:Response;
        function handleErr(e) {
            s_setError(`ur=${url}:${e}`);
        }
        if (opts.downloadMethod=="GET") {
            response = await fetch(url, {
                method: "GET",
                     // falls Session/Cookies benötigt
                ...(opts && opts.fetchInit)
            });
        } else {
            let baseHeaders: HeadersInit = {
                "Content-Type": "application/json",
            };

            // Falls der Aufrufer eigene Header setzen will:
            if (opts && opts.fetchInit && opts.fetchInit.headers) {
                // merge, ohne Content-Type zu verlieren
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                baseHeaders = {
                    ...baseHeaders,
                    ...opts.fetchInit.headers,
                };
            }
            const jsonStr = _prepareDataForJsonPost(opts.payload,{
                wsDateFormat:"dkm_date_format"
            })
            try {
                response = await fetch(url, {
                    method: "POST",
                    //credentials: "include",      // falls Session/Cookies nötig
                    body: jsonStr,
                    ... (opts && opts.fetchInit),
                    headers: baseHeaders,
                });
                if (!response.ok) {
                    const contextText = await response.text();
                    const errmsg:string =`#${response.status}: ${contextText}`
                    handleErr(errmsg)
                } else {
                    //const contentDisposition = response.headers.get("Content-Disposition");
                    //const autoFilename = getFilenameFromContentDisposition(contentDisposition);

                    //const filename = (opts && opts.filename) ? opts.filename :;

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = blobUrl;
                    a.download = opts.filename;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(blobUrl);
                    s_setError("");
                }
            }
            catch (e) {
                handleErr(e)
            }
        }
    }

    function getError() {
        return s_error;
    }

    function resetError() {
        s_setError("");
    }

    return {
        downloadFile,
        getError,
        resetError
    }
}
