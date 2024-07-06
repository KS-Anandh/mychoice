import React, { useEffect } from 'react'
import Container from './Container'
import { useState } from 'react'
import axios from 'axios'
import { useParams,Link } from 'react-router-dom'

const Update = () => {
  const [data,setData]=useState({});
  useEffect(()=>{
    axios.get(`https://mychoice-server.vercel.app/mychoice/product/id/${id}`)
   .then((res)=>{
       setData(res.data)
       console.log(res.data)
   })
  .catch((err)=>{
       console.log(err)
   })
   setProductImg(data.productImg)
 },[])
    const {id} =useParams();
    const[productName,setProductName]=useState(data.productName);
    const[productCategory,setProductCategory]=useState(data.productCategory);
    const[productPrice,setProductPrice]=useState(data.productPrice);
    const[productRating,setProductRating]=useState(data.productRating);
    const[productImg,setProductImg]=useState(data.productImg);
    const[productDesc,setProductDesc]=useState(data.productDesc);

    const base64Conv=(e)=>{
         const file=e.target.files[0]
         const reader=new FileReader()
         reader.readAsDataURL(file)
         reader.onload=()=>{setProductImg(reader.result) }
        reader.onerror=(err)=>{console.log(err) }
       }
    const sendToDB=async()=>{
       await axios.put(`https://mychoice-server.vercel.app/mychoice/product/id/${id}`,{productName,productCategory,productPrice,productRating,productDesc,productImg})
        .then((res)=>{
          console.log(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
       }
  return (
    <div className='container'>
    <Container/>
    <div className='addItem'>
    <div className='imageUploader'>
   <form>
    <h2 style={{padding:"20px",fontSize:"20px",color:"green",fontWeight:"700"}}>Update Product (MyChoice)</h2>
    <input type="text" onChange={(e)=>setProductName(e.target.value)} defaultValue={data.productName} placeholder='Product Name *'/><br/>
    <input type="number" onChange={(e)=>setProductPrice(e.target.value)} defaultValue={data.productPrice} placeholder='Product price *'/><br/>
    <input type="number" onChange={(e)=>setProductCategory(e.target.value)} defaultValue={data.productCategory} placeholder='Product category *'/><br/>
    <input type="number" onChange={(e)=>setProductRating(e.target.value)} defaultValue={data.productRating} placeholder='Product rating *'/><br/>
    <input type="text" onChange={(e)=>setProductDesc(e.target.value)} defaultValue={data.productDesc} placeholder='Product desc *'/><br/>
    <label htmlFor='image' className='label'>{productImg?<><img  src={productImg} className='imageSrc ' /><h3 style={{color:"red"}}>Click to Change</h3></>:<><img  src={data.productImg} className='imageSrc ' /><h3 style={{color:"red"}}>Click to Change</h3></>}</label><br/>
    <input type="file"  onChange={base64Conv} name='image' def id="image" /><br/>
   <button onClick={sendToDB} className='submitBtn'><Link to="/">submit</Link></button> 
    </form>
 </div>
    </div>
</div>
  )
}

export default Update