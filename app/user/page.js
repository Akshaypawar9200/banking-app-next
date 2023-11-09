'use client'
import React, { useEffect, useState } from "react";
import { getAllAccount as getAllAccount } from "../../lib/user/AllAccount";
import { DeleteAccount as DeleteAccount } from "../../lib/user/deleteAccount";
import { depositeMoney as depositeMoney } from "../../lib/user/Deposite";
import { transferMoney as transferMoney } from "../../lib/user/transferMoney";
import { withdrawMoney as withdrawMoney } from "../../lib/user/WithdrawMoney";
import { getUserWorth as getUserWorth } from "../../lib/user/userWorth";
import { MessageError, MessageSuccess } from "../../error/Error";
import Table from "../../sharedcomponent/table/Table";
import { authorize as authorize } from "../../lib/user/Authorize";
import CreateAccount from "../component/createaccount/CreateAccount";
import NavbarComponent from "../../sharedcomponent/navbar/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./user.css";

import DropdownAcc from "../component/dropdownbyid/DropdownForId";
import { useRouter } from "next/navigation";
const page = () => {
    const router=useRouter()
  const [count, setCount] = useState();
  
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(2);
  const [reciver, setReciever] = useState();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [amount, setAmount] = useState();
  const [money, setMoney] = useState();
  const [filterId, setFilterId] = useState();
  const [updateTable, setUpdateTable] = useState(false);
  const handleClose = () => setShow(false);
  const handleClosed = () => setWithdraw(false);
  const handleClosedTransfer = () => setTransfer(false);
  const handleShow = () => setShow(true);
  const [reset, setReset] = useState(false);
  const [verify, setVerify] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  let userId = localStorage.getItem("id");

  const handleAccount = async () => {
    // e.preventDefault()
    const params = {
      id: filterId,
      limit: limit,
      page: page,
    };

    const response = await getAllAccount(userId, params);
    setCount((prev) => response?.headers["x-total-count"]);
    setData((prev) => response.data);
  };

  const handleUser = async () => {
    const response = await authorize();
    setVerify((prev) => response.data.result);
  };
  const handleWorth = async () => {
    const response = await getUserWorth(userId);
    setMoney(response.data);
  };
  useEffect(() => {
    handleAccount();
    handleWorth();
  }, [updateTable, reset]);

  useEffect(() => {
    handleUser();
  }, [verify]);
  useEffect(() => {
    handleAccount();
  }, [limit, page]);

  if (!verify) {
    return (
      <h1>
        <a href="/">Please login</a>
      </h1>
    );
  }

  const deleteFunction = async (d) => {
    try {
      const response = await DeleteAccount(d.id);
      if (response.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("account deleted");
      }
    } catch (error) {
      if (error.message) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  const depositeFunction = async (d) => {
    setId(d.id);
  };
  const withdrawFunction = async (d) => {
    setId(d.id);
  };
  const transferFunction = async (d) => {
    setId(d.id);
  };
  const passbookFunction = async (d) => {
    setAmount(d.id);
  };

  const getAmount = (e) => {
    setAmount(e.target.value);
  };
  const depositeButton = async (e) => {
    e.preventDefault();
    try {

      if(isNaN(amount)){
        throw new Error("plz enter valid amount")
      }
      console.log("id", id);
      const response = await depositeMoney(id, userId, amount);
      console.log(response);
      if (response.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("amount deposite");
      }
    } catch (error) {
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  const withdrawButton = async (e) => {
    e.preventDefault();
    try {
      console.log("id", id);
      const response = await withdrawMoney(id, userId, amount);

      if (response.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("amount withdraw");
      }
      handleClose();
    } catch (error) {
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  const transferButton = async (e) => {
    e.preventDefault();
    try {
      console.log("id", id);
      const response = await transferMoney(id, userId, amount, selectedValue);
      if (response.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("transfer sucessful");
      }
      handleClose();
    } catch (error) {
      if (error.message) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  const getReciver = (e) => {
    setReciever(e.target.value);
  };
  const handlePassbook = () => {
    router.push("/passbook", { state: data });
  };

  const handleFilterId = (e) => {
    setFilterId(e.target.value);
  };
  const handleFilterButton = (e) => {
    e.preventDefault(); // Prevent the form submission

    try {
      if (!filterId) {
        throw new Error("Please enter an account no");
      }
      setPage(1);
      handleAccount(e);
    } catch (error) {
      if (error.message) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };

  const resetButton = () => {
    try {
      setFilterId((prev) => undefined);

      setPage(1);
      setLimit(1);
      setReset((prev) => !prev);
      handleAccount();
    } catch (error) {
      if (error.message) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };
  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const dropDownFunction = async (value) => {
    setSelectedValue(value);
  };

  return (
    <>
      <NavbarComponent />
      <div className="box1">
        <div>
          <CreateAccount handleAccount={handleAccount} />
        </div>
        <div></div>
        <div className="userButton">
          <button className="btn btn-primary" onClick={handlePassbook}>
            {" "}
            view passbook
          </button>
          <br></br>

          <h1>userWorth:{money}</h1>
        </div>
      </div>

      <h1>AllAccount:{count}</h1>
      {/* <button onClick={handleAccount}>AllAccount</button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposite</Modal.Title>
        </Modal.Header>
        <form>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              amount
            </label>
            <input
              type="Number"
              className="form-control"
              aria-describedby="emailHelp"
              value={amount}
              onChange={getAmount}
            />
          </div>

          <button className="btn btn-primary" onClick={depositeButton}>
            Deposite
          </button>
        </form>
      </Modal>

      <Modal show={withdraw} onHide={handleClosed}>
        <Modal.Header closeButton>
          <Modal.Title>withdraw</Modal.Title>
        </Modal.Header>
        <form>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              amount
            </label>
            <input
              type="Number"
              className="form-control"
              aria-describedby="emailHelp"
              value={amount}
              onChange={getAmount}
            />
          </div>

          <button className="btn btn-primary" onClick={withdrawButton}>
            withdraw
          </button>
        </form>
      </Modal>

      <Modal show={transfer} onHide={handleClosedTransfer}>
        <Modal.Header closeButton>
          <Modal.Title>transfer</Modal.Title>
        </Modal.Header>
        <form>
          <div className="mb-3">
            <DropdownAcc data={data} onSelect={dropDownFunction} />
            {/* <label htmlFor="amount" className="form-label">
              Reciever Account no
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={reciver}
              onChange={getReciver}
            /> */}
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              amount
            </label>
            <input
              type="Number"
              className="form-control"
              aria-describedby="emailHelp"
              value={amount}
              onChange={getAmount}
            />
          </div>

          <button className="btn btn-primary" onClick={transferButton}>
            transfer
          </button>
        </form>
      </Modal>

      <div className="parent-filter">
        <div className="form-cont">
          <div>
            <input
              type="text"
              placeholder="account id"
              onChange={handleFilterId}
              value={filterId}
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

      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        updateButton={false}
        deleteButton={true}
        viewButton={false}
        depositeButton={true}
        withdrawButton={true}
        transferButton={true}
        passbookButton={false}
        setShow={setShow}
        setWithdraw={setWithdraw}
        setTransfer={setTransfer}
        depositeFunction={depositeFunction}
        withdrawFunction={withdrawFunction}
        transferFunction={transferFunction}
        deleteFunction={deleteFunction}
      />
    </>
  );
};

export default page;
