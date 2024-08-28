package com.photographerservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photographerservice.entity.PgTransaction;
import com.photographerservice.entity.User;

@Repository
public interface PgTransactionDao extends JpaRepository<PgTransaction, Integer> {

	List<PgTransaction> findByUserOrderByIdDesc(User user);

	List<PgTransaction> findByOrderIdOrderByIdDesc(String orderId);
	
	PgTransaction findByTypeAndOrderId(String type, String orderId);

}
