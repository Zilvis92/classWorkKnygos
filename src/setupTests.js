// src/setupTests.js
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

// Mock UUID
jest.mock('uuid', () => ({
  v4: jest.fn()
    .mockReturnValueOnce('mocked-uuid-1')
    .mockReturnValueOnce('mocked-uuid-2')
    .mockReturnValueOnce('mocked-uuid-3')
    .mockReturnValue('mocked-uuid-default')
}));