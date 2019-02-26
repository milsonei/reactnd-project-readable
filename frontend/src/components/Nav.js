import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CategoryMenu from './CategoryMenu'
import { Menu, Icon, Avatar } from 'antd'
import { handleSignout } from '../actions/authedUser';
import { handleDisableRedirect } from '../actions/redirect';
import { handleClearSearch } from '../actions/search';
import PropTypes from 'prop-types';
/**
 * Component responsible for generating the top menu of the application. Because it is a component that is rendered on all pages, it serves as the point of redirection. This component renders the Menu, Icon and Avatar components from React UI library ANTD.
 */
class Nav extends Component {
    state = {
        current: 'feed',
      }

      handleSignout = (e) => {        
          this.props.signout()
      }

	  handleClick = (e) => {
		this.setState({
		  current: e.key,
		});
      }
    /**
     * The page redirect point like filter
     */
    componentWillReceiveProps = (nextProps) => {              
        if (nextProps.location){
            const pathname = nextProps.location.pathname
            if (nextProps.redirect){
                const to = nextProps.redirect.to || ''
                if (to){
                    if (pathname === to){
                        if (pathname.toLowerCase().indexOf('/new') > -1){
                            if(nextProps.authedUser !== ''){
                                this.props.disableRedirect()
                            } 
                        }else{
                            this.props.disableRedirect()
                        }
                        
                    }else{
                        if (to){     
                            this.props.history.push(to);
                        }
                    }
                }
            }
            if (pathname !== '/' && this.props.hasSearch){               
                this.props.clearSearch()       
            }
        }
    }    
        
    /**
     * Call routine parent responsible for sorting the post feed
     * @param {string} field Field name for sorting
     */
    render(){ 
        const { categories, location, authedUser, avatar } = this.props        
        const currentUrl = location.pathname.toLowerCase();
        const currentCategory = categories.filter(category => currentUrl.indexOf(`/${category}`) > -1)        
        const isMyPostViewPage = currentCategory.length > 0
        const showCategories = currentUrl.indexOf('/user') === -1
        const menuMyItem = isMyPostViewPage ? "Post" : ""
        const signout = authedUser !== ''
        const SubMenu = Menu.SubMenu;
        return(
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="feed">
                
                <NavLink to='/' exact activeClassName='active'>
                <Icon type="appstore" />Feed
                                </NavLink>
                </Menu.Item>
                <Menu.Item key="new-post">
                    <NavLink to='/post/new' exact >
                    <Icon type="file-add" />New Post
                    </NavLink>
                </Menu.Item>
                {menuMyItem && (<Menu.Item key="my-post">
                    <NavLink to={currentUrl} exact >
                    <Icon type="solution" />My Post
                    </NavLink>
                </Menu.Item>)}  
                {showCategories && (
                <Menu.Item key="categories">
                <CategoryMenu/>
                </Menu.Item>)}
                {signout && (  <SubMenu key="user" className="user" title={<span className="submenu-title-wrapper"><Avatar style={{marginLeft:"10px"}} size={32} src={avatar}/>&nbsp;Wellcome, {authedUser}</span>}> 
                    <Menu.Item key="profile">
                        <NavLink to="/user/profile" exact>
                            <Icon type="user" />Profile
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="profile">
                        <NavLink to="/user/change-password" exact>
                            <Icon type="key" />Change Password
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="signout">
                        <NavLink onClick={this.handleSignout} to="#" exact>
                            <Icon type="logout" />Signout
                        </NavLink>
                    </Menu.Item>  
                </SubMenu>)}
                {!signout && (
                <Menu.Item key="signin" style={{float:"right"}}>
                    <NavLink to="/user/signin" exact>
                        <Icon type="login" />Signin
                    </NavLink>
                </Menu.Item>)}
               
            </Menu>
        );
    }
}

function mapStateToProps({ authedUser, users, redirect, categories, search }){
    const user = authedUser && authedUser.id ? authedUser.id : ''
    return {     
        authedUser : user,
        avatar: user ? users[user].avatar : '',
        categories: categories ? Object.keys(categories): [],
        hasSearch: search && search.text ? true : false,
        redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {  
      signout: () => dispatch(handleSignout()),
      disableRedirect: () => dispatch(handleDisableRedirect()),
      clearSearch: () =>dispatch(handleClearSearch())
    }
  }
  
Nav.propTypes = {
    authedUser: PropTypes.string,
    avatar: PropTypes.string,
    categories: PropTypes.array,
    redirect: PropTypes.object,    
    hasSearch: PropTypes.bool
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))