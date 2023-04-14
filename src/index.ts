const getAccessToken = async (authToken: string): Promise<string> => {
    const stsToken = await fetch("https://sts.googleapis.com/v1/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                "grantType": "urn:ietf:params:oauth:grant-type:token-exchange",
                "audience": "",
                "requestedTokenType": "urn:ietf:params:oauth:token-type:access_token",
                "subjectToken": authToken,
                "subjectTokenType": "urn:ietf:params:oauth:token-type:jwt",
                "scope": "https://www.googleapis.com/auth/cloud-platform"
            }
        )
    }).then(res => res.json()).then(res => res.access_token)
    return await fetch("https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/<service-account>:generateIdToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${stsToken}`
        },
        body: JSON.stringify({
            "audience": "32555940559.apps.googleusercontent.com",
            "includeEmail": "true"
        })
    }).then(res => res.json()).then(res => res.token)
}

export default getAccessToken