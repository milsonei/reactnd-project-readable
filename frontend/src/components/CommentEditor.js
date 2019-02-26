import {Form, Button, Input, Row, Col} from 'antd'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { disableCommentToEdit } from '../actions/commentInEditMode';
const TextArea = Input.TextArea
/**
 * Component responsible for create a textarea for inputting comments, 
 * a "Add Comment "button and "Clear' button based on Form, TextArea e Button components from React UI library ANTD
 */
class CommentEditor extends Component{
  state = {
    commentCharsLeft : 1000
  }

  commentMaxLength = 1000

  componentWillReceiveProps = (nextProps) => {
    const {clear} = nextProps
    if (clear){      
      this.setState({
        commentCharsLeft: this.commentMaxLength
      })
    }
    if (nextProps.comment){
      this.setState({
        commentCharsLeft: this.commentMaxLength - nextProps.comment.body.length
      })
    }
  }
  
  /**
    * Calculate body left chars
    */
   handleCommentChange = (e) => {
      e.preventDefault()
      const charCount = e.target.value.length;
      const maxChar = this.commentMaxLength;
      const charLength = maxChar - charCount;
      this.setState(
        { 
          commentCharsLeft: charLength
        });
    }

    /**
     * Submitting comment
     */
    handleSubmit = (e) => {
      const {onSubmit, validator, comment} = this.props      
       if (validator(e)){                      
          onSubmit(e, comment ? comment.id : '')
      }
    }

    render(){
      const  { getFieldDecorator, resetFields, comment, cancelEditMode } = this.props        
      const { commentCharsLeft } = this.state          
      let body = ''  
      const exists = comment !== null 
      if (comment){
        body = comment.body
      }
      return (
          <div>
            <Form.Item>        
              {getFieldDecorator('comment', {
                  initialValue: body,
                  rules: [{ required: true, message: "Please write something!" }]
               })(                     
                  <TextArea 
                          rows={4}
                          placeholder="Your comment"
                          className={`textarea${exists ? ' edit' : ''}`}
                          maxLength={this.bodyLength}
                          onChange={this.handleCommentChange}
                      />  
                      )}                   
                      <div className='post-length'>
                          {commentCharsLeft} characters left
                      </div>        
            </Form.Item>
          {exists ? ( <Row>
              <Col span={12} style={{textAlign:'right', paddingRight:"10px"}}>
                <Button               
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  type="primary"        
                >
                  Update Comment
                </Button>  
              </Col>
              <Col span={12} style={{textAlign:'left'}}>
                <Button                          
                  onClick={() => cancelEditMode()}
                  type="default"        
                >
                  Cancel
                </Button>  
              </Col>     
              </Row>)
          : (
           <Row>
              <Col span={12} style={{textAlign:'right', paddingRight:"10px"}}>
                <Button               
                  htmlType="submit"
                  onClick={this.handleSubmit}
                  type="primary"        
                >
                  Add Comment
                </Button>  
              </Col>
              <Col span={12} style={{textAlign:'left'}}>
                <Button                          
                  onClick={() => resetFields(['comment'])}
                  type="default"        
                >
                  Clear
                </Button>  
              </Col>     
              </Row>)}
          </div>
        );
      }
}

function mapStateToProps({ commentInEditMode, comments }, { parentId }) { 
  let comment = null
  if (commentInEditMode.id && commentInEditMode.parentId === parentId){
    comment = {
      id: commentInEditMode.id,
      body: comments[commentInEditMode.id].body
    }
  }
  return {
    comment
  }
}

CommentEditor.propTypes = {
  parentId: PropTypes.string,
  getFieldDecorator: PropTypes.func, 
  resetFields: PropTypes.func,
  comment: PropTypes.object
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditMode: () => dispatch(disableCommentToEdit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor)