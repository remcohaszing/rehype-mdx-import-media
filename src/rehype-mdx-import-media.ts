import {
  type Expression,
  type Identifier,
  type ImportDeclaration,
  type TemplateElement
} from 'estree'
import { type Root } from 'hast'
import { propertiesToMdxJsxAttributes } from 'hast-util-properties-to-mdx-jsx-attributes'
import parseSrcset from 'parse-srcset'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export interface RehypeMdxImportMediaOptions {
  /**
   * HTML element attributes that should be processed. The key is the HTML element tag name. The
   * value is a list of attribute names to process. The default value is {@link defaultAttributes}
   */
  attributes?: Record<string, Iterable<string>>

  /**
   * The casing to use for attribute names.
   *
   * This should match the `elementAttributeNameCase` value passed to MDX.
   *
   * @default 'react'
   * @see https://mdxjs.com/packages/mdx/#processoroptions
   */
  elementAttributeNameCase?: 'html' | 'react'

  /**
   * Where to keep URL hash.
   *
   * - `both`: Keep the URL hash on both the import source and the JSX prop.
   * - `import`: Only keep the URL hash on the import source.
   * - `jsx`: Only keep the URL hash on the JSX prop.
   * - `none`: Remove the URL hash.
   *
   * @default 'import'
   */
  preserveHash?: 'both' | 'import' | 'jsx' | 'none'

  /**
   * Where to keep query parameters.
   *
   * - `both`: Keep the query parameters on both the import source and the JSX prop.
   * - `import`: Only keep the query parameters on the import source.
   * - `jsx`: Only keep the query parameters on the JSX prop.
   * - `none`: Remove the query parameters.
   *
   * @default 'import'
   */
  preserveQuery?: 'both' | 'import' | 'jsx' | 'none'

  /**
   * By default imports are resolved relative to the input file. This matches default markdown
   * behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed.
   * This allows to import images from `node_modules`. If this is disabled, local images can still
   * be imported by prepending the path with `./`.
   *
   * @default true
   */
  resolve?: boolean
}

const urlPattern = /^(https?:)?\//
const relativePathPattern = /\.\.?\//

export const defaultAttributes: Record<string, Iterable<string>> = {
  audio: 'src',
  embed: 'src',
  img: ['src', 'srcset'],
  object: 'data',
  source: ['src', 'srcset'],
  track: 'src',
  video: ['poster', 'src']
}

/**
 * A rehype MDX plugin for converting media sources into imports.
 */
const rehypeMdxImportMedia: Plugin<[RehypeMdxImportMediaOptions?], Root> = ({
  attributes = defaultAttributes,
  elementAttributeNameCase,
  preserveHash = 'import',
  preserveQuery = 'import',
  resolve = true
} = {}) => {
  const elementMap = new Map(
    Object.entries(attributes).map(([tagName, attributeNames]) => {
      const set = new Set<string>()
      if (typeof attributeNames === 'string') {
        set.add(attributeNames.toLowerCase())
      } else {
        for (const name of attributeNames) {
          set.add(name.toLowerCase())
        }
      }
      return [tagName.toLowerCase(), set]
    })
  )

  return (ast) => {
    const imports: ImportDeclaration[] = []
    const imported = new Map<string, string>()

    visit(ast, 'element', (node, index, parent) => {
      const attributeNames = elementMap.get(node.tagName)
      if (!attributeNames) {
        return
      }

      let shouldReplace = false

      // Don’t even bother continuing if there are no properties to replace.
      for (const name in node.properties) {
        if (attributeNames.has(name.toLowerCase())) {
          shouldReplace = true
          break
        }
      }

      if (!shouldReplace) {
        return
      }

      shouldReplace = false

      /**
       * Generate an identifier node for an import path.
       *
       * If the path should not be replaced, nothing is returned. If an identifier was already
       * calculated for this path, it is returned instead.
       *
       * @param importSource
       *   The path to get an identifier for.
       * @returns
       *   The matching identifier, or none.
       */
      function getIdentifier(importSource: string): [] | [Identifier, string] {
        let value = importSource
        if (urlPattern.test(value)) {
          return []
        }

        if (!relativePathPattern.test(value) && resolve) {
          value = `./${value}`
        }

        const hashIndex = value.indexOf('#')
        const hash = hashIndex === -1 ? '' : value.slice(hashIndex)
        const remainder = hashIndex === -1 ? value : value.slice(0, hashIndex)
        const queryIndex = remainder.indexOf('?')
        const query = queryIndex === -1 ? '' : remainder.slice(queryIndex)
        value = queryIndex === -1 ? remainder : remainder.slice(0, queryIndex)
        let propChunk = ''

        if (preserveQuery === 'import') {
          value += query
        } else if (preserveQuery === 'jsx') {
          propChunk += query
        } else if (preserveQuery === 'both') {
          value += query
          propChunk += query
        }

        if (preserveHash === 'import') {
          value += hash
        } else if (preserveHash === 'jsx') {
          propChunk += hash
        } else if (preserveHash === 'both') {
          value += hash
          propChunk += hash
        }

        let name = imported.get(value)

        if (!name) {
          name = `_rehypeMdxImportMedia${imported.size}`

          imports.push({
            type: 'ImportDeclaration',
            source: { type: 'Literal', value },
            specifiers: [{ type: 'ImportDefaultSpecifier', local: { type: 'Identifier', name } }]
          })
          imported.set(value, name)
        }

        shouldReplace = true
        return [{ type: 'Identifier', name }, propChunk]
      }

      const replacements = propertiesToMdxJsxAttributes(node.properties, {
        elementAttributeNameCase,
        transform(name, value) {
          if (!value) {
            return value
          }

          const lower = name.toLowerCase()
          if (!attributeNames.has(lower)) {
            return value
          }

          if (lower !== 'srcset') {
            const [identifier, extra] = getIdentifier(value)

            if (!identifier) {
              return value
            }

            if (extra) {
              return {
                type: 'TemplateLiteral',
                expressions: [identifier],
                quasis: [
                  { type: 'TemplateElement', tail: false, value: { raw: '' } },
                  { type: 'TemplateElement', tail: true, value: { raw: extra } }
                ]
              }
            }

            return identifier
          }

          const srcset = parseSrcset(value)
          const expressions: Expression[] = []
          const quasis: TemplateElement[] = []
          let raw = ''

          for (const [srcIndex, src] of srcset.entries()) {
            const [identifier, extra] = getIdentifier(src.url)

            if (identifier) {
              quasis.push({ type: 'TemplateElement', tail: false, value: { raw } })
              expressions.push(identifier)
              raw = extra!
            } else {
              raw += src.url
            }

            if (src.d) {
              raw += ` ${src.d}x`
            }

            if (src.w) {
              raw += ` ${src.w}w`
            }

            if (src.h) {
              raw += ` ${src.h}h`
            }

            if (srcIndex < srcset.length - 1) {
              raw += ','
            }
          }

          if (!expressions.length) {
            return value
          }

          quasis.push({ type: 'TemplateElement', tail: true, value: { raw } })
          return { type: 'TemplateLiteral', expressions, quasis }
        }
      })

      if (shouldReplace) {
        parent!.children[index!] = {
          type: 'mdxJsxTextElement',
          name: node.tagName,
          attributes: replacements,
          children: node.children,
          data: node.data,
          position: node.position
        }
      }
    })

    if (imports.length) {
      ast.children.unshift({
        type: 'mdxjsEsm',
        value: '',
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: imports
          }
        }
      })
    }
  }
}

export default rehypeMdxImportMedia
