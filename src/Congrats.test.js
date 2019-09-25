// will be using JSX
import React from "react";
// need to configure Enzyme and utilize shallow rendering components and virtual doms
import Enzyme, { shallow } from "enzyme";
// utilize the Enzyme adapter for React
import EnzymeAdapter from "enzyme-adapter-react-16";
// utility function to be used by all test files
import { findbyTestAttr, findByTestAttr } from "../test/testUtils";
// handing the Congrats component to shallow
import Congrats from "./Congrats";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  // spread operator will take the key value pairs and make them as
  // attributes {success: true} ===> <Congrats success=true />
  return shallow(<Congrats {...props} />);
};

// always render tests are good first
test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when `success` props is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when success prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
