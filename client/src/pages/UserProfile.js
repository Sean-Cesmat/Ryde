import React, { Component } from 'react';
import { connect } from 'react-redux';
import { liftCurrentPageToState, liftClickedUser } from '../redux/actions/index';
// import store from '../redux/store/index';
import PrivateProfile from './PrivateProfile';
import { PublicProfile } from './PublicProfile';
import axios from 'axios';

const mapDispatchToProps = dispatch => {
  return {
    liftCurrentPageToState: page => dispatch(liftCurrentPageToState(page)),
    liftClickedUser: data => dispatch(liftClickedUser(data))
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    clickedUser: state.clickedUser
  };
}

class ConnectedUserProfile extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('@@@ USER PROFILE this.props.user', this.props.user)
    this.props.liftCurrentPageToState('/profile/' + this.props.match.params.id)
    axios.get('/finduser/' + this.props.match.params.id)
      .then( result => {
        this.props.liftClickedUser(result.data)
    }).catch( err => console.log(err.message))
  }

  render() {
    console.log('@@@ USER PROFILE, this.props.clikedUser:', this.props.clickedUser)
    if (this.props.user) {
      if (this.props.user._id === this.props.match.params.id) {
        console.log('@@@ USER PROFILE this props user: ', this.props.user);
        return <PrivateProfile user={this.props.user} />
      } else {
        return <PublicProfile clickedUser={this.props.clickedUser} />
      }
    } else {
      return <PublicProfile clickedUser={this.props.clickedUser} />
    }
  }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserProfile);

export default UserProfile;
