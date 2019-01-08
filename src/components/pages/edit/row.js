import React from 'react'

export default ({vocab, onEdit, onDelete}) => (
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

    <td>
      <button
        className="delete-button"
        onDoubleClick={onDelete}
      >
        &times;
      </button>
    </td>
  </tr>
)
