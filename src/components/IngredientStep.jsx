function IngredientStep({ index, title, detail, status = 'pending' }) {
  return (
    <li className={`ingredient-step ingredient-step--${status}`}>
      <span className="ingredient-step__index" aria-hidden="true">
        {status === 'complete' || status === 'ready' ? '✓' : String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <strong>{title}</strong>
        {detail && <small>{detail}</small>}
      </div>
      <i className="ingredient-step__signal" aria-hidden="true" />
    </li>
  )
}

export default IngredientStep
