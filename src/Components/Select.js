import React from 'react'
const Select = (props) => {
  return (
    <div className="select">
      <select onChange={props.onChange}>
        <option value="_">--Seleziona lista--</option>
        <option value="all">Tutti</option>
        <option value="valid_num">Numeri validi</option>
        <option value="invalid_num">Numeri non validi</option>
        <option value="corrected_num">Numeri aggiornati</option>
        <option value="search_number">Cerca in rubrica</option>
      </select>
    </div>
  );
}

export default Select