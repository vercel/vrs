/**
 * Created by shu on 7/5/2017.
 */

import Link from 'next/link'

import Layout from '../components/Layout'
import Footer from '../components/Footer'

const MODEL_NUM = 16

export default () =>
  <Layout>
    <article className="pt5 bg-black white ph3">
      <a className="link white tc">
        <p><i className="material-icons md-48 v-top">store</i></p>
        <h1 className="tc f3 mb4">Model Store</h1>
      </a>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons red">whatshot</i></h2>
      <div className="cf pa2">
        {
          // how about adding some placeholders here
          (Array(MODEL_NUM).fill(0).map((_, i) =>
            <div className="fl w-100 w-50-m w-25-l pa2" key={i}>
              <Link href={`/edit?id=${i + 1}`}>
                <a className="db link dim tc white">
                  <img src={`/static/models/${i + 1}/thumbnail@m.jpg`} alt="Lorem" className="w-100 db outline black-10"/>
                  <dl className="mt2 f6 lh-copy">
                    <dt className="clip">Title</dt>
                    <dd className="ml0 white truncate w-100">#{i + 1}</dd>
                    <dt className="clip">Artist</dt>
                    <dd className="ml0 gray truncate w-100">Lorem Ipsum</dd>
                  </dl>
                </a>
              </Link>
            </div>
          ))
        }
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">account_balance</i></h2>
      <div className="cf pa2">
        NULL
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">directions_car</i></h2>
      <div className="cf pa2">
        NULL
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">tag_faces</i></h2>
      <div className="cf pa2">
        NULL
      </div>
      <br/>
    </article>
    <Footer/>
  </Layout>
