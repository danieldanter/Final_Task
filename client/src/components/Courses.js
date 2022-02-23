import React, {Component, component} from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {


    constructor(){
        super();
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/courses')
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

        if(!isLoaded){
            return <div>Loading...</div>;
        }

        else {
            return ( 
                <main>
                    <div className="wrap main--grid">
                        {items.map(item => (
                            
                             
                             <Link className="course--module course--link"  to={`/courses/${item.id}`} key={item.id}> 
                                <h2 className= "course--label" >Course</h2>
                                <h3 className= "course--title">{item.title}</h3>
                                </Link>
                        ))}
                        <Link className="course--module course--link" to={`/courses/create`}>
                            <span className= "course--add--title">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>
                                New Course
                            </span>
                        </Link>
                    </div>
                </main>
            )

        }

        
    }



}
export default Courses;
