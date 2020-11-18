import React from 'react'
import {RouteComponentProps} from 'react-router-dom'

// Styles
import './Headline.sass'

// React components
import Searchbar from './../Searchbar'

export interface IParams {
    company: undefined | string,
    page: undefined | string
}


const Headline = () => {
	return (
		<div className='headline'>
			<div className="headline__copyright">
				<h1>Github Profile Fetcher</h1>
				<div className="headline__link">
					<span>Специально для компании Zigmund.online</span>
				</div>
				<div className="headline__link">
					<span>By Boris Lebedev</span>
				</div>
				<div className="headline__link">
					<span>Telegram: </span>
					<a href="https://t.me/lebedevmoscowme">t.me/lebedevmoscowme</a>
				</div>
				<div className="headline__link">
					<span>HH: </span> 
					<a href="https://hh.ru/resume/70a54c5fff085b2d5e0039ed1f703559734a73">click me</a>
				</div>
			</div>
			<Searchbar />
		</div>
	)
}

export default Headline
