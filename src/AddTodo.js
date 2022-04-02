import { React } from 'react';
import { Col, Row } from 'react-bootstrap';


export default function AddTodo() {

  return (
<Row gap={3}>
  <Col xs={4}>Title: <input type="text"/></Col>
  <Col xs={6}>Description: <input type="textarea"/></Col>
</Row>
<Row gap={3}>
  <Col xs={5}>People: <input type="textarea"/></Col>
  <Col xs={5}>Organisations: <input type="textarea"/></Col>
</Row>
  )
};
