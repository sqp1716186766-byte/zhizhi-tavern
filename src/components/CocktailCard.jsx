import { Link } from 'react-router-dom'

import CocktailArtwork from './CocktailArtwork.jsx'

const difficultyMarks = {
  简单: 1,
  进阶: 2,
  大师: 3,
}

function CocktailCard({ cocktail, isFavorite, onToggleFavorite }) {
  const marks = difficultyMarks[cocktail.difficulty] || 1

  return (
    <article className="cocktail-card">
      <button
        className={`cocktail-card__favorite${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `取消收藏${cocktail.name}` : `收藏${cocktail.name}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(cocktail.id)}
      >
        <span className="cocktail-card__favorite-star" aria-hidden="true">
          {isFavorite ? '★' : '☆'}
        </span>
        <span className="cocktail-card__favorite-burst" aria-hidden="true">✦</span>
      </button>

      <Link className="cocktail-card__link" to={`/cocktails/${cocktail.id}`}>
        <CocktailArtwork cocktail={cocktail} />

        <div className="cocktail-card__content">
          <div className="cocktail-card__heading">
            <div>
              <h2>{cocktail.name}</h2>
              <p>{cocktail.englishName}</p>
            </div>
            <span className="cocktail-card__arrow" aria-hidden="true">↗</span>
          </div>

          <div className="cocktail-card__flavors">
            {cocktail.flavors.map((flavor) => (
              <span key={flavor}>{flavor}</span>
            ))}
          </div>

          <div className="cocktail-card__meta">
            <span>难度 · {cocktail.difficulty}</span>
            <span className="difficulty-pips" aria-label={`难度 ${marks} 星`}>
              {[1, 2, 3].map((pip) => (
                <i key={pip} className={pip <= marks ? 'is-filled' : ''}>◆</i>
              ))}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default CocktailCard
