import React,  { Component } from 'react'
import { connect } from 'react-redux'
import MyPost from './MyPost'
import SortSelector from './SortSelector';
import Utilities from '../utils/Utilities'
import SearchInput from './SearchInput';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
/**
 * Component responsible for rendering a page that lists all posts based on the MyPost custom component, 
 * which shows the title, body limited to 60 characters, author, time, comment counter, and post category.
 */
class FeedPage extends Component {    
        /**
     * Show a notification after render page
     */
    componentDidMount(){
        document.title = this.props.title;
    }

    render(){         
        const { inSearchMode, title, postIds } = this.props
        const showSort =  postIds.length > 1
        return (
            <div>
                <div className="my-box widget-box feed">
                    <div className="header">
                        {title}
                    </div>   
                    {(showSort || inSearchMode) && (    
                    <div className="widget-body">
                    <Row>
                        <Col span={12}>
                         <SortSelector/>
                        </Col>
                        <Col span={12}>
                         <SearchInput/>
                        </Col>
                    </Row>
                       
                    </div>)}
                </div>
                <div>
                    <ul className='dashboard-list'>
                        {
                            postIds.map((id) => (
                                <li key={id}>
                                    <MyPost id={id}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, comments, sort, search }, props){
    const { pathname } = props.location
    const category = pathname === '/' ? null : pathname.replace("/", "")    
    const { field, mode } = sort.posts
    const activeKeys = Utilities.getActiveKeys(posts)
    let keysInSearch
    let inSearchMode = false;
  
    if (search && search.text){
        inSearchMode = true
        /** Search in comments */
        const keysInComments = Object.keys(comments)
                                    .filter(key => comments[key].body.toLowerCase().indexOf(search.text.toLowerCase()) > -1)
                                    .map(key => comments[key].parentId)

        keysInSearch = activeKeys.filter(key => posts[key].category.toLowerCase().indexOf(search.text.toLowerCase()) > -1 ||
                                                posts[key].title.toLowerCase().indexOf(search.text.toLowerCase()) > -1 ||
                                                posts[key].body.toLowerCase().indexOf(search.text.toLowerCase()) > -1 ||
                                                posts[key].author.toLowerCase().indexOf(search.text.toLowerCase()) > -1)
        keysInSearch = Utilities.distinct([...keysInComments,...keysInSearch])
    }else{
        keysInSearch = activeKeys

    }
        
    const postIds = (category 
                    ? keysInSearch.filter(key => posts[key].category === category) 
                    : keysInSearch)
                    .sort((a,b) => Utilities.getSortCondition(posts[a][field],posts[b][field], mode))
    return {       
        inSearchMode,
        title: category ? `Feed of ${category}` : "Feed",            
        postIds
    }
}

FeedPage.propTypes = {
    inSearchMode: PropTypes.bool,
    title: PropTypes.string,
    postIds: PropTypes.array
}

export default connect(mapStateToProps)(FeedPage)