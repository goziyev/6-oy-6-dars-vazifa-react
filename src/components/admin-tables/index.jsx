import React from "react";
import { useEffect, useState } from "react";
import style from "./index.module.css";
export default function TableAdmin({data,setData}) {

  function DeleteButton(elId) {
    if (elId) {
      let deleteConfirm = confirm("O'chirishni istaysizmi...");
      if (deleteConfirm) {
        fetch(`https://auth-rg69.onrender.com/api/products/${elId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((dataAPI) => {
            if (dataAPI.message == "Mahsulot muvaffaqiyatli o'chirildi") {
              let deleteData = JSON.parse(JSON.stringify(data));
              deleteData = deleteData.filter((el) => {
                return el.id != elId;
              });
              setData(deleteData);
            }
          });
      }
    }
  }
  return (
    <table className={style.adminTableWrapper}>
      <thead>
        <tr>
          <th>
            N<small>o</small>
          </th>
          <th>Nomi</th>
          <th>Narxi </th>
          <th>Izoh</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        {data.length && data.map((el, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{el.name}</td>
              <td>{el.price}$</td>
              <td >{el.description}</td>
              <td
                onClick={() => {
                  DeleteButton(el.id);
                }}
                className={style.delateButton}
              >
                <img
                  width={40}
                  src="https://cdn.icon-icons.com/icons2/1337/PNG/512/deletebutton_87299.png"
                  alt=""
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
