import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { enableRedirect } from '../actions/redirect';
/**
 * Stateless component responsible for creating a category menu based on the Dropdown component of the React UI antd library
 * @param {any} props Properties
 */
function CategoryMenu(props){
  const { categories } = props
  const menu = (
                <Menu key="category-menu">
                   <Menu.Item key="all">
                    <div onClick={()=> props.dispatch(enableRedirect("/"))}>All</div>            
                  </Menu.Item>
                {(Object.keys(categories).map(category => (
                    <Menu.Item key={category}>
                      <div onClick={()=> props.dispatch(enableRedirect(`/posts/${category}`))}>{category}</div>                      
                    </Menu.Item>)))}   
                </Menu>
              );       
      return (      
        <Dropdown key="dropdown-menu" overlay={menu}>
          <div style={{cursor:"pointer"}} className="ant-dropdown-link">Categories <Icon type="down" /></div>
        </Dropdown> 
      )
  }

  function mapStateToProps({ categories }){
    return {
      categories: categories || {}
      }
  }
  
  CategoryMenu.propTypes = {
    categories: PropTypes.object 
  }

  export default connect(mapStateToProps)(CategoryMenu)