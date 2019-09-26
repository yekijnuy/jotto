import { correctGuess, actionTypes } from "./index";

describe("correctGuess", () => {
  test("returns an action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    // can't use toBe for mutable data types.  A deep equal is required, recursively compare
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
  });
});
