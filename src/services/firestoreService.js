import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION_NAME = 'produits'

function sortProducts(products) {
  return [...products].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
}

function mapSnapshot(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  }
}

function getCollectionReference() {
  return collection(db, COLLECTION_NAME)
}

export async function getProducts() {
  const productsCollection = getCollectionReference()
  const snapshot = await getDocs(productsCollection)
  return sortProducts(snapshot.docs.map(mapSnapshot))
}

export async function getProductById(id) {
  const products = await getProducts()
  return products.find((product) => product.id === id) ?? null
}

export async function createProduct(product) {
  const productsCollection = getCollectionReference()
  const snapshot = await addDoc(productsCollection, product)
  return { id: snapshot.id, ...product }
}

export async function updateProduct(id, product) {
  const productReference = doc(db, COLLECTION_NAME, id)
  await updateDoc(productReference, product)
  return { id, ...product }
}

export async function deleteProduct(id) {
  const productReference = doc(db, COLLECTION_NAME, id)
  await deleteDoc(productReference)
}
