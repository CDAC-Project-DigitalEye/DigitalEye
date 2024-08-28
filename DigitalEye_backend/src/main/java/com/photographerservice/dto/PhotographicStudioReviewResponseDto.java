package com.photographerservice.dto;

import java.util.List;

public class PhotographicStudioReviewResponseDto extends CommanApiResponse {
	
	private List<PhotographicStudioReviewDto> studioReviews;

	public List<PhotographicStudioReviewDto> getStudioReviews() {
		return studioReviews;
	}

	public void setStudioReviews(List<PhotographicStudioReviewDto> studioReviews) {
		this.studioReviews = studioReviews;
	}
	
	

}
