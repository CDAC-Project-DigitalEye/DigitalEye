package com.photographerservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.photographerservice.entity.PhotographicStudioReview;

@Repository
public interface PhotographicStudioReviewDao extends JpaRepository<PhotographicStudioReview, Integer> {

	List<PhotographicStudioReview> findByStudioId(int studioId);
	
}
