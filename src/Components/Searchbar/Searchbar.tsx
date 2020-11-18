import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {TextField} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

import {loadUserRepos} from './../../actions/list'
import {loadUserBio} from './../../actions/bio'

// Styles
import './Searchbar.sass'
const SearchBar = () => {

    const dispatch = useDispatch()

    // Input state
    const [value, setValue] = useState('')

    // Handlers

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