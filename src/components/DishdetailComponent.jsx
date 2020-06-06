import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);

        this.renderDish = this.renderDish.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    renderDish(dish) {
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

    renderComments(comments) {
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

    render() {
        return (
            <div className="row container">
                {this.renderDish(this.props.dish)}
                {this.renderComments(this.props.dish)}
            </div>
        )
    }
}

export default DishDetail;