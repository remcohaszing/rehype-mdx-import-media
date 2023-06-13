/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png'
import _rehypeMdxImportMedia1 from './other-image.png'
function _createMdxContent(props) {
  const _components = {
    img: 'img',
    picture: 'picture',
    video: 'video',
    ...props.components
  }
  return (
    <>
      <_components.img
        srcSet={`${_rehypeMdxImportMedia0} 2x,${_rehypeMdxImportMedia0} 640w 480h,${_rehypeMdxImportMedia1}`}
      />
      {'\n'}
      <_components.picture>
        {'\n  '}
        <_components.img
          srcSet={`${_rehypeMdxImportMedia0} 2x,${_rehypeMdxImportMedia0} 640w 480h,${_rehypeMdxImportMedia1}`}
        />
        {'\n'}
      </_components.picture>
      {'\n'}
      <_components.video>{'\n'}</_components.video>
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
