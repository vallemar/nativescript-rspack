# Steps

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

## Update node_modules in project
entry in node_modules/vue-loader/pluginWebpack5.js and replace

```
webpack/lib
// to
/your_project_path/@nativescript-rspack/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/rules/RuleSetCompiler

```

## RUN!!!
`ns run android`

enjoy!