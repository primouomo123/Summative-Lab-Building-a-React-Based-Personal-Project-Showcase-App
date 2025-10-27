import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders, mockContextValue } from '../testUtils.jsx';
import NewProductForm from '../../pages/NewProductForm.jsx';
import EditForm from '../../components/EditForm.jsx';
import ProductList from '../../pages/ProductList.jsx';

describe('CRUD Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // CREATE - Test adding new products
  describe('Create Product', () => {
    it('allows user to create a new product', async () => {
      const user = userEvent.setup();
      const mockAddProduct = vi.fn(() => Promise.resolve({ id: 4 }));
      const testContext = {
        ...mockContextValue,
        addProduct: mockAddProduct
      };

      renderWithProviders(<NewProductForm />, { 
        contextValue: testContext 
      });

      // Fill out the form
      await user.type(screen.getByLabelText(/name/i), 'New Test Product');
      await user.type(screen.getByLabelText(/origin/i), 'Test Origin');
      await user.type(screen.getByLabelText(/price/i), '29.99');
      await user.type(screen.getByLabelText(/description/i), 'A great test product');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /save/i }));

      // Verify the addProduct function was called with correct data
      expect(mockAddProduct).toHaveBeenCalledWith({
        name: 'New Test Product',
        origin: 'Test Origin',
        price: '29.99',
        description: 'A great test product'
      });
    });
  });

  // READ - Test displaying products
  describe('Read Products', () => {
    it('displays all products from context', () => {
      renderWithProviders(<ProductList />, { 
        contextValue: mockContextValue 
      });

      // Check that all mock products are displayed
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Product 3')).toBeInTheDocument();

      // Check that product details are shown
      expect(screen.getByText('$10.99')).toBeInTheDocument();
      expect(screen.getByText('$25.5')).toBeInTheDocument();
      expect(screen.getByText('$15')).toBeInTheDocument();
    });

    it('handles empty product list', () => {
      const emptyContext = {
        ...mockContextValue,
        searchedProducts: null
      };

      renderWithProviders(<ProductList />, { 
        contextValue: emptyContext 
      });

      expect(screen.getByText('No products available')).toBeInTheDocument();
    });
  });

  // UPDATE - Test editing products
  describe('Update Product', () => {
    it('allows user to edit an existing product', async () => {
      const user = userEvent.setup();
      const mockUpdateProduct = vi.fn(() => Promise.resolve());
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        origin: 'Test Origin',
        price: 19.99,
        description: 'Test Description'
      };

      const testContext = {
        ...mockContextValue,
        updateProduct: mockUpdateProduct
      };

      renderWithProviders(
        <EditForm product={mockProduct} setEditToggle={vi.fn()} />, 
        { contextValue: testContext }
      );

      // Modify the form
      const nameInput = screen.getByDisplayValue('Test Product');
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Product Name');

      const priceInput = screen.getByDisplayValue('19.99');
      await user.clear(priceInput);
      await user.type(priceInput, '24.99');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /save/i }));

      // Verify updateProduct was called
      expect(mockUpdateProduct).toHaveBeenCalled();
    });
  });

  // DELETE - Test deleting products
  describe('Delete Product', () => {
    it('provides delete functionality for products', () => {
      renderWithProviders(<ProductList />, { 
        contextValue: mockContextValue 
      });

      // Check that delete buttons are available
      const deleteButtons = screen.getAllByText('Delete');
      expect(deleteButtons.length).toBeGreaterThan(0);
      
      // Each product should have a delete button
      expect(deleteButtons.length).toBe(3); // Number of mock products
    });
  });
});