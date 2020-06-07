import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

function renderDish(dish) {
    if (dish != null) {
        return (
            <div className={"col-12 col-md-5 m-1"}>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
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

function renderComments(comments) {
    if (comments != null) {
        const comment = comments.comments.map((item) => {
            return (
                <ul className={"list-unstyled"}>
                    <li key={comments.id}>
                        {item.comment}
                        <br/><br/>
                        {/*TODO formatting*/}
                        {item.author}
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(item.date)))}
                    </li>
                </ul>
            )
        });

        return (
            <div className={"col-12 col-md-5 m-1"}>
                <h4>Comments</h4>
                {comment}
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    return (
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
                <div className="col-12 col-md-5 m-1">
                    {renderDish(props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {renderComments(props.comments)}
                </div>
            </div>
        </div>
    )
}

export default DishDetail;