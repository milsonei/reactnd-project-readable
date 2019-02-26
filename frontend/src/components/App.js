import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import FeedPage from './FeedPage'
import LoadingBar from 'react-redux-loading'
import PostEditPage from './PostEditPage'
import Nav from './Nav'
import PostViewPage from './PostViewPage'
import UserEditPage from './UserEditPage'
import LoginPage from './LoginPage'
import PropTypes from 'prop-types'
import '../css/App.css'
import "antd/dist/antd.css";
import NotFoundComponent from './NotFoundComponent ';
class App extends Component {
  componentDidMount(){    
    this.props.getInitialData()
  }

  render() {
   const { categories, loading } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <Nav/>                  
            { 
              loading === true
              ? null
              : 
              <div className='container'>
              {
               /*                
                * As new routes were included, besides those requested by the project, 
                * it was necessary to create a strategy to maintain the compatibility of the route :category
                * The solution was to generate the route directly for each category, so it was possible to make the correct match when loading the url address
                */ 
              }
              <Switch>
                <Route path='/' exact component={FeedPage}/>
                {
                  categories.map(category => (<Route exact key={`/${category}-view`} path={`/${category}/:post_id`} component={PostViewPage}/>))
                }
                {
                  categories.map(category => (<Route exact key={`/${category}-edit`} path={`/${category}/:post_id/edit`} component={PostEditPage}/>))
                }
                {
                  categories.map(category => (<Route exact key={`/${category}-group`} path={`/${category}`} component={FeedPage}/>))
                }     
                <Route path='/post/new' exact component={PostEditPage}/>   
                <Route path='/user/signin' exact component={LoginPage}/>    
                <Route path='/user/join' exact component={UserEditPage}/>
                <Route path='/user/profile' exact component={UserEditPage}/>
                <Route path='/user/change-password' exact component={UserEditPage}/>
                <Route path='*' component={NotFoundComponent}/>
              </Switch>
              </div>
            }
          
        </Fragment>
      </Router>
    )
  }
}

function mapStateToPropos({ loaded, categories }){
  return {
    loading: loaded == null,
    categories: categories ? Object.keys(categories) : []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialData: () => dispatch(handleInitialData())
  }
}

PostEditPage.propTypes = {
  loading: PropTypes.bool
}

export default connect(mapStateToPropos, mapDispatchToProps)(App)