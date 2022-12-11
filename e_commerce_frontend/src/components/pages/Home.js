import React, { useState, useEffect } from "react";
import { Select, Space, Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "./axios";

const { Meta } = Card;
const Home = () => {
  const [productHome, setproductHome] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("products/").then((res) => {
      console.log(res.data.data);
      setproductHome(res.data.data);
    });
    axios.get("tag/").then((res) => {
      setTag(res.data.data);
    });

    axios.get("category/").then((res) => {
      setCategory(res.data.data);
    });
  }, []);

  const navigateToProduct = (e, id, name) => {
    // 👇️ navigate to /contacts
    console.log(name);
    navigate("/product/" + id, {
      state: {
        productId: id,
        productName: name,
      },
    });
  };

  return (
    <>
      <>
        <Select
          mode="multiple"
          style={{ width: "10%", marginTop: "20px", marginLeft: "30px" }}
          options={category.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
        />
        <Select
          mode="multiple"
          style={{ width: "10%", marginTop: "20px", marginLeft: "30px" }}
          options={tag.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
        />
      </>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "70px" }}>
        {productHome.map((product) => {
          return (
            <Card
              style={{ width: "300px", margin: "10px" }}
              onClick={(e) => navigateToProduct(e, product.id, product.name)}
              value={product.id}
              key={product.id}
              cover={
                <img
                  alt={product.alt}
                  src={"http://127.0.0.1:8000/" + product.image}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
              ]}
            >
              <Meta
                title={product.name}
                description={"$" + product.description}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default Home;
