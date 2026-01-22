# Node Version

```bash
 nvm use 22.20.0
```
# Git Sub repos

https://git-scm.com/book/en/v2/Git-Tools-Submodules

# Deployment

## Client builden

```cmd
 .\build.ps1
```

# Production url


http://localhost:8084/wa_ga_anwlst/gawebfiles/ga_bmb/dist/index.html

# Reducer in Forms

## fast-deep-equal ====

https://chatgpt.com/c/69118f33-6b44-832e-9dcd-f7b7d01b7a92

```bash
yarn add  fast-deep-equal@3
```


```typescript

import equal from "fast-deep-equal/es6";

useEffect(function () {
    if (!equal(props.guiData, lastApplied.current)) {
        s_dispGuiData({type:"set_data_direct", newData: props.guiData});
        lastApplied.current = props.guiData;
    }
}, [props.guiData, s_dispGuiData]);
```
## immer

Library für immutable Editing

```bash 
yarn add use-immer immmer
```

```typescript
// in einer Funktion COmponent

const [s_guiData, s_dispGuiData] = useImmerReducer(honFormReducer, props.guiData);

// Reducer
type Action =
    | { type: "set_data_direct", newData:HonGuiData }
    | { type: "set_weggeschickt"; istWeggeschickt: MayBeBool }
    | { type: "chg_work_rep_honararnr";
    honorarnr: MayBeString;
    rowIdx: Integer }
    |{ type:"set_do_id";
    do_id:Float
};

const handlers: CaseMap<HonGuiData, Action> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set_data_direct:(data,act)=>{return {...act.newData}},
    set_weggeschickt:(data,act )=> {
        data.hon_row.weggeschickt = act.istWeggeschickt
        data.hon_row_changed = true
    },
    chg_work_rep_honararnr:(data, act)=> {
        const workrow = data.work_rep_rows[act.rowIdx];
        workrow.honorarnr = act.honorarnr
        addToArrPropIfNotExists<HonGuiData,Float>( {
            elem: workrow.work_rep_float_nr,
            arr_prop:"work_rep_rows_changed",
            container_object:data
        })

    },
    set_do_id:(data, act)=> {
        data.hon_row.do_id = act.do_id
        data.hon_row_changed = true
    }
}

export function honFormReducer(guidata: HonGuiData, action: Action): HonGuiData|void {
    const fn = handlers[action.type];
    return fn(guidata,action as any)
}


```

