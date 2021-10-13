import React, {Component} from 'react';
import './App.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import {Button, Modal, Row, Form, Col} from 'react-bootstrap';

const tablaUsuarios = [
    {id: 1, nombre:"Sergio Antonio", apellidos:"Hernández Ramírez", correo:"sergioramirezcb24@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 2, nombre:"José Antonio", apellidos:"Govea Millán", correo:"joseantonio@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 3, nombre:"Oswaldo", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 4, nombre:"Fernanda", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 5, nombre:"Karla", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 6, nombre:"Leonardo", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 7, nombre:"Ernesto", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 8, nombre:"Jorge", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 9, nombre:"Brandon", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 10, nombre:"Alberto", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 11, nombre:"Pablo", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},
    {id: 12, nombre:"Miranda", apellidos:"Jiménez Valerio", correo:"vado@gmail.com", curp:"HERS981111HGTRMR01"},

];

const columnas = [
  {
      name: 'ID', //nombre de la columna
      selector: 'id', //identificador de la columna
      sortable: false
  },
  {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true
  },
  {
      name: 'Apellidos',
      selector: 'apellidos',
      sortable: true
  },
  {
      name: 'Correo',
      selector: 'correo',
      sortable: true
  },
  {
      name: 'CURP',
      selector: 'curp',
      sortable: true
  }
//   ,
//   {
//     name: 'Acciones',
//     selector: 'modify',
//     sortable: false
// }
];

const paginacionOpciones={
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
}

class App extends Component {
  state={
    busqueda: '',
    usuarios: []
  }

  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
    this.filtrarElementos();
  }

  componentDidMount() {
    this.setState({usuarios: tablaUsuarios});
  }

  filtrarElementos=()=>{
    var search=tablaUsuarios.filter(item=>{
      if(item.id.toString().includes(this.state.busqueda) ||
      item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.apellidos.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
      item.correo.toLowerCase().includes(this.state.busqueda) ||
      item.curp.toLowerCase().includes(this.state.busqueda)
      ){
        return item;
      }
    });
    this.setState({usuarios: search});
  }

  constructor() {
    super()
    this.state={
      show:false
    }
  }
  handleModal(){
    this.setState({show:!this.state.show})
  }

render(){
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-7">
                <h1><FontAwesomeIcon icon={faUsers} /> Gestión de usuarios</h1>
              </div>
              <div className="col-md-5 align-self-end">
                <div className="container-fluid">
                  <div className="row text-right">
                    <div className="col">
                      <Button variant="success" onClick={()=>{this.handleModal()}}><FontAwesomeIcon icon={faUserPlus} /> Nuevo usuario </Button>
                      <button className="btn btn-primary m-1"><FontAwesomeIcon icon={faFileExcel} /> Importar usuarios</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-right">
              <div className="col">
                <div className="barraBusqueda">
                  <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="busqueda"
                    value={this.state.busqueda}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <DataTable 
                  columns={columnas}
                  data={this.state.usuarios}
                  title="Lista de usuarios"
                  pagination
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight="600px"
                  noDataComponent={<span>No se encontró ningún elemento</span>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={()=>this.handleModal()}>
          <Modal.Header closeButton>Nuevo usuario</Modal.Header>
          <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Usuario empresarial" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Folio principal</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nombre (s): </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Apellidos (s): </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nombre de usuario: </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Contraseña: </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>CURP: </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              {/* <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Rol</Form.Label>
                <Form.Select defaultValue="U Empresarial">
                  <option>U Empresarial</option>
                  <option>Administrador</option>
                </Form.Select>
              </Form.Group> */}
              </Row>
            
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.handleModal()}}>Cerrar</Button>
            <Button onClick={()=>{this.handleModal()}}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </div>
      </>
      
      );
    }
    }

export default App;
