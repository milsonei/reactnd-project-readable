import React, {Component} from 'react'
import { Form, Select, Tooltip } from 'antd';
import { connect } from 'react-redux'
import { handleSetSort } from '../actions/sort';
import PropTypes from 'prop-types';
/**
 * Component responsible for creating a list containing fields available for sorting a list of posts or comments.
 * The AND components used on this page are: Form, Select and Tooltip.
 */
class SortSelector extends Component{
   menuItems = {
      "voteScore": {id:"voteScore", name:"Vote Score", mode: "desc"}, 
      "timestamp": {id:"timestamp", name:"Creation date", mode: "desc"}, 
      "title": {id: "title", name: "Title", mode: "asc"}
    }
    /**
     * Call routine parent responsible for sorting the post feed
     * @param {string} field field name for sorting
     */                  
    handleChange(field){         
      this.props.dispatch(handleSetSort(field, this.menuItems[field].mode, this.getType()))
    }
    /**
     * Get type of sort - posts or comments
     */
    getType(){
      const { type } = this.props
      if (type) return type
      return "posts"
    }
    /**
     * Generate select items
     */
    generateItens() {
      const type =  this.getType()
      let keys = Object.keys(this.menuItems)
      if (type){
        if (type === 'comments'){
          keys = keys.filter(key => key !== 'title')
        }
      }
    
      return keys.map((key, index) => (
        <Select.Option key={`item-sort-${index}`} value={this.menuItems[key].id}>{this.menuItems[key].name}</Select.Option>
      ))
    }
    
    render(){        
      const { getFieldDecorator } = this.props.form;
      const { field } = this.props
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
      return  ( <Form id="sortby"><Form.Item  {...formItemLayout} label="Sort by" style={{marginBottom:0}}><Tooltip placement="leftTop" title="Sort by">{
        getFieldDecorator('sort-selector', 
        {          
          initialValue: field
        })(
            <Select key="sort" placeholder="Sort by" className="sort" onChange={(value) => this.handleChange(value)}>
              {this.generateItens()}
            </Select>
      )
      } </Tooltip></Form.Item></Form>)
    }
}

function mapStateToProps({ sort }, { type = 'posts' }){
  const sortInfo = sort[type]
  return {
    field: sortInfo.field || 'voteScore'
    }
}

const WrappedSortSelector = Form.create()(SortSelector)

WrappedSortSelector.propTypes = {
  field: PropTypes.string,  
  form: PropTypes.object
}

export default connect(mapStateToProps)(WrappedSortSelector)