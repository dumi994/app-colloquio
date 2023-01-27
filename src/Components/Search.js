import React from 'react'
import Table from './Table'
const Search = (props) => {
  return (
    <div>
      <div className="search">
        <input className="" placeholder="cerca" onChange={props.onChange} />
      </div>
      <Table onChange={props.onChange} data={props.data} />
    </div>
  );
}

export default Search