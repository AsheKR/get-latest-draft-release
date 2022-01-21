<p align="center">Get Latest Draft Release</p>

---

## Usage

```YAML
name: release-drafter
on:
  push:
    branches:
      - main

jobs:
  update_release_draft:
    runs-on: ubuntu-latest
    steps:
      - uses: AsheKR/get-latest-draft-release@1.0.0
      id: latest-draft
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    steps:
      - uses: release-drafter/release-drafter@v5
        with:
          version: ${{ steps.latest-draft.outputs.tag_name }}
          tag: ${{ steps.latest-draft.outputs.tag_name }}
          name: ${{ steps.latest-draft.outputs.tag_name }}
        env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Action Outputs

I have some data of the release Rest API as an output.
If you want additional data, please leave an issue.

[https://docs.github.com/en/rest/reference/releases#list-releases](https://docs.github.com/en/rest/reference/releases#list-releases)

- id
- url
- html_url
- tag_name


> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...