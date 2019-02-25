import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpVotePost, handleDownVotePost, handleDeletePost } from '../actions/posts'
import moment from 'moment';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
  Alert, Comment, Icon, Tooltip, Avatar, Row, Col, Popconfirm
  } from 'antd';
import { TO_LOGIN, enableRedirect } from '../actions/redirect'
/**
 * Component responsible for displaying all details of a post, such as author, creation time, comments counter, category, and buttons to increment or decrement the posting score. 
 * If the logged in user is the author, they can delete or edit the post in view mode.
 * The following React UI library ANTD components are used: Alert, Comment, Icon, Tooltip, Avatar, Row, Col and Popconfirm.
 */
class MyPost extends Component {    
    getActions = () => {   
        const iconStyles = {
          height: '20px',
          width: '20px'
        }
        
        const deleteStyle ={
          ...iconStyles,
          color: 'red'

        }
        const editStyle ={
          ...iconStyles,
          color: 'red'

        }
        const commentIconStyle ={
          ...iconStyles,
        }       
       const labelStyle = { paddingLeft: 5 }   
       const commentLabelStyle ={
        ...labelStyle,
      } 
       const { id, voteScore, commentCount, category, author} = this.props.post       
       const { authedUser, details } = this.props        
       const showReplyTo = (!details || (details && !authedUser)) ? true: false
       const canDelete = authedUser === author && details
       if (details){
          commentIconStyle.cursor = 'auto'
          commentLabelStyle.cursor = 'auto'
       }
       const commentIcon = (<Icon
        type="message"
        style={commentIconStyle}
      />)
      const commentLabel = (<span style={commentLabelStyle}>{commentCount} comments</span>)
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
          </span>, 
            <span>
            {details 
            ? (<span>{commentIcon}{commentLabel}</span>)
            :(
              <Link to={`/post/${id}`}>           
               {commentIcon}
               {commentLabel}
             </Link>)                      
               }
          </span>         
          ,
          <span>
          <Link to={`/posts/${category}`}>           
              <Icon
                type="tags"
                style={iconStyles}
              />            
            <span style={labelStyle}>{category}</span> 
          </Link>
        </span>              
        ]
        if (showReplyTo){
          /** if exists details then onclick event is activated form replyto icon */        
          const replyLabel = (<span style={labelStyle}>Reply to</span>)
          const replyIcon = details ? ( <Icon
                                          type="retweet"
                                          style={iconStyles}
                                          onClick={this.handleReplyTo}
                                        />) 
                                        : ( <Icon
                                              type="retweet"
                                              style={iconStyles}
                                            />)
          const replyButton = (<Tooltip title="Reply to">
                               {replyIcon}
                              </Tooltip>)
          if(details){
            /** if not exists details then a link to details is activated */
            buttons.push(<span>             
            {replyButton}
              {replyLabel}
              </span>)
          }else{
            buttons.push(<span>
              <Link to={`/post/${id}`}>
              {replyButton}
              {replyLabel}
              </Link>
              </span>)
          }
        }
        if (canDelete){
          buttons.push(<span>            
            <Popconfirm placement="bottomLeft" title="Do you confirm delete this post?" onConfirm={this.handleDelete} okText="Yes" cancelText="No">       
              <Icon
                type="delete"
                style={deleteStyle}
                theme='filled'
              />
               <span style={labelStyle}>Delete</span>  
              </Popconfirm>            
           
           </span>)

          buttons.push(<span>           
           <Link to={`/edit/${id}`}>          
              <Icon
                type="edit"
                style={editStyle}
                theme='filled'
              />                        
            <span style={labelStyle}>Edit</span>  
            </Link>
           </span>)
        }
        return buttons
      }
    
    handleReplyTo = (e) =>{
      const {  category } = this.props.post
      const { dispatch } = this.props      
      dispatch(enableRedirect(TO_LOGIN, `/posts/${category}`))
    }
    handleDelete = async (e) => {
        e.preventDefault()
        const { dispatch, post } = this.props      
        dispatch(handleDeletePost(post.id))
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
        const { post, author, authedUser, id } = this.props
        let { comment , details} = this.props
        if (authedUser === '' && details){
          comment = (<Col span={24}>
            <div className="new-comment">
            <Link to={`${TO_LOGIN}?target=/post/${id}`}>
              <Alert
              message="Informational Notes"
              description="Signin to add a comment"
              type="info"
              showIcon
              /></Link></div></Col>)
        }
        const avatar = author && author.avatar 
                      ? (
                        <Avatar style={{cursor:"default"}}
                        src={author.avatar}
                        alt={author.id}
                        />
                    )
                    : (
                      <Avatar style={{cursor:"default"}}
                      icon="user"
                      alt="No avatar"
                      />
                  ) 
        return (
          <div className="my-box widget-box post">  
            <Row>
              <Col span={24}>
                <Comment
                key={`post_${post.id}`}
                actions={this.getActions()}
                author={post.author}
                avatar={avatar}
                content={details ? 
                    (<div style={{cursor:"auto"}}>                    
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>                              
                    </div>)
                    : (
                    <div>
                      <Link to={`/post/${post.id}`}>
                        <h1>{post.title}</h1>
                        <p>{post.body.length > 60 ? `${post.body.substring(0, 60)}` : post.body}{post.body.length > 60 && (<span style={{fontSize:"0.7em"}}> [show more...]</span>)}</p> 
                      </Link>         
                    </div>
                )}
                datetime={(
                    <Tooltip title={moment(post.timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(post.timestamp).fromNow()}</span>
                    </Tooltip>
                )}
                >             
                </Comment>
                </Col>                
                {comment}
              </Row>              
             
            </div>
        )
    }
}

function mapStateToProps({ users, posts, authedUser }, { id }) {
    const post = posts[id]
    return {        
        authedUser : authedUser.id ? authedUser.id : '',
        author : users[post.author],
        post
    }
}

MyPost.propTypes = {
  authedUser: PropTypes.string,
  author: PropTypes.object,
  post: PropTypes.object
}

export default connect(mapStateToProps)(MyPost)