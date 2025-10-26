import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductCard from '../../pages/ProductCard';
import { renderWithProviders, mockContextValue } from '../testUtils';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    origin: 'Test Origin',
    price: 19.99,
    description: 'Test Description'
  };

  it('renders without crashing', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, { contextValue: mockContextValue });
    expect(document.body).toBeInTheDocument();
  });

  it('displays product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, { contextValue: mockContextValue });
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Origin: Test Origin')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, { contextValue: mockContextValue });
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />, { contextValue: mockContextValue });
    
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});