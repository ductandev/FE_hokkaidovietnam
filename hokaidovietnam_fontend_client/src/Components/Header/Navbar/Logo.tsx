"use client";
import React from "react";
import logo from '../../../assets/image/logo.png'


  ;

export default function Logo() {
  return (
    <div className="flex justify-center align-middle h-[100px]">
      <a className="cusor-pointer" href="/">
        <img className="object-contain  -translate-y-2" src={logo} width={120} style={{ color: "#ff385c" }} alt="">
        </img>
      </a>
    </div>
  );
}
