import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpVotePost, handleDownVotePost } from '../actions/posts'
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom'
import {
    Comment, Icon, Tooltip, Avatar,
  } from 'antd';
/** Based on https://www.quora.com */
class AuthoralPost extends Component {
  
  componentDidUpdate(prevProps, prevState) {
    
  }
    getActions = (id, voteScore) => {   
        return [
          <span>
            <Tooltip title="Up Vote">
              <Icon
                type="up-square"
                theme={voteScore > 0 ? 'filled' : 'outlined'}
                onClick={(e) => { this.handleUpVote(e, id) }}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
              {voteScore} point{Math.abs(voteScore) > 1 ? "s" : ""}
            </span>
          </span>,
          <span>
            <Tooltip title="Down Vote">
              <Icon
                type="down-square"
                theme={voteScore < 0 ? 'filled' : 'outlined'}
                onClick={(e) => { this.handleDownVote(e, id)} }
              />
            </Tooltip>       
          </span>,
          <span>Reply to</span>
        ]
      }
  
    handleUpVote = async (e, id) => {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch(handleUpVotePost(id))
    }

    handleDownVote = async (e, id) => {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch(handleDownVotePost(id))
    }
    render(){
        const { post, authors, handleCommentLike, handleCommentDislike } = this.props
        const postAuthor = authors[post.author]
        return (
            <Link to={`/post/${post.id}`} className='post'>
                <Comment
                key={`post_${post.id}`}
                actions={this.getActions(post.id, post.voteScore)}
                author={post.author}
                avatar={(
                    <Avatar
                    src={postAuthor.avatar}
                    alt={postAuthor.name}
                    />
                )}
                content={(
                    <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>          
                    </div>
                )}
                datetime={(
                    <Tooltip title={moment(post.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(post.timestamp).fromNow()}</span>
                    </Tooltip>
                )}
                >
                {comments.map((comment) => (
                    <Comment
                    key={`comment_readable_${comment.id}`}
                    author={authors[comment.author]}
                    comment={comment}
                    handleCommentLike={handleCommentLike}
                    handleCommentDislike={handleCommentDislike}
                    />
                ))}
                </Comment>
            </Link>
        )
    }
}

function mapStateToProps({ authors, posts }, { id }) {
    const post = posts[id]
    return {
        authors,
        post
    }
}

/**
 * O problema é que o componente Post não está sendo renderizado pelo React Router, então o this.props.history não está sendo passado para o componente Post.
 * Então podemos importar o componente withRouter.
 * Agora nós vamos exportar e empacotar tudo no withRouter.
 * Isso vai passar nosso componente connect, que vai passar ao componente Post todas as router props, o que vai permitir fazer este this.props.history.push
 */

export default withRouter(connect(mapStateToProps)(AuthoralPost))