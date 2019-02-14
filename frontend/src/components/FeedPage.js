import React,  { Component } from 'react'
import { connect } from 'react-redux'
import AuthoralPost from '../components/AuthoralPost'
import Utilities from '../utils/Utilities'
class FeedPage extends Component {    
        /**
     * Show a notification after render page
     */
    componentDidUpdate(){
       
    }

    render(){ 
        return (
            <div>
                <h2 className='feed-title center'>{this.props.title}</h2>
                <ul className='dashboard-list'>
                    {
                        this.props.postIds.map((id) => (
                            <li key={id}>
                                <AuthoralPost id={id}/>                               
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ posts, sort }, props){
    let { id } = props.match.params
    let sortField = "voteScore"    
    if (sort){
        sortField = sort.field
    }   
    const category = id 
    const postIds = (category ? Object.keys(posts).filter(key => posts[key].category === category) : Object.keys(posts))
                    .sort((a,b) => Utilities.getSortCondition(posts[a][sortField],posts[b][sortField], sortField === "voteScore" ? 'desc' : 'asc'))
    return {
        title: category ? `Feed of ${category}` : "Feed",        
        postIds
    }
}

export default connect(mapStateToProps)(FeedPage)