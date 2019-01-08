import _ from 'lodash'
import React, { Component } from 'react'

const Row = ({ level, num, onStart }) => {
  const mapColor = {
    0: 'primary',
    1: 'success',
    2: 'warning',
    3: 'danger',
    4: 'light',
  }

  return (
    <li>
      <button className={`btn btn-${mapColor[level]} btn-small`} onClick={onStart}>
        Level {parseInt(level) + 1}: {num} words
      </button>
    </li>
  );
};

export default class Start extends Component {
  render() {
    const levels = _(this.props.vocabs).groupBy('value.level').mapValues('length');

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="learning-start-list">
              {levels.map((num, level) =>
                <Row
                  key={level}
                  level={level}
                  num={num}
                  onStart={this.props.onStart(parseInt(level))}
                />
              ).value()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
