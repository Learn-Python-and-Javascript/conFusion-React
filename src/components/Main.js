import React, { Component, useRef } from 'react'
import {
	Switch, Route, Redirect, withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Menu from './Menu'
import DishDetail from './DishDetail'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import {
	postComment,
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders,
	postFeedback,
	loginUser, logoutUser, signupUser,
} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
	dishes: state.dishes,
	comments: state.comments,
	promotions: state.promotions,
	leaders: state.leaders,
	auth: state.auth,
})

const mapDispatchToProps = (dispatch) => (
	{
		postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
		fetchDishes: () => {
			dispatch(fetchDishes())
		},
		resetFeedbackForm: () => {
			dispatch(actions.reset('feedback'))
		},
		fetchComments: () => dispatch(fetchComments()),
		fetchPromos: () => dispatch(fetchPromos()),
		fetchLeaders: () => dispatch(fetchLeaders()),
		signupUser: (cred) => dispatch(signupUser(cred)),
		loginUser: (cred) => dispatch(loginUser(cred)),
		logoutUser: () => dispatch(logoutUser()),
		postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(
			postFeedback(firstname, lastname, telnum, email, agree, contactType, message),
		),
	}
)

class Main extends Component {
	componentDidMount() {
		this.props.fetchDishes()
		this.props.fetchComments()
		this.props.fetchPromos()
		this.props.fetchLeaders()
	}

	render() {
		const HomePage = () => (
			<Home
				dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
				dishesLoading={this.props.dishes.isLoading}
				dishesErrMess={this.props.dishes.errMess}
				promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
				promoLoading={this.props.promotions.isLoading}
				promoErrMess={this.props.promotions.errMess}
				leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
				leadersLoading={this.props.leaders.isLoading}
				leadersErrMess={this.props.leaders.errMess}
			/>
		)

		const DishWithId = ({ match }) => (
			<DishDetail
				dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
				isLoading={this.props.dishes.isLoading}
				errMess={this.props.dishes.errMess}
				comments={this.props.comments.comments.filter((comment) => comment._id)}
				commentsErrMess={this.props.comments.errMess}
				postComment={this.props.postComment}
			/>
		)

		const MainRoutes = () => {
			const nodeRef = useRef(null)
			return (
				<TransitionGroup>
					<CSSTransition
						nodeRef={nodeRef}
						key={this.props.location.key}
						classNames="page"
						timeout={300}
					>
						<Switch location={this.props.location}>
							<Route path="/home" component={HomePage} />
							<Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
							<Route
								exact
								path="/menu"
								component={() => (
									<Menu
										dishes={this.props.dishes}
									/>
								)}
							/>
							<Route path="/menu/:dishId" component={DishWithId} />
							<Route
								exact
								path="/contactus"
								component={() => (
									<Contact
										resetFeedbackForm={this.props.resetFeedbackForm}
										postFeedback={this.props.postFeedback}
									/>
								)}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)
		}

		return (
			<div>
				<Header
					auth={this.props.auth}
					signupUser={this.props.signupUser}
					loginUser={this.props.loginUser}
					logoutUser={this.props.logoutUser}
				/>
				<MainRoutes />
				<Footer />
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
