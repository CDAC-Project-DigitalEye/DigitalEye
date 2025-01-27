package com.photographerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.photographerservice.dao.LocationDao;
import com.photographerservice.entity.Location;

@Service
public class LocationService {
	
	@Autowired
	private LocationDao locationDao;
	
	public Location addLocation(@RequestBody Location location) {
		return locationDao.save(location);
	}
	
	public List<Location> fetchAllLocations() {
		return locationDao.findAll();
	}
	
	public Location getLocationById(int id) {
		return locationDao.findById(id).get();
	}

}
