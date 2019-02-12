import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Feed from './Feed'
import LoadingBar from 'react-redux-loading'
import NewPost from './NewPost'
import Nav from './Nav'
import PostPage from './PostPage';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
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
            <Nav/>
            { 
              this.props.loading === true
              ? null
              : 
              <div>
                <Route path='/' exact component={Feed}/>
                <Route path='/post/:id' exact component={PostPage}/>
                <Route path='/new' exact component={NewPost}/>
              </div>
            }        
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToPropos({ authedUser }){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToPropos)(App)