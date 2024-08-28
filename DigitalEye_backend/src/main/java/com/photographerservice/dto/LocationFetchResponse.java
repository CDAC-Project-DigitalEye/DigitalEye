package com.photographerservice.dto;

import java.util.List;

import com.photographerservice.entity.Location;

public class LocationFetchResponse extends CommanApiResponse {
	
    private List<Location> locations;

	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}
    
    
    
    

}
