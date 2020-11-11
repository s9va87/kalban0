import React from 'react';
import {
    Card,CardBody,CardHeader} from 'reactstrap';

function List(props) {

    return (
        <div className="App">
            {props.tasks.map(task=> <Card>
                <CardBody>
                <CardHeader>
                    {task.name}
                </CardHeader>
                    {task.dectriction}
                </CardBody>
            </Card>)}

        </div>
    );
}

export default List;
