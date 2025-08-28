import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookContext } from '../../contexts/BookContext';
import BookForm from '../BookForm';

describe('BookForm', () => {
  const mockAddBook = jest.fn();

  beforeEach(() => {
    mockAddBook.mockClear();
  });

  test('renders form with inputs and submit button', () => {
    render(
      <BookContext.Provider value={{ addBook: mockAddBook, books: [] }}>
        <BookForm />
      </BookContext.Provider>
    );

    expect(screen.getByPlaceholderText('Knygos pavadinimas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Autorius')).toBeInTheDocument();
    expect(screen.getByText('Pridėti knygą')).toBeInTheDocument();
  });

  test('allows user to fill the form', async () => {
    const user = userEvent.setup();
    render(
      <BookContext.Provider value={{ addBook: mockAddBook, books: [] }}>
        <BookForm />
      </BookContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText('Knygos pavadinimas');
    const authorInput = screen.getByPlaceholderText('Autorius');

    await user.type(titleInput, 'New Book');
    await user.type(authorInput, 'New Author');

    expect(titleInput).toHaveValue('New Book');
    expect(authorInput).toHaveValue('New Author');
  });

  test('submits form and calls addBook', async () => {
    const user = userEvent.setup();
    render(
      <BookContext.Provider value={{ addBook: mockAddBook, books: [] }}>
        <BookForm />
      </BookContext.Provider>
    );

    await user.type(screen.getByPlaceholderText('Knygos pavadinimas'), 'New Book');
    await user.type(screen.getByPlaceholderText('Autorius'), 'New Author');
    await user.click(screen.getByText('Pridėti knygą'));

    expect(mockAddBook).toHaveBeenCalledWith('New Book', 'New Author');
    expect(mockAddBook).toHaveBeenCalledTimes(1);
  });

  test('clears form after submission', async () => {
    const user = userEvent.setup();
    render(
      <BookContext.Provider value={{ addBook: mockAddBook, books: [] }}>
        <BookForm />
      </BookContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText('Knygos pavadinimas');
    const authorInput = screen.getByPlaceholderText('Autorius');

    await user.type(titleInput, 'New Book');
    await user.type(authorInput, 'New Author');
    await user.click(screen.getByText('Pridėti knygą'));

    expect(titleInput).toHaveValue('');
    expect(authorInput).toHaveValue('');
  });

  test('shows validation for required fields', async () => {
    const user = userEvent.setup();
    render(
      <BookContext.Provider value={{ addBook: mockAddBook, books: [] }}>
        <BookForm />
      </BookContext.Provider>
    );

    const submitButton = screen.getByText('Pridėti knygą');
    await user.click(submitButton);

    // Check that addBook was not called
    expect(mockAddBook).not.toHaveBeenCalled();
  });
});