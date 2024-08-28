package com.photographerservice.dto;

import com.photographerservice.entity.PhotographicStudio;

public class PhotographicStudioResponseDto extends CommanApiResponse {
	
	private PhotographicStudio hotel;

	public PhotographicStudio getStudio() {
		return hotel;
	}

	public void setStudio(PhotographicStudio hotel) {
		this.hotel = hotel;
	}
	
	

}
