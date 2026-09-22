import { Link } from 'react-router-dom'

function MenuButton({ icon, label, hint, to }) {
  return (
    <Link className="menu-button" to={to}>
      <span className="menu-button__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="menu-button__copy">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <span className="menu-button__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

export default MenuButton
