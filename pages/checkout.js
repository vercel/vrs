/**
 * Created by shu on 20/6/2017.
 */

import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default () =>
  <Layout>
    <main className="pa3 pa5-ns vh-100 w-100 white dt tc">
      <p className="f4 lh-copy measure dtc v-mid">
        <h1>Checkout</h1>
        <a href="/auth/twitter" className="white no-underline">
          <span className="v-mid">Pay via credit card</span>
          <br/>
          <i className="material-icons">payment</i>
        </a>
      </p>
    </main>
    <Footer/>
  </Layout>
