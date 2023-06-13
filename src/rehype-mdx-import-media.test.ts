import assert from 'node:assert/strict'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { test } from 'node:test'

import { compile } from '@mdx-js/mdx'
import prettier from 'prettier'
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import rehypeRaw from 'rehype-raw'
import { read } from 'to-vfile'

const fixturesDir = new URL('../fixtures/', import.meta.url)
const tests = await readdir(fixturesDir)

for (const name of tests) {
  test(name, async () => {
    const path = new URL(`${name}/`, fixturesDir)
    const input = await read(new URL('input.md', path))
    const expected = new URL('expected.jsx', path)
    const options = JSON.parse(await readFile(new URL('options.json', path), 'utf8'))
    const result = await compile(input, {
      rehypePlugins: [rehypeRaw, [rehypeMdxImportMedia, options]],
      jsx: true
    })
    const prettierConfig = await prettier.resolveConfig(expected.pathname, { editorconfig: true })
    const output = await prettier.format(
      String(result),
      { ...prettierConfig, filepath: expected.pathname }!
    )
    if (process.argv.includes('update')) {
      await writeFile(expected, output)
    }
    assert.equal(output, await readFile(expected, 'utf8'))
  })
}
