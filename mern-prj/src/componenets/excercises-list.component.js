import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// Exercise component
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> |{' '}
            <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>Delete</a>
        </td>
    </tr>
);

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            exercises: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/excercises/')
            .then(response => {
                this.setState({exercises: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteExercise(id) {
        axios
            .delete('http://localhost:5000/excercises/' + id)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error);
            });

        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => (
            <Exercise
                exercise={currentExercise}
                deleteExercise={this.deleteExercise}
                key={currentExercise._id}
            />
        ));
    }

    render() {
        return (
            <div>
                <h3>Exercise List</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>UserName</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{this.exerciseList()}</tbody>
                </table>
            </div>
        );
    }
}
