import React,  { Component } from 'react'
import { connect } from 'react-redux'
import AuthoralPost from './AuthoralPost'

class Feed extends Component {    
    render(){        
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
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

function mapStateToProps({ posts }){
    return {
        postIds: Object.keys(posts).sort((a,b) => posts[b].timestamp -  posts[a].timestamp )
    }
}

export default connect(mapStateToProps)(Feed)