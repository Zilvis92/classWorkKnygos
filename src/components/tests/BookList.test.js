import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookContext } from '../../contexts/BookContext';
import BookList from '../Knygos';

describe('BookList', () => {
  test('renders empty state when no books', () => {
    render(
      <BookContext.Provider value={{ books: [], addBook: jest.fn(), removeBook: jest.fn() }}>
        <BookList />
      </BookContext.Provider>
    );

    expect(screen.getByText('Nėra skaitinių! Labas, laisvalaiki!')).toBeInTheDocument();
  });

  test('renders list of books', () => {
    const mockBooks = [
      { id: '1', title: 'Book 1', author: 'Author 1' },
      { id: '2', title: 'Book 2', author: 'Author 2' }
    ];

    render(
      <BookContext.Provider value={{ books: mockBooks, addBook: jest.fn(), removeBook: jest.fn() }}>
        <BookList />
      </BookContext.Provider>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
  });

  test('does not render empty state when books exist', () => {
    const mockBooks = [{ id: '1', title: 'Book 1', author: 'Author 1' }];

    render(
      <BookContext.Provider value={{ books: mockBooks, addBook: jest.fn(), removeBook: jest.fn() }}>
        <BookList />
      </BookContext.Provider>
    );

    expect(screen.queryByText('Nėra skaitinių! Labas, laisvalaiki!')).not.toBeInTheDocument();
  });
});