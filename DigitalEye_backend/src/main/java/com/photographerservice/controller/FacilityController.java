package com.photographerservice.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.photographerservice.dto.CommanApiResponse;
import com.photographerservice.dto.FacilityFetchResponse;
import com.photographerservice.dto.PhotographicStudioFacilityAddRequest;
import com.photographerservice.entity.Facility;
import com.photographerservice.entity.PhotographicStudio;
import com.photographerservice.entity.PhotographicStudioFacility;
import com.photographerservice.service.FacilityService;
import com.photographerservice.service.PhotographicStudioFacilityService;
import com.photographerservice.service.PhotographicStudioService;
import com.photographerservice.utility.Constants.ResponseCode;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/facility/")
@CrossOrigin(origins = "http://localhost:3000")
public class FacilityController {
	
	Logger LOG = LoggerFactory.getLogger(FacilityController.class);

	@Autowired
	private FacilityService facilityService;
	
	@Autowired
	private PhotographicStudioService studioService;

	@Autowired
	private PhotographicStudioFacilityService studioFacilityService;
	
	
	@PostMapping("add")
	@ApiOperation(value = "Api to add facility")
	public ResponseEntity<?> register(@RequestBody Facility facility) {
		LOG.info("Recieved request for Add Facility");

		CommanApiResponse response = new CommanApiResponse();

		Facility addedFacility = facilityService.addFacility(facility);

		if (addedFacility != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Facility Added Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to add Facility");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all facilities")
	public ResponseEntity<?> fetchAllFacilities() {
		LOG.info("Recieved request for Fetch Facility");

		FacilityFetchResponse facilityFetchResponse = new FacilityFetchResponse();

		Set<Facility> facilities = facilityService.fetchAllFacilities();

		try {
			facilityFetchResponse.setFacilities(facilities);
			facilityFetchResponse.setResponseCode(ResponseCode.SUCCESS.value());
			facilityFetchResponse.setResponseMessage("Facilities Fetched Successfully");
			return new ResponseEntity(facilityFetchResponse, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			facilityFetchResponse.setResponseCode(ResponseCode.FAILED.value());
			facilityFetchResponse.setResponseMessage("Failed to Fetch Facility");
			return new ResponseEntity(facilityFetchResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@GetMapping("/studio")
	@ApiOperation(value = "Api to fetch all facilities of studio by using studio Id")
	public ResponseEntity<?> fetchAllFacilitiesByStudioId(@RequestParam("studioId") int studioId) {
		LOG.info("Recieved request for Fetch Facility");

		FacilityFetchResponse facilityFetchResponse = new FacilityFetchResponse();

		List<PhotographicStudioFacility> studioFacilities = this.studioFacilityService.getStudioFacilitiesByStudioId(studioId);
		
		Set<Facility> facilities = new HashSet<>();
		
		for(PhotographicStudioFacility studioFacility: studioFacilities) {
			facilities.add(this.facilityService.getFacilityById(studioFacility.getFacilityId()));
		}

		try {
			facilityFetchResponse.setFacilities(facilities);
			facilityFetchResponse.setResponseCode(ResponseCode.SUCCESS.value());
			facilityFetchResponse.setResponseMessage("Facilities Fetched Successfully");
			
			System.out.println(facilityFetchResponse);
			
			return new ResponseEntity(facilityFetchResponse, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			facilityFetchResponse.setResponseCode(ResponseCode.FAILED.value());
			facilityFetchResponse.setResponseMessage("Failed to Fetch Facility");
			return new ResponseEntity(facilityFetchResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@PostMapping("/studio/add")
	@ApiOperation(value = "Api to add facility to Studio")
	public ResponseEntity<?> addStudioFacility(@RequestBody PhotographicStudioFacilityAddRequest addFacility) {
		LOG.info("Recieved request for Add Facility");

		CommanApiResponse response = new CommanApiResponse();

		Facility facility = facilityService.getFacilityById(addFacility.getFacilityId());
		
		if(facility == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Facility not found");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
        List<PhotographicStudioFacility> studioFacilities = this.studioFacilityService.getStudioFacilitiesByStudioId(addFacility.getStudioId());
		
		Set<Facility> facilities = new HashSet<>();
		
		for(PhotographicStudioFacility studioFacility: studioFacilities) {	
			if(studioFacility.getFacilityId() == facility.getId()) {
				response.setResponseCode(ResponseCode.FAILED.value());
				response.setResponseMessage("Facility already added");
				return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
			}
		}
		
		PhotographicStudioFacility studioFacility = new PhotographicStudioFacility();
		studioFacility.setStudioId(addFacility.getStudioId());
		studioFacility.setFacilityId(addFacility.getFacilityId());

		studioFacilities.add(studioFacility);
		
		
		PhotographicStudioFacility addedStudioFacility = studioFacilityService.addFacility(studioFacility);
		
		if (addedStudioFacility != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Facility Added Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to add Studio Facility");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
