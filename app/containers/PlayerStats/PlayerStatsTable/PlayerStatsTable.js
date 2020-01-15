import React from 'react';
import PropTypes from 'prop-types';

import Table from 'components/Table';

// Config for the Table element
const tableColumns = [
  { name: 'player', label: 'Player' },
  { name: 'team', label: 'Team' },
  { name: 'position', label: 'pos' },
  { name: 'attempts', label: 'Att' },
  { name: 'attemptspergame', label: 'Att/G' },
  { name: 'yards', label: 'Yds' },
  { name: 'avg', label: 'Avg' },
  { name: 'yardspergame', label: 'Yds/G' },
  { name: 'touchdowns', label: 'TD' },
  { name: 'longestrush', label: 'Lng' },
  { name: 'firstdown', label: '1st' },
  { name: 'firstdownpercentage', label: '1st%' },
  { name: 'twentyyards', label: '20+' },
  { name: 'fortyyards', label: '40+' },
  { name: 'fumbles', label: 'FUM' },
];

export default class PlayerStatsTable extends React.Component {
  exportCSV() {
    var link = document.createElement("a");
    let csvContent = 'data:text/csv;charset=utf-8,';

    csvContent += tableColumns.map(entry => entry['label']).join(',') + '\r\n';
    this.props.players.forEach(function(rowArray) {
      const row = Object.values(rowArray).join(',');
      csvContent += row + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sorted_players.csv');
    document.body.appendChild(link);

    link.click(); // This will download the data file named "sorted_players.csv".
  }

  render() {
    const {
      action,
      players,
      isLoading,
      tableSort,
      filteredPlayerName,
    } = this.props;

    return (
      <div className="panel panel-white">

        <div>
          <label htmlFor="playerName">
            Filter by player name:
          </label>
          <input type="text" name="playerName" value={filteredPlayerName} onChange={action.filterByPlayer} />

          <a
            target="_blank"
            onClick={this.exportCSV.bind(this)}
          >
            Export CSV
          </a>
        </div>

        <Table
          columns={tableColumns}
          data={players}
          sortState={tableSort}
          isLoading={isLoading}
          sortAction={action.sortPlayersTable}
          refreshAction={action.getPlayers}
        />
      </div>
    );
  }
}

PlayerStatsTable.propTypes = {
  action: PropTypes.shape({
    getPlayers: PropTypes.func.isRequired,
    sortPlayersTable: PropTypes.func.isRequired,
  }).isRequired,
  players: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filteredPlayerName: PropTypes.string,
  tableSort: PropTypes.object,
};
