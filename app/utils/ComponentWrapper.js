/**
 * Converts Immutable data structures in a component's props to plain JS data structures.
 * Used in ViewModel modules.
 */

import React from 'react';
import Immutable from 'immutable';

export default (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = // eslint-disable-line no-param-reassign
        Immutable.Iterable.isIterable(wrappedComponentProp[VALUE])
          ? wrappedComponentProp[VALUE].toJS()
          : wrappedComponentProp[VALUE];
      return newProps;
    }, {});

  return <WrappedComponent {...propsJS} />;
};
