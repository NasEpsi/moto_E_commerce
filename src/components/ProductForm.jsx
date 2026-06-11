import { useState } from 'react'

const emptyForm = {
  nom: '',
  marque: '',
  categorie: '',
  prix: '',
  image: '',
  description: '',
  attributsText: '',
  compatibilitesText: '',
}

function formatAttributes(attributes = {}) {
  return Object.entries(attributes)
    .filter(([key]) => key !== 'description')
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
    description: product.attributs?.description ?? '',
    attributsText: formatAttributes(product.attributs),
    compatibilitesText: formatCompatibilities(product.compatibilites),
  }
}

function parseAttributes(attributesText) {
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
      attributs: {
        ...parseAttributes(formData.attributsText),
        ...(formData.description.trim()
          ? { description: formData.description.trim() }
          : {}),
      },
      compatibilites: parseCompatibilities(formData.compatibilitesText),
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Nom du produit</span>
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
          <span>Prix (€)</span>
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
        <span>Description</span>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description detaillee de la piece..."
        />
      </label>

      <label className="field">
        <span>Caracteristiques</span>
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
        <button type="submit" className="button button-primary" disabled={isSubmitting}>
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
