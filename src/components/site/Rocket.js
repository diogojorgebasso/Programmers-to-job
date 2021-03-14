import React from "react";
import { Card, CardDeck, Button } from "react-bootstrap";
import { RocketNews } from "../../services/api";
import { useState, useEffect } from "react";
import "./Rocket.css";
export default function Rocket() {
  const [response, SetResponse] = useState([]);

  useEffect(() => {
    RocketNews.get()
      .then((result) => {
        console.log(result);
        SetResponse(result.data);
      })
      .catch((err) => {
        alert("Error in loading Rocket");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <CardDeck>
        {response?.map((section, index) => {
          return (
            <Card border="light" key={index} style={{ width: "15rem" }}>
              <Card.Img
                style={{ maxHeight: "150px" }}
                variant="top"
                bg="light"
                src={section.imageUrl}
              />
              <Card.Body>
                <Card.Title>{section.title}</Card.Title>
                <Card.Text>{section.summary}</Card.Text>
                <Button href={section.url} variant="primary">
                  {" "}
                  {/*FIXME: href not to the site, but to RocketInfo component */}
                  Go to {section.newsSite}
                </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Última atualização: {Date(section.publishedAt).slice(0, 24)}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardDeck>
    </div>
  );
}
