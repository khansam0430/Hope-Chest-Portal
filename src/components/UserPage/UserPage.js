
import React, {Component} from 'react';
import { connect } from 'react-redux';
import './UserPage.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
// const UserPage = (props) => (
//   <div>
//     <h1 id="welcome">
//       Welcome, { props.user.email }!
//     </h1>
//     <p>Your ID is: {props.user.id}</p>
//     <LogOutButton className="log-in" />
//   </div>
// );
class UserPage extends Component {
  componentDidMount = () => {
    this.displayEvent();
  };
  goToFormPage = (event) => {
    this.props.history.push("/form-page-1");
  };

  displayEvent = () => {
    console.log("in displayEvent", this.props.reduxState.form.user_id);
    this.props.dispatch({
      type: "SET_EVENT1",
      userId: this.props.reduxState.user.id,
    });
  };

  render() {
    return (
      <div className="UserPage">
        <h1 className="head1"> Welcome, {this.props.reduxState.user.first_name}!</h1>
        <div className="userHome">
        <br />
        <center><button className="start" onClick={this.goToFormPage}>
          Start a Fundraiser
        </button></center>
        </div>
        <br />
        <br />
        <br />
        <h1 className="head1">My Upcoming Events</h1>
        <div className="userEvent">
       
            <ul>
              {this.props.reduxState.userEvents.length > 0 &&
                this.props.reduxState.userEvents.map((events) => {
                  return (
                    <li className="eventLi">
                        <img className="eventImg" src="/userPic.jpg" alt="Logo"/>
                      <br />
                      <>{events.event_name}</>
                      <br />
                      <>{events.event_date.substring(0,10)}</><br/>
                      <>{events.event_time}</>
                      <br />
                      <>{events.event_description} </>
                     </li>
                  );
                })}
            </ul>
        
        </div>
      </div>
    );
  }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = reduxState => ({
  reduxState
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
