# rehype-mdx-import-media

[![github actions](https://github.com/remcohaszing/rehype-mdx-import-media/actions/workflows/ci.yaml/badge.svg)](https://github.com/remcohaszing/rehype-mdx-import-media/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/rehype-mdx-import-media/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/rehype-mdx-import-media)
[![npm version](https://img.shields.io/npm/v/rehype-mdx-import-media)](https://www.npmjs.com/package/rehype-mdx-import-media)
[![npm downloads](https://img.shields.io/npm/dm/rehype-mdx-import-media)](https://www.npmjs.com/package/rehype-mdx-import-media)

An [MDX](https://mdxjs.com) [rehype](https://github.com/rehypejs/rehype) plugin for turning media
paths into imports.

## Table of Contents

- [Installation](#installation)
- [When should I use this?](#when-should-i-use-this)
- [Usage](#usage)
- [Example](#example)
- [API](#api)
  - [Options](#options)
- [Compatibility](#compatibility)
- [License](#license)

## Installation

```sh
npm install rehype-mdx-import-media
```

## When should I use this?

You may want to author images in MDX using the markdown format, like so:

```markdown
![alt](./image.png 'title')
```

You may use MDX with a bundler such as [Webpack](https://webpack.js.org) or
[Vite](http://vitejs.dev). By default bundlers don’t understand how to resolve those images. They
only understand how to resolve imports. This plugin solves that problem.

Also you may use MDX to load markdown files. If you reference other media in those markdown files
using HTML tags, that media can be resolved by this plugin too.

## Usage

This plugin takes HTML elements that refer to media content, and turns them into MDX expressions
that use imports. This allows bundlers to resolve media you referenced from your code. Note that JSX
elements are **not** HTML elements, so they are not processed. HTML elements can come from:

- Markdown syntax in MDX files, such as images.
- HTML in files parsed using the `md` [format](https://mdxjs.com/packages/mdx/#processoroptions)
  when using [`rehype-raw`](https://github.com/rehypejs/rehype-raw)
- Custom remark / rehype plugins.

If this plugin finds an attribute to process, it transforms the
[hast](https://github.com/syntax-tree/hast) [`element`](https://github.com/syntax-tree/hast#element)
nodes into an
[`mdxJsxTextElement`](https://github.com/syntax-tree/mdast-util-mdx-jsx#mdxjsxtextelementhast) node.
This may prevent other rehype plugins from further processing. To avoid this, put
`rehype-mdx-import-media` after any other rehype plugins

## Example

Let’s say we have a file named `example.mdx` with the following contents:

```mdx
![](./image.png)
```

The following script:

```js
import { compile } from '@mdx-js/mdx'
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import { read } from 'to-vfile'

const { value } = await compile(await read('example.mdx'), {
  jsx: true,
  rehypePlugins: [rehypeMdxImportMedia]
})
console.log(value)
```

Roughly yields:

```jsx
import _rehypeMdxImportMedia0 from './image.png'

export default function MDXContent() {
  return (
    <p>
      <img alt="" src={_rehypeMdxImportMedia0} />
    </p>
  )
}
```

## API

The default export is a [rehype](https://github.com/rehypejs/rehype) plugin.

### Options

- `attributes` (`object`): HTML element attributes that should be processed. The key is the HTML
  element tag name. The value is a list of attribute names to process. The default attributes are:
  - [`audio[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#src)
  - [`embed[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed#src)
  - [`img[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src)
  - [`img[srcset]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset)
  - [`object[data]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object#data)
  - [`source[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#src)
  - [`source[srcset]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#srcset)
  - [`track[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#src)
  - [`video[poster]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#poster)
  - [`video[src]`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#src)
- `elementAttributeNameCase` (`'html' | 'react'`): The casing to use for attribute names. This
  should match the elementAttributeNameCase value passed to MDX. (Default: `'react'`)
- `resolve` (`boolean`): By default imports are resolved relative to the markdown file. This matches
  default markdown behaviour. If this is set to false, this behaviour is removed and URLs are no
  longer processed. This allows to import images from `node_modules`. If this is disabled, local
  images can still be imported by prepending the path with `./.`. (Default: `true`).

## Compatibility

This project is compatible with MDX 3 and Node.js 18 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
