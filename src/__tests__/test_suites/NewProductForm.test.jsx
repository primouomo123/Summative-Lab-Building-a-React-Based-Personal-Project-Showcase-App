import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockContextValue } from '../testUtils.jsx';
import NewProductForm from '../../pages/NewProductForm';

describe('NewProductForm Component', () => {
  let mockAddProduct;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAddProduct = vi.fn().mockResolvedValue({ id: 1 });
  });

  const mockContext = {
    products: [],
    filteredProducts: [],
    searchTerm: '',
    selectedOrigin: '',
    setSearchTerm: vi.fn(),
    setSelectedOrigin: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    addProduct: mockAddProduct
  };

  it('renders without crashing', () => {
    renderWithProviders(<NewProductForm />, { contextValue: mockContext });
    expect(document.body).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderWithProviders(<NewProductForm />, { contextValue: mockContext });
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('updates input values when typed', async () => {
    const user = userEvent.setup();
    renderWithProviders(<NewProductForm />, { contextValue: mockContext });
    
    const nameInput = screen.getByLabelText(/name/i);
    const originInput = screen.getByLabelText(/origin/i);
    
    await user.type(nameInput, 'Test Product');
    await user.type(originInput, 'Test Origin');
    
    expect(nameInput.value).toBe('Test Product');
    expect(originInput.value).toBe('Test Origin');
  });

  it('renders all form fields', () => {
    renderWithProviders(<NewProductForm />, { contextValue: mockContextValue });
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});