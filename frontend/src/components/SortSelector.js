import React, {Component} from 'react'
import { Select, Form, Tooltip } from 'antd';
import handleSortFeed from '../actions/sort';
import { connect } from 'react-redux'
class SortSelector extends Component{
   menuItems = [{id:"voteScore", name:"Vote Score"}, 
                {id:"timestamp", name:"Creation date"}, 
                {id: "title", name: "Title"}]                    
    handleChange(value){   
      const { dispatch } = this.props  
      dispatch(handleSortFeed(value))
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

  function mapStateToProps({ sort }){  
    if (sort) {
      const { field } = sort    
      return {
        field
      }
    }
    return {}
  }
  const WrappedSortSelector = Form.create()(SortSelector);
  export default connect(mapStateToProps)(WrappedSortSelector)