import React, {Component} from 'react'
import Head from 'next/head'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import 'isomorphic-fetch'

import withData from '../lib/backendApi/withData'

import TopHeader from './common/Header/TopHeader'
import Nav from './common/Header/Nav'
import Footer from './common/Footer/Footer'
import Scripts from './common/Scripts/Scripts'
import BreakingNewsBar from './common/BreakingNewsBar/BreakingNewsBar'




import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const linkStyle = {
  margin: '0 10px 0 0'
}
  


export default function withLayout(Child, opts) {
  class WrappedComponent extends React.Component {
    static async getInitialProps(context) {
      let ChildProps = {};

      if (Child.getInitialProps) {
        ChildProps = await Child.getInitialProps(context)
      }

      const baseUrl = context.req ? `${context.req.protocol}://${context.req.get('Host')}` : '';
      //Loading articles from the411ng api
      let res = await fetch(`${baseUrl}/fetch-breaking-articles`);
      let articles = await res.json();

      return {
        ...ChildProps,
        articles,
      }
    }

    render() {
      const opts = opts || {},
      breakingNewsArticles = this.props.articles.gistMany;
      return (
        <div style={{ marginBottom: 20 }}>
          <Head>
              <meta name="format-detection" content="telephone=no"/>
              <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
              <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
              <meta charSet="utf-8"/>
              <meta name="description" content=""/>
              <meta name="keywords" content=""/>

              <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
              <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900|Raleway:300,400,500,600,700,800,900" rel="stylesheet"/>

              <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>
              {/* font-awesome css  */}
              <link rel="stylesheet" href="/static/css/font-awesome.min.css"/>
              {/* animate css */}
              <link rel="stylesheet" href="/static/css/animate.css"/>
              {/* owl carousel css */}
              {/* <link rel="stylesheet" href="/static/css/owl.carousel.min.css"/> */}

              {/* slicknav css */}
              <link rel="stylesheet" href="/static/css/slicknav.min.css"/>
              {/* main css */}
              <link rel="stylesheet" href="/static/css/main.css"/>
              {/* responsive css */}
              <link rel="stylesheet" href="/static/css/responsive.css"/>
              <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css' />
            </Head>
              <header className="header-area">
                  {/* <!-- top header area --> */}
                  <TopHeader />
                  <BreakingNewsBar articles={breakingNewsArticles}/>
                  <Nav />
              </header>
                <Child {...this.props}/>
              <Footer />
            <Scripts />
        </div>
      )
    }
  }
  // return withData(WrappedComponent)
  return (WrappedComponent)
}
