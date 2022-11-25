package com.expense.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.expense.app.model.employee;


@Repository
public interface employeeRepository extends JpaRepository<employee, Long> {
	employee findById(int Id);
	employee findByEmployeeId(String eId);
}
