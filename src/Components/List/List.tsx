import React from 'react'
import './List.sass'

import {useSelector} from 'react-redux'
import {IGlobalStore} from './../../reducers'
import {IListReducer} from './../../reducers/list'

import Card from './../Card'

import Loader from '../Loader'
import Bio from './../Bio'
import { formatDate } from '../../utils'

const List = () => {

    // Getting state
    const selector = ((state: IGlobalStore) => state.list)
    const list: IListReducer = useSelector(selector)

    if (list.loading || !list.repos) {
        return <Loader />
    }

    // If we didn't found anything
    if (list.error) {
        return <h1 className="list__error">This user or company does not exist :(</h1>
    }

    return (
        <div className="list">
            <Bio />
            <div className="list__repos">
                {/* Render each repository as a Card component */}
                {list.repos.map((repo, i) => {
                    return <Card
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
        </div>
    )

}

export default List