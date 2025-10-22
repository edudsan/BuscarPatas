import './AnimatedBackground.css'

const AnimatedBackground = ({
  imageUrl,
  opacity = 0.5,
  animationDuration = '50s',
  backgroundSize = '200px',
  isCornerImage = false,
  isLocalElement = false,
}) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    opacity: opacity,
    animationDuration: animationDuration,
    backgroundSize: backgroundSize,
  }

  const localClass = isLocalElement ? 'local-element-mode' : ''
  const cornerClass = isCornerImage ? 'corner-image-mode' : ''

  const containerClasses = `animated-background-container ${localClass} ${cornerClass}`

  return <div className={containerClasses} style={backgroundStyle}></div>
}

export default AnimatedBackground
