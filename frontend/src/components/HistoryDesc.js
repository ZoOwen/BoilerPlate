import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "../css/Desc.css";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import Payment from "./Payment.js";

function HistoryDesc(props) {
  useEffect(() => {
    axios
      .get(`https://5e9f0a2711b078001679c0a2.mockapi.io/main_event/${param}`)
      .then((result) => {
        setEvents(result.data);
      });
  }, []);

  const fetchApi = useEffect(() => {
    axios
      .get(`https://5e9f0a2711b078001679c0a2.mockapi.io/main_event_detail`)
      .then((result) => {
        setDetEvents(result.data);
      });
  }, []);

  const [events, setEvents] = useState([]);
  const [detEvents, setDetEvents] = useState([]);
  const [handleData, setHandleData] = useState({});
  const [singleDetEvent, setSingleDetEvent] = useState([]);
  const param = props.match.params.id;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    var dataFirst = detEvents.filter(function (det) {
      return det.id == index;
    });
    var obj = Object.assign({}, dataFirst[0]);
    setHandleData(obj);
    setShow(true);
  };

  console.log("props yang diterima", props);
  var payment = ["DANA", "OVO", "GOPAY", "BCA", "MANDIRI"];
  const [money, setMoney] = useState();

  const handleMoney = (e) => {
    setMoney(e.target.value);
  };

  const handleBayar = (item) => {
    console.log(singleDetEvent);
    console.log(handleData.donatur);

    console.log("isinya id", handleData.id.toString());
    setShow(false);
  };
  var stringid = handleData.id;

  console.log("string yang sudah di id", stringid);
  useEffect(() => {
    axios
      .get(
        `https://5e9f0a2711b078001679c0a2.mockapi.io/main_event_detail/${stringid}`
      )
      .then((result) => {
        setSingleDetEvent(result.data);
      });
  }, []);

  //filter untuk mendapatkan berdasarkan id_event
  var datafilter = detEvents.filter(function (eventdet) {
    return eventdet.id_event == param;
  });

  //filter untuk mendapatkan 1 data

  return (
    <div className="container-fluid">
      <Jumbotron header="History Detail" />
      <br />
      <div className="container">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <td>No Events </td>
              <td> : </td>
              <td> {events.id}</td>
            </tr>

            <tr>
              <td>Nama Events</td>
              <td> : </td>
              <td> {events.name}</td>
            </tr>

            <tr>
              <td>Events Type</td>
              <td> : </td>
              <td> {events.even_type}</td>
            </tr>

            <tr>
              <td>Total Donasi</td>
              <td> : </td>
              <td> {events.total_donasi}</td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="container">
        <br />
        <hr />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <td>No</td>
              <td>Donatur Name</td>
              <td>total Donate</td>
              <td>date</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>

          {datafilter.map((item, index) => (
            <tbody key={index}>
              <tr key={index}>
                <td>{index}</td>
                <td>{item.donatur}</td>
                <td>{item.dana_donasi}</td>
                <td>{item.tgl_donasi}</td>
                <td>{item.sts.toString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    key={index}
                    variant="primary"
                    onClick={() => {
                      handleShow(item.id);
                    }}
                  >
                    PayBack
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Payback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ color: "black", marginLeft: "80px" }}>
            Bayar Hutang ke : {handleData.donatur}
          </h5>
          <h5 style={{ color: "black", marginLeft: "80px" }}>
            Jumlah Hutang: {handleData.dana_donasi}
          </h5>
          <Form style={{ marginTop: "-40px" }}>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column md="5">
                Metode
              </Form.Label>

              <select className="form-control" style={{ color: "black" }}>
                {payment.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column md="5">
                Jumlah
              </Form.Label>

              <Form.Control
                type="number"
                placeholder="Rp. 0"
                min="0"
                onChange={handleMoney}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column md="5">
                Komentar
              </Form.Label>

              <textarea className="form-control" placeholder="komentar" />
            </Form.Group>
            <Button
              type="submit"
              onClick={handleShow}
              style={{
                backgroundColor: "#F75D08",
                border: "none",
              }}
            >
              Bayar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withRouter(HistoryDesc);
