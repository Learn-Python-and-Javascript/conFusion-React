import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

function renderDish(dish) {
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

function renderComments(comments) {
    if (comments != null) {
        const Comment = comments.comments.map((comment) => {
            return (
                <ul className="list-unstyled">
                    <li key={Comment.id}>
                        {comment.comment}
                        <br /><br />
                        {/*TODO author formatting*/}
                        {comment.author}
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </li>
                </ul>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {Comment}
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
        return (
            <div className="row">
                {renderDish(props.selectedDish)}
                {renderComments(props.selectedDish)}
            </div>
        );
    }

export default DishDetail;