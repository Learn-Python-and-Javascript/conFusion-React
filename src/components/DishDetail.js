import React, { Component } from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Label, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !(val) || val.length <= len;
const minLength = (len) => (val) => (val) && val.length > len;

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        const c = comments.map((item) => {
            return (
                <ul className="list-unstyled">
                    <li key={comments.id}>
                        {item.comment}
                        <br /><br />
                        {/*TODO author formatting*/}
                        {item.author}
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(item.date)))}
                    </li>
                </ul>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {c}
                <CommentForm />
            </div>
        );
    } else {
        return <div></div>;
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {modal: false};

        this.isToggle = this.isToggle.bind(this);
    }

    isToggle() {
        this.setState(
            {
                modal: !this.state.modal
            }
        );
    }

    render() {
        return (
            <Button onClick={this.isToggle}>
                <i className="fa fa-pencil"></i>&nbsp;
                Submit Comment
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.isToggle}
                >
                    <ModalHeader toggle={this.isToggle}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    className="form-control"
                                    model='.select'
                                    name='select'
                                    id='select'
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="yourname">Your Name</Label>
                                <Control.text
                                    className="form-control"
                                    model='.text'
                                    placeholder='Your Name'
                                    validators={
                                        {
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }
                                    }
                                />
                                <Errors
                                    className='text-danger'
                                    model='.text'
                                    show='touched'
                                    messages={
                                        {
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea
                                    className="form-control"
                                    model='.comment'
                                    rows="6"
                                />
                            </div>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </Button>
        );
    }
}

const DishDetail = (props) => {
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
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;