import initDrip from '../src/index'

describe('Drip Integration', () => {
  let drip
  const mockAccountId = '1234567'

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Reset DOM
    document.body.innerHTML = ''

    // Reset global Drip variables
    global._dcq = undefined
    global._dcs = undefined

    // Initialize Drip
    drip = initDrip(mockAccountId)
  })

  describe('initialization', () => {
    it('should initialize with valid account ID', () => {
      expect(global._dcq).toBeDefined()
      expect(global._dcs.account).toBe(mockAccountId)
      expect(console.log).toHaveBeenCalledWith(
        '📢 [Drip]:',
        'Initializing with account:',
        mockAccountId
      )
    })

    it('should return early and log error if no account ID provided', () => {
      const invalidDrip = initDrip()
      expect(console.error).toHaveBeenCalledWith(
        '🔴 [Drip]:',
        'Account ID is required'
      )
      expect(invalidDrip).toBeUndefined()
    })

    it('should inject Drip script into DOM', () => {
      const script = document.querySelector('script[src*="getdrip.com"]')
      expect(script).toBeTruthy()
      expect(script.src).toBe(`https://tag.getdrip.com/${mockAccountId}.js`)
      expect(script.async).toBe(true)
    })

    it('should not inject script twice', () => {
      initDrip(mockAccountId) // Second initialization
      const scripts = document.querySelectorAll('script[src*="getdrip.com"]')
      expect(scripts.length).toBe(1)
    })
  })

  describe('tracking methods', () => {
    it('should track events with properties', () => {
      const event = 'Test Event'
      const properties = { foo: 'bar' }

      drip.track(event, properties)

      expect(global._dcq).toContainEqual(['track', event, properties])
      expect(console.log).toHaveBeenCalledWith(
        '📢 [Drip]:',
        'Tracking event:',
        event,
        properties
      )
    })

    it('should identify users with properties', () => {
      const email = 'test@example.com'
      const properties = { name: 'Test User' }

      drip.identify(email, properties)

      expect(global._dcq).toContainEqual(['identify', { email, ...properties }])
      expect(console.log).toHaveBeenCalledWith(
        '📢 [Drip]:',
        'Identifying user:',
        email,
        properties
      )
    })
  })
})
