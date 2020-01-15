# Documentation.js Action

A GitHub action to build JSDoc with
[documentation.js](https://documentation.js.org/).

## Usage

Can be combined with other actions to publish documentation to GitHub
pages:

```yaml
name: jsdoc
on:
 push:
   branches:
     - master

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1

    - name: Build
      uses: codevise/documentation-js-action@v1
      with:
        input: ./src
        output: ./docs

    # For example:
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v2
      env:
        PERSONAL_TOKEN: ${{ secrets.GITHUB_PAT }}
        PUBLISH_BRANCH: gh-pages
        PUBLISH_DIR: ./docs
```

## Inputs

Required:

| Name     | Type     | Description |
|----------|----------|-------------|
| `input`  | `String` | Input directory or files |
| `output` | `String` | A filename for single-file outputs and a directory name for multi-file outputs like html. |

Optional:

| Name                  | Type      | Default | Description |
|-----------------------|-----------|---------|-------------|
| `theme`               | `String`  | - | This must be a valid theme module. |
| `themePackage`        | `String`  | - | Package name/url that will be passed to npm to install the theme. |
| `projectName`         | `String`  | Inferred from package.json | The project name. |
| `projectVersion`      | `String`  | Inferred from package.json | The project version. |
| `projectDescription`  | `String`  | Inferred from package.json | The project description. |
| `projectHomepage`     | `String`  | Inferred from package.json | The project homepage. |
| `favicon`             | `String`  | - | Favicon used in html. |
| `markdownToc`         | `Boolean` | `true` | Include a table of contents in markdown output. |
| `markdownTocMaxDepth` | `Number`  | `6` | Specifies the max depth of the table of contents in markdown output. |
| `shallow`             | `Boolean` | `false` | Shallow mode turns off dependency resolution, only processing the specified files (or the main script specified in package.json). |
| `config`              | `String`  | - | Path of file defining the TOC. |
| `noPackage`           | `Boolean` | `false` | Don't find and use package.json for project configuration option defaults. |
| `external`            | `String`  | - | Glob match pattern that defines which external modules will be included in the generated documentation. |
| `requireExtension`    | `String`  | - | Additional extensions to include in `require()` and `import` search algorithm. For instance, adding `.es5` would allow `require("adder")` to find `adder.es5`. |
| `parseExtension`      | `String`  | - | Additional extensions to parse as source code. |
| `private`             | `Boolean` | `false` | Generate documentation tagged as private. |
| `access`              | `String`  | - | Include only comments with a given access level, out of private, protected, public, undefined. By default, public, protected, and undefined access levels are included. |
| `github`              | `Boolean` | `false` | Unfer links to github in documentation. |
| `inferPrivate`        | `String`  | - | Infer private access based on the name. This is a regular expression that is used to match the name. |
| `documentExported`    | `Boolean` | `false` | Generate documentation for all exported bindings and members even if there is no JSDoc for them. |
| `sortOrder`           | `String`  | `source` | The order to sort the documentation: `source` or `alpha`. |
| `format`              | `String`  | `html` | `html`, `json`, `md` or `remark`. |

## License

MIT. See `LICENSE` for more details.
