import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Form,
  Button,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavbarToggler,
} from 'reactstrap'
import { addVocabModalShow } from '../actions/add-vocab-modal'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  return (
    <Navbar color="light" fixed="top" light expand="md">
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink to="/" exact={true} className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>Vokabelliste</NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/learn" className="nav-link" activeClassName="active" onClick={() => setIsOpen(false)}>Lernen</NavLink>
          </NavItem>
        </Nav>

        <Form inline className="my-2 my-lg-0">
          <Button color="primary" onClick={() => dispatch(addVocabModalShow())}>+ Hinzufügen</Button>
        </Form>
      </Collapse>
    </Navbar>
  )
}
