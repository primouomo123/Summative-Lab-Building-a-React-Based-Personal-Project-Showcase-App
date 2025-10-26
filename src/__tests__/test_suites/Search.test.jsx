import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Search from '../../components/Search';
import { renderWithProviders, mockContextValue } from '../testUtils';

describe('Search Component', () => {
  it('renders search input field', () => {
    renderWithProviders(<Search 
      search={mockContextValue.search}
      setSearch={mockContextValue.setSearch}
      origins={mockContextValue.origins}
      onChange={mockContextValue.handleOriginChange}
      selectedOrigins={mockContextValue.selectedOrigins}
    />, { contextValue: mockContextValue });
    
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls setSearch when search input changes', async () => {
    const user = userEvent.setup();
    const mockSetSearch = vi.fn();
    
    renderWithProviders(<Search 
      search=""
      setSearch={mockSetSearch}
      origins={mockContextValue.origins}
      onChange={mockContextValue.handleOriginChange}
      selectedOrigins={mockContextValue.selectedOrigins}
    />, { contextValue: mockContextValue });
    
    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'test');
    
    expect(mockSetSearch).toHaveBeenCalled();
  });

  it('renders origin filter checkboxes', () => {
    renderWithProviders(<Search 
      search={mockContextValue.search}
      setSearch={mockContextValue.setSearch}
      origins={mockContextValue.origins}
      onChange={mockContextValue.handleOriginChange}
      selectedOrigins={mockContextValue.selectedOrigins}
    />, { contextValue: mockContextValue });
    
    expect(screen.getByLabelText('Origin 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Origin 2')).toBeInTheDocument();
  });

  it('calls onChange when origin checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    
    renderWithProviders(<Search 
      search={mockContextValue.search}
      setSearch={mockContextValue.setSearch}
      origins={mockContextValue.origins}
      onChange={mockOnChange}
      selectedOrigins={mockContextValue.selectedOrigins}
    />, { contextValue: mockContextValue });
    
    const checkbox = screen.getByLabelText('Origin 1');
    await user.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith('Origin 1');
  });
});