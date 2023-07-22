import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditExcercise = () => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get('http://localhost:5000/excercises/' + id)
            .then((response) => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date));
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get('http://localhost:5000/users/')
            .then((response) => {
                if (response.data.length > 0) {
                    setUsers(response.data.map((user) => user.username));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        };

        axios
            .post('http://localhost:5000/excercises/update/' + id, exercise)
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.log(error);
            });

        window.location = '/';
    };

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    >
                        {users.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>

                <div className="form-group">
                    <label>Duration: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditExcercise;
