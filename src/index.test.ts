import {defaultOptions, mergeOptionsWithDefaults} from "./index";

test("mergeOptionsWithDefaults fills nullable fields", () => {
    const result = mergeOptionsWithDefaults({authToken: "asd", serviceAccount: "asd"});
    expect(result).toHaveProperty("stsEndpoint", defaultOptions.stsEndpoint)
    expect(result).toHaveProperty("iamAudience", defaultOptions.iamAudience)
})

test("mergeOptionsWithDefaults doesn't override given fields", () => {
    const result = mergeOptionsWithDefaults({authToken: "asd", serviceAccount: "asd", stsEndpoint: "else"});
    expect(result).toHaveProperty("stsEndpoint", "else")
    expect(result).toHaveProperty("iamAudience", defaultOptions.iamAudience)
})