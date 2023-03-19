import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, fireEvent, waitFor, act, getByRole,waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import 'mutationobserver-shim';
import App from './App';

// Mock the Recipes component


const server = setupServer(
  rest.get(' https://api.edamam.com/search', (req, res, ctx) => {
    return res(
      ctx.json({
        hits: [
                {recipe: {label: 'Pasta recipe 1', calories: 100}},
                {recipe: {label: 'Pasta recipe 2', calories: 200}},
                {recipe: {label: 'Pasta recipe 3', calories: 300}},
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('renders a list of recipes', async () => {
    // Create a mock function for the Recipes component

    // Arrange
    render(<App />);
  waitForElementToBeRemoved(()=>screen.getByText(/Still loading, please wait/i)).then(()=>{
        // Act
    screen.debug();     
    const recipes = screen.getByRole('recipes');
    expect(recipes).toBeInTheDocument();
    expect(recipes).toHaveLength(3);
    expect(recipes).toHaveTextContent('Pasta recipe 1');

  });


  });
  