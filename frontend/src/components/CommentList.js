import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyComment from './MyComment'
import Utilities from '../utils/Utilities'
import PropTypes from 'prop-types'
/***
 * Component responsible for create a comment list based on custom component MyComment.
 */
class CommentList extends Component{
  render(){
    const { comments } = this.props
    let hiddenAttr = {}
    if (comments.length === 0){
      hiddenAttr = {style:{display:"none"}}
    }
    return (<div {...hiddenAttr} className="my-box widget-box comment no-border-radius"> <ul>
    {comments.map((id, index) =>(     
        <li className="content-container" key={`comment-container-${id}`}>
            <MyComment id={id}/>
        </li>
    )
    )}
  </ul></div>)
  }
}

function mapStateToProps({ comments, sort }, { parent }) { 
  const { field, mode } = sort.comments
  const activeKeys = Utilities.getActiveKeys(comments)
  return {
      comments: activeKeys
                .filter(key => comments[key].parentId === parent)
                .sort((a,b) => Utilities.getSortCondition(comments[a][field], comments[b][field], mode))
  }
}

CommentList.propTypes = {
  comments: PropTypes.array
}

export default connect(mapStateToProps)(CommentList)
