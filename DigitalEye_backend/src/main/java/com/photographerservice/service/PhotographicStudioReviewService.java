package com.photographerservice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.photographerservice.dao.PhotographicStudioReviewDao;
import com.photographerservice.entity.PhotographicStudioReview;

@Service
public class PhotographicStudioReviewService {
	
	@Autowired
	private PhotographicStudioReviewDao studioReviewDao;
	
	public PhotographicStudioReview addStudioReview(PhotographicStudioReview review) {
		return studioReviewDao.save(review);
	}
	
	public List<PhotographicStudioReview> fetchStudioReviews(int studioId) {
		return studioReviewDao.findByStudioId(studioId);
	}

}
