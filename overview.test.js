/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './client/src/components/App.jsx';
import Overview from './client/src/components/overview/Overview.jsx';
import Cart from './client/src/components/overview/Cart.jsx'
describe("Overview Tests", () => {
  test('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('App', () => {

  test('Should render App component', () => {
    render(<App />);
    const overviewElement = screen.getByTestId('overview-1');
    expect(overviewElement).toBeInTheDocument;
    expect(overviewElement).toHaveTextElement;
  });

  test('Should render Cart component', () => {
    render(<Cart />);
    // const cartElement = screen.getByTestId('cart-1')
  })


});