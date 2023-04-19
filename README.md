# GCP Extrnal iDP Impersonator

This library helps acquire Google Cloud JWT token from your external identity
provider's JWT token. This library first obtains a `Google OAuth 2.0 access token`
then exchanges it for a JWT token that can impersonate a GCP Service account.

## Installation

```bash
npm install --save gcp-external-idp-impersonator
```

## Configuration

In order for this lib to work, you need to add a `Workload Identity Pool`
and `Workload Identity Provider`, with a service account connect to it.

You can read more about the required configuration steps
[here](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers)

## Usage

```javascript
const options: Options = {
    //...
}

getAccessToken(options).then((token) => {
    // token available here
})
```

## Options

| Option         | Type    | Description                                                                                                                  |
|----------------|---------|------------------------------------------------------------------------------------------------------------------------------|
| authToken      | string  | Token from your identity provider                                                                                            |
| stsAudience    | string  | Audience according to [this](https://cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials#use_the_rest_api) |
| serviceAccount | string  | Email address of the service account you want to impersonate                                                                 |
| stsEndpoint    | string? | Optional. URL of Google STS Endpoint                                                                                         |
| iamAudience    | string? | Optional. Defaults to GCP audience, but can be changed if needed                                                             |