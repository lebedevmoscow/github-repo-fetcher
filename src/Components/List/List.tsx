import React, {useState, useEffect} from 'react'
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

    // When gets repos data, calculate the pagination system
    useEffect(() => {
        calculatePagination()
    }, [list.repos])

    // If loading, render spinner
    if (list.loading || !list.repos) {
        return <Loader />
    }
    
    // If we didn't found anything
    if (list.error) {
        return <h1 className="list__error">This company does not exist :(</h1>
    }


    // Calculate pagination system
    const calculatePagination = () => {
        const newPagination = []

        // Current page
        const current = list.currentPage

        if (pages) {
            // If its first page, render basic pagination
            if (current === 1) {
                for (let i = 1; i < 6; i++) {
                    newPagination.push(i)
                }
                newPagination.push(pages)
            }

            // If its second page
            if (current === 2 ) {
                newPagination.push(1)
                for (let i = 2; i < 7; i++) {
                    newPagination.push(i)
                }
            }

            if (current >= 3 && current !== pages) {
                newPagination.push(current - 2)
                newPagination.push(current - 1)
                newPagination.push(current)
                for (let i = current + 1; i <= pages; i++) {
                    if (i < pages && i < current + 3) {
                        newPagination.push(i)
                    }
                }
                newPagination.push(pages)
            }

            // Handling last case
            if (current === pages) {
                for (let i = pages - 4; i <= pages; i++) {
                    newPagination.push(i)
                }
            }
        }
        
        // Set new system pagination
        setPagination(newPagination)
    }

    let pages: number
    if (bio.data) {
        pages = Math.ceil(bio.data.public_repos / 15)
    }

    // If user click on page, we'll load new content    
    const onLoadMoreHandler = (username: string, page: number) => {
        return dispatch(loadUserRepos(username, page))
    }

    return (
        <div className="list">
            <Bio />
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
                    {pagination.map((p) => {
                        let classes

                        if (p === list.currentPage) {
                            console.log('====P', p)
                            classes = 'list__currentpage'
                        }

                        return <li
                            onClick={() => onLoadMoreHandler(bio.username as string, p)}  
                            key={p}
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