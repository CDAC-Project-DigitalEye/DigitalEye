package com.photographerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.photographerservice.dao.BookingDao;
import com.photographerservice.entity.Booking;

@Service
public class BookingService {

	@Autowired
	private BookingDao bookingDao;

	public Booking bookStudio(Booking booking) {
		return bookingDao.save(booking);
	}

	public List<Booking> getAllBookings() {
		return bookingDao.findAll();
	}

	public List<Booking> getMyBookings(int userId) {
		return bookingDao.findByUserId(userId);
	}

	public List<Booking> getMyStudioBookings(int studioId) {
		return bookingDao.findByStudioId(studioId);
	}

	public Booking getBookingById(int bookingId) {
		return bookingDao.findById(bookingId).get();
	}

	public List<Booking> findByStudioIdAndBookedDateAndBookedTime(int studioId, String bookedDate, String bookedTime, String status) {
		// TODO Auto-generated method stub
		return bookingDao.findByStudioIdAndBookedDateAndBookedTimeAndStatus(studioId, bookedDate, bookedTime, status);
	}

}
