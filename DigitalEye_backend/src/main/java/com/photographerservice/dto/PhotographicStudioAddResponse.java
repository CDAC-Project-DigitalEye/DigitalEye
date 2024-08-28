package com.photographerservice.dto;

import java.util.List;

import com.photographerservice.entity.PhotographicStudio;

public class PhotographicStudioAddResponse extends CommanApiResponse {

	List<PhotographicStudio> studios;

	public List<PhotographicStudio> getStudios() {
		return studios;
	}

	public void setStudios(List<PhotographicStudio> studios) {
		this.studios = studios;
	}
	
	
	
}
