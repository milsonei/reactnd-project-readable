import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Icon, Form, Button, Input, Avatar, Tooltip, Select, Row, Col } from 'antd';
import { handleAddUser, handleChangeAvatar, handleChangePassword } from '../actions/users';
import { handleGenerateAvatar, receiveNewAvatar } from '../actions/avatar';
import userApi from '../api/UserApi';
import SecurityUtil from '../utils/SecurityUtil';
import PropTypes from 'prop-types';
import DialogUtil from '../utils/DialogUtil';
import { enableRedirect } from '../actions/redirect';
/**
 * Component responsible for rendering a page for creating and editing a particular user. The AND components used on this page are: Icon, Form, Button, Input, Avatar, Tooltip, Select, Row, Col.
 */
class UserEditPage extends Component {    
    state = {        
        validate: false,        
        lastnickname: { value: '', exists: false }
    }

    /**
     * This function is responsible for submiting data to server
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { changeAvatar, changePasswod, addUser, editMode, changePassword } = this.props
      
        this.props.form.validateFields((err, values) => {            
            if (!err) {
                const { avatar } = this.props
                if (editMode) {
                    const { nickname, gender } = values
                    DialogUtil.showConfirm('Do you confirm this update?',function(){
                        changeAvatar(nickname, gender, avatar)
                    })
                }else if (changePassword){
                    const { nickname, password, currentPassword } = values
                    if (password === currentPassword){
                        DialogUtil.showErrorNotification('Password', 'You have entered the last password. Please enter a different one.')
                    }else{
                       const encryptedPassword = SecurityUtil.encr(password)
                       const encryptedCurrentPassword = SecurityUtil.encr(currentPassword)
                        DialogUtil.showConfirm('Do you confirm change your password?',function(){
                            changePasswod(nickname, encryptedCurrentPassword, encryptedPassword)
                        })
                    }                   
                }else{
                    const { nickname, gender, password } = values  
                    const encryptedPassword = SecurityUtil.encr(password)
                    addUser(nickname, gender, avatar, encryptedPassword)
                }
            }
        });
      
    }
    
     /**
     * This function is responsible for comparing the confirmation password with the original password
     * @param {any} rule Validation rule
     * @param {any} value Input value
     * @param {function} callback Routine executed after data validation
     */
    validateNickname = async(rule, value, callback) => {
        const { editMode, changePassword } = this.props
        const newUser = !editMode && !changePassword
        if (newUser){
            const res = await userApi.get(value)
            const author = res.data
            if (author.id) {
                callback('This nickname already exists! Please choose another.');
            } else {
                callback();
            }       
        }else{
            callback();
        }
    }
    
    /**
     * This function is responsible for validating next password
     * @param {any} rule Validation rule
     * @param {any} value Input value
     * @param {function} callback Routine executed after data validation
     */
 
    /***
     * Function responsible for requesting a new avatar
     */
    handleGenerateNewAvatar = (e) =>{
        const { generateAvatar } = this.props
        const form = this.props.form;
        generateAvatar(form.getFieldValue('gender'))
    }

    /***
     * Function responsible for requesting a new avatar after change gender user
     */
    handleGenderChange = (gender) =>{
        const { generateAvatar } = this.props
        generateAvatar(gender) 
    }

    handleCancel = (e) => {
        const { rollbackAvatar, redirect, user } = this.props
        if (user){
            rollbackAvatar(user.gender, user.avatar)
         }
         redirect('/user/signin')
    }

     /**
     * This function is responsible for comparing the confirmation password with the original password
     * @param {any} rule Validation rule
     * @param {any} value Input value
     * @param {function} callback Routine executed after data validation
     */
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    /**
     * This function is responsible for validating next password
     * @param {any} rule Validation rule
     * @param {any} value Input value
     * @param {function} callback Routine executed after data validation
     */
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    /**
     * This function is responsible for verifying that the confirmation password has already been entered
     */
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render(){ 
        const { getFieldDecorator } = this.props.form
        const { avatar, user, editMode, changePassword } = this.props
        const newUser = !editMode && !changePassword
        const nicknameDecoratorConfig =  {
            initialValue: newUser ? '' : user.id,
            rules:  [
                { required: true, message: 'Please input your nickname!' },
                { validator: this.validateNickname }
                ]
        }        
        
        const { Option } = Select;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 10 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 },
            },
          };
        
          const title = changePassword 
                        ? 'Change password'
                        : editMode ? 'Edit user' : 'New user'
            
        return (            
            <div className="my-box widget-box new-user">
                <div className="header">
                <Icon style={{marginRight:"5px"}} type="user"/>{title}
                </div>
                <div className="widget-body">
                <Form onSubmit={this.handleSubmit} className="new-user-form">
                    <Form.Item
                      {...formItemLayout}
                      label="Your nickname"
                    >
                    <Tooltip placement="rightBottom" title="What is your nickname?">                    
                    {getFieldDecorator('nickname', nicknameDecoratorConfig)(                        
                        <Input readOnly={editMode || changePassword} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Your nickname" />
                    )}
                    </Tooltip>
                    </Form.Item>
                    {!changePassword && (<Form.Item
                     {...formItemLayout}
                      label="Gender"
                    >
                    {getFieldDecorator('gender', {
                        initialValue: editMode ? user.gender: '',
                        rules: [{ required: true, message: 'Please select your gender!' }]
                    })(
                        <Select
                        placeholder="Select a option and change input text above"
                        onChange={this.handleGenderChange}
                        >                        
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        </Select>
                    )}
                    </Form.Item>)}                    
                    {!changePassword && (<Form.Item
                      {...formItemLayout}
                      label="Avatar"
                    >                                               
                    <div>
                        <div style={{width:"48px", marginRight:"5px", float:"left"}}>
                        {avatar? (<Avatar size={48} src={avatar}/>) : (<Avatar size={48} icon="user"/>)}    
                        </div>
                        <div style={{width:"20px", float:"left", paddingTop:"5px"}}>           
                            <Tooltip placement="rightBottom" title="Generate new avatar">
                                <Button type="dashed" shape="circle" icon="reload" size="small" onClick={(e) => this.handleGenerateNewAvatar(e)} />
                            </Tooltip>
                        </div>
                    </div>                            
                    </Form.Item>)}
                    {changePassword && (
                    <Form.Item
                      {...formItemLayout}
                      label="Current Password"
                    >
                    {getFieldDecorator('currentPassword', {
                        rules: [
                                { required: true, message: 'Please input your current password!' }
                            ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                    )}
                    </Form.Item>)}
                    {!editMode && (
                    <Form.Item
                      {...formItemLayout}
                      label="Password"
                    >
                    {getFieldDecorator('password', {                      
                        rules: [
                                { required: true, message: 'Please input your password!' },
                                { validator: this.validateToNextPassword }
                            ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                    )}
                    </Form.Item>)}
                    {!editMode && (
                    <Form.Item
                    {...formItemLayout}
                    label="Confirm Password"
                    >
                    {getFieldDecorator('confirm', {
                        rules: [
                                { required: true, message: 'Please confirm your password!' },
                                { validator: this.compareToFirstPassword }
                            ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"  onBlur={this.handleConfirmBlur} /> 
                    )}
                    </Form.Item>)}
                    <Row>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">{changePassword ? 'Change' : (editMode ? 'Update' : 'Create')}</Button>                         
                        </Col>
                         <Col span={12} style={{ textAlign: 'left' }}>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>
                                Cancel
                            </Button>                      
                        </Col>
                    </Row>
                  
                </Form>
            </div>            
        </div>
        )
    }
}

function mapStateToProps({ authedUser, avatar, users }, props){     
    const changePassword = props.location.pathname.toLowerCase().indexOf('change-password') > -1
    const profile = props.location.pathname.toLowerCase().indexOf('profile') > -1
    const authed = authedUser && authedUser.id
    const user = authed ? users[authedUser.id] : null
    return {
        avatar: avatar.url ? avatar.url : (authed ? user.avatar : ''),
        changePassword: authed && changePassword,
        editMode : authed && profile,        
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {         
      changeAvatar: (nickname, gender, avatar) =>  dispatch(handleChangeAvatar(nickname, gender, avatar)),
      changePasswod: (nickname, encryptedCurrentPassword, encryptedPassword) => dispatch(handleChangePassword(nickname, encryptedCurrentPassword, encryptedPassword)),
      addUser: (nickname, gender, avatar, encryptedPassword) => dispatch(handleAddUser(nickname, gender, avatar, encryptedPassword)),
      generateAvatar: (gender) =>  dispatch(handleGenerateAvatar(gender)),
      rollbackAvatar: (gender, avatar) => dispatch(receiveNewAvatar(gender, avatar)),
      redirect: (to) => dispatch(enableRedirect(to))
    }
}

const WrappedUserEditPage = Form.create({ name: 'new_user_page' })(UserEditPage);

WrappedUserEditPage.propTypes = {       
    avatar: PropTypes.string,
    changePassword: PropTypes.bool,
    editMode: PropTypes.bool,   
    user: PropTypes.object, 
    form: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedUserEditPage))