import _ from 'lodash'
import React, { Component } from 'react'
import { ispeech } from '../config'

export default class Speak extends Component {
  constructor(props) {
    super(props);

    this.audio = React.createRef();

    this.state = {
      playing: false,
    };
  }

  speak = () => {
    const word = _(this.props.word.replace(/(\(|\))/g, '').replace(/\//g, '. ')).split(/(?:\r\n|\r|\n)/).map(_.trim).compact().join('. ');
    const audio = this.audio.current;

    const url = `https://api.ispeech.org/api/rest?apikey=${ispeech}&action=convert&voice=eurportuguesefemale&speed=-5&text=${encodeURI(word)}`;

    // prevent double loading and waste of credits
    if (audio.src !== url) {
      audio.src = url;
    }

    audio.play();
  }

  stop = () => {
    const audio = this.audio.current;
    audio.pause();
    audio.currentTime = 0;

    this.setState({
      playing: false,
    });
  }

  onPlay = () => {
    this.setState({
      playing: true,
    });
  }

  onEnded = () => {
    this.setState({
      playing: false,
    });
  }

  render() {
    const { className } = this.props;
    const { playing } = this.state;

    return (
      <button
        type="button"
        tabIndex="-1"
        className={`btn btn-small btn-light flex-grow-1 flex-basis-0 ${className}`}
        onClick={playing ? this.stop : this.speak}
      >
        { playing ? 'Playing ..' : 'Speak' }
        <audio ref={this.audio} onPlay={this.onPlay} onEnded={this.onEnded} />
      </button>
    )
  }
}
