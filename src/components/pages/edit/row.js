import React from 'react'

export default ({vocab, onEdit}) => (
  <tr>
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
