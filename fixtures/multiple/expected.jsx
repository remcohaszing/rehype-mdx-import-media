/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.gif'
import _rehypeMdxImportMedia1 from './image.jpg'
import _rehypeMdxImportMedia2 from './image.png'
import _rehypeMdxImportMedia3 from './image.svg'
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
      <_components.p>
        <_components.img src={_rehypeMdxImportMedia1} alt="" />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.img src={_rehypeMdxImportMedia2} alt="" />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.img src={_rehypeMdxImportMedia3} alt="" />
      </_components.p>
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
