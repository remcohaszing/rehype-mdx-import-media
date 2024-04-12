import { compileSync } from '@mdx-js/mdx'
import rehypeMdxImportMedia, { type RehypeMdxImportMediaOptions } from 'rehype-mdx-import-media'
import rehypeRaw from 'rehype-raw'
import { testFixturesDirectory } from 'snapshot-fixtures'

testFixturesDirectory<RehypeMdxImportMediaOptions>({
  directory: new URL('../fixtures', import.meta.url),
  prettier: true,
  tests: {
    'expected.jsx'(file, options) {
      return compileSync(file, {
        rehypePlugins: [rehypeRaw, [rehypeMdxImportMedia, options]],
        jsx: true
      })
    }
  }
})
