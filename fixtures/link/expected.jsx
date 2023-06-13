/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png'
function _createMdxContent(props) {
  const _components = {
    a: 'a',
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <_components.p>
      <_components.a href="https://example.com">
        <_components.img src={_rehypeMdxImportMedia0} alt="" />
      </_components.a>
    </_components.p>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
