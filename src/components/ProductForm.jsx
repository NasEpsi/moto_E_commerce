import { useState } from 'react'

const emptyForm = {
  nom: '',
  marque: '',
  categorie: '',
  prix: '',
  image: '',
  attributsText: '',
  compatibilitesText: '',
}

function formatAttributes(attributes = {}) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

function formatCompatibilities(compatibilities = []) {
  return compatibilities.join('\n')
}

function createFormState(product) {
  if (!product) {
    return emptyForm
  }

  return {
    nom: product.nom ?? '',
    marque: product.marque ?? '',
    categorie: product.categorie ?? '',
    prix: product.prix ?? '',
    image: product.image ?? '',
    attributsText: formatAttributes(product.attributs),
    compatibilitesText: formatCompatibilities(product.compatibilites),
  }
}

function parseAttributes(attributesText) {
  // Format attendu dans le textarea : "cle: valeur" sur une ligne.
  return attributesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce((attributes, line) => {
      const [key, ...valueParts] = line.split(':')

      if (!key || valueParts.length === 0) {
        return attributes
      }

      return {
        ...attributes,
        [key.trim()]: valueParts.join(':').trim(),
      }
    }, {})
}

function parseCompatibilities(compatibilitiesText) {
  return compatibilitiesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function ProductForm({ initialProduct, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(() => createFormState(initialProduct))

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({
      nom: formData.nom.trim(),
      marque: formData.marque.trim(),
      categorie: formData.categorie.trim(),
      prix: Number.parseFloat(formData.prix) || 0,
      image: formData.image.trim(),
      attributs: parseAttributes(formData.attributsText),
      compatibilites: parseCompatibilities(formData.compatibilitesText),
    })
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Nom</span>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Marque</span>
          <input
            type="text"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Categorie</span>
          <input
            type="text"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field">
          <span>Prix</span>
          <input
            type="number"
            name="prix"
            min="0"
            step="0.01"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className="field">
        <span>Image</span>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
      </label>

      <label className="field">
        <span>Attributs</span>
        <textarea
          name="attributsText"
          rows="5"
          value={formData.attributsText}
          onChange={handleChange}
          placeholder={'type: Plaquettes avant\nmatiere: Sinter'}
        />
      </label>

      <label className="field">
        <span>Compatibilites</span>
        <textarea
          name="compatibilitesText"
          rows="5"
          value={formData.compatibilitesText}
          onChange={handleChange}
          placeholder={'Yamaha MT-07\nHonda CB650R'}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting
            ? 'Enregistrement...'
            : initialProduct
              ? 'Mettre a jour'
              : 'Ajouter le produit'}
        </button>

        {initialProduct ? (
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler la modification
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default ProductForm
