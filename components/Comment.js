/**
 * Created by shu on 20/6/2017.
 */

import { Component } from 'react'

import Tippy from 'tippy.js'
import $ from 'jquery'

export default class extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    this.tippy = Tippy('.comment-tippy', {
      html: '#comment-template',
      arrow: true,
      theme: 'dark',
      hideOnClick: false,
    })
  }
  render() {
    return <div style={{position: 'relative'}}>
      <div
        className="comment-tippy"
        data-duration="300"
        data-animation="shift"
        data-trigger="click"
        data-position="bottom">
        <i className="material-icons">comment</i>
        <div id="comment-template" style={{display: 'none'}}>
          <p className="">Comments</p>
          <ul className="tl">
            <li>Good</li>
            <li>alright</li>
          </ul>
          <textarea/>
          <br/>
          <button>Submit</button>
        </div>
      </div>
    </div>
  }
}
