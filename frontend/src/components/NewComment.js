import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/comment'
import { Redirect } from 'react-router-dom'

class NewComment extends Component{
    state = {
        title: '',
        body: '',
        selectedCategory: ''    
    }
    bodyLength = 1000
    titleLength = 100
    handleChangeTitle = (e) => {
        const title = e.target.value;
        
        this.setState(() =>({
            title
        }))
    }

    handleChangeBody = (e) => {
        const body = e.target.value;
        
        this.setState(() =>({
            body
        }))
    }

    handleChangeCategory = (e) => {
        const selectedCategory = e.target.value;
        
        this.setState(() =>({
            selectedCategory
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { title, body, selectedCategory } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddComment(title, body, authedUser, selectedCategory))

        this.setState(() =>({
            text: '',
            title: '',
            selectedCategory: ''
        }))
    }

    render(){
        const { title, body, selectedCategory, toHome } = this.state
        const { categories, category } = this.props
        const disabled = category ? {'disabled':'disabled'} : {}
        
        if (toHome === true){
            return <Redirect to='/'/>
        }
        /**
         * Get selected attribute for category select
         * @param {string} cat category path
         */
        const getSelectedCategory = (cat) => {
            if (category && cat === category){              
                return {'selected':'selected'}                
            }
            return {}
        };
        const postLeft = this.bodyLength - body.length        

        return (
            <div>
                <h3 className='center'>Compose new Comment</h3>
               
                <form className='new-post' onSubmit={this.handleSubmit}>                    
                    <input placeholder="What's the topic?" 
                           type="text" 
                           className='title'  
                           onChange={this.handleChangeTitle} 
                           value={this.handleChangeTitle} 
                           maxLength={this.titleLength}/>                       
                    <select {...disabled} placeholder="Choose a category" className='category' onChange={this.handleChangeCategory}>
                    {(categories.map(item => (<option {...getSelectedCategory(item.path)} value={item.path}>{item.name}</option>)))}
                    </select>
                    <textarea 
                        placeholder="Write about any interesting topic"
                        value={body}
                        onChange={this.handleChangeBody}
                        className='textarea'
                        maxLength={this.bodyLength}
                    />
                    {postLeft <= 100 && (
                        <div className='post-length'>
                            {postLeft}
                        </div>
                    )
                    }
                    <button 
                    className='btn'
                    type='submit'
                    disabled={body === ''|| title === '' || selectedCategory === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewComment)