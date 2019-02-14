import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpVoteComment, handleDownVoteComment } from '../actions/comments'
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom'
import {
    Comment, Icon, Tooltip, Avatar,
  } from 'antd';
class AuthoralComment extends Component{
  getActions = (id, voteScore) => {   
    let iconStyles = {
      height: '20px',
      width: '20px'
    };
    return [
      <span>
        <Tooltip title="Up Vote">
          <Icon
            style={iconStyles}
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
            style={iconStyles}
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

    dispatch(handleUpVoteComment(id))
}

handleDownVote = async (e, id) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(handleDownVoteComment(id))
}
    render(){    
      const { comment, author } = this.props;
      return (      
        <Comment
        key={`comment_${comment.id}`}
        actions={this.getActions(comment.id, comment.voteScore)}
        author={comment.author}
        avatar={(
          <Avatar
            src={author.avatar}
            alt={author.name}
          />
        )}
        content={(
          <div>          
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

  export default AuthoralComment