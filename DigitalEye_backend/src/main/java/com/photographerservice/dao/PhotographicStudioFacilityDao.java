package com.photographerservice.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.photographerservice.entity.PhotographicStudioFacility;

@Repository
public interface PhotographicStudioFacilityDao extends JpaRepository<PhotographicStudioFacility, Integer> {
	
	List<PhotographicStudioFacility> findByStudioId(int studioId);

}
