import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <Nav/>                  
            { 
              this.props.loading === true
              ? null
              : 
              <div className='container'>   
                <Route path='/' exact component={FeedPage}/>
                <Route path='/signin' exact component={LoginPage}/>    
                <Route path='/join' exact component={UserEditPage}/>
                <Route path='/profile' exact component={UserEditPage}/>
                <Route path='/change-password' exact component={UserEditPage}/>
                <Route path='/post/:id' exact component={PostViewPage}/>
                <Route path='/posts/:id' exact component={FeedPage}/>
                <Route path='/new' exact component={PostEditPage}/>
                <Route path='/edit/:id' exact component={PostEditPage}/>
              </div>
            }
          
        </Fragment>
      </Router>
    )
  }
}

function mapStateToPropos({ loaded }){
  return {
    loading: loaded == null
  }
}

PostEditPage.propTypes = {
  loading: PropTypes.bool 
}

export default connect(mapStateToPropos)(App)