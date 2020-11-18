import React from 'react'
import './Card.sass'

import VisibilityIcon from '@material-ui/icons/Visibility';
import TimelineIcon from '@material-ui/icons/Timeline';
import LanguageIcon from '@material-ui/icons/Language';
import StarIcon from '@material-ui/icons/Star';
import ScheduleIcon from '@material-ui/icons/Schedule';

/**
 * 
 * @param {string} repoName - Repository Name
 * @param {string} urlRepo - URL Adress on this repository
 * @param {Number} watchers_count - Count of watchers
 * @param {Number} forks - Count of forks
 * @param {string} description - Description of this repository
 * @param {string} language - On which program language has written this repository
 * @param {Number} stargazers_count - Count of stars
 * @param {string} created_at - Date of creation of this repository
 */
const Card = ({
    repoName, 
    urlRepo,
    watchers_count,
    forks,
    description,
    language,
    stargazers_count,
    created_at,
    className
}: {
    repoName: string
    urlRepo: string,
    watchers_count: number,
    forks: number,
    description: string,
    language: string,
    stargazers_count: number,
    created_at: string,
    className: string
}) => {

    let display
    if (window.innerWidth < 700) display = 'flex'; else display = 'block'
    return (
        <a href={urlRepo} className="card" style={{display}}>
            <div className="card__name"><strong>{repoName}</strong></div>
            <div className="card__desc">
                <p>{description ? description : 'No description'}</p>
            </div>
            <div className="card__stats">
                <div className="stats card__createdat"><ScheduleIcon /><span>{created_at}</span></div> 
                <div className="stats card__watchers"><VisibilityIcon /><span>{watchers_count}</span></div>
                <div className="stats card__forks"><TimelineIcon /><span>{forks}</span></div>
                <div className="stats language"><LanguageIcon /><span>{language}</span></div>
                <div className="stats language"><StarIcon /><span>{stargazers_count}</span></div>
            </div>
        </a>
    )
}

export default Card