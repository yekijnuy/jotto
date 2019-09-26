import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input from "./Input";

/**
 * Factory function to create a ShallowWrapper for the Input component
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  // dive() returns the one level of children.so in this case provider to input to it's inner workings
  // added the created store as a prop to our connected component
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    test("renders component without error", () => {});
    test("renders input box", () => {});
    test("renders submit button", () => {});
  });
  describe("word has been guessed", () => {
    // scope the wrapper to the describe
    let wrapper;
    beforeEach(() => {
      // create your initialState to use
      const initialState = { success: false };
      // create the wrapper;
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
});

describe("update state", () => {});
