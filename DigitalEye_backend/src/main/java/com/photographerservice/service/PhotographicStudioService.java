package com.photographerservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.photographerservice.dao.PhotographicStudioDao;
import com.photographerservice.entity.PhotographicStudio;
import com.photographerservice.entity.Location;

@Service
public class PhotographicStudioService {

	@Autowired
	private PhotographicStudioDao studioDao;

	public PhotographicStudio addStudio(PhotographicStudio studio) {
		return studioDao.save(studio);
	}
	
	public List<PhotographicStudio> fetchAllStudios() {
		return studioDao.findAll();
	}
	
	public List<PhotographicStudio> fetchStudiosByLocation(Location locationId) {
		return studioDao.findByLocation(locationId);
	}
	
	public PhotographicStudio fetchStudio(int studioId) {
		return studioDao.findById(studioId).get();
	}

}
