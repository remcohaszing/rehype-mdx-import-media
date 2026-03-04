/**
 * @import { RehypeMdxImportMediaOptions } from 'rehype-mdx-import-media'
 */

/** @type {RehypeMdxImportMediaOptions} */
export default {
  ignore: (url) => url.includes('ignored')
}
