import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthoralPost from './AuthoralPost'
import AuthoralComment from './AuthoralComment'
import NewComent from './NewComent';
import { handleInitialData } from '../actions/shared';

class PostPage extends Component{
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }
    render(){
        const { id, comments } = this.props

        return (
            <div>
                <AuthoralPost id={id}/>
                <NewComent id={id}/>
                {comments.length !== 0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {comments.map((replyId) =>(
                        <li key={replyId}>
                            <AuthoralComment id={replyId}/>
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }, props){
    const { id } = props.match.params
    const post = posts ? posts[id] : null
    return {
        id,
        comments: post === null
                 ? []
                 : comments.filter(c => c.parentId === id).sort((a,b) => comments[b].timestamp - comments[a].timestamp)                 
    }
}

export default connect(mapStateToProps)(PostPage)