function SearchBar({
  searchName,
  searchBrand,
  onSearchNameChange,
  onSearchBrandChange,
}) {
  return (
    <section className="filters-card">
      <div className="search-grid">
        <label className="field">
          <span>Recherche par nom</span>
          <input
            type="search"
            placeholder="Exemple : Pneu Michelin"
            value={searchName}
            onChange={(event) => onSearchNameChange(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Recherche par marque</span>
          <input
            type="search"
            placeholder="Exemple : Brembo"
            value={searchBrand}
            onChange={(event) => onSearchBrandChange(event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}

export default SearchBar
