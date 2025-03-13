# Steps

# TODO
-  [ ] Remove @swc/helpers from user app
-  [ ] @JavaProxy and metadata

# Intall dependencies
- `npm i`
- `cd @nativescript-rspack`
- `npm i`


# Change cli

update your global node_modules/nativescript `lib/services/webpack/webpack-compiler-service.js`
```
isWebpack5(projectData) {
        return true;
}
```

and

```
getWebpackExecutablePath(projectData) {
    return '/your_project_path/@nativescript-rspack/dist/bin/index.js';
}

```

## Build `@nativescript/rspack`
```
cd @nativescript-rspack
npm run build:watch
```

## RUN!!!
`ns run android`

enjoy!