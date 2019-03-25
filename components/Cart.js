/**
 * Created by shu on 8/6/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Tippy from 'tippy.js'
import $ from 'jquery'
import CartStyles from 'tippy.js/dist/tippy.css'

function saveToLocalStorage(key, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}

function loadFromLocalStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return null
  }
}

export default class extends Component {
  constructor() {
    super()

    this.state = {
      cnt: 0,
      items: []
    }
  }
  saveCart() {
    saveToLocalStorage('vrs:cart', this.state)
    // TODO: save to server
  }
  componentDidMount() {
    let el =$('.cart-tippy')[0]
    let tippy = Tippy('.cart-tippy', {
      html: '#cart-template',
      arrow: true,
      hideOnClick: false,
      theme: 'dark',
    })
    let popper = tippy.getPopperElement(el)

    let state = loadFromLocalStorage('vrs:cart')
    if (state) {
      this.setState(state)
      setTimeout(() => {
        tippy.update(popper)
      }, 100)
    }

    // dirty
    window.addToCart = url => {
      let $screenshot = $(`<img src="${url}" class="screenshot"/>`)
      $screenshot.appendTo('.container .scroll-content > div')
      $screenshot.css({
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      })
      setTimeout(() => {
        let box = $('#cart-icon')[0].getBoundingClientRect()
        $screenshot.css({
          width: 30,
          height: 30,
          left: box.left,
          top: box.top + 20,
          opacity: 0,
        })

        this.setState({
          cnt: this.state.cnt + 1,
          items: [...this.state.items, {
            url
          }]
        })

        this.saveCart()

        tippy.update(popper)

        setTimeout(() => {
          $screenshot.remove()
        }, 1000)
      }, 300)
    }
  }
  removeFromCart(index) {
    console.log(index)
    this.state.items.splice(index, 1)
    this.setState({
      cnt: this.state.cnt - 1,
    })
    this.saveCart()
    tippy.update(popper)
  }
  render() {
    return <div style={{position: 'relative'}}>
      <Head>
        <style dangerouslySetInnerHTML={{__html: CartStyles}} />
      </Head>
      {
        this.state.cnt ? <div className="badge">{this.state.cnt}</div> : ''
      }
      <div
        id="cart-icon"
        className="cart-tippy"
        data-duration="300"
        data-animation="shift"
        data-trigger="click"
        data-position="bottom">

        {this.props.children}
        <div id="cart-template" style={{display: 'none'}}>
          <p>Cart ({this.state.cnt})</p>
          <ul className="list tl pa0">
            {
              this.state.items.map((item, index) =>
                <li key={`item-${index}`}><img src={item.url} className="w3"/>
                  <a onClick={ev => this.removeFromCart(index)}><i className="material-icons hover-gray pointer">close</i></a>
                </li>
              )
            }
          </ul>
          <a className="white mb2" href="/checkout">checkout</a>
        </div>
      </div>
    </div>
  }
}
