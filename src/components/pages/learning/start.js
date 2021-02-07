import _ from 'lodash'
import React from 'react'
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap'

export const Start = ({ vocabs, onStart }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Button className='btn-block' color='primary' onClick={onStart}>Learn {_.filter(vocabs, x => x.value.countdown < 2).length} Vocabs</Button>
          <p>You are proficient with {_.filter(vocabs, x => x.value.proficiency > 1).length} vocabs!</p>
        </Col>
      </Row>
    </Container>
  )
}
