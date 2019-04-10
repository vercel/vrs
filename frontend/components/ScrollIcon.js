/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'
import _ from 'lodash'

// source: https://github.com/boguz/rumuli/blob/master/animations/03_svg_animations/svg_animation_1/svg_animation_1.html
// modified by shu

export default class ScrollIcon extends Component {
  constructor() {
    super()

    this.state = {
      scrolled: false
    }

    this.scrollHandler = _.debounce(this.scrollHandler.bind(this), 50)
  }
  scrollHandler (status) {
    let scrolled = status.offset.y >= 10

    if (scrolled !== this.state.scrolled) {
      this.setState({
        scrolled
      })
    }
  }
  componentDidMount() {
    window.scrollHandlers = window.scrollHandlers || []
    window.scrollHandlers.push(status => this.scrollHandler(status))
  }
  componentWillUnmount() {
    this.scrollHandler = () => {}
  }
  render () {
    let {scrolled} = this.state

    return <div className="scroll-icon" style={{ opacity: scrolled ? 0: 1 }}>
      <style jsx>{`
      .scroll-icon {
        position: fixed;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        z-index: 1;
        transition: opacity .3s ease;
        pointer-events: none;
      }

      .scroll-icon svg {
        height: 50px;
        width: 28px;
      }

      .scroll-icon svg #mouse-circle circle {
        -webkit-animation-name: scroll-animation;
        animation-name: scroll-animation;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
      }

      @-webkit-keyframes scroll-animation {
        0% {
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translateY(150px);
          transform: translateY(150px);
          opacity: 0;
        }
      }

      @keyframes scroll-animation {
        0% {
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          -webkit-transform: translateY(150px);
          transform: translateY(150px);
          opacity: 0;
        }
      }
    `}</style>
      <svg version="1.1" id="Mouse" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 130 231" enableBackground="new 0 0 130 231">
        <g>
          <path fill="rgba(255, 255, 255, .6)" d="M72.5,231h-15C25.794,231,0,205.206,0,173.5v-116C0,25.794,25.794,0,57.5,0h15 C104.206,0,130,25.794,130,57.5v116C130,205.206,104.206,231,72.5,231z M57.5,5C28.551,5,5,28.551,5,57.5v116 C5,202.448,28.551,226,57.5,226h15c28.948,0,52.5-23.552,52.5-52.5v-116C125,28.551,101.448,5,72.5,5H57.5z" />
        </g>
        <g id="mouse-circle">
          <circle fillRule="evenodd" clipRule="evenodd" fill="#ffffff" cx="65" cy="42.834" r="12.5" />
        </g>
      </svg>
    </div>
  }
}
