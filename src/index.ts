export const mergeOptionsWithDefaults = (options: Options) => ({
    ...defaultOptions,
    ...options,
})
const getAccessToken = async (options: Options): Promise<string> => {
    const mergedOptions = mergeOptionsWithDefaults(options)

    const stsToken = await fetch(mergedOptions.stsEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                "grantType": "urn:ietf:params:oauth:grant-type:token-exchange",
                "audience": mergedOptions.stsAudience,
                "requestedTokenType": "urn:ietf:params:oauth:token-type:access_token",
                "subjectToken": mergedOptions.authToken,
                "subjectTokenType": "urn:ietf:params:oauth:token-type:jwt",
                "scope": "https://www.googleapis.com/auth/cloud-platform"
            }
        )
    }).then(res => res.json()).then(res => res.access_token)
    return await fetch(`https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${mergedOptions.serviceAccount}:generateIdToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${stsToken}`
        },
        body: JSON.stringify({
            "audience": mergedOptions.iamAudience,
            "includeEmail": "true"
        })
    }).then(res => res.json()).then(res => res.token)
}

export interface Options {
    authToken: string,
    stsAudience: string,
    serviceAccount: string,
    stsEndpoint?: string,
    iamAudience? : string
}

export const defaultOptions = {
    stsEndpoint: "https://sts.googleapis.com/v1/token",
    iamAudience: "32555940559.apps.googleusercontent.com"
}

export default getAccessToken