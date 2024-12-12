// Mock console methods
global.console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

// Mock process.env
process.env.NODE_ENV = 'development'
