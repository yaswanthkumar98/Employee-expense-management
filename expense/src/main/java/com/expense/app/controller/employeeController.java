package com.expense.app.controller;



import java.util.HashMap;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.app.model.employee;
import com.expense.app.repository.employeeRepository;
 



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class employeeController {
	
	@Autowired
	private employeeRepository employeesData;
	
	@PostMapping("/employee/new")
	public employee addEmployee(@Validated @RequestBody employee employee) {
		return employeesData.save(employee);
	}
	
	@GetMapping("/employee/all")
	public List<employee> getEmployees() {
		return employeesData.findAll();
	}
	
	@PutMapping("/employee/update/{id}")
	public HashMap<String, String> updateEmployees(@PathVariable int id,  @RequestBody employee data) {	
		 HashMap<String, String> status = new HashMap<String, String>();
		 status.put("status", "error");
		employee emp = employeesData.findById(id);
		if (emp != null) {
		emp.setDepartment(data.getDepartment());
		emp.setEmail(data.getEmail());
		emp.setEmployeeId(data.getEmployeeId());
		emp.setFirstName(data.getFirstName());
		emp.setLastName(data.getLastName());
		emp.setPassword(data.getPassword());
		emp.setJoiningDate(data.getJoiningDate());
		employeesData.save(emp);
		status.put("status", "success");
		}
		return status;
	}
	
	 @DeleteMapping("/employee/delete/{id}")
	 public HashMap<String, String> Delete(@PathVariable int id) {
		 HashMap<String, String> status = new HashMap<String, String>();
		 employee data =  employeesData.findById(id);
		 status.put("status", "error");
		 if (data != null) {
			 employeesData.delete(data);
			 status.put("status", "success");
		 } 
		 
		 return status;
	    }
	 
	 @PostMapping("/employee/login")
	 public HashMap<String, String> checkUser(@RequestBody employee data) {
		 HashMap<String, String> status = new HashMap<String, String>();	
		 employee empDetails =  employeesData.findByEmployeeId(data.getEmployeeId());
		 status.put("status", "failed");
		 if (empDetails != null) {
			if (empDetails.getPassword().equals(data.getPassword())) {
				 status.put("status", "success");	
				 status.put("id", String.valueOf(empDetails.getId()));
			}
		 }
		 return status;
		 
	 }
	 
	 @GetMapping("/employee/data/{id}")
		public employee getEmployee(@PathVariable int id) {			 
			employee emp = employeesData.findById(id);			
			return emp;
		}
}
