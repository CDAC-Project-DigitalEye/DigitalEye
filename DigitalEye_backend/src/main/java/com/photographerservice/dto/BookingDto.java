package com.photographerservice.dto;

public class BookingDto {

	private int id;

	private String bookingId;

	private int userId;

	private String customerName;

	private String bookedDate;

	private String bookedTime;

	private String status;

	private int studioId;

	private String studioContact;

	private String studioEmail;

	private String studioImage;

	private String studioName;

	private String customerContact;

	private String totalAmount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getStudioId() {
		return studioId;
	}

	public void setStudioId(int studioId) {
		this.studioId = studioId;
	}

	public String getStudioContact() {
		return studioContact;
	}

	public void setStudioContact(String studioContact) {
		this.studioContact = studioContact;
	}

	public String getStudioEmail() {
		return studioEmail;
	}

	public void setStudioEmail(String studioEmail) {
		this.studioEmail = studioEmail;
	}

	public String getStudioImage() {
		return studioImage;
	}

	public void setStudioImage(String studioImage) {
		this.studioImage = studioImage;
	}

	public String getStudioName() {
		return studioName;
	}

	public void setStudioName(String studioName) {
		this.studioName = studioName;
	}

	public String getCustomerContact() {
		return customerContact;
	}

	public void setCustomerContact(String customerContact) {
		this.customerContact = customerContact;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getBookedDate() {
		return bookedDate;
	}

	public void setBookedDate(String bookedDate) {
		this.bookedDate = bookedDate;
	}

	public String getBookedTime() {
		return bookedTime;
	}

	public void setBookedTime(String bookedTime) {
		this.bookedTime = bookedTime;
	}

}
