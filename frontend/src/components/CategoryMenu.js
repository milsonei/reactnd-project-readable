import React from 'react'
import { Menu, Dropdown, Icon } from 'antd';
export default function CategoryMenu(props){
  const { categories } = props
  const menu = (
                <Menu key="category-menu">
                   <Menu.Item key="all">
                      <a rel="noopener noreferrer" href={`/`}>All</a>
                    </Menu.Item>
                {(Object.keys(categories).map(category => (
                    <Menu.Item key={category}>
                      <a rel="noopener noreferrer" href={`/posts/${category}`}>{category}</a>
                    </Menu.Item>)))}   
                </Menu>
              );       
      return (      
        <Dropdown key="dropdown-menu" overlay={menu}>
          <div style={{cursor:"pointer"}} className="ant-dropdown-link">Categories <Icon type="down" /></div>
        </Dropdown> 
      )
  }
