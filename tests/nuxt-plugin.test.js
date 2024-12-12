import plugin from '../nuxt/plugin'

// Mock the template literal processing that Nuxt would normally do
jest.mock('../nuxt/plugin.js', () => {
  const actualPlugin = jest.requireActual('../nuxt/plugin.js')
  const wrappedPlugin = function(ctx, inject) {
    // Mock the template string replacement
    global.JSON.parse = jest.fn().mockReturnValue({
      accountId: ctx.$config.dripAccountId
    })
    return actualPlugin.default(ctx, inject)
  }
  // Need to return an object with default export to match ES module structure
  return {
    __esModule: true,
    default: wrappedPlugin
  }
})

describe('Nuxt Drip Plugin', () => {
  let inject
  let ctx

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = ''

    // Add a dummy script tag to the DOM
    const dummyScript = document.createElement('script')
    document.body.appendChild(dummyScript)

    inject = jest.fn()
    ctx = {
      $config: {
        dripAccountId: 'test-account-id'
      }
    }
    // Mock console methods
    global.console.log = jest.fn()
    global.console.warn = jest.fn()
    // Set client-side by default
    global.process.client = true
  })

  describe('client-side', () => {
    it('should initialize Drip and inject methods', () => {
      plugin(ctx, inject)

      expect(inject).toHaveBeenCalledWith('drip', expect.any(Object))
      expect(inject.mock.calls[0][1]).toHaveProperty('track')
      expect(inject.mock.calls[0][1]).toHaveProperty('identify')

      expect(console.log).toHaveBeenCalledWith(
        '📢 [Drip Plugin]:',
        'Initializing Drip plugin with options:',
        expect.any(Object)
      )
    })
  })

  describe('server-side', () => {
    beforeEach(() => {
      global.process.client = false
    })

    it('should inject empty functions with warnings', () => {
      plugin(ctx, inject)

      const injectedMethods = inject.mock.calls[0][1]

      injectedMethods.track('test')
      expect(console.warn).toHaveBeenCalledWith(
        '⚠️ [Drip Plugin]:',
        'Drip track called during SSR'
      )

      injectedMethods.identify('test@example.com')
      expect(console.warn).toHaveBeenCalledWith(
        '⚠️ [Drip Plugin]:',
        'Drip identify called during SSR'
      )
    })
  })
})
