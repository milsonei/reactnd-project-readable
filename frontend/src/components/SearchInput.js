import React, {Component} from 'react'
import { Input, Form } from 'antd';
import { connect } from 'react-redux'
import { handleSetSearch } from '../actions/search';
/**
 * Component responsible for creating a search field based on the Search component from React UI library ANTD
 */
class SearchInput extends Component{
  
    /**
     * Call routine parent responsible for searching posts and comments
     * @param {string} field field name for sorting
     */                  
    handleSearch(value){      
        this.props.search(value)      
    }
           
    render(){        
      const { getFieldDecorator } = this.props.form;
      const Search = Input.Search;
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
      return  ( <Form id="search"><Form.Item  {...formItemLayout} style={{marginBottom:0}}>{
        getFieldDecorator('sort-selector', 
        {          
          initialValue: ''
        })(          
            <Search
                placeholder="input search text"
                onSearch={value => this.handleSearch(value)}
                enterButton
                />
      )
      }</Form.Item></Form>)
    }
}

const WrappedSearchInput = Form.create()(SearchInput)

const mapDispatchToProps = dispatch => {
  return {         
    search: (text) => dispatch(handleSetSearch(text))
  }
}

export default connect(null, mapDispatchToProps)(WrappedSearchInput)