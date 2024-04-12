/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png#some-hash'
import _rehypeMdxImportMedia1 from './image.png#some-hash2'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.p>
        <_components.img src={_rehypeMdxImportMedia0} alt="" />
      </_components.p>
      {'\n'}
      <_components.img srcSet={`${_rehypeMdxImportMedia0} 2x,${_rehypeMdxImportMedia1} 4x`} />
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
