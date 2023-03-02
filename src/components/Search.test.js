import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Search from "./Search";
import 'mutationobserver-shim';
import { render, screen, fireEvent, debug , waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";



jest.mock("../hooks/useLocalStorage");

describe("Search component", () => {
  beforeEach(() => {
    useLocalStorage.mockReturnValue(["pasta", jest.fn()]);
  });

  test("renders search bar and button", () => {
    render(<Search />);
    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("updates search query when user types into search bar", async () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText("Type to search");
    fireEvent.change(inputElement, { target: { value: "chicken" } });
    await waitFor(() => expect(inputElement.value).toBe("chicken"));
  });

  test("disables search button when search query is invalid", async () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText("Type to search");
    fireEvent.change(inputElement, { target: { value: "" } });
    await waitFor(() => expect(screen.getByRole("button", { name: "Search" })).toBeDisabled());
  });
  test("should submit when pressing enter", () => {
    const addRecipes = jest.fn();
    render(<Search addRecipes={addRecipes} />);
    const inputElement = screen.getByPlaceholderText("Type to search");
    const formElement = screen.getByRole("searchForm");

    userEvent.type(inputElement, "pizza");
    fireEvent.submit(formElement);

    expect(addRecipes).toHaveBeenCalled();
  });


});