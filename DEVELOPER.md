# Quickstart

## Build

Builds must pass with Haddock enabled and no warnings in order for your PR to be accepted.

Make sure you have `yarn` installed via [corepack](https://yarnpkg.com/getting-started/install). 
This way the version of yarn used in building the package is managed by the attribute `packageManager` in `package.json`.

```bash
# First, build the graphql-codegen Typescript code
yarn install
yarn build

stack build

# with haddock
stack build --haddock
```

## Lint

The following linters must pass CI in order for your PR to be accepted.

* HLint

    ```bash
    cabal install hlint-3.4.1
    # try adding "-f ghc-lib" if the above does not work.
    hlint .
    ```

* fourmolu

    ```bash
    cabal install fourmolu-0.7.0.1
    fourmolu -i $(git ls-files '*.hs')
    ```

* ESLint

    ```bash
    yarn lint .
    ```

You can install [pre-commit](https://pre-commit.com/) to run these linters as
a git commit hook.

## Run tests

All tests must pass CI in order for your PR to be accepted.

```bash
stack test
```

```bash
yarn graphql-codegen test
```

# Git etiquette

See [`CONTRIBUTING`](https://github.com/LeapYear/.github/blob/main/CONTRIBUTING)

# Documentation

All code should be fully documented, whether it's adding comments for future
developers or adding Haddock docs for functionality exposed in Haddock.

Changes that affect users should be mentioned in `CHANGELOG.md`. When doing so,
add an entry under under the `Unreleased` header containing:
* A description of the change
* The type of change (breaking, bugfix, etc.)
* If applicable,
    * How to migrate existing code
    * When it should be used
    * What it supersedes

The format is not important, as the list will be curated when releasing.

# Release

Follow these steps to release this project:

1. Create a new branch
    1. Bump version in `package.yaml`
        * All version bumps should follow [PvP](https://pvp.haskell.org/)
    1. Curate `CHANGELOG.md`, creating a new section for this version and
       moving everything previously in `Unreleased` into the new section
       (keeping `Unreleased` as a section)
    1. Add comments to new features indicating when it was added (e.g.
       `-- @since v2.0.0`)
    1. Run `stack haddock graphql-client` and skim through documentation

1. Create PR as usual and merge into `main`
    1. In the `check_sdist` CI job, check the output of the `stack sdist`
       step for any warnings.

1. Ensure a Hackage auth token for the `leapyear` Hackage user is set in Settings > Secrets > Actions as `HACKAGE_TOKEN_LEAPYEAR`
   * Generate a token from `https://hackage.haskell.org/user/leapyear/manage`

1. Go to the GitHub Actions page, click on the "Release" workflow, and click "Run workflow" on the main branch

1. Publish the candidate: https://hackage.haskell.org/package/graphql-client/candidates

1. Publish the GitHub release: https://github.com/LeapYear/graphql-client/releases
