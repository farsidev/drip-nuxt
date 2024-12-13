# drip-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Drip integration for Nuxt 2

## Features

- 🚀 Easy integration with Drip
- 📊 Track page views automatically
- 👤 Identify users and track their activities
- 🛒 E-commerce event tracking
- 🔄 Custom event tracking
- ⚡️ Lightweight and performant
- 🔒 TypeScript support

## Installation

1. Add `drip-nuxt` dependency to your project:

```bash
# Using npm
npm install drip-nuxt
```

2. Add `drip-nuxt` to the `modules` section of your `nuxt.config.js` file:

```js
export default {
  modules: ['drip-nuxt'],
}
```

3. Configure your Drip account settings:

- Go to your Drip account settings.
- Copy your Drip account ID.
- Paste it into the `nuxt.config.js` file.
- Add it to the `publicRuntimeConfig` in your `nuxt.config.js` file.
