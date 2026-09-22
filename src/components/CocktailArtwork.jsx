const glassIcons = {
  coupe: '▽',
  flute: '♢',
  highball: '▯',
  hurricane: '♧',
  martini: '▽',
  mug: '▣',
  rocks: '▰',
  tiki: '♜',
}

function CocktailArtwork({ cocktail, large = false }) {
  return (
    <div
      className={`cocktail-art${large ? ' cocktail-art--large' : ''}`}
      style={{
        '--cocktail-primary': cocktail.palette[0],
        '--cocktail-secondary': cocktail.palette[1],
        '--cocktail-highlight': cocktail.palette[2],
      }}
      aria-label={`${cocktail.name}鸡尾酒艺术图`}
      role="img"
    >
      <span className="cocktail-art__light" />
      <span className={`cocktail-art__glass cocktail-art__glass--${cocktail.glass}`}>
        <span className="cocktail-art__symbol" aria-hidden="true">
          {glassIcons[cocktail.glass] || '▽'}
        </span>
        <span className="cocktail-art__liquid" />
        <span className="cocktail-art__garnish" />
        <span className="cocktail-art__sparkle cocktail-art__sparkle--one">✦</span>
        <span className="cocktail-art__sparkle cocktail-art__sparkle--two">·</span>
      </span>
      <span className="cocktail-art__shadow" />
      <span className="cocktail-art__number">NO. {String(cocktail.index || 1).padStart(2, '0')}</span>
    </div>
  )
}

export default CocktailArtwork
