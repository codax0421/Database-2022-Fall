import { Carousel, Descriptions, Tag, Space } from "antd";
import { Route, Link, Routes, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthProvider";
const Product = () => {
  const params = useLocation();
  const [data, setData] = useState([]);
  const [Bcomment, setBComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const productid = params.state.productId;
  const productname = params.state.productName;
  const { profile } = useContext(AuthContext);
  useEffect(() => {
    axios.get("/products/" + productid).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });

    axios.get("/products/comment/" + productid).then((res) => {
      setBComment(res.data.data);
    });
  }, [Bcomment]);
  // console.log(Bcomment);
  const onClickSendComment = (product_id, postCommnet) => {
    console.log("newComment", newComment);
    axios
      .post("/newcomment/", {
        user: profile.id,
        product: product_id,
        comment: postCommnet,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setNewComment("");
  };

  const onClickWish = (product_id) => {
    axios
      .post("/addwishlist/", {
        user: profile.id,
        product: product_id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickCart = (product_id) => {
    axios
      .post("/addcart/", {
        user: profile.id,
        product: product_id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: " flex" }}>
        <div
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "orange",
            margin: "100px",
            backgroundImage: `url(http://127.0.0.1:8000/${data.image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Carousel autoplay dots={true} dotPosition={"bottom"}>
            <div
              style={{
                backgroundImage: `url(http://127.0.0.1:8000/${data.image})`,
                backgroundPosition: "center",

                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </Carousel>
          <div style={{ marginTop: "380px" }}>
            {data.tag?.map((allTag) => {
              return (
                <Tag
                  color="magenta"
                  style={{ marginTop: "20px" }}
                  key={allTag.id}
                >
                  {allTag.name}{" "}
                </Tag>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ width: "700px", height: "300px", marginTop: "100px" }}>
            <Descriptions title="ProductName" bordered={true}>
              <Descriptions.Item label="Descriptions" span={3}>
                {data.name}
              </Descriptions.Item>

              <Descriptions.Item label="Price" span={3}>
                {data.price}
              </Descriptions.Item>

              <Descriptions.Item label="Seller">
                {data.seller}
              </Descriptions.Item>
            </Descriptions>
            <br></br>
          </div>
          <Space wrap style={{ marginLeft: "450px" }}>
            <Button variant="contained" onClick={(e) => onClickCart(productid)}>
              add to cart
            </Button>
            {/* <Button variant="contained">Buy</Button> */}
          </Space>
        </div>
      </div>

      <div style={{ marginLeft: "80px" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {Bcomment?.map((itemComment, index) => {
            return (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://picsum.photos/200/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={itemComment.buyer}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {itemComment.comment}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>

        <TextField
          style={{ width: "350px", marginLeft: "65px" }}
          label="Comment"
          variant="standard"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                style={{
                  height: "30px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={(e) => onClickSendComment(productid, newComment)}
              >
                Send
              </Button>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Product;
