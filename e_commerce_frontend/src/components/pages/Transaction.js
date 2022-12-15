import { Space, Table, Tag } from "antd";
import axios from "../../axios";
import React, { useState, useEffect } from "react";
const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Buyer",
    dataIndex: "buyer",
    key: "buyer",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const Transaction = () => {
  const [BuyerTrans, setBuyerTrans] = useState([]);
  const [SellerTrans, setSellerTrans] = useState([]);
  useEffect(() => {
    axios.get("transactionBuyer/" + 1).then((res) => {
      console.log(res.data.data);
      setBuyerTrans(res.data.data);
    });
    axios.get("transactionSeller/" + 1).then((res) => {
      setSellerTrans(res.data.data);
    });
  }, []);

  return (
    <div style={{ marginLeft: "30px" }}>
      <h1>Buy</h1>
      <Table columns={columns} dataSource={BuyerTrans} />

      <h1>Sell</h1>
      <Table columns={columns} dataSource={SellerTrans} />
    </div>
  );
};
export default Transaction;
