import React, { Component } from "react";
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import { DISHES } from "../shared/dishes";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from "./Contact";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    onDishSelect(dishId) {
        this.setState(
            {selectedDish: dishId}
        );
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.id === parseInt(match.params.dishId,10))}
                />
            );
        };

        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">
                            Ristorante Con Fusion
                        </NavbarBrand>
                    </div>
                </Navbar>
                <Header />
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <Footer />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;