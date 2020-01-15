/*
 * PlayerStats
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import PlayerStatsTable from './PlayerStatsTable';
import './style.scss';

export default class PlayerStats extends React.Component {
  componentDidMount() {
    // Load the Players when this form component mounts.
    this.props.action.getPlayers();
  }

  render() {
    const {
      action,
      players,
      tableSort,
      isLoading,
      filteredPlayerName,
    } = this.props;
    return (
      <div className="player-admin">
        <PlayerStatsTable action={action} players={players} isLoading={isLoading} tableSort={tableSort} filteredPlayerName={filteredPlayerName} />
      </div>
    );
  }
}

PlayerStats.propTypes = {
  action: PropTypes.shape({
    getPlayers: PropTypes.func.isRequired,
    sortPlayersTable: PropTypes.func.isRequired,
  }).isRequired,
};
