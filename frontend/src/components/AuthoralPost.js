import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpVotePost, handleDownVotePost } from '../actions/posts'
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom'
import {
    Comment, Icon, Tooltip, Avatar,
  } from 'antd';
import "antd/dist/antd.css";
/** Based on https://www.quora.com */
class AuthoralPost extends Component {    
    getActions = () => {   
      const iconStyles = {
        height: '20px',
        width: '20px'
      }
      const labelStyle = { paddingLeft: 8, cursor: 'auto' }
       const { voteScore, commentCount, category} = this.props.post
        return [          
          <span>
            <Tooltip title="Up Vote">
              <Icon
                type="plus-circle"
                style={iconStyles}
                theme={voteScore > 0 ? 'filled' : 'outlined'}
                onClick={this.handleUpVote}
              />
            </Tooltip>
            <span style={{paddingLeft: 4, paddingRight: 4, cursor: 'auto' }}>
            {voteScore === 0 ? "" : voteScore > 0 ? "Upvote: " : "Downvote: "}{voteScore === 0 ? "none" : voteScore}{voteScore === 0 ? " vote" : ""}
           </span>
            <Tooltip title="Down Vote">
              <Icon
                type="minus-circle"
                style={iconStyles}
                theme={voteScore < 0 ? 'filled' : 'outlined'}
                onClick={this.handleDownVote}
              />
            </Tooltip>          
          </span>, 
            <span>
            <Tooltip title="Comments">
              <Icon
                type="message"
                style={iconStyles}
              />
            </Tooltip>
            <span style={labelStyle}>{commentCount} comments</span>  
          </span>         
          ,
          <span>
          <Link to={`/posts/${category}`}>
          <Tooltip title={`Category ${category}`}>
            <Icon
              type="tags"
              style={iconStyles}
            />
          </Tooltip>
          <span style={labelStyle}>{category}</span> 
          </Link>
        </span>      
         ,
          <span>
          <Tooltip title="Reply to">
            <Icon
              type="retweet"
              style={iconStyles}
            />
          </Tooltip>
          <span style={labelStyle}>Reply to</span>  
        </span>      
        ]
      }
   
    handleUpVote = async (e) => {
        e.preventDefault()

        const { dispatch, post } = this.props
        
        dispatch(handleUpVotePost(post.id))
    }

    handleDownVote = async (e) => {
        e.preventDefault()

        const { dispatch, post } = this.props

        dispatch(handleDownVotePost(post.id))
    }
    render(){
        const { post, authors, handleCommentLike, handleCommentDislike } = this.props
        const postAuthor = authors[post.author]
        return (
            <div className='post'>
                <Comment
                key={`post_${post.id}`}
                actions={this.getActions()}
                author={post.author}
                avatar={(
                    <Avatar
                    src={postAuthor.avatar}
                    alt={postAuthor.name}
                    />
                )}
                content={(
                    <div>
                      <Link to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p> 
                      </Link>         
                    </div>
                )}
                datetime={(
                    <Tooltip title={moment(post.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(post.timestamp).fromNow()}</span>
                    </Tooltip>
                )}
                >
                {post.comments && post.comments.map((comment) => (
                    <Comment
                    key={`comment_readable_${comment.id}`}
                    author={authors[comment.author]}
                    comment={comment}
                    handleCommentLike={handleCommentLike}
                    handleCommentDislike={handleCommentDislike}
                    />
                ))}
                </Comment>
            </div>
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