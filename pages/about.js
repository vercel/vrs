/**
 * Created by shu on 7/5/2017.
 */

import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default () =>
  <Layout>
    <main className="pa3 pa5-ns vh-100 white dt">
      <div className="f4 lh-copy measure dtc v-mid">
        <p><span className="fw6">VRS</span> is a demo project for the Advanced Web Technology course at Fudan University.</p>
        <p><span className="fw6">VRS</span> is open sourced at <a href="http://repo.shud.in/vrs" className="no-underline white bb" target="_blank">GitHub</a>.</p>
      </div>
    </main>
    <Footer/>
  </Layout>
