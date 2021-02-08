import _ from 'lodash'
import fp from 'lodash/fp'
import { findBestMatch } from 'string-similarity'

let cache = {}
let vocabs = []
let callback

const sanitize = t => t.toLowerCase().replace(/^([^\n]+)\n+.*/s, '$1').replace(/\(-[a-z]+\)/gi, '')

const filter = key => _.flow([
  fp.reject({key}),
  fp.map('value.lang1'),
  fp.map(t => sanitize(t)),
])

const worker = new Worker('worker.js')

worker.addEventListener('message', (e) => {
  callback(e.data)
}, false)

const getRating = (lang1, key) => {
  return findBestMatch(sanitize(lang1), filter(key)(vocabs)).bestMatch.rating
}

export const getSimilarity = vocab => cache[vocab.key]

export const setVocabs = (newVocabs, cb) => {
  callback = newCache => {
    vocabs = newVocabs
    cache = newCache
    cb()
  }

  worker.postMessage(newVocabs)
}

export const mightBeDuplicate = lang1 => getRating(lang1) > .9
