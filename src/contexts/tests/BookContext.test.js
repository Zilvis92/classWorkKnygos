import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import BookContextProvider, { BookContext } from '../BookContext';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

beforeAll(() => {
  global.localStorage = localStorageMock;
});

beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
});

// Testinis komponentas, kuris atvaizduoja konteksto reikšmes
const TestComponent = ({ testId }) => {
  const { books, addBook, removeBook } = React.useContext(BookContext);
  
  return (
    <div data-testid={testId || "test-component"}>
      <span data-testid="books-length">{books.length}</span>
      <span data-testid="books-data">{JSON.stringify(books)}</span>
      <button onClick={() => addBook('Test Title', 'Test Author')} data-testid="add-button">
        Add Book
      </button>
      <button onClick={() => removeBook('1')} data-testid="remove-button">
        Remove Book
      </button>
    </div>
  );
};

describe('BookContextProvider', () => {
  test('loads books from localStorage on initial render', async () => {
    const mockBooks = [{ id: '1', title: 'Saved Book', author: 'Saved Author' }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBooks));

    render(
      <BookContextProvider>
        <TestComponent testId="test-1" />
      </BookContextProvider>
    );

    // Palaukiame kol useEffect bus įvykdytas
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('1');
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('books-data')).toHaveTextContent(JSON.stringify(mockBooks));
    });
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('books');
  });

  test('uses empty array when no books in localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <BookContextProvider>
        <TestComponent testId="test-2" />
      </BookContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('0');
    });
  });

  test('addBook function adds a new book', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    render(
      <BookContextProvider>
        <TestComponent testId="test-3" />
      </BookContextProvider>
    );

    // Patikriname pradinę būseną
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('0');
    });

    // Iškviečiame addBook funkciją
    await act(async () => {
      screen.getByTestId('add-button').click();
    });

    // Tikriname rezultatą
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('1');
    });
  });

  test('removeBook function removes a book', async () => {
    const mockBooks = [
      { id: '1', title: 'Book 1', author: 'Author 1' },
      { id: '2', title: 'Book 2', author: 'Author 2' }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockBooks));

    render(
      <BookContextProvider>
        <TestComponent testId="test-4" />
      </BookContextProvider>
    );

    // Palaukiame kol komponentas užsikraus
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('2');
    });

    // Iškviečiame removeBook funkciją
    await act(async () => {
      screen.getByTestId('remove-button').click();
    });

    // Tikriname rezultatą
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('1');
    });
  });

  test('saves books to localStorage when books change', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    render(
      <BookContextProvider>
        <TestComponent testId="test-5" />
      </BookContextProvider>
    );

    // Palaukiame kol komponentas užsikraus
    await waitFor(() => {
      expect(screen.getByTestId('books-length')).toHaveTextContent('0');
    });

    // Iškviečiame addBook funkciją
    await act(async () => {
      screen.getByTestId('add-button').click();
    });

    // Tikriname ar buvo iškviestas setItem
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });
});