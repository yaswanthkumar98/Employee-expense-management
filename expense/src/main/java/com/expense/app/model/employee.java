package com.expense.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;
import javax.persistence.Table;


@PersistenceContext
@Entity
@Table(name = "employeedetails")
public class employee {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;	
	private String firstName;	
	private String lastName;
	private String email;
	private String department;
	@Column(name="empId", length=10)
	private String employeeId;
	private String joiningDate;
	private String password;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	
	public String getJoiningDate() {
		return joiningDate;
	}
	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	
	@Override
	public String toString() {
		return "employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", department=" + department + ", employeeId=" + employeeId + ", joiningDate=" + joiningDate
				+ ", password=" + password + "]";
	}
	
	//This method is used to validate this model
	public boolean validateEmployeeDetails() {
		if (firstName.isEmpty() || lastName.isEmpty() || email.isEmpty() || department.isEmpty() || employeeId.isEmpty() || 
				joiningDate.isEmpty() || password.isEmpty()) {
			return true;
		}
		return false;
	}

}
