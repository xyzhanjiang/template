# react-bulma-admin

* Mobx

## Install

``` shell
npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

**babel.config.js**

``` javascript
module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [['@babel/plugin-proposal-decorators', { 'legacy': true }], '@babel/plugin-proposal-class-properties']
}
```

``` shell
npm install mobx --save
```

## Usage

``` javascript
import { makeObservable, observable, action, computed }
import { observer } from 'mobx-react-lite'

class Post {
  @observable page = 1

  @computed next() {
    return this.page + 1
  }

  constructor() {
    makeObservable(this)
  }
}

const post = new Post()

const Page = observer(() => (
  <ul>
    <li>{post.page}</li>
  </ul>
))
```
