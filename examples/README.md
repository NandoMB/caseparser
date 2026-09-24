# Examples

Small projects using caseparser in different environments. They all do the same thing: convert an API response from snake_case to camelCase, then convert data back to snake_case, and print the result (see [expected-output.txt](./expected-output.txt)).

| Example | Environment | Run it |
| --- | --- | --- |
| [node-esm](./node-esm) | Node.js with `import` | `npm install && npm start` |
| [node-cjs](./node-cjs) | Node.js with `require()` | `npm install && npm start` |
| [typescript](./typescript) | TypeScript with `moduleResolution: "nodenext"`, showing the inferred types | `npm install && npm start` |
| [typescript-legacy](./typescript-legacy) | TypeScript 4.1 with CommonJS and `moduleResolution: "node"` | `npm install && npm start` |
| [bun](./bun) | Bun running TypeScript directly | `bun install && bun start` |
| [deno](./deno) | Deno, importing from [JSR](https://jsr.io/@nandomb/caseparser) | `deno task start` |
| [browser](./browser) | Plain HTML with an import map, no bundler | serve the folder (e.g. `npx serve examples/browser`) and open it |
| [cloudflare-worker](./cloudflare-worker) | Cloudflare Worker, running locally on `workerd` with wrangler | `npm install && npm run dev`, then open the URL it prints |

Every pull request runs all of them against the current code (`pnpm run test:examples`), so they always work with the latest version.
