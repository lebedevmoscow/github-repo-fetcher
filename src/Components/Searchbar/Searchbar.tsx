import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {TextField} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

import {loadUserRepos} from './../../actions/list'
import {loadUserBio} from './../../actions/bio'

import {IParams} from './../Headline/Headline'
import {RouteComponentProps} from 'react-router-dom'

// Styles
import './Searchbar.sass'

/**
 * 
 * @param {company} - [Optional] - company to render
 */
const SearchBar = (props: RouteComponentProps<IParams>) => {

    const dispatch = useDispatch()

    // Input state
    const [value, setValue] = useState('')

    // Handlers

    if (props.match.params.company && props.match.params.page) {
        dispatch(loadUserBio(props.match.params.company))
        dispatch(loadUserRepos(props.match.params.company, +props.match.params.page))
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onSearchHandler = () => {
        dispatch(loadUserBio(value))
        dispatch(loadUserRepos(value))
    }

    // If user press Enter (for UX)
    const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            onSearchHandler()
        }
    }

    return (
        <div className="searchbar">
            <TextField onKeyPress={onKeyPress} onChange={onChangeHandler} value={value} label="Company" variant="outlined" className="searchbar__input"/>
            <SearchIcon onClick={onSearchHandler} className="searchbar__icon"/>
        </div>
    )
}

export default SearchBar