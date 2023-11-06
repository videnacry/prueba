import { fetchLogin } from "./loginAPI";
// import crypto from '@trust/webcrypto'
// import { TextEncoder as pTextEncoder, TextDecoder as pTextDecoder } from 'util'

describe("login reducer", () => {
  it("should return an object with isLogged == true", async () => {
    localStorage.clear();
    const data = await fetchLogin({
      pEmail: "eve.holt@reqres.in",
      pPassword: "cityslicka",
    });
    expect(data.isLogged).toEqual(true);
  });
  it("should return an object with isLogged == false", async () => {
    localStorage.clear();
    const data = await fetchLogin({ pEmail: "errorerrorleon", pPassword: "" });
    expect(data.isLogged).toEqual(false);
  });
});
