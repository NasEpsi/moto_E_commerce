function SearchBar({ value, onChange, onSubmit, compact = false }) {
  return (
    <form
      className={compact ? 'search-bar compact' : 'search-bar'}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <label className="search-input-wrap">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          placeholder="Rechercher une piece, une marque, un modele..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>

      {!compact ? (
        <button type="submit" className="button button-primary">
          Rechercher
        </button>
      ) : null}
    </form>
  )
}

export default SearchBar
