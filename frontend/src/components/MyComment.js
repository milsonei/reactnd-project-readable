import React, { Component } from 'react'
import { handleUpVoteComment, handleDownVoteComment, handleDeleteComment } from '../actions/comments'
import moment from 'moment';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {
    Comment, Icon, Tooltip, Avatar, Popconfirm
  } from 'antd';
  /**
   * Component responsible for displaying all details of a comment, such as author, creation time, and buttons to increment or decrement the comment score. If the logged in user is the author, he or she can delete the comment.
   */
class MyComment extends Component{
  getActions = () => {   
    const iconStyles = {
      height: '20px',
      width: '20px'
    }  
    const deleteStyle ={
      ...iconStyles,
      color: 'red'

    }  
     const labelStyle = { paddingLeft: 5 }  
     const { voteScore } = this.props.comment
     const { authedUser, comment } = this.props 
     const canDelete = authedUser === comment.author
     const buttons = [          
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
        </span>       
      ]

      if (canDelete){
        buttons.push(<span>
          <Tooltip title="Delete this comment">
          <Popconfirm placement="bottomLeft" title="Do you confirm delete this comment?" onConfirm={this.handleDelete} okText="Yes" cancelText="No">       
          <Icon
                type="delete"
                style={deleteStyle}
                theme='filled'
              />
               <span style={labelStyle}>Delete</span>  
              </Popconfirm>
            </Tooltip>
           
         </span>)
      }

      return buttons
    }
    
    /**
     * Handle delete comment
     */
    handleDelete = async (e) => {
      e.preventDefault()
      const { dispatch, comment } = this.props      
      dispatch(handleDeleteComment(comment.parentId, comment.id))
   }

    handleUpVote = async (e) => {
        e.preventDefault()

        const { dispatch, comment } = this.props
        
        dispatch(handleUpVoteComment(comment.id))
    }

    handleDownVote = async (e) => {
        e.preventDefault()

        const { dispatch, comment } = this.props

        dispatch(handleDownVoteComment(comment.id))
    }

    render(){    
      const { comment, author } = this.props;
      return (
        <Comment
        key={`comment_${comment.id}`}
        actions={this.getActions()}
        author={comment.author}
        avatar={(
          <Avatar
            src={author.avatar}
            alt={author.name}
          />
        )}
        content={(
                    <div style={{cursor:"auto"}}> 
                        <p>{comment.body}</p> 
                    </div>
                )}
        datetime={(
          <Tooltip title={moment(comment.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(comment.timestamp).fromNow()}</span>
          </Tooltip>
        )}
      />
      )
    }
  }

  function mapStateToProps({ users, comments, authedUser }, { id }) {
    const comment = comments[id]
    const author = users[comment.author]
    return {
        authedUser: authedUser.id || "",
        author,        
        comment        
    }
}

MyComment.propTypes = {
  authedUser: PropTypes.string,
  author: PropTypes.object,
  comment: PropTypes.object
}

export default connect(mapStateToProps)(MyComment)