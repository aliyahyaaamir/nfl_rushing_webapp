import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import wrapComponent from 'utils/ComponentWrapper';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { sortedAndFilteredPlayersSelector } from './selectors';
import PlayerStats from './PlayerStats';

import {
  getPlayersRequest,
  sortPlayersTable,
  filterByPlayer,
} from './actions';

const mapStateToProps = (state) => ({
  players: sortedAndFilteredPlayersSelector(state),
  isLoading: state.getIn(['home', 'loading'], false),
  tableSort: state.getIn(['home', 'tableSort']),
  filteredPlayerName: state.getIn(['home', 'filteredPlayerName']),
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators({
    getPlayers: getPlayersRequest,
    sortPlayersTable,
    filterByPlayer,
  }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(wrapComponent(PlayerStats));
export { mapDispatchToProps };
