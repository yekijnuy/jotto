import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("returns default initial state of `false` when no action is passed", () => {
  // if you use a switch to call action.type, you need 'undefined, {}'
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type `CORRECT_GUESS`", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS
  });
  expect(newState).toBe(true);
});
