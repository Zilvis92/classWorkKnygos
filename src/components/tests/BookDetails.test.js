import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookContext } from '../../contexts/BookContext';
import BookDetails from '../BookDetails';

describe('BookDetails', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author'
  };

  const mockRemoveBook = jest.fn();

  beforeEach(() => {
    mockRemoveBook.mockClear();
  });

  test('renders book details correctly', () => {
    render(
      <BookContext.Provider value={{ removeBook: mockRemoveBook, books: [] }}>
        <BookDetails book={mockBook} />
      </BookContext.Provider>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  test('calls removeBook when clicked', () => {
    render(
      <BookContext.Provider value={{ removeBook: mockRemoveBook, books: [] }}>
        <BookDetails book={mockBook} />
      </BookContext.Provider>
    );

    const bookElement = screen.getByText('Test Book');
    fireEvent.click(bookElement);

    expect(mockRemoveBook).toHaveBeenCalledWith('1');
    expect(mockRemoveBook).toHaveBeenCalledTimes(1);
  });
});