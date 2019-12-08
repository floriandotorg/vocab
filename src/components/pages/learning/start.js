import _ from 'lodash'
import React from 'react'
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap'

const ButtonRow = ({ level, num, onStart }) => {
  const mapColor = {
    0: 'primary',
    1: 'success',
    2: 'warning',
    3: 'danger',
    4: 'light',
  }

  return (
    <li>
      <Button color={mapColor[level]} size='small' onClick={onStart}>
        Level {parseInt(level) + 1}: {num} words
      </Button>
    </li>
  )
}

export const Start = ({ vocabs, onStart }) => {
  const levels = _(vocabs).groupBy('value.level').mapValues('length')

  return (
    <Container>
      <Row>
        <Col>
          <ul className="learning-start-list">
            {levels.map((num, level) =>
              <ButtonRow
                key={level}
                level={level}
                num={num}
                onStart={onStart(parseInt(level))}
              />
            ).value()}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
