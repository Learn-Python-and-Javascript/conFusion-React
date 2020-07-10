import React, { useRef } from 'react'
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
} from 'reactstrap'
import { FadeTransform } from 'react-animation-components'
import LazyLoad from 'react-lazy-load'
import Loading from './Loading'
import baseUrl from '../shared/baseUrl'

function RenderCard({ item, isLoading, errMess }) {
	const nodeRef = useRef(null)
	if (isLoading) {
		return (
			<Loading />
		)
	} if (errMess) {
		return (
			<h4>{errMess}</h4>
		)
	}
	return (
		<FadeTransform nodeRef={nodeRef} in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
			<Card>
				<LazyLoad>
					<CardImg src={baseUrl + item.image} alt={item.name} />
				</LazyLoad>
				<CardBody>
					<CardTitle>
						{item.name}
					</CardTitle>
					{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
					<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	)
}

function Home(props) {
	return (
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.dish}
						isLoading={props.dishesLoading}
						errMess={props.dishesErrMess}
					/>
				</div>
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.promotion}
						isLoading={props.promoLoading}
						errMess={props.promoErrMess}
					/>
				</div>
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.leader}
						isLoading={props.leadersLoading}
						errMess={props.leadersErrMess}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
