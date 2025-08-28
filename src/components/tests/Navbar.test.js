import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { renderWithContext } from '../../../test-utils';

describe('Navbar', () => {
  test('renders navbar with correct text for 0 books', () => {
    renderWithContext(<Navbar />, { books: [] });

    expect(screen.getByText('Mano skaitinių sąrašas')).toBeInTheDocument();
    expect(screen.getByText('Šiuo metu turiu 0 knygas, kurias noriu perskaityti')).toBeInTheDocument();
  });

  test('renders navbar with correct text for 1 book', () => {
    const mockBooks = [{ id: '1', title: 'Book 1', author: 'Author 1' }];

    renderWithContext(<Navbar />, { books: mockBooks });

    expect(screen.getByText('Šiuo metu turiu 1 knygas, kurias noriu perskaityti')).toBeInTheDocument();
  });

  test('renders navbar with correct text for multiple books', () => {
    const mockBooks = [
      { id: '1', title: 'Book 1', author: 'Author 1' },
      { id: '2', title: 'Book 2', author: 'Author 2' }
    ];

    renderWithContext(<Navbar />, { books: mockBooks });

    expect(screen.getByText('Šiuo metu turiu 2 knygas, kurias noriu perskaityti')).toBeInTheDocument();
  });
});