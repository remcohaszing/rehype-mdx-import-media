/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png?size=16'
import _rehypeMdxImportMedia1 from './image.png?size=32'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.p>
        <_components.img src={`${_rehypeMdxImportMedia0}?size=16`} alt="" />
      </_components.p>
      {'\n'}
      <_components.img
        srcSet={`${_rehypeMdxImportMedia0}?size=16 2x,${_rehypeMdxImportMedia1}?size=32 4x`}
      />
    </>
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
