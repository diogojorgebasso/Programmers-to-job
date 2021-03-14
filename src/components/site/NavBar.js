import React, { useState } from "react";
import logo from "./logo__header.png";
import { Link, Prompt } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavBar.css";

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="navbar">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Diogo Logo" />
      </Link>
      <div className="headerLocation">
        <div className="headerOption">
          <span className="HeaderTextUp">Olá!</span>
          <span className="HeaderTextDown">Selecione aqui</span>
        </div>
      </div>
      <div className="headerNav">
        <Link to={!currentUser.email && "/login"}>
          <div className="headerOption">
            <span className="HeaderTextUp">
              Hello {!currentUser ? "Guest" : currentUser.email}
            </span>
            <Prompt when={!!logout} message="Are you sure?" />
            <span onClick={logout} className="HeaderTextDown">
              {currentUser ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="headerOption">
          <span className="HeaderTextUp">Return</span>
          <span className="HeaderTextDown">&amp; orders</span>
        </div>
        <Link to="/checkout">
          <div className="headerOptionBasket">
            <span className="HeaderTextDown HeaderBasketCart"></span>
          </div>
        </Link>
      </div>
    </div>
  );
}
