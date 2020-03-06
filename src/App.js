import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    employees: [],
    newEmp: false,
    editEmp: false,

    newEmpData: {
      employee_name: '',
      employee_salary: '',
      employee_age: ''

    },
    editEmpData: {
      id: '',
      employee_name: '',
      employee_salary: '',
      employee_age: ''
    }
  }

  componentWillMount() {
    this.refreshList();
  }
  toggleNewEmpModal() {
    this.setState({
      newEmp: !this.state.newEmp
    })
  }
  toggleEditEmpModal() {
    this.setState({
      editEmp: !this.state.editEmp
    })
  }
  addFormData() {
    axios.post('http://dummy.restapiexample.com/api/v1/create', this.state.newEmpData).then((res) => {

      let { employees } = this.state;
      let tempObj = {
        employee_name: res.data.data.name,
        employee_salary: res.data.data.salary,
        employee_age: res.data.data.age,
        id: res.data.data.id
      }
      employees.push(tempObj);
      this.setState({
        employees, newEmp: false, newEmpData: {
          employee_name: '',
          employee_salary: '',
          employee_age: ''
        }
      });
    })
  }
  editEmp(id, employee_name, employee_salary, employee_age) {
    this.setState({
      editEmpData: { id, employee_name, employee_salary, employee_age },editEmp: !this.state.editEmp
    });
  }


  updateFormData(){
    let {employee_name, employee_salary, employee_age} = this.state.editEmpData;
    axios.put('http://dummy.restapiexample.com/api/v1/update/' + this.state.editEmpData.id,{
      employee_name, 
      employee_salary, 
      employee_age
    }).then((res)=>{
          if(res.data.status = "success"){
            this.refreshList();
          }
    })
    this.setState({
      editEmp:false, editEmpData : {
        employee_name: '',
        employee_salary: '',
        employee_age: ''
      }
    })
  }

  refreshList(){
    axios.get("http://dummy.restapiexample.com/api/v1/employees").then((res) => {
      this.setState({
        employees: res.data.data
      })
    })
  }
  deleteEmp(id){  
    axios.delete("http://dummy.restapiexample.com/api/v1/delete/" + id).
    then((res)=>{
      if(res){
        this.refreshList();
      }
    })
  }

  render() {
    let employee = this.state.employees.map((emp) => {
      return (
        <tr key={emp.id}>
          <td>{emp.id}</td>
          <td>{emp.employee_name}</td>
          <td>{emp.employee_salary}</td>
          <td>{emp.employee_age}</td>
          <td>
            <Button color="success" size='sm' className='mr-2' 
            onClick={this.editEmp.bind(this, emp.id, emp.employee_name, emp.employee_salary, emp.employee_age)}>Edit</Button>
            <Button color="danger" size='sm' onClick={this.deleteEmp.bind(this,emp.id)} >Delete</Button>
          </td>

        </tr>
      )

    });

    return (
      <div className="App container">
        <h3> Employess</h3>

        <Button className='my-3' color="primary" onClick={this.toggleNewEmpModal.bind(this)}>Add Employee</Button>
        <Modal isOpen={this.state.newEmp} toggle={this.toggleNewEmpModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewEmpModal.bind(this)}>Add new employee</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="empname">Name</Label>
              <Input id="empname" value={this.state.newEmp.employee_name} onChange={(e) => {
                let { newEmpData } = this.state;
                newEmpData.name = e.target.value;
                this.setState({
                  newEmpData
                })

              }} placeholder="Name" />
            </FormGroup>

            <FormGroup>
              <Label for="salary">Salary</Label>
              <Input id="salary" placeholder="Salary" value={this.state.newEmp.employee_salary} onChange={(e) => {
                let { newEmpData } = this.state;
                newEmpData.salary = e.target.value;
                this.setState({
                  newEmpData
                })

              }} />
            </FormGroup>


            <FormGroup>
              <Label for="age">Age</Label>
              <Input id="age" placeholder="Age" value={this.state.newEmp.employee_age} onChange={(e) => {
                let { newEmpData } = this.state;
                newEmpData.age = e.target.value;
                this.setState({
                  newEmpData
                })

              }} />
            </FormGroup>



          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addFormData.bind(this)}>Add Employee</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewEmpModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.editEmp} toggle={this.toggleEditEmpModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditEmpModal.bind(this)}>Edit employee</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="empname">Name</Label>
              <Input id="empname" value={this.state.editEmpData.employee_name} onChange={(e) => {
                let { editEmpData } = this.state;
                editEmpData.employee_name = e.target.value;
                this.setState({
                  editEmpData
                })

              }} placeholder="Name" />
            </FormGroup>

            <FormGroup>
              <Label for="salary">Salary</Label>
              <Input id="salary" placeholder="Salary" value={this.state.editEmpData.employee_salary} onChange={(e) => {
                let { editEmpData } = this.state;
                editEmpData.employee_salary = e.target.value;
                this.setState({
                  editEmpData
                })

              }} />
            </FormGroup>


            <FormGroup>
              <Label for="age">Age</Label>
              <Input id="age" placeholder="Age" value={this.state.editEmpData.employee_age} onChange={(e) => {
                let { editEmpData } = this.state;
                editEmpData.employee_age = e.target.value;
                this.setState({
                  editEmpData
                })

              }} />
            </FormGroup>



          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateFormData.bind(this)}>Update Employee</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditEmpModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
       <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee}
          </tbody>
        </Table>
      </div>

    )
  }
}
export default App;
