import React, { Component } from "react";
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import { DISHES } from "../shared/dishes";
import Header from "./Header";
import Footer from "./Footer";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState(
            {selectedDish: dishId}
        );
    }

    render() {
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
                <DishDetail dish={this.state.dishes.filter(
                    (dish) => dish.id === this.state.selectedDish
                )[0]} />
                <Footer />
            </div>
        );
    }
}

export default Main;