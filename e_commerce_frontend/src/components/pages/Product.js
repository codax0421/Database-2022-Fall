import  {Carousel,Descriptions,Button, Tag ,Space ,Avatar, List } from "antd"
import {Route, Link, Routes, useLocation} from 'react-router-dom';
import React from 'react';

import axios from "./axios";
import { useState ,useEffect} from "react";

const data1 = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
 
const Product = () =>{
  const params = useLocation();
  const [data, setData] = useState([])
  const [Bcomment ,setBComment] =useState([])
  const productid = params.state.productId
  const productname = params.state.productName
  useEffect(() => {
    axios.get("/products/"+productid)
      .then((res) => {
        console.log(res.data.data)
        setData(res.data.data)
      })
    
      axios.get("/products/comment/"+productid)
      .then((res)=>{
      
          setBComment(res.data.data)
      })
  
  },[])


    return(
<div>
        <div style={{ display:' flex'}}>
                        <div style={{width:"400px" ,height:"400px",backgroundColor:"orange" ,margin:"100px" ,backgroundImage:`url(http://127.0.0.1:8000/${data.image})`,  backgroundPosition: 'center',

        backgroundRepeat: 'no-repeat',}}>
                            <Carousel autoplay  dots={true}  dotPosition={"bottom"}>
                                <div style={{backgroundImage:`url(http://127.0.0.1:8000/${data.image})`,  backgroundPosition: 'center',

backgroundRepeat: 'no-repeat',}}> 

                                    <h1 style={{color:"white" ,lineHeight:"300px" , textAlign: 'center' }}>a</h1>
                             
                                
                                </div>

                            </Carousel>
                            <>
                                 {data.tag?.map((allTag =>{
                                  return(
                                              <Tag color="magenta" style={{marginTop:'70px'}} key={allTag.id}>{allTag.name} </Tag>
                                 )} ))}
                                
                                     </>
                     
                            
                         
                        </div> 
                <div>
                    <div style={{width:"700px" ,height:"300px" ,marginTop:"100px" }}>           
                                <Descriptions title="ProductName"  bordered={true}>
                                        <Descriptions.Item label = "Descriptions" span={3}>{data.name}</Descriptions.Item>
                                
                                        <Descriptions.Item label = "Price"  span={3}>{data.price}</Descriptions.Item>
                                
                                        <Descriptions.Item label = "Seller"  span={3}>{data.seller}</Descriptions.Item>
                        
                                    
                                </Descriptions>
                                <br></br>
                              
                        </div>
                                <Space wrap style={{marginLeft:"450px"}}>
                                    <Button type="primary">add to cart</Button>
                                    <Button type="primary">Buy</Button>
                                </Space>
                </div>  
               
        </div>
        <div style={{marginLeft:"80px"}}>    

          
                <List itemLayout="horizontal" dataSource={Bcomment}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://picsum.photos/200/300" />}
                        title={item.buyer}
                        description={item.comment}
                        />
                        </List.Item> )}/>
              
                    
                              
        </div>
       

</div>   
  
)
}


export default Product