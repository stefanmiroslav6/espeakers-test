import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { getEvents, updateEvent } from 'redux/modules/data';

const mapStateToProps = ({ data }) => ({
  data,
  loaded: data.get('loaded'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvents,
  updateEvent,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
