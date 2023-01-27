import React, { useState, useEffect } from "react";
import Input from "./Components/Input";
import Button from "./Components/Button";
import Table from "./Components/Table";
import Search from "./Components/Search";
import Select from "./Components/Select";
import Papa, { parse } from "papaparse";
import "./index.css"
function App() {
  // state per i dati convertiti
  const [inject, setInject] = useState(0);
  const [parsedCsv, setParsedCsv] = useState([]);
  //State per i valori
  const [values, setValues] = useState([]);
  // State contenente valore select
  const [selected, setSelected] = useState("");
  // State contenente valore search
  const [searchN, setSearchN] = useState([]);
  // State contenente solo i numeri validi
  const [validNumbers, setValidNumbers] = useState([]);
  // State numeri incorretti
  const [incNumbers, setIncNumbers] = useState([]);
  // State numeri modificati
  const [correctedNumbers, setCorrectedNumbers] = useState([]);

  // Variabili per gli state
  const valuesArr = [];
  const validNumbersArr = [];
  const correctedNumbersArr = [];
  const incNumbersarr = [];
  var selN = [];
  /* Funzione che prende il file input */
  const changeHandler = (e) => {
    let data = e.target.files[0];
    /*converto csv in oggetti */
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        // array contenente id e sms_phone tanti quanti gli elementi in parsedCsv
        res.data.map((d) => {
          valuesArr.push(Object.values(d));
        });
        setParsedCsv(res.data);
      },
    });
  };

  /* Funzione per salvare i dati */
  const saveHandler = () => {
    setInject(inject + 1);
    localStorage.setItem("inpt", JSON.stringify(parsedCsv));
  };

  let storedData = JSON.parse(localStorage.getItem("inpt"));

  // Hook che aggiorna state all'aggiornamento di inject
  useEffect(() => {
    let stored = localStorage.getItem("inpt");
    if (stored) {
      setValidNumbers(validNumbersArr);
      setCorrectedNumbers(correctedNumbersArr);
      setIncNumbers(incNumbersarr);
      setValues(valuesArr);
      setParsedCsv(storedData);
    }
  }, [inject]);

  if (storedData) {
    storedData.map((el) => {
      // console.log(el.sms_phone);
      valuesArr.push(el);
      if (
        el.sms_phone.length === 11 &&
        el.sms_phone[0] == 2 &&
        el.sms_phone[1] == 7
      ) {
        validNumbersArr.push(el);
      }
      // Condizioinale per numeri da correggere
      if (el.sms_phone.includes("_DELETED_")) {
        el.sms_phone = el.sms_phone.split("_DELETED_");
        correctedNumbersArr.push(el);
        // console.log(el);
      }
      // Condizionale per trovare i numeri incorretti
      if (el.sms_phone.length != 11 && el.sms_phone[0] != 2) {
        incNumbersarr.push(el);
      }
    });
  }

  // Funzione che gestisce lo state del select
  const selectHandler = (e) => {
    var selectVal = e.target.value;
    setSelected(selectVal);
  };
  
  // Funzione che gestisce lo state del search
  const searchHandler = (event) => {
    const searchVal = event.target.value;
    validNumbers.map((el) => {
      if (el.sms_phone.includes(searchVal)) {
        selN.push(el);
      }
      setSearchN(selN);
    });
  };

  return (
    <div id="main">
      <h2>South African mobile numbers</h2>
      <div id="input-container">
        <Input onChange={changeHandler} />
        <Button onClick={saveHandler}>Salva dati</Button>
      </div>
      <Select onChange={selectHandler} />
      {selected === "search_number" && (
        <Search onChange={searchHandler} data={searchN} />
      )}
      {selected === "all" && <Table data={values} />}
      {selected === "corrected_num" && <Table data={correctedNumbers} />}
      {selected === "valid_num" && <Table data={validNumbers} />}
      {selected === "invalid_num" && <Table data={incNumbers} />}
    </div>
  );
}

export default App;
