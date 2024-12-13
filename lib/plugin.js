export default function (ctx, inject) {
  // Parse options from module configuration
  const options = JSON.parse('<%= JSON.stringify(options) %>')

  // Drip snippet
  const initDrip = () => {
    if (typeof window._dcq === 'undefined') {
      window._dcq = window._dcq || []
      window._dcat = window._dcat || []
      window._dcq.push(['setAccount', options.accountId])

      const dc = document.createElement('script')
      dc.type = 'text/javascript'
      dc.async = true
      dc.src = `https://tag.getdrip.com/${options.accountId}.js`
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(dc, s)
    }
  }

  // Create module API
  const moduleAPI = {
    // Initialize Drip
    init() {
      if (options.debug) {
        console.log('Debug: Initializing Drip')
      }
      if (!options.enabled) {
        if (options.debug) {
          console.log('Debug: Drip is disabled')
        }
        return
      }
      initDrip()
    },

    // Track event method
    track(event, properties = {}) {
      if (options.debug) {
        console.log('Debug: Tracking event', event, properties)
      }
      if (!window._dcq) {
        console.warn('Drip is not initialized')
        return
      }
      window._dcq.push(['track', event, properties])
    },

    // Identify user method
    identify(email, properties = {}) {
      if (options.debug) {
        console.log('Debug: Identifying user', email, properties)
      }
      if (!window._dcq) {
        console.warn('Drip is not initialized')
        return
      }
      window._dcq.push(['identify', { email, ...properties }])
    }
  }

  // Inject module
  inject('drip', moduleAPI)

  // Auto-initialize if enabled
  if (options.enabled && process.client) {
    // Wait for Vue to be ready
    ctx.app.router.onReady(() => {
      moduleAPI.init()
    })

    // Track page views if enabled
    if (options.trackPages) {
      ctx.app.router.afterEach((to) => {
        moduleAPI.track('Viewed Page', {
          path: to.fullPath,
          url: window.location.origin + to.fullPath,
          title: document.title
        })
      })
    }
  }
}
