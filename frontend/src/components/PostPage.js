import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthoralPost from './AuthoralPost'
import AuthoralComment from './AuthoralComment'
import NewComment from './NewCommentPage';
import { handleAllComments } from '../actions/comments'

class PostPage extends Component{
    async componentDidMount(){
        this.props.dispatch(handleAllComments(this.props.id))
    }
    render(){
        const { id, comments } = this.props

        return (
            <div>
                <AuthoralPost id={id}/>
                <NewComment id={id}/>
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

function mapStateToProps({ posts }, props){
    const { id } = props.match.params
    const post = posts ? posts[id] : null
    return {
        id,        
        comments: post === null
                 ? []
                 : post.comments 
                    ? Object.keys(post.comments).sort((a,b) => post.comments[b].timestamp - post.comments[a].timestamp).map(a => post.comments[a])
                    : []
    }
}

export default connect(mapStateToProps)(PostPage)