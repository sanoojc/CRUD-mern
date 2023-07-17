import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './AdminHome.css'
import { Button, Container, Form, Nav, Navbar, Table } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

function AdminHome() {
    const dispatch = useDispatch()

    async function deleteUser(id){
        if(window.confirm("are you want delete this user")){
            const {data}=await axios.get('/admin/deleteUser/'+id)
            dispatch({type:"refresh"})
            setRefresh(!refresh)
        }
    }

    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [search, setSearch] = useState('')

    async function handleLogout() {
        if (window.confirm("Are you sure want to logout ")) {
            await axios.get('/admin/logout')
            dispatch({ type: "refresh" })
        }
    }
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/admin/users?search=" + search)
            setUsers(data)
        })()
    }, [search, refresh])
    return (
        <div>
            <div className="">
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container fluid>
                        <Navbar.Brand >Admin</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >

                            </Nav>
                            <Form className="d-flex search-input me-2">
                                <Form.Control
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    color='black'
                                />
                                <Button  setSearch={setSearch} variant="dark">Search</Button>
                            </Form>
                            <Button className='bg-danger' variant='danger' onClick={handleLogout} style={{ height: "40px" }}>logout</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="admin-table pt-5">

                <Container>
                    <div className="">
                    <Link to={"/admin/createUser"}>
                    <button className='create-btn'>create user</button>
                    </Link>
                    </div>

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                        <Link to={('/admin/editUser/'+item._id)}>
                                            <button className='edit-btn' >EDIT</button> 
                                        </Link>
                                            </td>
                                        <td><Button onClick={()=>deleteUser(item._id)} className='bg-danger btn-sm' variant='danger'>DELETE</Button> </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}
export default AdminHome