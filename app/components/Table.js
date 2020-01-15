/**
 * A sortable Table component.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import _isNil from 'lodash/isNil';
import _has from 'lodash/has';

import lifecycle from 'recompose/lifecycle';

import SORT_DIRECTION from 'components/sortDirection';

// Inline styles to enforce the table's appearance
const styles = {
  refreshButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  refreshButton: {
    marginTop: 15,
    marginRight: 15,
    cursor: 'pointer',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

/**
 * Renders the table's header. Styles the header elements to match the table's sort direction and sort column.
 * Columns can opt out of being sortable if desired.
 */
const renderTableHeader = (columns, sortState, sortAction) => (
  <thead>
    <tr>
      {columns.map((columnProps) => {
        const {
          label,
          name,
          sortable,
          boldedLabel,
        } = columnProps;

        // Properties for non-sortable column names. No sort class name, and an empty function for onClick.
        let sortClassName = '';
        let sortFunc = () => {};
        // If the sortState exists and the column is sortable, give the column the correct sort arrow appearance class and give it the sortAction for onClick.
        if (!_isNil(sortState) && sortable !== false) {
          // The property to use for sorting is either the name of the column, or another value if set
          const sortProp = _isNil(columnProps.sortKey)
            ? name
            : columnProps.sortKey;
          sortClassName = 'sorting';
          sortFunc = () => sortAction(sortProp);

          if (sortProp === sortState.sortKey) {
            sortClassName = sortState.sortDirection === SORT_DIRECTION.ASC
              ? 'sorting_asc'
              : 'sorting_desc';
          }
        }

        let formattedLabel = label;
        if (boldedLabel === 'true') formattedLabel = (<b>{formattedLabel}</b>);

        return (
          <th
            className={sortClassName}
            key={name}
            onClick={sortFunc}
            style={{ padding: '10px' }}
          >
            {formattedLabel} <i className="fa fa-fw fa-sort" />
          </th>
        );
      })}
    </tr>
  </thead>
);


/**
 * For standard cells, render the data for this column in the given row without modification.
 * @param {Object} rowData
 * @param {Object} columnProps
 */
const renderDefaultCellContents = (rowData, columnProps) => rowData[columnProps.name];

/**
 * Renders the table's body. Maps each array of data onto a table row, and each element in that array onto a cell in the row.
 * If the column of that cellhas a cellType property, render the cell in accordance with that type.
 */
const renderTableBody = (columns, tableData) => (
  <tbody>
    {tableData.map(rowData => (
      <tr key={rowData.id}>
        {columns.map((columnProps) => (
          <td key={`${rowData.id}-${columnProps.name}`} style={{ padding: '10px' }}>
            {renderDefaultCellContents(rowData, columnProps)}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

// When the table first loads, if there is a loadAction passed in, call it to load the table's data.
const enhance = lifecycle({
  componentDidMount() {
    if (_has(this.props, 'loadAction')) {
      this.props.loadAction();
    }
  },
});

const Table = enhance(({
  columns,
  data,
  sortState,
  isLoading,
  sortAction,
  refreshAction,
  type,
}) => (
  <div>
    {!_isNil(refreshAction) && (
      // Render a button to refresh the table's data, if there is a function to do so.
      <div style={styles.refreshButtonContainer}>
        <i
          role="button"
          tabIndex={0}
          className="icon-sync"
          style={styles.refreshButton}
          onClick={refreshAction}
        />
      </div>
    )}
    <table className="table dataTable no-footer" >
      {renderTableHeader(columns, sortState, sortAction)}
      {renderTableBody(columns, data)}
    </table>
    {isLoading && (
      // Render a spinner icon if the table is loading data.
      <div style={styles.spinnerContainer}>
        <i className="icon-spinner2 spinner" />
      </div>
    )}
  </div>
));

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    sortKey: PropTypes.string,
    sortAction: PropTypes.func,
  })),
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortState: PropTypes.shape({
    sortDirection: PropTypes.oneOf(Object.keys(SORT_DIRECTION)),
    sortKey: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
  sortAction: PropTypes.func,
  loadAction: PropTypes.func,
  refreshAction: PropTypes.func,
};

export default Table;
