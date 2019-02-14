import React, {Component} from 'react'
import { Select, Form, Tooltip } from 'antd';
class SortMenu extends Component{
   menuItems = [{id:"voteScore", name:"Vote Score"}, 
                {id:"timestamp", name:"Creation date"}, 
                {id: "title", name: "Title"}]  
    /**
     * Call routine parent responsible for sorting the post feed
     * @param {string} field field name for sorting
     */                  
    handleChange(field){         
      this.props.onSortFeed(field)
    }
    /**
     * Generate select items
     */
    generateItens() {
      return this.menuItems.map((item, index) => (
        <Select.Option key={`item-sort-${index}`} value={item.id}>{item.name}</Select.Option>
      ))
    }
    
    render(){  
      const { getFieldDecorator } = this.props.form;
      const { field } = this.props
      return  (<Form><Form.Item><Tooltip placement="leftTop" title="Sort by">{
        getFieldDecorator('sort-selector', 
        {          
          initialValue: field || 'timestamp'
        })(
          
            <Select key="sort" placeholder="Sort by" className="sort" onChange={(value) => this.handleChange(value)}>
              {this.generateItens()}
            </Select>
         
      )
      } </Tooltip></Form.Item></Form>)
    }
  }

  const WrappedSortMenu = Form.create()(SortMenu)
  export default WrappedSortMenu