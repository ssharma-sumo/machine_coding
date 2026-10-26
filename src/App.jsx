import React from 'react';
import { useMemo } from 'react';

import { InfinityScroll  } from './examples/infinityScroll/infinityScroll.jsx'

import { EditableTodos } from './examples/editableTodos/editableTodos.jsx'

import { SimpleModal } from './examples/simpleModal/simpleModal.jsx'

import {  OverLappingCircle } from './examples/overLappingCircle/overLappingCircle.jsx'

import { AnimateDiv } from './examples/animateDiv/animateDiv.jsx'

import { AutocompleteSearchDemo } from './examples/autocompleteSearch/autocompleteSearch.jsx'

const DefaultComponent = () => {
  return (
    <div>
      <h1>Default Component</h1>
    </div>
  )
}

const componentName = 'AutocompleteSearchDemo'

const COMPONENTS = {
  DefaultComponent,
  InfinityScroll,
  EditableTodos,
  SimpleModal,
  OverLappingCircle,
  AnimateDiv,
  AutocompleteSearchDemo
}

function App() {

  const Component = useMemo(() => {
    return COMPONENTS[componentName] || DefaultComponent;
  }, [])

  return (
    <Component />
  )
}

export default App
