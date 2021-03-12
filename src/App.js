import "./App.css";
import { frase, nameAge, extraPhrases, location } from "./services/api";
import { useEffect, useState, useMemo } from "react";
import Graph from "./services/Graph";

function App() {
  const [Frase, setFrase] = useState();
  const [FraseEscolhida, setFraseEscolhida] = useState();
  const [Location, setLocation] = useState();

  const [author, setAuthor] = useState();
  const [Name, setName] = useState("");
  const [Age, setAge] = useState();
  const [Personagem, setPersonagem] = useState();

  // Get the initial random phrase
  useEffect(() => {
    frase
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

  function fetchLocation() {
    location
      .get()
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => console.error(err));
  }

  useMemo(() => fetchLocation(), []); //FIXME: its not working

  const handleSubmit = (e) => {
    e.preventDefault();
    nameAge(Name, Location)
      .get()
      .then((res) => {
        setAge(res.data.age);
        console.log(res);
      });
  };

  const handlePhrase = (e) => {
    e.preventDefault();
    extraPhrases
      .post("/", { text: Personagem })
      .then((res) => {
        console.log(res);
        let frases = [];
        res.data.forEach((frase) => frases.push(frase));

        setFraseEscolhida(frases);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <nav></nav>
      <div className="phrase_init">
        <h3>"{Frase}"</h3>
        <h4>{author}</h4>
        <p>A sua idade é:{Age}</p>
        <p>{Name}</p>
        <Graph></Graph>
        <p>{Personagem}</p>
      </div>
      <div>
        <label htmlFor="name">Qual o seu nome:</label>
        <input
          id="name"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>

      <label htmlFor="fraseExtra">Quem você admira?</label>
      <input
        id="fraseExtra"
        type="text"
        onChange={(event) => setPersonagem(event.target.value)}
        required
      />
      <button onClick={handlePhrase}>Enviar</button>
    </div>
  );
}

export default App;
