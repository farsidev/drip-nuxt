import initDrip from '../src/index'

export default function (ctx, inject) {
  // Get drip options from nuxt.config.js
  const options = <%= JSON.stringify(options) %>

  const isProd = process.env.NODE_ENV === 'production'
  const log = {
    info: (...args) => !isProd && console.log('📢 [Drip Plugin]:', ...args),
    warn: (...args) => console.warn('⚠️ [Drip Plugin]:', ...args)
  }

  // Only initialize on client-side
  if (process.client) {
    log.info('Initializing Drip plugin with options:', options);
    const drip = initDrip(options.accountId)
    inject('drip', drip)
  } else {
    log.info('Server-side: Injecting empty functions');
    // Provide empty functions for SSR
    inject('drip', {
      identify: () => log.warn('Drip identify called during SSR'),
      track: () => log.warn('Drip track called during SSR')
    })
  }
}
