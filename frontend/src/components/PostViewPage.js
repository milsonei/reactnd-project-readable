import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import MyPost from './MyPost'
import CommentList from './CommentList'
import { handleAllComments, handleAddComment, handleEditComment } from '../actions/comments'
import CommentEditor from './CommentEditor'
import { Form, Avatar, Comment, Col } from 'antd'
import SortSelector from './SortSelector'
import DialogUtil from '../utils/DialogUtil';
import { clearSuccess } from '../actions/success';
import PropTypes from 'prop-types';
/**
 * Component responsible for creating the preview page for all details of a particular post and the comments associated with this post. The AND components used on this page are: Form, Avatar, Comment, and Col.
 */
class PostViewPage extends Component{  
   state = {
        clearComment: false
    }

    async componentWillMount(){
        document.title = this.props.title;     
        this.props.getAllComments(this.props.id)
    }

    componentWillReceiveProps = (nextProps) => {                 
        if (nextProps.success.yes){            
            this.props.clearSuccess()    
            const { resetFields }  = this.props.form
            resetFields()
            this.setState({
                clearComment: true
            })     
        }     
       }
    /**
     * This function is responsible for submiting data to server
     * @param e event
     * @param currentId current comment id
     */
    handleSubmitComment = (e, currentId) => { 
        const { addComment, updateComment } = this.props
        const { author, id } = this.props        
        this.validate(e, (values) => {                                     
            const { comment } = values     
            if (currentId){
                updateComment(currentId, comment)
            }else{
                addComment(id, comment, author.id)
            }
            
        })
    }

    /**
     * This routine validates the values ​​before submitting
     */
    validate = (e, callback) =>{
        e.preventDefault();    
        let validated = false                 
        this.props.form.validateFields((err, values) => {
            validated = !err           
            if (callback && validated){               
                DialogUtil.showConfirm('Do you confirm this comment?', () => {                              
                    callback(values)
                })
            }
        });   
        return validated
    }

    render(){
        if (!this.props.exists){
            return <Redirect to='/'/>
        }
        const { id, author, commentCount } = this.props        
        const { getFieldDecorator, resetFields } = this.props.form
        const { clearComment } = this.state
        const showCommentList = commentCount > 0
        const showSort = commentCount > 1
        return (
            <div id="my-post">
             <Form className="comment-form">    
                <MyPost 
                      id={id} 
                      details={true}
                      comment = {
                          (                           
                            <Col span={24}>
                                <div className="new-comment">                                             
                                        <Comment
                                            avatar={author.id ? (
                                                <Avatar
                                                src={author.avatar}
                                                alt={author.id}
                                                />
                                            ) :  (<Avatar
                                                icon="user"
                                                alt="anonnymous"/>)}
                                            content={(
                                                <CommentEditor parentId={id}
                                                               getFieldDecorator={getFieldDecorator} 
                                                               resetFields={resetFields}
                                                               validator={this.validate} 
                                                               onSubmit={this.handleSubmitComment} 
                                                               clear={clearComment}/>
                                            )}
                                            />                
                                    
                                </div>
                            </Col>                            
                          )
                      }
                      /> 
                </Form>
                {showCommentList && (
                    <div>
                    <div className="my-box widget-box feed">
                        <div className="header no-border-radius">
                            Comments
                        </div> 
                        {showSort && ( 
                        <div className="widget-body  no-border-radius">
                            <SortSelector type="comments"/>
                        </div>)}
                    </div>
                    <CommentList parent={id}/>
                    </div>)}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, success, posts, redirect }, props){
    const { post_id } = props.match.params 
    const post = posts[post_id]   
    return {
        author: authedUser.id ? { id: authedUser.id, avatar: users[authedUser.id].avatar} : { id: '' },
        commentCount: post ? post.commentCount : 0,
        success,
        exists: post !== undefined,
        id: post_id,
        title: post ? post.title : '',
        redirect
     }
}

const mapDispatchToProps = dispatch => {
    return {         
      getAllComments: (postId) => dispatch(handleAllComments(postId)),
      clearSuccess: () => dispatch(clearSuccess()),
      addComment: (postId, comment, authorId) =>  dispatch(handleAddComment(postId, comment, authorId)),
      updateComment: (id, comment) =>  dispatch(handleEditComment(id, comment))
    }
  }

const WrappedPostViewPage = Form.create({ name: 'post_page' })(PostViewPage);

WrappedPostViewPage.propTypes = {
    author: PropTypes.object,
    commentCount: PropTypes.number,
    success: PropTypes.object,
    exists: PropTypes.bool,
    id: PropTypes.string,
    title:  PropTypes.string,
    redirect:  PropTypes.object,
    form: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedPostViewPage))