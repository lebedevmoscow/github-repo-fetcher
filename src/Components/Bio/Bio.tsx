import React from 'react'
import './Bio.sass'

import {useSelector} from 'react-redux'
import { IGlobalStore } from '../../reducers'
import {IBioReducer} from './../../reducers/bio'
import Loader from '../Loader'

import {formatDate} from './../../utils'

const Bio = () => {

    // Getting state
    const selector = ((state: IGlobalStore) => state.bio)
    const bio: IBioReducer = useSelector(selector)


    if (!bio.data) {
        return <div></div>
    }

    // See loader if we are fetching data
    if (bio.loading) {
        return <Loader />
    }

    if (bio.error) {
        return <h1>Error</h1>
    }

    return (
        <div className="bio">
            <img src={bio.data!.avatar_url}></img>
            <div className="bio__info">
                <ul>
                    <li><strong>{bio.data.login}</strong></li>
                    <li><strong>Name:</strong>{bio.data.name}</li>
                    <li><strong>URL:</strong> {bio.data.html_url}</li>
                    <li><strong>Location:</strong>:{bio.data.location}</li>
                    <li><strong>Bio:</strong> {bio.data.bio}</li>
                    {bio.data.blog ? <li><strong>Blog:</strong> {bio.data.blog}</li> : null}
                    {bio.data.type !== 'Organization' && <li><strong>Company:</strong> {bio.data.company ? bio.data.company : 'None'}</li>}
                    {bio.data.type !== 'Organization' && <li><strong>Followers:</strong> {bio.data.followers}</li>}
                    {bio.data.type !== 'Organization' && <li><strong>Following:</strong> {bio.data.following}</li>}
                    <li><strong>Regestration:</strong> {formatDate(bio.data.created_at)} </li>
                    <li><strong>Count of repos:</strong> {bio.data.public_repos}</li>
                </ul>
            </div>
        </div>
    )

}

export default Bio