import plugin from '../nuxt/plugin'

describe('Nuxt Drip Plugin', () => {
  let inject
  const ctx = {}

  beforeEach(() => {
    jest.clearAllMocks()
    inject = jest.fn()
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
