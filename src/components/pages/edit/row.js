import React from 'react'
import classNames from 'classnames'

export const Row = ({ id, vocab, onEdit }) => (
  <tr className={classNames({'table-danger': vocab.duplicateRating > .9})}>
    <td
      style={{ cursor: 'pointer' }}
      onClick={onEdit}
    >
      {vocab.level}
    </td>

    <td
      style={{ cursor: 'pointer' }}
      onClick={onEdit}
    >
      {vocab.lang1}
    </td>

    <td
      style={{ cursor: 'pointer' }}
      onClick={onEdit}
    >
      {vocab.lang2}
    </td>
  </tr>
)
