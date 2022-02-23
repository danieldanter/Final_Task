import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  // the header class => is used in allways at the top
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser)

    return (
      <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
                <nav>
                
                  {authUser ?
                    <React.Fragment>
                      <ul className="header--signedin">
                      <span>Welcome, {authUser.firstName}!    </span>
                      <Link className="signout" to="/signout"> Sign Out</Link>
                      </ul>
                    </React.Fragment>
                  :    
                    <React.Fragment>
                      <ul className="header--signedout">
                      <Link className="signup" to="/signup">Sign Up     </Link>
                    
                      <Link className="signin" to="/signin">  Sign In</Link>
                      </ul>
                    </React.Fragment>
                    
                  }
                 
                </nav>

            </div>
      </header>
    );
  }
};


