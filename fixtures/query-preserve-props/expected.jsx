/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.p>
        <_components.img
          src={_rehypeMdxImportMedia0}
          alt="alt"
          title="title"
          width="200"
          height="150"
          array={['1', '2']}
        />
      </_components.p>
      {'\n'}
      <_components.img srcSet={`${_rehypeMdxImportMedia0}`} />
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
