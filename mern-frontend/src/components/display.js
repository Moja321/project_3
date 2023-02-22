import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function DisplayOrigami({ origami, createOrigami }) {
  const [newForm, setNewForm] = useState({
    posterid: "",
    name: "",
    likes: 0,
    img: "",
    title: "",
    description: "",
    reference: "",
    instructions: "",
  }); //initial newForm state

  const handleChange = (event) => {
    const value = { ...newForm, [event.target.name]: event.target.value };
    setNewForm(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createOrigami(newForm);
    setNewForm({
      posterid: "",
      name: "",
      likes: 0,
      img: "",
      title: "",
      description: "",
      reference: "",
      instructions: "",
    });
  };

  const loaded = () => {
    return (
      <div class="container">
        <Row>
          <Col className="d-flex">
            {origami.map((origami, index) => {
              return (
                <Card className="m-2" style={{ width: "40rem" }}>
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src={origami.img}
                    alt={origami.name}
                  />
                  <Card.Body>
                    <div key={origami._id}>
                      <h4>Posted by: {origami.name}</h4>
                      <Card.Title>
                        <h1>{origami.title}</h1>
                      </Card.Title>
                      <Card.Text>
                        <br></br>
                        <h6>Description:</h6>
                        <p>{origami.description}</p>
                        <br></br>
                        <h6>Photo instructions: </h6>
                        <img
                          src={origami.reference}
                          width={400}
                          alt={origami.name}
                        />
                        <br></br>
                        <br></br>
                        <h6>Instructions:</h6>
                        <p>{origami.instructions}</p>
                        <Button
                          as="input"
                          type="submit"
                          variant="outline-dark"
                          value="Like"
                        />{" "}
                        <p style={{ display: "inline" }}>{origami.likes}</p>
                        <Link
                          style={{ display: "block" }}
                          to={`/origami/${origami._id}`}
                        >
                          Edit
                        </Link>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section className="form-style">
      <h1 style={{ color: "white" }}>Post Your Own Origami Instructions!</h1>
      <br></br>
      <div class="container">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="name"
            value={newForm.name}
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="hidden"
            name="posterid"
            value={newForm.posterid}
            placeholder="poster id"
            onChange={handleChange}
          />
          <input
            type="hidden"
            name="likes"
            value={newForm.likes}
            placeholder={0}
            onChange={handleChange}
          />
          <Stack direction="horizontal" gap={3} className="stack">
            <Form.Label className="mb-3">Origami Name</Form.Label>
            <input
              style={{ width: "200px", borderRadius: "5px" }}
              type="text"
              name="title"
              value={newForm.title}
              placeholder="Name"
              onChange={handleChange}
            />
            <Form.Label className="mb-3">End product image</Form.Label>
            <input
              style={{ width: "300px", borderRadius: "5px" }}
              type="text"
              name="img"
              value={newForm.img}
              placeholder="Image URL"
              onChange={handleChange}
            />
            <Form.Label className="mb-3">Photo instructions</Form.Label>
            <input
              style={{ width: "300px", borderRadius: "5px" }}
              type="text"
              name="img"
              value={newForm.reference}
              placeholder="Image URL (optional)"
              onChange={handleChange}
            />
          </Stack>
          <br></br>
          <br></br>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              name="description"
              value={newForm.description}
              placeholder="Enter origami description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Control
              as="textarea"
              style={{ height: "300px" }}
              name="instructions"
              value={newForm.instructions}
              placeholder="Enter origami instructions"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            as="input"
            type="submit"
            variant="outline-light"
            value="Post Origami"
          />{" "}
          <br />
          <br />
          <br />
        </form>
      </div>
      {origami ? loaded() : loading()}
    </section>
  );
}
