import React from "react";
import { useState } from "react";
import logo from "./logo__header.png";

export default function Toast() {
  const [ShowToast, setShowToast] = useState(true);

  const toggleShowToast = () => setShowToast(!ShowToast);

  return (
    <div>
      <Toast
        show={ShowToast}
        onClose={toggleShowToast}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <Toast.Header>
          <img src={logo} className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bem-vindo!</strong>
          <small>Agora</small>
        </Toast.Header>
        <Toast.Body>
          Esperamos que tenha a melhor experiência por aqui!
        </Toast.Body>
      </Toast>
    </div>
  );
}
