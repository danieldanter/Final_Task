import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class createCourse extends Component {


  state = {
    courseTitle: "",
    courseDescription: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  }

 

  render() {
    const {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (

  
      <div className="wrap">
            <h1>Create Course</h1>
            <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Create Course"
              elements={() => (
                <React.Fragment>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input id="courseTitle" name="courseTitle" type="text"  value={courseTitle} onChange={this.change} placeholder="courseTitle"/> 

                      <p>By Joe Smith</p>

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
      title: courseTitle,
      description: courseDescription,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id,
    };


    context.data.createCourse(course, authUser.emailAddress, authPass)

   

    .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
          console.log(`${courseTitle} has been successfully created!`);
          this.props.history.push('/');
      }
    })
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack
    });  





  }

  cancel = () => {
    this.props.history.push('/');
  }

}
  
  

    

   

        
            