import React from 'react';
import { render, act } from '@testing-library/react';
import BookContextProvider, { BookContext } from '../BookContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

beforeAll(() => {
  global.localStorage = localStorageMock;
});

beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
});

describe('BookContextProvider', () => {
  test('loads books from localStorage on initial render', () => {
    const mockBooks = [{ id: '1', title: 'Saved Book', author: 'Saved Author' }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBooks));

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(BookContext);
      return null;
    };

    render(
      <BookContextProvider>
        <TestComponent />
      </BookContextProvider>
    );

    expect(contextValue.books).toEqual(mockBooks);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('books');
  });

  test('uses empty array when no books in localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null);

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(BookContext);
      return null;
    };

    render(
      <BookContextProvider>
        <TestComponent />
      </BookContextProvider>
    );

    expect(contextValue.books).toEqual([]);
  });

  test('addBook function adds a new book', () => {
    localStorageMock.getItem.mockReturnValue(null);

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(BookContext);
      return null;
    };

    render(
      <BookContextProvider>
        <TestComponent />
      </BookContextProvider>
    );

    act(() => {
      contextValue.addBook('New Title', 'New Author');
    });

    expect(contextValue.books).toHaveLength(1);
    expect(contextValue.books[0].title).toBe('New Title');
    expect(contextValue.books[0].author).toBe('New Author');
    expect(contextValue.books[0].id).toBeDefined();
  });

  test('removeBook function removes a book', () => {
    const mockBooks = [
      { id: '1', title: 'Book 1', author: 'Author 1' },
      { id: '2', title: 'Book 2', author: 'Author 2' }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBooks));

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(BookContext);
      return null;
    };

    render(
      <BookContextProvider>
        <TestComponent />
      </BookContextProvider>
    );

    act(() => {
      contextValue.removeBook('1');
    });

    expect(contextValue.books).toHaveLength(1);
    expect(contextValue.books[0].id).toBe('2');
  });

  test('saves books to localStorage when books change', () => {
    localStorageMock.getItem.mockReturnValue(null);

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(BookContext);
      return null;
    };

    render(
      <BookContextProvider>
        <TestComponent />
      </BookContextProvider>
    );

    act(() => {
      contextValue.addBook('Test Book', 'Test Author');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'books',
      JSON.stringify(contextValue.books)
    );
  });
});