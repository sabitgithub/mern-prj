import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import axios from "axios";

export default class CreateExcercise extends Component {
    constructor(props) {
        super(props);

        this.onchangeUsername = this.onchangeUsername.bind(this)
        this.onchangeDescription = this.onchangeDescription.bind(this)
        this.onchangeDuration = this.onchangeDuration.bind(this)
        this.onchangeDate = this.onchangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) { // Corrected "length" spelling
                    this.setState({
                        users: response.data.map(user => user.username), // Changed "user.users" to "user.username"
                        username: response.data[0].username
                    })
                }
            })
    }

    onchangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onchangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onchangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onchangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const excercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log(excercise)

        axios.post('http://localhost:5000/excercises/add', excercise)
            .then(res => console.log(res.data));

        window.location = '/'

    }

    render() {
        return (
            <div>
                <h3>Create New Excercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onchangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option key={user} value={user}> {user} </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description}
                               onChange={this.onchangeDescription}/>
                    </div>

                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="text" required className="form-control" value={this.state.duration}
                               onChange={this.onchangeDuration}/>
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onchange={this.onchangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Excercise Log" className="btn btn-primary"/>
                    </div>

                </form>


            </div>
        );
    }
}