import React from "react";
import style from "./index.module.css";
import { useState } from "react";
import { useEffect } from "react";
import TableAdmin from "../admin-tables";
import { useRef } from "react";

export default function AdminPanel() {
  const [data, setData] = useState([]);
  const InputName  = useRef();
  const InputPrice  = useRef();
  const InputDesc  = useRef();
  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function validate(){
    if (!InputName.current.value || !InputName.current.value.trim() || InputName.current.value.length <= 3 ){
      alert("Mahsulot uchun nom berilishi shart va probellardan tashkil topgan bo'lishi va ishoralar soni 3 tadan kam bo'lishi mumkin emas!!!  ")
      InputName.current.focus();
      InputName.current.value = ""
      return false
    } 
    if (!InputPrice.current.value || !InputPrice.current.value.trim() || InputPrice.current.value.length <= 1 ){
      alert("Mahsulot uchun nom berilishi shart va probellardan tashkil topgan bo'lishi va ishoralar soni 1 tadan kam bo'lishi yoki matn ko'rinishida bolishi mumkin emas!!!  ")
      InputPrice.current.focus();
      InputPrice.current.value = ""
      return false
    } 
    if (!InputDesc.current.value || !InputDesc.current.value.trim() || InputDesc.current.value.length <= 3  ){
      alert("Mahsulot uchun nom berilishi shart va probellardan tashkil topgan bo'lishi va ishoralar soni 3 tadan kam bo'lishi mumkin emas!!!  ")
      InputDesc.current.focus();
      InputDesc.current.value = ""
      return false
    } 

    return true
  }

  function handleToSent(e){
    e.preventDefault();
    if (validate()) {
      let newElement = {
        name: `${InputName.current.value}`,
        description: `${InputDesc.current.value}`,
        status: `active`,
        price: InputPrice.current.value,
        category_id: "2"
      }
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newElement)
    })
    InputName.current.value = ''
    InputDesc.current.value = ''
    InputPrice.current.value = ''
    }
  }

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => {
      console.log(err);
    });
  },[data])

  return (
    <div>
      <form className={style.formWrapper}>
        <label htmlFor="name">Mahsulot nomi <span>* </span></label>
        <input ref={InputName} type="text" id="name" placeholder="Mahsuot nomini kiriting..."/>

        <label htmlFor="price">Mahsulot narxi <span>*</span></label>
        <input ref={InputPrice} type="number" id="price" placeholder="Mahsulot narxini kiriting..." />

        <label htmlFor="desc">Mahsulot uchun izoh <span>*</span></label>
        <input ref={InputDesc} type="text" id="desc" placeholder="Mahsulot izohini kiriting..." />

        <button onClick={handleToSent} className={style.toSent}>Yuborish</button>
      </form>
      <TableAdmin data = {data} setData = {setData}/>
    </div>
  );
}
