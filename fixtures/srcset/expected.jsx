/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
import _rehypeMdxImportMedia0 from './image.png'
import _rehypeMdxImportMedia1 from './other-image.png'
import _rehypeMdxImportMedia2 from './sound.mp3'
import _rehypeMdxImportMedia3 from './video.mp4'
import _rehypeMdxImportMedia4 from './image.jpg'
import _rehypeMdxImportMedia5 from './video.webm'
import _rehypeMdxImportMedia6 from './video.mpg'
import _rehypeMdxImportMedia7 from './video.png'
import _rehypeMdxImportMedia8 from './video.vtt'
function _createMdxContent(props) {
  const _components = {
    audio: 'audio',
    embed: 'embed',
    img: 'img',
    object: 'object',
    p: 'p',
    picture: 'picture',
    source: 'source',
    track: 'track',
    video: 'video',
    ...props.components
  }
  return (
    <>
      <_components.img
        srcSet={`${_rehypeMdxImportMedia0} 2x,${_rehypeMdxImportMedia0} 640w 480h,${_rehypeMdxImportMedia1}`}
      />
      {'\n'}
      <_components.img
        srcSet={`${_rehypeMdxImportMedia0} 2x,${_rehypeMdxImportMedia0},${_rehypeMdxImportMedia1} 640w 480h`}
      />
      {'\n'}
      <_components.img srcSet="https://example.com/image.png" />
      {'\n'}
      <_components.p>
        <_components.audio src={_rehypeMdxImportMedia2} />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.embed src={_rehypeMdxImportMedia3} type="video/webm" />
      </_components.p>
      {'\n'}
      <_components.p>
        <_components.object src="video.pdf" type="application/pdf" />
      </_components.p>
      {'\n'}
      <_components.picture>
        {'\n  '}
        <_components.source srcSet={`${_rehypeMdxImportMedia0}`} />
        {'\n  '}
        <_components.source srcSet={`${_rehypeMdxImportMedia4}`} />
        {'\n  '}
        <_components.img src={_rehypeMdxImportMedia4} />
        {'\n'}
      </_components.picture>
      {'\n'}
      <_components.video>
        {'\n  '}
        <_components.source src={_rehypeMdxImportMedia5} type="video/webm" />
        {'\n  '}
        <_components.source src={_rehypeMdxImportMedia6} type="video/mp4" />
        {'\n'}
      </_components.video>
      {'\n'}
      <_components.video src={_rehypeMdxImportMedia5} poster={_rehypeMdxImportMedia7}>
        {'\n  '}
        <_components.track kind="captions" srcLang="en" src={_rehypeMdxImportMedia8} />
        {'\n'}
      </_components.video>
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
