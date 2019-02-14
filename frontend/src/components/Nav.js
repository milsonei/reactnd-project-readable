import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import CategoryMenu from '../components/CategoryMenu'
import SortSelector from './SortSelector';
class Nav extends Component {
    /**
     * Call routine parent responsible for sorting the post feed
     * @param {string} field Field name for sorting
     */
    handleSortFeed(field){        
        this.props.onSortFeed(field)
    }
    render(){        
        const { categories, sort} = this.props
        return(
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Feed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' exact activeClassName='active'>
                            New Post
                        </NavLink>
                    </li>
                    {(categories && 
                    <li>
                    <CategoryMenu categories={categories}/>
                    </li>)}  
                            
                    <li>
                    <SortSelector sort={sort} onSortFeed={(field) => this.handleSortFeed(field)}/>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav