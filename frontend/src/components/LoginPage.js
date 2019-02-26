import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { handleSignin } from '../actions/authedUser'
import SecurityUtil from '../utils/SecurityUtil';
import { Icon, Form, Button, Input, Checkbox, Alert } from 'antd';
import Utilities from '../utils/Utilities';
import { clearSuccess } from '../actions/success';
import { enableRedirect } from '../actions/redirect';
import PropTypes from 'prop-types';
/**
 * Component responsible for rendering a page that allows a registered user to enter the app using a nickname and password, 
 * as well as a link to open the new user registration page.
 */
class LoginPage extends Component {       
    usernameLength = 50
    passwordLngth = 50
    componentDidMount = () => {
        document.title = "Signin";
    }
     /**
     * Redirect to new feed after sigin
     */
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.authedUser !== ''){  
            const targetAfterLogin = Utilities.extractTargetUrl(this.props.location)
            const { redirect, clearSuccess } = this.props
            if (targetAfterLogin){             
                redirect(targetAfterLogin);
                clearSuccess()               
            }else{
                redirect('/')
            }
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { signin } = this.props
            const { nickname, password, remember } = values
            const passwordCrypted = SecurityUtil.encr(password)
            signin(nickname, passwordCrypted, remember)
          }
        });
      }

    render(){ 
        const { authedUser, remember } = this.props
        if (authedUser){
            return <Redirect to='/'/>
        }     
        const { id } = remember
        const { getFieldDecorator } = this.props.form;
        return (            
            <div className="my-box widget-box login">
                <div className="header">
                Sign in
                </div>
                <div className="widget-body">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!' }],
                        initialValue: id
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nickname" />
                    )}
                    </Form.Item>    
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </Form.Item>             
                    <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign in
                    </Button>
                   
                    </Form.Item>
                    <Form.Item style={{textAlign:"center"}}>
                    <Link to={`/user/join`}>or register now!</Link>
                    </Form.Item>

                    <Form.Item>
                    <Alert
                        message="Informational Notes"
                        description="Enter your nickname that will be used in posts and comments"
                        type="info"
                        showIcon
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
        )
    }
}

function mapStateToProps({ authedUser, remember }){  
    return {
        authedUser : authedUser.id,
        remember
    }
}

const mapDispatchToProps = dispatch => {
    return {
      redirect: (to) => dispatch(enableRedirect(to)),
      clearSuccess: () => dispatch(clearSuccess()),
      signin: (nickname, passwordCrypted, remember) => dispatch(handleSignin(nickname, passwordCrypted, remember))
    }
}

const WrappedLoginPage = Form.create({ name: 'login_page' })(LoginPage);

WrappedLoginPage.propTypes = {
    authedUser: PropTypes.string,
    remember: PropTypes.object,
    form: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedLoginPage))