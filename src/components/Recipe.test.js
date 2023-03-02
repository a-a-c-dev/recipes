import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 

import Recipe  from './Recipe';

describe('Recipe component', () => {
  test('should render the props that been pass', () => {
    const ingredients = [{text:'2 cups leftover pasta'}];
    render(<Recipe url='/pasta' title="pasta" calories='1423' ingredients={ingredients} />);
    const titleElement = screen.getByRole('title');
    const ingredientsElements = screen.getAllByRole('ingredients');
    const anchorElements = screen.getByText(/See More/i);
    const caloriesElement = screen.getByRole('calories');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('pasta');
    expect(anchorElements).toHaveAttribute('href','/pasta')
    expect(caloriesElement).toBeInTheDocument();
    expect(caloriesElement).toHaveTextContent('1423');
    expect(ingredientsElements[0]).toHaveTextContent(ingredients[0].text);
  });
});