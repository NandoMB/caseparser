# caseparser on Cloudflare Workers

A Worker that converts an API response from snake_case to camelCase, and returns the result of every `toX` function and option as JSON.

```sh
npm install
npm run dev     # runs the Worker locally on workerd, the runtime of Cloudflare Workers
```

Then open the URL it prints. `npm run deploy` publishes it to your Cloudflare account.

Every pull request runs this Worker against the current code (`pnpm run test:worker` in the repository root): it installs the package as it would be published to npm, runs the Worker with `wrangler dev`, and compares its response with the same conversions run on Node.js.
