import React, {Component, component} from 'react';
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom';

export default class CourseDetail extends React.PureComponent  {

    // this class shows the details of a course => makes an get api call  

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }

        
    }

    

    componentDidMount() {
        fetch(`http://localhost:5000/api/courses/${window.location.pathname.split("/").pop()}`) // add number form input /1
        .then(res =>res.json())
        .then(json=>{
            this.setState({
            isLoaded: true,
            items: json,

            })
         });


    }


    render ()  {

        var {isLoaded, items} = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authPass = context.authenticatedPassword;
        var showEdit = false;
        console.log(items)

        if(authUser !== null ) {
            if( authUser.id === items.userId){
                showEdit= true;
            }
        }

        if(!isLoaded){
            return <div>Loading...</div>;
        }

        else { 

            var delate = async (e) => {
                e.preventDefault();
               
               try {
                  let res = await fetch(`http://localhost:5000/api/courses/${items.id}`, {
                    method: "DELETE",                
                    
                    headers: {
                      'Content-Type': 'application/json; charset=utf-8',
                      'Authorization': 'Basic ' + btoa(`${authUser.emailAddress}:${authPass}`)
                    }
                  });
                  if (res.status === 204) {
                    console.log("course delated successfully");
                    this.props.history.push(`/`);
                  } else {
                    console.log(res.status) 
                    console.log("Some error occured");
                    
                  }
                } catch (err) {
                  console.log(err);
                }
              };



            return ( 
                <main>
            <div className="actions--bar">
                <div className="wrap">
                    { showEdit ?                    
                    <React.Fragment>                        
                        <Link className="button" to={`/courses/${items.id}/update`}>Update Course</Link> 
                        <a className="button"  onClick= { delate } >Delete Course</a> 
                    </React.Fragment>
                     : 
                     <div> </div>
                    }
                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{items.title}</h4>
                            <p>{items.User.firstName} {items.User.lastName}</p>
                            <ReactMarkdown>{items.description}</ReactMarkdown>
                            
                            
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{items.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                            <ReactMarkdown >{items.materialsNeeded}</ReactMarkdown>
                                
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
            )

        }

        
    }



}
