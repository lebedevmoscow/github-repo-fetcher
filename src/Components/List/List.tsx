import React, {useState, useEffect, ReactPropTypes} from 'react'
import './List.sass'

import {useSelector, useDispatch} from 'react-redux'
import {IGlobalStore} from './../../reducers'
import {IListReducer} from './../../reducers/list'
import {loadUserRepos} from './../../actions/list'

import Card from './../Card'

import Loader from '../Loader'
import Bio from './../Bio'
import { formatDate } from '../../utils'
import { IBioReducer } from '../../reducers/bio'

const List = () => {

    // Array of pages, looks like [a, b, c], where a, b and c - certain number of page
    // for example [1, 2, 3, 4, 5, 127]
    const [pagination, setPagination] = useState<Array<number>>([])

    // Getting state
    const listSelector = ((state: IGlobalStore) => state.list)
    const bioSelector = ((state: IGlobalStore) => state.bio)
    const list: IListReducer = useSelector(listSelector)
    const bio: IBioReducer = useSelector(bioSelector)


    const dispatch = useDispatch()

    let pages: number
    if (bio.data) {
        pages = Math.ceil(bio.data.public_repos / 15)
    }

    // Calculate pagination system
    const calculatePagination = () => {
        const newPagination = []

        // Current page
        const current = list.currentPage

        // If its first page, render basic pagination
        if (current === 1) {
            for (let i = 1; i < 6; i++) newPagination.push(i)
            newPagination.push(pages)
        }

        // If its second page
        if (current === 2 ) {
            newPagination.push(1)
            for (let i = 2; i < 7; i++) newPagination.push(i)
        }

        if (current >= 3 && current !== pages) {
            newPagination.push(1)
            newPagination.push(current - 1)
            newPagination.push(current)
            for (let i = current + 1; i <= pages; i++) {
                if (i < pages && i < current + 3) newPagination.push(i)
            }
            newPagination.push(pages)
        }

        // Handling last case
        if (current === pages) {
            for (let i = pages - 4; i <= pages; i++) newPagination.push(i)

        }
    
        // Set new system pagination
        setPagination(newPagination)
    }
    
    // If user click on page, we'll load new content    
    const onLoadMoreHandler = (username: string, page: number) => {
        return dispatch(loadUserRepos(username, page))
    }

    // When gets repos data, calculate the pagination system
    useEffect(() => {
        if (list.repos && bio.data) {
            calculatePagination()
        }
    }, [list.repos, bio.data])

    // If loading, render spinner
    if (list.loading || !list.repos) {
        return <Loader />
    }
    
    // If we didn't found anything
    if (list.error) {
        return <h1 className="list__error">This company does not exist :(</h1>
    }


    return (
        <div className="list">
            <Bio />
            {console.log('bio', bio)}
            {console.log('list', list)}
            {bio.data && <h4 className="list__total">Total: {bio.data ? bio.data.public_repos : null} </h4>}
            <div className="list__repos">
                {/* Render each repository as a Card component */}
                {list.repos.map((repo, i) => {
                    return <Card
                        className="list__repo"
                        key={i} 
                        repoName={repo.name}
                        urlRepo={repo.html_url}
                        watchers_count={repo.watchers_count}
                        forks={repo.forks}
                        stargazers_count={repo.stargazers_count}
                        language={repo.language}
                        description={repo.description}
                        created_at={formatDate(repo.created_at)}
                    />
                })}
            </div>
            {bio.data && <div className="list__pagination">
                <ul>
                    {pagination.map((p, i) => {
                        let classes

                        if (p === list.currentPage) {
                            classes = 'list__currentpage'
                        }

                        return <li
                            onClick={() => onLoadMoreHandler(bio.username as string, p)}  
                            key={i+1}
                            className={classes}
                            >
                                {p}
                            </li>


                    })}
                </ul> 
            </div> }
        </div>
    )

}

export default List