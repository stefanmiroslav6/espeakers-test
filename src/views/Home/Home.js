import React, { Component } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';

import hoc from './hoc'

class Home extends Component {

  state = {
    organization: '',
    meetingname: '',
    modified: false,
    updating: false,
    dialogOpen: false,
  }

  componentWillMount() {
    this.props.getEvents()
  }

  componentWillReceiveProps(nextProps) {
    const { data, loaded } = nextProps;
    console.log('props change')
    if (loaded) {
      this.setState({
        organization: data.getIn(['event', 'organization']),
        meetingname: data.getIn(['event', 'meetingname']),
        modified: false,
      })
    }
  }

  handleOrgChange = (e) => {
    this.setState({
      organization: e.currentTarget.value,
      modified: true,
    });
  }

  handleMeetingNameChange = (e) => {
    this.setState({
      meetingname: e.currentTarget.value,
      modified: true,
    });
  }

  handleOpenDialog = () => {
    this.setState({
      dialogOpen: true,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
    })
  }

  handleSave = () => {
    this.setState({
      updating: true,
      modified: false,
      dialogOpen: false,
    });
    const eid = this.props.data.getIn(['event', 'eid']);
    const { organization, meetingname } = this.state;
    this.props.updateEvent(eid, organization, meetingname)
    .then(res => {
      if (res.success) {
        this.setState({
          updating: false,
        });
        alert('Successfully saved!');
      } else {
        this.setState({
          updating: false,
          modified: true,
        });
        alert('Failed to save.');
      }
    })
    .catch(() => {
      this.setState({
        updating: false,
        modified: true,
      });
      alert('Failed to save.');
    })
  }

  render() {
    const { data, loaded } = this.props;

    if (!loaded) {
      return <div>Loading...</div>
    }

    const { organization, meetingname, modified, dialogOpen, updating } = this.state;

    return (
      <div>
        <label>Organization:</label>
        <FormControl
          type="text"
          value={organization}
          placeholder="Enter text"
          onChange={this.handleOrgChange} />
        <label>Meeting name:</label>
        <FormControl
          type="text"
          value={meetingname}
          placeholder="Enter text"
          onChange={this.handleMeetingNameChange} />
        <ul style={{ marginTop: 30 }}>
          {
            data.getIn(['event', 'Venue']).map((venue, i) => (
              <li key={i}>{venue.get('city')}</li>
            ))
          }
        </ul>
        <div style={{ marginTop: 20 }}>
          {
            updating ?
            'Saving...'
            :
            <Button
              bsStyle="primary"
              disabled={!modified}
              onClick={this.handleOpenDialog}>
              Save
            </Button>
          }
        </div>

        <Modal show={dialogOpen} onHide={this.handleCloseDialog}>
          <Modal.Body>
            Do you want to save the data?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseDialog}>No</Button>
            <Button bsStyle="primary" onClick={this.handleSave}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default hoc(Home);
