import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 

import { Error } from './Error';

describe('Error component', () => {
  test('should render the error that is passing to it', () => {
    render(<Error err="Couldn`t find the recipes, please serach again" />);
    const textElement = screen.getByRole(/error-header/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('Couldn`t find the recipes, please serach again');
  });
});