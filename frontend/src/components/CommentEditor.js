import {Form, Button, Input, Row, Col} from 'antd'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
      const {onSubmit, validator} = this.props      
       if (validator(e)){             
          onSubmit(e)
      }
    }

    render(){
      const  {submitting, getFieldDecorator, resetFields} = this.props        
      const { commentCharsLeft } = this.state       
      return (
          <div>
            <Form.Item>        
              {getFieldDecorator('comment', {
                  initialValue: '',
                  rules: [{ required: true, message: "Please write something!" }]
               })(                     
                  <TextArea 
                          rows={4}
                          placeholder="Your comment"
                          className="textarea"
                          maxLength={this.bodyLength}
                          onChange={this.handleCommentChange}
                      />  
                      )}                   
                      <div className='post-length'>
                          {commentCharsLeft} characters left
                      </div>        
            </Form.Item>
           <Row>
              <Col span={12} style={{textAlign:'right', paddingRight:"10px"}}>
                <Button               
                  htmlType="submit"
                  loading={submitting}
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
              </Row>
          </div>
        );
      }
}

CommentEditor.propTypes = {
  submitting: PropTypes.bool,
  getFieldDecorator: PropTypes.func, 
  resetFields: PropTypes.func 
}

export default CommentEditor