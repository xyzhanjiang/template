# react-bulma-admin

![axios version](https://img.shields.io/github/package-json/dependency-version/xyzhanjiang/react-bulma-admin/axios) ![bulma version](https://img.shields.io/github/package-json/dependency-version/xyzhanjiang/react-bulma-admin/bulma) ![react version](https://img.shields.io/github/package-json/dependency-version/xyzhanjiang/react-bulma-admin/react) ![react-router version](https://img.shields.io/github/package-json/dependency-version/xyzhanjiang/react-bulma-admin/react-router-dom) ![mobx version](https://img.shields.io/github/package-json/dependency-version/xyzhanjiang/react-bulma-admin/mobx) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/xyzhanjiang/react-bulma-admin/pulls)

Experimental, [demo](https://xyzhanjiang.github.io/react-bulma-admin/)

* React
* React-router
* [Mobx](https://github.com/mobxjs/mobx)
* [Bulma](https://github.com/jgthms/bulma)
* [BulmaTemplates](https://github.com/BulmaTemplates/bulma-templates)

## Install

``` shell
git clone https://github.com/xyzhanjiang/react-bulma-admin.git
cd react-bulma-admin
npm install
```

## Usage

**Develop**

``` shell
npm run start
```

Visit localhost:3000

**Build**

``` shell
npm run build
```

## Structure

``` diff
bulma-admin
|- package.json
|- /public
  |- index.html  // home page
|- /src
  |- app.tsx      // the main application component
  |- index.tsx    // the entry point file for the application
  |- /common
  |- /components
  |- /config
  |- /css        // styles
  |- /data
  |- /images
  |- /store      // redux store
  |- /views      // page views
    |- about.tsx // about page
    |- index.tsx // index page
    |- login.tsx // login page
```

## Browser support

* Google Chrome 55+
* Safari 11+
* Firefox 52+
* Edge 15+
