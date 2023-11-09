'use client'
import React, { useEffect, useState } from "react";
import { getAllAccount as getAllAccount } from "../../lib/user/AllAccount";
import { getAllPassbook as getAllPassbook } from "../../lib/user/AllPassbook";
import Table from "../../sharedcomponent/table/Table";
import NavbarComponent from "../../sharedcomponent/navbar/Navbar";
import DropdownAcc from "../component/dropdownbyid/DropdownForId";
import { MessageError, MessageSuccess } from "../../error/Error";
import './passbook.css'
const Passbook = () => {
  const [count, setCount] = useState();
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(2);
  const [info, setInfo] = useState([]);
  const [account, setAccount] = useState();
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  let userId = localStorage.getItem("id");

  useEffect(() => {
    handleAccount();
  }, []);

  useEffect(() => {
   
    if (selectedValue) {
      handleViewPassbook();
    }
  }, [selectedValue,limit,page]);
  const handleAccount = async () => {
    const params = {};

    const response = await getAllAccount(userId, params);
    setCount((prev) => response?.headers["x-total-count"]);
    setData((prev) => response.data);
  };

  const dropDownFunction = async (value) => {
    setSelectedValue(value);
  };
  
  const handleViewPassbook = async () => {
   
    const params = {
      limit: limit,
      page: page,
      fromDate: fromDate,
      toDate: toDate,
    };
    const response = await getAllPassbook(selectedValue, params);
    setInfo((prev) => response.data);
    console.log(response);
  };

  // const exportToExcel = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const params = {};
  //     const filename = "test.xlsx";
  //     console.log(filename);
  //     let response = await getAllPassbook(selectedValue, params);
  //     console.log(response.data);
  //     const workSheet = XLSX.utils.json_to_sheet(response.data);
  //     console.log(workSheet);
  //     const workBook = XLSX.utils.book_new();
  //     console.log(workBook);
  //     XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
  //     XLSX.writeFile(workBook, filename);
  //     console.log("end");
  //   } catch (error) {
  //     console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
  //   }
  // };

  
  // // Helper function to convert binary string to array buffer
  // function s2ab(s) {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i < s.length; i++) {
  //     view[i] = s.charCodeAt(i) & 0xFF;
  //   }
  //   return buf;
  // }
  

  
  const handleFilterButton = (e) => {
    try {
      if (!fromDate && !toDate) {
        throw new Error("Please enter atleast one filter");
      }
      setPage((prev) => 1);
      handleViewPassbook(e);
    } catch (error) {
      MessageError(error.message);
    }
  };
  const resetButton = (e) => {
    try {
      setFromDate((prev) => "");
      setToDate((prev) => "");
      setPage(1);
      setLimit(1);
      setReset((prev) => !prev);
      handleViewPassbook(e);
    } catch (error) {
      MessageError(error.message);
    }
  };
  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };
  const handleToDate = (e) => {
    setToDate(e.target.value);
  };
  return (
    <>
      <NavbarComponent />

      <h1>passbook</h1>
      <form action="#" className="dp">
        <DropdownAcc data={data} onSelect={dropDownFunction} />
      </form>
      <div className="parent-filter">
        <div className="form-cont">
          <div>
            <input
              type="text"
              placeholder="From Date"
              onChange={handleFromDate}
              value={fromDate}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="To Date"
              onChange={handleToDate}
              value={toDate}
            />
          </div>
          <div>
            <button className="btn btn-success" onClick={handleFilterButton}>
              Submit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={resetButton}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* <button type="button" className="btn btn-success" onClick={exportToExcel}>
        Download
      </button> */}
      <Table
        data={info}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        // updateButton={false}
        // deleteButton={true}
        // viewButton={false}
        // depositeButton={true}
        // withdrawButton={true}
        // transferButton={true}
        // passbookButton={true}
        setShow={setShow}
        // setWithdraw={setWithdraw}
        // setTransfer={setTransfer}
        // depositeFunction={depositeFunction}
        // withdrawFunction={withdrawFunction}
        // transferFunction={transferFunction}
        // passbookFunction={passbookFunction}
        // deleteFunction={deleteFunction}
      />
    </>
  );
};

export default Passbook;
