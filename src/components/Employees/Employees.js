import React, { Component } from 'react';
import Employee from './Employee';

class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employee: {
                Id: 0,
                Name: "",
                Gender: "Female",
                Department: ""
            }
        };
    }
    handleIdChange = (e) => {
        var employee = { ...this.state.employee }
        employee.Id = e.target.value;
        this.setState({ employee });
    }
    handleNameChange = (e) => {
        var employee = { ...this.state.employee }
        employee.Name = e.target.value;
        this.setState({ employee });
    }

    handleGenderChange = (e) => {
        var employee = { ...this.state.employee }
        employee.Gender = e.target.value;
        this.setState({ employee });
    }

    handleDepartmentChange = (e) => {
        var employee = { ...this.state.employee }
        employee.Department = e.target.value;
        this.setState({ employee });
    }

    getEmployees() {
        const url = 'http://localhost:3300/api/employee/get-all-employees';
        fetch(url).then((response) => {
            return response.json();
        })
            .then((data) => {
                this.setState({
                    employees: data.response.employees
                })
            })
            .catch((error) => console.log(error));
    }
    componentDidMount() {
        this.getEmployees();
    }
    renderItems() {
        return this.state.employees.map((item) => (
            <Employee key={item.Id} item={item} />
        ));
    }
    addEmployee = () => {
        //alert(this.state.Id+" "+this.state.Name)
        fetch('http://localhost:3300/api/employee/add-employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: parseInt(this.state.employee.Id),
                Name: this.state.employee.Name,
                Gender: this.state.employee.Gender,
                Department: this.state.employee.Department
            })
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                this.getEmployees();
                this.state.employee.Id = 0;
                this.state.employee.Name = "";
                this.state.employee.Gender = "Female";
                this.state.employee.Department = "";
            })
            .catch((error) => console.log(error));
    }
    EmployeesList = () => {
        return (
            <ul>
                {this.renderItems()}
            </ul>
        )
    }
    render() {
        return (
            <div className="container">
            <h1>Add Employee</h1>
                <form>
                    <div class="form-group">
                        <label for="Id">Id</label>
                        <input type="text" className="form-control" name="Id" placeholder="Id" value={this.state.employee.Id} onChange={this.handleIdChange} />
                    </div>
                    <div class="form-group">
                        <label for="Name">Name</label>
                        <input type="text" className="form-control" name="Name" placeholder="Name" value={this.state.employee.Name} onChange={this.handleNameChange} />
                    </div>
                    <div class="form-group">
                        <label for="Gender">Gender</label>
                        <select className="form-control" value={this.state.employee.Gender} onChange={this.handleGenderChange} >

                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="Department">Department</label>
                    <input type="text" className="form-control" name="Department" placeholder="Department" value={this.state.employee.Department} onChange={this.handleDepartmentChange} />
                    </div>
                    <button type="button" className="btn-btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </form>
                <br />
                {this.state.employees.length > 0 ? (
                    <div>
                    <h1>Employees</h1>
                    <ul>
                        {this.renderItems()}
                    </ul>
                    </div>
                ) : (
                        <p><b>No Employees...!</b></p>
                    )}
            </div>
        )
    }
}
export default Employees;