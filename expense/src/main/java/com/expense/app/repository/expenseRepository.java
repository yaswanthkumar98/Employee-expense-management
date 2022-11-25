package com.expense.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expense.app.model.expense;

 @Repository
public interface expenseRepository extends JpaRepository<expense, Long> {
	 List<expense> findByUserId(String eId);
	 expense findById(int Id);
}
