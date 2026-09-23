# file-docs

Here you'll find some documentations and decisions about some project's files.

### tsdown.config.mts

```ts
// Down-level syntax so the output also runs on older Node.js versions and bundlers
target: 'es2015',
```

### .github/workflows/main.yml & .github/workflows/publish.yml

Actions are pinned by commit SHA (with the version in a comment) for supply-chain security:
unlike tags, a SHA cannot be moved to different code. Dependabot keeps them up to date.

#### Version example:

```yaml
actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # represents v7.0.1
```

#### Permission documentation:

```yaml
permissions:
  contents: write # push version commit/tags and create GitHub releases
  pull-requests: write # open the "Version Packages" PR
  id-token: write # npm provenance and JSR (OIDC) publishing
```

### scripts/sync-jsr-version.js
Keeps jsr.json in sync with the version bumped by `changeset version` in package.json.


### scripts/release.js
Release script run by changesets/action on every push to main (see .github/workflows/publish.yml).

Instead of `changeset publish` (which publishes directly), the package is sent to npm's staging
area with `npm stage publish`, so a maintainer must approve it on npmjs.com with 2FA before it
goes live. `changeset git-tag` then creates the git tag and reports it (through CHANGESETS_OUTPUT)
so the action pushes the tag, creates the GitHub release and triggers the JSR publish step.

The action also runs this script on pushes without a version bump: skip versions already released.
A version counts as released once its tag exists, because it is created right after staging.
