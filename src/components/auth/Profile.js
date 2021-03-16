import React, { useState } from "react";
import { Card, Button, Alert, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Perfil</h2>
          <h3>Oferta especial: Seja usuário PRO!</h3>
          <Link to="/payment" className="btn btn-primary w-100 mt-3">
            <button>Clique aqui</button>
          </Link>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser?.email}
          <strong>Log de segurança</strong>
          {currentUser?.lastLogin.map((login) => console.log(login))}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Atualizar perfil
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleShow}>
          Log Out
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Deseja mesmo sair?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Não
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Sim
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </CenteredContainer>
  );
}
