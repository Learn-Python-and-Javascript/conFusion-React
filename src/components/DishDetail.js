import React from 'react'
import {
	Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody, Label,
} from 'reactstrap'
import {Control, LocalForm} from 'react-redux-form'
import {Link} from 'react-router-dom'
import {FadeTransform, Fade, Stagger} from 'react-animation-components'
import {Loading} from './Loading'
import {baseUrl} from '../shared/baseUrl'

function RenderDish({dish}) {
	if (dish != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<FadeTransform in transformProps={{exitTransform: 'scale(0.5) translate&(-50%)'}}>
					<Card>
						<CardImg top src={baseUrl + dish.image} alt={dish.name}/>
						<CardBody>
							<CardTitle>
								{dish.name}
							</CardTitle>
							<CardText>
								{dish.description}
							</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			</div>
		)
	}
	return (
		<div/>
	)
}

function RenderComments({comments, postComment, dishId}) {
	if (comments != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<Stagger in>
					{comments.map((comment) => (
						<ul className="list-unstyled">
							<Fade in>
								<li key={comment._id}>
									<p>{comment.comment}</p>
									<p>
										--
										{' '}
										{comment.author.username}
										,
										{new Intl.DateTimeFormat(
											'en-US',
											{
												year: 'numeric',
												month: 'short',
												day: '2-digit',
											},
										).format(new Date(Date.parse(comment.updatedAt)))}
									</p>
								</li>
							</Fade>
						</ul>
					))}
				</Stagger>
				<CommentForm dishId={dishId} postComment={postComment}/>
			</div>
		)
	}
	return <div/>
}

class CommentForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isNavOpen: false,
			isModalOpen: false,
		}

		this.toggleNav = this.toggleNav.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	toggleNav() {
		this.setState(
			{
				isNavOpen: !this.state.isNavOpen,
			},
		)
	}

	toggleModal() {
		this.setState(
			{
				isModalOpen: !this.state.isModalOpen,
			},
		)
	}

	handleSubmit(values) {
		this.toggleModal()
		this.props.postComment(this.props.dishId, values.rating, values.comment)
	}

	render() {
		return (
			<div>
				<Button onClick={this.toggleModal}>
					<i className="fa fa-pencil"/>
					&nbsp;
					Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<div className="form-group">
								<Label htmlFor="rating">Rating</Label>
								<Control.select
									className="form-control"
									model=".rating"
									name="select"
									id="select"
								>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</div>
							<div className="form-group">
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea
									className="form-control"
									model=".comment"
									rows="6"
								/>
							</div>
							<Button
								type="submit"
								color="primary"
							>
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading/>
				</div>
			</div>
		)
	}
	if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		)
	}
	if (props.dish != null) {
		return (
			<div>
				<div className="container">
					<div className="row">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/menu">Menu</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
						</Breadcrumb>
						<div className="col-12">
							<h3>{props.dish.name}</h3>
							<hr/>
						</div>
					</div>
					<div className="row">
						<RenderDish dish={props.dish}/>
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish._id}
						/>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div/>
	)
}

export default DishDetail
