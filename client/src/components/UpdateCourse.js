import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UpdateCourse extends Component {

  // this class updates a Course => calls the api first and loads the course and than makes the put api call


  state = {
    courseTitle: "",
    courseDescription: "",
    estimatedTime: "",
    materialsNeeded: "",
    id: "",
    user: "",
    isLoaded: false,
    errors: [],
  }
  
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${window.location.pathname.split("/").slice(-2)[0]}`) 
    .then(res =>res.json())
    .then(json=>{
        this.setState({
        isLoaded: true,
        courseTitle: json.title,
        courseDescription: json.description,
        estimatedTime: json.estimatedTime,
        materialsNeeded: json.materialsNeeded,
        id: json.id,
        user: json.User

        })
     });


    }



  render() {
    const {
      isLoaded, 
      id,
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors,
      user,
    } = this.state;



    if(!isLoaded){
        return <div>Loading...</div>;
    }

    else {

        return (
            <div className="wrap">
                <h1>Update Course</h1>
                <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                    <React.Fragment>
                    <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text"  value={courseTitle} onChange={this.change} placeholder="courseTitle"/> 

                        <p>{user.firstName} {user.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value ={courseDescription} onChange={this.change} placeholder="courseDescription" />
                        </div>
                        <div>

                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={this.change} placeholder="estimatedTime"/>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value ={materialsNeeded} onChange={this.change} placeholder="materialsNeeded" />
                        </div>
                    </div>
                    </React.Fragment>
                )} />

        </div>
        
        
        );
    }
}


change = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  this.setState(() => {
    return {
      [name]: value
    };
  });
}

submit = () => {
  const { context } = this.props;
  const authUser = context.authenticatedUser;
  const authPass = context.authenticatedPassword;
  
  const {
    courseTitle,
    courseDescription,
    estimatedTime,
    materialsNeeded,
    id,
    userId,
    errors,
  } = this.state; 

  // New Course payload
  const course = {
    id: id,
    title: courseTitle,
    description: courseDescription,
    estimatedTime,
    materialsNeeded,
    userId: authUser.id,
  };


  context.data.updateCourse(course, authUser.emailAddress, authPass, id)

 

  .then( errors => {
    if (errors.length) {
      this.setState({ errors });
    } else {
        console.log(`${courseTitle} has been successfully created!`);
        this.props.history.push(`/courses/${id}`);
    }
  })
  .catch( err => { // handle rejected promises
    console.log(err);
    this.props.history.push('/error'); // push to history stack
  });  





}

cancel = () => {
  this.props.history.push(`/courses/${id}`);
}

}
