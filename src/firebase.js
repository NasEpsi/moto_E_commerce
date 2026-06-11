import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCTRfls66E46UoBTlA7I4LWfPXQn8-4xFo',
  authDomain: 'moto-1d56f.firebaseapp.com',
  projectId: 'moto-1d56f',
  storageBucket: 'moto-1d56f.firebasestorage.app',
  messagingSenderId: '80833320220',
  appId: '1:80833320220:web:1ce3d8d80d0dc5771656d9',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
