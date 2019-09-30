import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

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
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    // instance is the React component for your wrapper
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("`guessWord` action creator is a function prop", () => {
    const wrapper = setup();
    // seeing if the guessWord function is there
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";

  beforeEach(() => {
    // set up mock for 'guessWord'
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock
    };

    // set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    // add value to input box
    wrapper.setState({ currentGuess: guessedWord });

    // simulate click
    const submitButton = findByTestAttr(wrapper, "submit-button");
    // this will call `guessWord` prop call, look at the component
    // provide the actual event object
    submitButton.simulate("click", { preventDefault() {} });
  });
  test("`guessWord` runs on input button submit click", () => {
    const guessWordMockCallCount = guessWordMock.mock.calls.length;

    expect(guessWordMockCallCount).toBe(1);
  });
  test("calls `guessWord` with input value as argument", () => {
    // get the first argument array that is called - Remember that this is an array of arrays
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });
  test("input box clears on submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
