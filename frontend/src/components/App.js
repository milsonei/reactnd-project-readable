import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import handleSortFeed from '../actions/sort'
import FeedPage from './FeedPage'
import LoadingBar from 'react-redux-loading'
import NewPostPage from './NewPostPage'
import Nav from './Nav'
import PostPage from './PostPage';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  handleSortFeed(field){
    this.props.dispatch(handleSortFeed(field))
  }
  render() {    
      /**
       * Normalmente seria criado uma div aqui, mas isto adicionaria outro div à DOM, o que não é recomendável.
       * Então para resolver isso vamos usar Fragment, que permite passar um único filho para o componente router, de React Router, 
       * mas não vai adicionar outros elementos à DOM
       */
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            <Nav sort={this.props.sort} categories={this.props.categories} onSortFeed={(field) => this.handleSortFeed(field)}/>
            { 
              this.props.loading === true
              ? null
              : 
              <div>
                <Route path='/' exact component={FeedPage}/>
                <Route path='/post/:id' exact component={PostPage}/>                
                <Route path='/posts/:id' exact component={FeedPage}/>                
                <Route path='/new' exact component={NewPostPage}/>
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToPropos({ authedUser, categories, sort }){
  return {
    sort,
    categories,
    loading: authedUser === null
  }
}

export default connect(mapStateToPropos)(App)