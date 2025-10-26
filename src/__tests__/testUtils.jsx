import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { vi } from 'vitest';

// Mock data for testing
export const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    origin: 'Origin 1',
    price: 10.99,
    description: 'Description 1'
  },
  {
    id: 2,
    name: 'Product 2',
    origin: 'Origin 2',
    price: 25.50,
    description: 'Description 2'
  },
  {
    id: 3,
    name: 'Product 3',
    origin: 'Origin 1',
    price: 15.00,
    description: 'Description 3'
  }
];

// Mock context value matching actual ProductContext
export const mockContextValue = {
  products: mockProducts,
  search: '',
  selectedOrigins: [],
  loading: false,
  error: null,
  
  origins: ['Origin 1', 'Origin 2'],
  filteredByOrigin: mockProducts,
  searchedProducts: mockProducts,
  
  handleOriginChange: vi.fn(),
  handleSearchChange: vi.fn(),
  setSearch: vi.fn(),
  updateProduct: vi.fn(() => Promise.resolve()),
  deleteProduct: vi.fn(() => Promise.resolve()),
  addProduct: vi.fn(() => Promise.resolve())
};

// Custom render function that includes providers
export const renderWithProviders = (ui, options = {}) => {
  const {
    contextValue = mockContextValue,
    initialEntries = ['/'],
    ...renderOptions
  } = options;

  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <ProductContext.Provider value={contextValue}>
          {children}
        </ProductContext.Provider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Custom render with router only
export const renderWithRouter = (ui, options = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options;

  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Helper function to create mock fetch responses
export const createMockResponse = (data, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data))
  });
};

// Helper function to wait for async operations
export const waitFor = (callback, options) => {
  return import('@testing-library/react').then(({ waitFor }) => 
    waitFor(callback, options)
  );
};

// Re-export commonly used testing utilities
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';