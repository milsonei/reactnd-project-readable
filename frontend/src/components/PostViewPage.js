import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import MyPost from './MyPost'
import CommentList from './CommentList'
import { handleAllComments, handleAddComment } from '../actions/comments'
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
        submitting: false,
        
    }
    async componentWillMount(){
        document.title = this.props.title;     
        this.props.dispatch(handleAllComments(this.props.id))
    }

    componentWillReceiveProps = (nextProps) => {                 
        if (nextProps.success.yes){            
            this.props.dispatch(clearSuccess())    
            const { resetFields }  = this.props.form
            resetFields()
            this.setState({
                clearComment: true
            })     
        }     
       }
    /**
     * This function is responsible for submiting data to server
     */
    handleSubmitComment = (e) => { 
        const { dispatch } = this.props
        const { author, id } = this.props        
        this.validate(e, (values) => {                                     
            const { comment } = values                  
            dispatch(handleAddComment(id, comment, author.id))
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
                this.setState({
                    submitting : true
                 })    
                DialogUtil.showConfirm('Do you confirm this comment?', () => {                              
                    callback(values)
                }, () => {
                    this.setState({
                        submitting : false
                     })
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
        const { submitting, clearComment } = this.state
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
                                                <CommentEditor getFieldDecorator={getFieldDecorator} 
                                                               resetFields={resetFields}
                                                               validator={this.validate} 
                                                               onSubmit={this.handleSubmitComment} 
                                                               clear={clearComment}
                                                               submitting={submitting}/>
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
    const { id } = props.match.params 
    const post = posts[id]   
    return {
        author: authedUser.id ? { id: authedUser.id, avatar: users[authedUser.id].avatar} : { id: '' },
        commentCount: post ? post.commentCount : 0,
        success,
        exists: post !== undefined,
        id,
        title: post ? post.title : '',
        redirect
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

export default withRouter(connect(mapStateToProps)(WrappedPostViewPage))