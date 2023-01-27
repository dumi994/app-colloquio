import React from 'react'

const Input = (props) => {
  return (
    <div>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={props.onChange}
        style={{ display: "block", margin: "10px auto" }}
      />
    </div>
  );
}
export default Input