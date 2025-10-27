import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders, mockContextValue } from '../testUtils.jsx';
import Home from '../../pages/Home.jsx';
import ProductList from '../../pages/ProductList.jsx';

describe('Core Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test basic app navigation
  describe('Navigation', () => {
    it('renders home page correctly', () => {
      renderWithProviders(<Home />, { 
        contextValue: mockContextValue,
        initialEntries: ['/']
      });
      
      expect(screen.getByText('Welcome to the FlatShop')).toBeInTheDocument();
      expect(screen.getByText('Explore our collection of amazing products.')).toBeInTheDocument();
    });
  });

  // Test search functionality
  describe('Search and Filter', () => {
    it('provides search functionality', async () => {
      const user = userEvent.setup();
      const mockSetSearch = vi.fn();
      const testContext = {
        ...mockContextValue,
        setSearch: mockSetSearch
      };

      renderWithProviders(<ProductList />, { 
        contextValue: testContext 
      });

      // Search component should be present
      const searchInput = screen.getByPlaceholderText('Search...');
      expect(searchInput).toBeInTheDocument();
      
      // User can type in search box
      await user.type(searchInput, 'Product 1');

      // Verify search function was called
      expect(mockSetSearch).toHaveBeenCalled();
    });

    it('provides origin filter functionality', async () => {
      const user = userEvent.setup();
      const mockHandleOriginChange = vi.fn();
      const testContext = {
        ...mockContextValue,
        handleOriginChange: mockHandleOriginChange
      };

      renderWithProviders(<ProductList />, { 
        contextValue: testContext 
      });

      // Filter checkboxes should be present
      const originCheckbox = screen.getByLabelText('Origin 1');
      expect(originCheckbox).toBeInTheDocument();
      
      // User can click origin filter
      await user.click(originCheckbox);

      // Verify filter function was called
      expect(mockHandleOriginChange).toHaveBeenCalledWith('Origin 1');
    });
  });

  // Test context integration
  describe('Context Integration', () => {
    it('properly integrates with ProductContext', () => {
      renderWithProviders(<ProductList />, { 
        contextValue: mockContextValue 
      });

      // Verify that context data is being used
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();
      
      // Verify origins from context are displayed
      expect(screen.getByLabelText('Origin 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Origin 2')).toBeInTheDocument();
    });

    it('handles filtered product results', () => {
      const filteredContext = {
        ...mockContextValue,
        searchedProducts: [mockContextValue.products[0]] // Only first product
      };

      renderWithProviders(<ProductList />, { 
        contextValue: filteredContext 
      });

      // Should only show filtered product
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
    });
  });
});