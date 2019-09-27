import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

describe("getSecretWord action creator", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("adds response word to state", () => {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(() => {
      // the interceptor of the axios request
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    // note we are returning a promise, dispatch the AC
    // YOU MUST RETURN THE store.dispatch which returns a promise
    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});
