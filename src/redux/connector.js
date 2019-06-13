import {connect} from 'react-redux';


export default function connector(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
	return connect(mapStateToProps, mapDispatchToProps, mergeProps, options);
}