import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom'
import { handleAddPost, handleEditPost } from '../actions/posts'
import { Avatar, Tooltip, Select, Form, Button, Input } from 'antd'
import DialogUtil from '../utils/DialogUtil'
const { TextArea } = Input;
/**
 * Component responsible for rendering a page for creating and editing a particular post. 
 * The AND components used on this page are: Avatar, Tooltip, Select, Form, Button, Input
 */
class PostEditPage extends Component{
   state = {
       bodyCharsLeft : 1000
   }

   bodyMaxLength = 1000

    componentDidMount = () => {
        const { editMode } = this.props
        document.title = editMode ? 'Edit Post' : 'New Post'
    }

   /**
    * Calculate body left chars
    */
    handleBodyCount = (e) => {
        const charCount = e.target.value.length;
        const maxChar = this.bodyMaxLength;
        const charLength = maxChar - charCount;
        this.setState({ bodyCharsLeft: charLength });
    }
    

     /**
     * This function is responsible for submiting data to server
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { addPost, editPost, editMode, post, authedUser } = this.props
        const message = editMode ? "Do you confirm post update?": "Do you confirm this new post?"
        this.props.form.validateFields((err, values) => {
            if (!err) {                 
                DialogUtil.showConfirm(message,function(){
                    const { title, body, category } = values
                    if (editMode){
                        editPost(post.id, title, body, category)
                    }else{
                        addPost(title, body, authedUser, category)
                    }
                    
                });
            }
        })          
    }

    /**
     * Generate select items
     */
    generateItens() {
        const { categories } = this.props
        return Object.keys(categories).map((key, index) => (
          <Select.Option key={`item-sort-${index}`} value={categories[key].path}>{categories[key].name}</Select.Option>
        ))
      }
   
    render(){
        const { bodyCharsLeft } = this.state               
        const { getFieldDecorator } = this.props.form
        const { authedUser, avatar, post, editMode } = this.props
        let title = ''
        let body = ''
        let category = ''
        if (post && editMode){
            /** In edit mode, redirects to post view mode, if not the author */
            if (post && post.author !== authedUser){
                return <Redirect to={`/${post.category}/${post.id}`}/>
            }
            title = post.title
            body = post.body
            category = post.category
        }
        /** Only allows you to create or edit a post if the user is authenticated */
        if (authedUser === ''){
            return <Redirect to='/user/signin?target=/post/new'/>
        }         
       
        return (
            <div className="my-box widget-box new-post">
                <div className="header">
                {editMode ? 'Edit' : 'New'} Post
                </div>
                <div className="widget-body">
                    <Form onSubmit={this.handleSubmit} className="new-post-form">
                        <Form.Item label="Category">
                        {getFieldDecorator('category', {
                            initialValue: category,
                            rules: [{ required: true, message: "Please choose your post's category!" }]
                        })(
                        <Select key="sort" placeholder="Choose a category" className="category" >
                        {this.generateItens()}
                        </Select>)}                  
                        </Form.Item>
                        <Form.Item label="Title">  
                        {getFieldDecorator('title', {
                            initialValue: title,
                            rules: [{ required: true, message: "Please enter the title of your post!" }]
                        })(                          
                            <Input placeholder="What's the topic?"       
                                maxLength={1000} />)} 
                        </Form.Item>
                        <Form.Item label="Body" >   
                        {getFieldDecorator('body', {
                            initialValue: body,
                            rules: [{ required: true, message: "Please write something!" }]
                        })(                     
                        <TextArea 
                                placeholder="Write about any interesting topic"                              
                                className="textarea"
                                maxLength={this.bodyLength}
                                onChange={this.handleBodyCount}
                            />  
                            )}                   
                            <div className='post-length'>
                                {bodyCharsLeft} characters left
                            </div>                                       
                        </Form.Item>
                          
                        <Form.Item className="author" label="Author"> 
                        {getFieldDecorator('nickname', {
                            initialValue: authedUser,
                            rules: [{ required: true, message: "Please enter your nickname!" }]
                        })( 
                        <Input style={{backgroundColor:"#f7f7f7", cursor:"default"}} readOnly={true} placeholder="Your nickname"
                                onBlur={this.handleGetAvatar}/>)} 
                        </Form.Item>  
                        <Form.Item style={{textAlign:"center"}} > 
                            <Tooltip placement="leftBottom" title="This is your avatar">
                                <Avatar size={48} src={avatar}/>
                            </Tooltip>          
                        </Form.Item> 
                        <Form.Item  style={{paddingTop:'8px', textAlign:'center'}}>
                            <Button type="primary" htmlType="submit">Submit</Button>                        
                        </Form.Item>
                    </Form>
                </div>
            </div>
     
        )
    }
}

function mapStateToProps({ categories, authedUser, users, posts }, props){    
    const { post_id } = props.match.params
    const id = post_id
    const post = id ? posts[id]  : undefined   
    const user = authedUser.id ? users[authedUser.id] : null
    return {        
        authedUser : authedUser.id,
        avatar: user ? user.avatar : '',
        categories,
        editMode: post !== undefined,
        gender: user ? user.gender : '',
        post       
    }
}

const mapDispatchToProps = dispatch => {
    return {         
      addPost: (title, body, authedUser, category) => dispatch(handleAddPost(title, body, authedUser, category)),
      editPost: (id, title, body, category) => dispatch(handleEditPost(id, title, body, category))
    }
  }

const WrappedPostEditPage = Form.create()(PostEditPage)

WrappedPostEditPage.propTypes = {
    authedUser: PropTypes.string,
    avatar: PropTypes.string,
    categories: PropTypes.object.isRequired, 
    editMode: PropTypes.bool.isRequired,
    gender: PropTypes.string,
    post: PropTypes.object,
    form: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedPostEditPage))