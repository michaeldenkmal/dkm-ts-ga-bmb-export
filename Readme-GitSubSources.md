./src/dkm_comps

https://git-scm.com/book/en/v2/Git-Tools-Submodules

dkm_comps
git submodule add https://github.com/michaeldenkmal/dkm-ts-src-tw-react-native-comp.git dkm_comps


# submodule
## branch erstellen

```powershell
 git submodule foreach 'git checkout -b own_decimal_lib'
```

## status der submodule anzeigen

```powershell
 git submodule foreach 'git status'
```
