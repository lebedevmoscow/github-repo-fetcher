import React from 'react'
import {TextField} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

// Styles
import './Searchbar.sass'

const SearchBar = () => {

    return <div className="searchbar">
        <TextField  label="Company" variant="outlined" className="searchbar__input"/>
        <SearchIcon className="searchbar__icon"/>
    </div>
}

export default SearchBar