import React, { useState} from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css"
const Table = (props) => {
  const { data } = props;
  // Offset degli elementi
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // Gestione delle pagine
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invocare quando l'utente fa clic per richiedere un'altra pagina.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // Frecce paginazione
  const next = <i className="fa-sharp fa-solid fa-arrow-right"></i>;
  const prev = <i className="fa-sharp fa-solid fa-arrow-left"></i>;

  return (
    <>
      <div className="items">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, i) => {
              return (
                <tr key={i}>
                  <td>{val.id}</td>
                  <td>{val.sms_phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        containerClassName="pagination-container"
        pageClassName="pagination-page"
        activeLinkClassName="pagination-active"
        breakLabel="..."
        nextLabel={next}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={prev}
        renderOnZeroPageCount={null}
        selectedPageRel={null}
      />
    </>
  );
};

export default Table;
