package com.photographerservice.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.photographerservice.dto.CommanApiResponse;
import com.photographerservice.dto.PhotographicStudioAddRequest;
import com.photographerservice.dto.PhotographicStudioAddResponse;
import com.photographerservice.dto.PhotographicStudioResponseDto;
import com.photographerservice.entity.PhotographicStudio;
import com.photographerservice.entity.Location;
import com.photographerservice.entity.User;
import com.photographerservice.exception.PhotographicStudioNotFoundException;
import com.photographerservice.service.PhotographicStudioService;
import com.photographerservice.service.LocationService;
import com.photographerservice.service.UserService;
import com.photographerservice.utility.Constants.ResponseCode;
import com.photographerservice.utility.StorageService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/studio/")
@CrossOrigin(origins = "http://localhost:3000")
public class PhotographicStudioController {

	Logger LOG = LoggerFactory.getLogger(PhotographicStudioController.class);

	@Autowired
	private PhotographicStudioService studioService;

	@Autowired
	private LocationService locationService;

	@Autowired
	private StorageService storageService;

	@Autowired
	private UserService userService;

	@PostMapping("add")
	@ApiOperation(value = "Api to add studio")
	public ResponseEntity<?> register(PhotographicStudioAddRequest studioAddRequest) {
		LOG.info("Recieved request for Add Studio");

		CommanApiResponse response = new CommanApiResponse();

		if (studioAddRequest == null) {
			throw new PhotographicStudioNotFoundException();
		}

		if (studioAddRequest.getLocationId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Studio Location is not selected");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		if (studioAddRequest.getUserId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Studio Admin is not selected");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		PhotographicStudio studio = PhotographicStudioAddRequest.toEntity(studioAddRequest);
		Location location = locationService.getLocationById(studioAddRequest.getLocationId());
		studio.setLocation(location);

		String image1 = storageService.store(studioAddRequest.getImage1());
		String image2 = storageService.store(studioAddRequest.getImage2());
		String image3 = storageService.store(studioAddRequest.getImage3());
		studio.setImage1(image1);
		studio.setImage2(image2);
		studio.setImage3(image3);
		PhotographicStudio addedStudio = studioService.addStudio(studio);

		if (addedStudio != null) {

			User studioAdmin = userService.getUserById(studioAddRequest.getUserId());
			studioAdmin.setStudioId(addedStudio.getId());
			this.userService.updateUser(studioAdmin);

			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Added Successfully");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to add Studio");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("id")
	@ApiOperation(value = "Api to fetch studio by using Studio Id")
	public ResponseEntity<?> fetchStudio(@RequestParam("studioId") int studioId) {
		LOG.info("Recieved request for Fetch Studio using studio Id");

		PhotographicStudioResponseDto response = new PhotographicStudioResponseDto();

		PhotographicStudio studio = studioService.fetchStudio(studioId);

		if (studio == null) {
			throw new PhotographicStudioNotFoundException();
		}

		try {
			response.setStudio(studio);
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Fetched Successfully");
			return new ResponseEntity(response, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Fetch Studio");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all studios")
	public ResponseEntity<?> fetchAllStudios() {
		LOG.info("Recieved request for Fetch Studios");

		PhotographicStudioAddResponse studioAddResponse = new PhotographicStudioAddResponse();

		List<PhotographicStudio> studios = studioService.fetchAllStudios();
		try {
			studioAddResponse.setStudios(studios);
			studioAddResponse.setResponseCode(ResponseCode.SUCCESS.value());
			studioAddResponse.setResponseMessage("Studios Fetched Successfully");
			return new ResponseEntity(studioAddResponse, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			studioAddResponse.setResponseCode(ResponseCode.FAILED.value());
			studioAddResponse.setResponseMessage("Failed to Fetch Studios");
			return new ResponseEntity(studioAddResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("location")
	@ApiOperation(value = "Api to fetch all studios by using location Id")
	public ResponseEntity<?> getProductsByCategories(@RequestParam("locationId") int locationId) {

		System.out.println("request came for getting all studios by locations");

		PhotographicStudioAddResponse studioAddResponse = new PhotographicStudioAddResponse();

		List<PhotographicStudio> studios = new ArrayList<PhotographicStudio>();

		Location location = locationService.getLocationById(locationId);

		studios = this.studioService.fetchStudiosByLocation(location);

		try {
			studioAddResponse.setStudios(studios);
			studioAddResponse.setResponseCode(ResponseCode.SUCCESS.value());
			studioAddResponse.setResponseMessage("Studios Fetched Successfully");
			return new ResponseEntity(studioAddResponse, HttpStatus.OK);

		} catch (Exception e) {
			LOG.error("Exception Caught");
			studioAddResponse.setResponseCode(ResponseCode.FAILED.value());
			studioAddResponse.setResponseMessage("Failed to Fetch Studios");
			return new ResponseEntity(studioAddResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(value = "/{studioImageName}", produces = "image/*")
	@ApiOperation(value = "Api to fetch studio image by using image name")
	public void fetchProductImage(@PathVariable("studioImageName") String studioImageName, HttpServletResponse resp) {
		System.out.println("request came for fetching product pic");
		System.out.println("Loading file: " + studioImageName);
		Resource resource = storageService.load(studioImageName);
		if (resource != null) {
			try (InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		System.out.println("response sent!");
	}

}
