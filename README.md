# Auth0 Role Example

This demo application shows the different ways that users can take on different roles and memberships in Auth0
integrated applications.

## Project Setup

1. Set up an Auth0 application according to the Quickstart
   Guide ([Vue Quickstart](https://auth0.com/docs/quickstart/spa/vuejs)
   / [Get a free Auth0 Tenant](https://auth0.com/signup))
2. Clone this project, install dependencies and create an `.env` file:
   ```sh
   $ npm ci
   $ cp .env.example .env && rm .env.example
   ```
3. Populate the required data from the created Auth0 app into the environment variable file `.env`

### Compile and Hot-Reload for Development

```sh
$ npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
$ npm run build
```
