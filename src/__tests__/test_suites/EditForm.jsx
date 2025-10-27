import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../testUtils.jsx';
import EditForm from '../../components/EditForm.jsx';

describe('EditForm Component', () => {
  let mockUpdateProduct;
  let mockOnCancel;

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
    mockOnCancel = vi.fn();
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
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    expect(document.body).toBeInTheDocument();
  });

  it('renders all form fields with existing product data', () => {
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Origin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('19.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  it('renders save and cancel buttons', () => {
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('updates input values when edited', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    const nameInput = screen.getByDisplayValue('Test Product');
    
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Product');
    
    expect(nameInput.value).toBe('Updated Product');
  });

  it('calls updateProduct when form is submitted', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    // Edit the name field
    const nameInput = screen.getByDisplayValue('Test Product');
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Product');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    expect(mockUpdateProduct).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        name: 'Updated Product',
        origin: 'Test Origin',
        price: '19.99',
        description: 'Test Description'
      })
    );
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('focuses on first input when component mounts', () => {
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    const nameInput = screen.getByDisplayValue('Test Product');
    expect(nameInput).toHaveFocus();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <EditForm product={mockProduct} onCancel={mockOnCancel} />, 
      { contextValue: mockContext }
    );
    
    // Clear a required field
    const nameInput = screen.getByDisplayValue('Test Product');
    await user.clear(nameInput);
    
    // Try to submit
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    // updateProduct should not be called with empty required field
    expect(mockUpdateProduct).not.toHaveBeenCalled();
  });
});