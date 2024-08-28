package com.photographerservice.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

import com.photographerservice.dto.BookingDetailDto;
import com.photographerservice.dto.BookingDto;
import com.photographerservice.dto.CommanApiResponse;
import com.photographerservice.dto.UpdateBookingStatusRequestDto;
import com.photographerservice.entity.Booking;
import com.photographerservice.entity.PhotographicStudio;
import com.photographerservice.entity.User;
import com.photographerservice.exception.BookingNotFoundException;
import com.photographerservice.service.BookingService;
import com.photographerservice.service.PhotographicStudioService;
import com.photographerservice.service.UserService;
import com.photographerservice.utility.Constants.BookingStatus;
import com.photographerservice.utility.Constants.ResponseCode;
import com.photographerservice.utility.Helper;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/book/studio")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

	Logger LOG = LoggerFactory.getLogger(BookingController.class);

	@Autowired
	private BookingService bookingService;

	@Autowired
	private PhotographicStudioService studioService;

	@Autowired
	private UserService userService;

	@PostMapping("/")
	@ApiOperation(value = "Api to book studio")
	public ResponseEntity<?> register(Booking booking) {
		LOG.info("Recieved request for booking studio");

		System.out.println(booking);

		CommanApiResponse response = new CommanApiResponse();

		if (booking == null) {

			throw new BookingNotFoundException();
		}

		if (booking.getUserId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("User is not not looged in");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getStudioId() == 0) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Studio not found to Book");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		PhotographicStudio studio = studioService.fetchStudio(booking.getStudioId());

		if (studio == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("No Studio present with this Id");
		}

		booking.setStatus(BookingStatus.PENDING.value());

		booking.setBookingId(Helper.getAlphaNumericId());

		Booking bookedStudio = this.bookingService.bookStudio(booking);

		if (bookedStudio != null) {
			response.setResponseCode(ResponseCode.SUCCESS.value());
			response.setResponseMessage("Studio Booking Successfully, Please Check Approval Status on Booking Option");
			return new ResponseEntity(response, HttpStatus.OK);
		}

		else {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Failed to Book Studio");
			return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/fetch/all")
	@ApiOperation(value = "Api to fetch all booked studio for Admin")
	public ResponseEntity<?> fetchAllStudioBooking() {
		LOG.info("Recieved request for fetch all booking");

		BookingDetailDto response = new BookingDetailDto();

		List<BookingDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getAllBookings();

		for (Booking booking : allBookings) {

			BookingDto dto = new BookingDto();

			dto.setBookingId(booking.getBookingId());
			dto.setBookedDate(booking.getBookedDate());
			dto.setBookedTime(booking.getBookedTime());

			User customer = this.userService.getUserById(booking.getUserId());
			dto.setCustomerName(customer.getFirstName() + " " + customer.getLastName());

			PhotographicStudio studio = this.studioService.fetchStudio(booking.getStudioId());
			User studioUser = this.userService.getUserById(studio.getUserId());
			dto.setStudioEmail(studioUser.getEmailId());
			dto.setStudioContact(studioUser.getContact());
			dto.setStudioId(studio.getId());
			dto.setStatus(booking.getStatus());
			dto.setUserId(customer.getId());
			dto.setStudioName(studio.getName());
			dto.setStudioImage(studio.getImage1());
			dto.setCustomerContact(customer.getContact());
			dto.setTotalAmount(String.valueOf(studio.getPricePerDay()));
			dto.setId(booking.getId());

			bookings.add(dto);
		}

		response.setBookings(bookings);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("Booking Fetched Successfully");
		return new ResponseEntity(response, HttpStatus.OK);

	}

	@GetMapping("/fetch")
	@ApiOperation(value = "Api to fetch customer booked studio")
	public ResponseEntity<?> fetchMyBooking(@RequestParam("userId") int userId) {
		LOG.info("Recieved request for fetch all booking");

		BookingDetailDto response = new BookingDetailDto();

		List<BookingDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getMyBookings(userId);

		for (Booking booking : allBookings) {

			BookingDto dto = new BookingDto();

			dto.setBookingId(booking.getBookingId());
			dto.setBookedDate(booking.getBookedDate());
			dto.setBookedTime(booking.getBookedTime());

			User customer = this.userService.getUserById(booking.getUserId());
			dto.setCustomerName(customer.getFirstName() + " " + customer.getLastName());

			PhotographicStudio studio = this.studioService.fetchStudio(booking.getStudioId());
			User studioUser = this.userService.getUserById(studio.getUserId());
			dto.setStudioEmail(studioUser.getEmailId());
			dto.setStudioContact(studioUser.getContact());
			dto.setStudioId(studio.getId());
			dto.setStatus(booking.getStatus());
			dto.setUserId(customer.getId());
			dto.setStudioName(studio.getName());
			dto.setStudioImage(studio.getImage1());
			dto.setCustomerContact(customer.getContact());
			dto.setTotalAmount(String.valueOf(studio.getPricePerDay()));
			dto.setId(booking.getId());

			bookings.add(dto);
		}

		response.setBookings(bookings);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("Booking Fetched Successfully");
		return new ResponseEntity(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/id")
	@ApiOperation(value = "Api to fetch booking by booking Id")
	public ResponseEntity<?> fetchBookingById(@RequestParam("bookingId") int bookingId) {
		LOG.info("Recieved request for fetch booking by Id");

		Booking booking = this.bookingService.getBookingById(bookingId);

		if (booking == null) {
			throw new BookingNotFoundException();
		}

		BookingDto dto = new BookingDto();

		dto.setBookingId(booking.getBookingId());
		dto.setBookedDate(booking.getBookedDate());
		dto.setBookedTime(booking.getBookedTime());

		User customer = this.userService.getUserById(booking.getUserId());
		dto.setCustomerName(customer.getFirstName() + " " + customer.getLastName());

		PhotographicStudio studio = this.studioService.fetchStudio(booking.getStudioId());
		User studioUser = this.userService.getUserById(studio.getUserId());
		dto.setStudioEmail(studioUser.getEmailId());
		dto.setStudioContact(studioUser.getContact());
		dto.setStudioId(studio.getId());
		dto.setStatus(booking.getStatus());
		dto.setUserId(customer.getId());
		dto.setStudioName(studio.getName());
		dto.setStudioImage(studio.getImage1());
		dto.setCustomerContact(customer.getContact());
		dto.setTotalAmount(String.valueOf(studio.getPricePerDay()));
		dto.setId(booking.getId());

		return new ResponseEntity(dto, HttpStatus.OK);

	}

	@GetMapping("/fetch/bookings")
	@ApiOperation(value = "Api to fetch all studio booking for Studio Manager")
	public ResponseEntity<?> fetchMyStudioBooking(@RequestParam("studioId") int studioId) {
		LOG.info("Recieved request for fetch all booking");

		BookingDetailDto response = new BookingDetailDto();

		List<BookingDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getMyStudioBookings(studioId);

		for (Booking booking : allBookings) {

			BookingDto dto = new BookingDto();

			dto.setBookingId(booking.getBookingId());
			dto.setBookedDate(booking.getBookedDate());
			dto.setBookedTime(booking.getBookedTime());

			User customer = this.userService.getUserById(booking.getUserId());
			dto.setCustomerName(customer.getFirstName() + " " + customer.getLastName());

			PhotographicStudio studio = this.studioService.fetchStudio(booking.getStudioId());
			User studioUser = this.userService.getUserById(studio.getUserId());
			dto.setStudioEmail(studioUser.getEmailId());
			dto.setStudioContact(studioUser.getContact());
			dto.setStudioId(studio.getId());
			dto.setStatus(booking.getStatus());
			dto.setUserId(customer.getId());
			dto.setStudioName(studio.getName());
			dto.setStudioImage(studio.getImage1());
			dto.setCustomerContact(customer.getContact());
			dto.setTotalAmount(String.valueOf(studio.getPricePerDay()));
			dto.setId(booking.getId());

			bookings.add(dto);
		}

		response.setBookings(bookings);
		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("Booking Fetched Successfully");
		return new ResponseEntity(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/status")
	@ApiOperation(value = "Api to fetch all booking status")
	public ResponseEntity<?> fetchAllBookingStatus() {
		LOG.info("Recieved request for fetch all booking status");

		List<String> response = new ArrayList<>();

		for (BookingStatus status : BookingStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	@PostMapping("/update/status")
	@ApiOperation(value = "Api to update the booking status")
	public ResponseEntity<?> updateStudioBookingStatus(@RequestBody UpdateBookingStatusRequestDto request) {

		LOG.info("Recieved request for updating the Studio Booking Status");

		CommanApiResponse response = new CommanApiResponse();

		Booking b = this.bookingService.getBookingById(request.getBookingId());

		if (b == null) {
			throw new BookingNotFoundException();
		}

		if (request.getStatus().equals("") || request.getStatus() == null) {
			response.setResponseCode(ResponseCode.FAILED.value());
			response.setResponseMessage("Booking Status can not be empty");
			return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
		}

		PhotographicStudio studio = this.studioService.fetchStudio(b.getStudioId());

		if (request.getStatus().equals(BookingStatus.APPROVED.value())) {
			// debit customer wallet

			List<Booking> bookings = this.bookingService.findByStudioIdAndBookedDateAndBookedTime(b.getStudioId(),
					b.getBookedDate(), b.getBookedTime(), BookingStatus.APPROVED.value());

			if (!CollectionUtils.isEmpty(bookings)) {

				b.setStatus(BookingStatus.CANCEL.value());
				this.bookingService.bookStudio(b);

				response.setResponseCode(ResponseCode.FAILED.value());
				response.setResponseMessage("Can't Approve the Booking, Slot Unavailable!!!");
				return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
			}

			User customer = userService.getUserById(b.getUserId());
			BigDecimal customerWallet = customer.getWalletAmount();

			if (customerWallet.compareTo(new BigDecimal(studio.getPricePerDay())) < 0) {
				response.setResponseCode(ResponseCode.FAILED.value());
				response.setResponseMessage("Insufficent Funds in Customer Wallet");
				return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
			}

			User photoAdmin = userService.getUserById(studio.getUserId());
			BigDecimal adminWallet = photoAdmin.getWalletAmount();

			customer.setWalletAmount(customerWallet.subtract(new BigDecimal(studio.getPricePerDay())));
			photoAdmin.setWalletAmount(adminWallet.add(new BigDecimal(studio.getPricePerDay())));

			userService.updateUser(photoAdmin);
			userService.updateUser(customer);

		}

		b.setStatus(request.getStatus());
		this.bookingService.bookStudio(b);

		response.setResponseCode(ResponseCode.SUCCESS.value());
		response.setResponseMessage("Booking Status Updated");
		return new ResponseEntity(response, HttpStatus.OK);

	}

}
