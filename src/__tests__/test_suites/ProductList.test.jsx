import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductList from '../../pages/ProductList';
import { renderWithProviders, mockContextValue } from '../testUtils';

describe('ProductList Component', () => {
  it('displays "No products available" when no products', () => {
    const emptyContext = { ...mockContextValue, searchedProducts: null };
    renderWithProviders(<ProductList />, { contextValue: emptyContext });
    
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  it('displays products when available', () => {
    renderWithProviders(<ProductList />, { contextValue: mockContextValue });
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('renders search component', () => {
    renderWithProviders(<ProductList />, { contextValue: mockContextValue });
    
    expect(screen.getByText('Search Products')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders products in a container', () => {
    renderWithProviders(<ProductList />, { contextValue: mockContextValue });
    
    const container = document.querySelector('.products-container');
    expect(container).toBeInTheDocument();
  });
});