import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Input,
} from 'reactstrap'
import { editVocabModalShow } from '../../../actions/edit-vocab-modal'
import { Row as TableRow } from './row'

export const Edit = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const vocabs = useSelector(state => state.firebase.ordered.vocabs)
  useFirebaseConnect([
    { path: 'vocabs', queryParams: [ 'orderByKey' ] },
  ])

  const searchText = search.trim().toLowerCase()
  let filteredVocabs = (vocabs || []).slice().reverse()

  if (searchText.length > 1) {
    filteredVocabs = filteredVocabs.filter(v => v.value.lang1.trim().toLowerCase().includes(searchText) || v.value.lang2.trim().toLowerCase().includes(searchText))
  }

  if (!isLoaded(vocabs)) {
    return (
      <p className='text-center mt-4'>Loading ..</p>
    )
  } else if (isEmpty(vocabs)) {
    return (
      <p className='text-center mt-4'>List is empty</p>
    )
  } else {
    return (
      <Container className='pt-4'>
        <Row>
          <Col>
            <InputGroup>
              <Input placeholder='Search' value={search} onChange={event => setSearch(event.target.value)} />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped hover className='vocab-table mt-3'>
              <thead>
                <tr>
                  <th scope='col'>Lv.</th>
                  <th scope='col'>Deutsch</th>
                  <th scope='col'>Portugiesisch</th>
                </tr>
              </thead>
              <tbody>
                {filteredVocabs.map(({ value, key }, ind) => (
                  <TableRow
                    key={`${key}-${ind}`}
                    id={key}
                    vocab={value}
                    onEdit={() => dispatch(editVocabModalShow(key, value))}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>{vocabs.length} words total</p>
          </Col>
        </Row>
      </Container>
    )
  }
}
