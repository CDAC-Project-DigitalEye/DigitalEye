package com.photographerservice.dto;

import com.photographerservice.pg.RazorPayPaymentRequest;

public class UserWalletUpdateResponse extends CommanApiResponse {

	private RazorPayPaymentRequest razorPayRequest;

	public RazorPayPaymentRequest getRazorPayRequest() {
		return razorPayRequest;
	}

	public void setRazorPayRequest(RazorPayPaymentRequest razorPayRequest) {
		this.razorPayRequest = razorPayRequest;
	}

}
