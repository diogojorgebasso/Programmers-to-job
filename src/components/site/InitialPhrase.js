import React from "react";
import { useEffect, useState } from "react";
import { fraseInicial } from "../../services/api";
import "./initialPhrase.css";

export default function InitialPhrase() {
  const [Frase, setFrase] = useState("");
  const [Author, setAuthor] = useState("");

  // Get the initial random phrase
  useEffect(() => {
    fraseInicial
      .get()
      .then((result) => {
        setFrase(result.data.content);
        setAuthor(result.data.author);
      })
      .catch((err) => {
        setFrase(
          "É das pessoas que menos esperamos que surgem as coisas mais incríveis"
        );
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>
        <q>{Frase}</q>
      </h2>
      <cite>{Author}</cite>
    </div>
  );
}
