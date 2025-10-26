import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithProviders, mockContextValue } from '../testUtils.jsx';
import EditForm from '../../pages/EditForm';

describe('EditForm Component', () => {
  let mockUpdateProduct;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    origin: 'Test Origin',
    price: 19.99,
    description: 'Test Description'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateProduct = vi.fn().mockResolvedValue({});
  });

  const mockContext = {
    products: [mockProduct],
    filteredProducts: [mockProduct],
    searchTerm: '',
    selectedOrigin: '',
    setSearchTerm: vi.fn(),
    setSelectedOrigin: vi.fn(),
    updateProduct: mockUpdateProduct,
    deleteProduct: vi.fn(),
    addProduct: vi.fn()
  };

  it('renders without crashing', () => {
    renderWithProviders(
      <EditForm product={mockProduct} setEditToggle={vi.fn()} />, 
      { contextValue: mockContext }
    );
    expect(document.body).toBeInTheDocument();
  });

  it('renders form fields with existing product data', () => {
    renderWithProviders(
      <EditForm product={mockProduct} setEditToggle={vi.fn()} />, 
      { contextValue: mockContext }
    );
    
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Origin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('19.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('updates input values when edited', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <EditForm product={mockProduct} setEditToggle={vi.fn()} />, 
      { contextValue: mockContext }
    );
    
    const nameInput = screen.getByDisplayValue('Test Product');
    
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Product');
    
    expect(nameInput.value).toBe('Updated Product');
  });

  it('renders form fields with existing product data', () => {
    renderWithProviders(<EditForm product={mockProduct} setEditToggle={vi.fn()} />, { contextValue: mockContextValue });
    
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Origin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('19.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });
});