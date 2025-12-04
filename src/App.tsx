import './App.css'
import {Route, Router} from "wouter";

import "./index.css";




function App() {
    const globalDkmErrorData = useGlobalEvent(DKM_ERROR_EVENT);
    function renderHtmlViewer() {
        if (!globalDkmErrorData) {
            return null;
        }
        return <HtmlViewer html={globalDkmErrorData.msg}/>
    }

    return (
        <Router base="/">
            {renderHtmlViewer()}
            {/*<nav style={{marginBottom: "1rem"}}>*/}
            {/*    <Link href="/rech_list/start">Rechnungen</Link>*/}
            {/*</nav>*/}
            <Route path={"/"} ><HomeCtrl/></Route>
            <Route path={"/work_reps"} ><DkmWorkCtrl/></Route>
            <Route path="/rech_list/:search_key" >
                {params =>
                   <RechListCtrl searchKey={params.search_key}/>
                }
            </Route>
            <Route path="/rech_form/:vnr/:uq_search_key">
                {params =>
                    <RechFormCtrl vnr={parseFloat(params.vnr)} unique_search_key={params.uq_search_key}/>}
            </Route>
            <Route path="/hon_list/:search_key" >
                {params =>
                    <HonListCtrl searchKey={params.search_key}/>
                }
            </Route>
            <Route path="/hon_form/:hon_float_nr/:uq_search_key">
                {params =>
                    <HonFormCtrl hon_float_nr={parseFloat(params.hon_float_nr)} unique_search_key={params.uq_search_key}/>}
            </Route>
            <Route path="/hon_abr" >
                <HonAbrCtrl/>
            </Route>
            <Route path="/kuhon_form/:kuhon_nr">
                {params =>
                    <KuHonFormCtrl kuhon_nr={parseFloat(params.kuhon_nr)}/>
                    }
            </Route>
            <Route path={DkmFaktRouterConsts.getKuHonListUrl()} >
                <KuHonList/>
            </Route>
            {/* <Route path="/:rest*">{() => <h2>404 – not found</h2>}</Route> */}
        </Router>
    )
}

export default App
