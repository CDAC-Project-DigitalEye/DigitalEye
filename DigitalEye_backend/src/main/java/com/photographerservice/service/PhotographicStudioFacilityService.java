package com.photographerservice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.photographerservice.dao.PhotographicStudioFacilityDao;
import com.photographerservice.entity.PhotographicStudioFacility;

@Service
public class PhotographicStudioFacilityService {
	
	@Autowired
	private PhotographicStudioFacilityDao studioFacilityDao;
	
	public List<PhotographicStudioFacility> getStudioFacilitiesByStudioId(int studioId) {
		return this.studioFacilityDao.findByStudioId(studioId);
	}
	
	public PhotographicStudioFacility addFacility(PhotographicStudioFacility studioFacility) {
	    return this.studioFacilityDao.save(studioFacility);
	}

}
