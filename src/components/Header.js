import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isSignUpModalOpen: false,
            isSignInModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
        this.toggleSignInModal = this.toggleSignInModal.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState(
            {isNavOpen: !this.state.isNavOpen}
        );
    }

    toggleSignUpModal() {
        this.setState(
            {
                isSignUpModalOpen: !this.state.isSignUpModalOpen
            }
        );
    }

    toggleSignInModal() {
        this.setState(
            {
                isSignInModalOpen: !this.state.isSignInModalOpen
            }
        );
    }

    handleSignup(event) {
        this.toggleSignUpModal();
        this.props.signupUser({
            username: this.username.value,
            password: this.password.value,
            firstname: this.firstname.value,
            lastname: this.lastname.value
        });
        event.preventDefault();
    }

    handleLogin(event) {
        this.toggleSignInModal();
        this.props.loginUser({
            username: this.username.value,
            password: this.password.value,
            remember: this.remember.checked
        });
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'>
                                        <span className="fa fa-home fa-lg"></span>
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'>
                                        <span className="fa fa-info fa-lg"></span>
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/menu'>
                                        <span className="fa fa-list fa-lg"></span>
                                        Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'>
                                        <span className="fa fa-address-card fa-lg"></span>
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated
                                        ?
                                        <div>
                                            <Button outline onClick={this.toggleSignInModal}>
                                                <span className="fa fa-sign-in fa-lg"></span>Login
                                                {this.props.auth.isFetching
                                                    ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    :
                                                    null
                                                }
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button outline onClick={this.toggleSignUpModal}>
                                                <span className="fa fa-user-plus fa-lg"></span>SignUp
                                                {this.props.auth.isFetching
                                                    ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    :
                                                    null
                                                }
                                            </Button>
                                        </div>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">
                                                {this.props.auth.user.username}
                                            </div>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span>Logout
                                                {
                                                    this.props.auth.isFetching
                                                        ?
                                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                        :
                                                        null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <Modal isOpen={this.state.isSignUpModalOpen} toggle={this.toggleSignUpModal}>
                            <ModalHeader toggle={this.toggleSignUpModal}>SignUp</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleSignup}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username"
                                               innerRef={(input) => this.username = input}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" name="password"
                                               innerRef={(input) => this.password = input}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="firstname">First Name</Label>
                                        <Input type="text" id="firstname" name="firstname"
                                               innerRef={(input) => this.firstname = input}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="lastname">Last Name</Label>
                                        <Input type="text" id="lastname" name="lastname"
                                               innerRef={(input) => this.lastname = input}
                                        />
                                    </FormGroup>
                                    <Button type="submit" value="submit" color="primary">
                                        SignUp
                                    </Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                        <Modal isOpen={this.state.isSignInModalOpen} toggle={this.toggleSignInModal}>
                            <ModalHeader toggle={this.toggleSignInModal}>Login</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.handleLogin}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username"
                                               innerRef={(input) => this.username = input}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" name="password"
                                               innerRef={(input) => this.password = input}
                                        />
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="remember"
                                                   innerRef={(input) => this.remember = input}
                                            />
                                            Remember me
                                        </Label>
                                    </FormGroup>
                                    <Button type="submit" value="submit" color="primary">
                                        Login
                                    </Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>
                                    We take inspiration from the World's best cuisines, and create a unique fusion
                                    experience. Our lipsmacking creations will tickle your culinary senses!
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;