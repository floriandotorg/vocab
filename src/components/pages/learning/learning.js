import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from './card'

export const Learning = () => {
  const currentVocab = useSelector(state => state.learning.vocabs[state.learning.currentVocab])

  return (
    <Card vocab={currentVocab} />
  )
}
