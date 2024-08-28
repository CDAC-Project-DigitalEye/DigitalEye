package com.photographerservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.photographerservice.dto.CommanApiResponse;
import com.photographerservice.dto.PhotographicStudioReviewDto;
import com.photographerservice.dto.PhotographicStudioReviewResponseDto;
import com.photographerservice.entity.PhotographicStudioReview;
import com.photographerservice.entity.User;
import com.photographerservice.service.PhotographicStudioReviewService;
import com.photographerservice.service.PhotographicStudioService;
import com.photographerservice.service.UserService;
import com.photographerservice.utility.Constants.ResponseCode;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/studio/review")
@CrossOrigin(origins = "http://localhost:3000")
public class PhotographicStudioReviewController {
	
	Logger LOG = LoggerFactory.getLogger(PhotographicStudioController.class);

	@Autowired
	private PhotographicStudioService studioService;

	@Autowired
	private PhotographicStudioReviewService studioReviewService;
	
    @Autowired
    private UserService userService;
	
	@PostMapping("add")
	@ApiOperation(value = "Api to add studio REVIEW")
	public ResponseEntity<?> register(@RequestBody PhotographicStudioReview review) {
		LOG.info("Recieved request for Add Studio Review");

		CommanApiResponse response = new CommanApiResponse();

		if (review == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to add review");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}
		
		PhotographicStudioReview studioReview = studioReviewService.addStudioReview(review);
		
		if (studioReview != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Review Added Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to add Studio");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all reviews of studio")
	public ResponseEntity<?> fetchStudioReview(@RequestParam("studioId") int studioId) {
		LOG.info("Recieved request for Fetch Studio Reviews for Studio Id : "+studioId);

		PhotographicStudioReviewResponseDto response = new PhotographicStudioReviewResponseDto();

		List<PhotographicStudioReview> reviews = studioReviewService.fetchStudioReviews(studioId);
		
		List<PhotographicStudioReviewDto> reviewDto = new ArrayList<>();
		
		for(PhotographicStudioReview review : reviews) {
			
			User user = userService.getUserById(review.getUserId());
			
			reviewDto.add(new PhotographicStudioReviewDto(user.getFirstName(), review.getStar(), review.getReview()));
			
		}
		
		
		try {
			response.setStudioReviews(reviewDto);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Reviews Fetched Successfully");
			return new ResponseEntity(response, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch Studio Reviews");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
}
