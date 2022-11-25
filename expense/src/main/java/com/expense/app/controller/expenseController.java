package com.expense.app.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.expense.app.model.expense;
import com.expense.app.repository.expenseRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class expenseController {
	@Autowired
	private expenseRepository expenseData;
	
	@PostMapping("/expense/new")
	public expense addEmployee(@Validated @RequestBody expense expense) {
		expense.setUploadedDate(new java.util.Date().toString());
		return expenseData.save(expense);
	}
	
	@GetMapping("/expense/employee/{id}")
	public List<expense> getEmployees(@PathVariable String id) {
		return expenseData.findByUserId(id);
	}
	
	 @DeleteMapping("/expense/delete/{id}")
	 public HashMap<String, String> Delete(@PathVariable int id) {
		 HashMap<String, String> status = new HashMap<String, String>();
		 expense data =  expenseData.findById(id);
		 status.put("status", "error");
		 if (data != null) {
			 expenseData.delete(data);
			 status.put("status", "success");
		 }		 
		 return status;
	    }
	 
	 @PutMapping("/expense/update/{id}")
		public HashMap<String, String> updateEmployees(@PathVariable int id,  @RequestBody expense expChange) {	
		 System.out.println(expChange);
			 HashMap<String, String> status = new HashMap<String, String>();
			 status.put("status", "error");
			 expense emp = expenseData.findById(id);
			if (emp != null) {
				if (expChange.getStatus().equals("Accepted") || expChange.getStatus().equals("Already claimed")) {
				emp.setApprovedDate(new java.util.Date().toString());
				status.put("date", new java.util.Date().toString());
				} 
			emp.setDepartment(expChange.getDepartment());
			emp.setExpenseAmount(expChange.getExpenseAmount());
			emp.setExpenseTitle(expChange.getExpenseTitle());
			emp.setExpenseTitle(expChange.getExpenseType());
			emp.setExpenseDate(expChange.getExpenseDate());
			emp.setProject(expChange.getProject());
			emp.setStatus(expChange.getStatus());
			status.put("status", "success");
			System.out.println(expenseData.save(emp));
			
			}
			return status;
		}
	 
	 @GetMapping("/expense/download/{id}")
		public String getfile(@PathVariable int id, HttpServletResponse response) throws IOException {
			response.setContentType("application/pdf");

			 expense emp = expenseData.findById(id);
	         response.setHeader("Content-disposition","attachment; filename=" + emp.getDocument());      

	         File my_file = new File("C:\\Users\\Arul\\Downloads\\" + emp.getDocument());

	         // This should send the file to browser
	         OutputStream out = response.getOutputStream();
	         FileInputStream in = new FileInputStream(my_file);
	         byte[] buffer = new byte[4096];
	         int length;
	         while ((length = in.read(buffer)) > 0){
	            out.write(buffer, 0, length);
	         }
	         in.close();
	         out.flush();
			return "Downloaded";
		}
	 
	 @GetMapping("/expense/employee/all")
		public List<expense> getEmployees() {
			return expenseData.findAll();
		}
		
		@GetMapping("/expense/view/{id}")
		public expense getExpense(@PathVariable int id) {
			System.out.println(id);
			return expenseData.findById(id);
		}
	 
	 
	 	

}
