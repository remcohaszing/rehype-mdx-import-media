/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './script.js'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    script: 'script',
    ...props.components
  }
  return (
    <>
      <_components.p>
        <_components.img src="./hello.png" alt="" />
      </_components.p>
      {'\n'}
      <_components.script src={_rehypeMdxImportMedia0} />
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
