package com.photographerservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photographerservice.entity.Booking;

@Repository
public interface BookingDao extends JpaRepository<Booking, Integer> {

	List<Booking> findByUserId(int userId);

	List<Booking> findByStudioId(int studioId);

	List<Booking> findByStudioIdAndBookedDateAndBookedTimeAndStatus(int studioId, String bookedDate, String bookedTime, String status);

}
