package com.photographerservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.photographerservice.entity.PhotographicStudio;
import com.photographerservice.entity.Location;

@Repository
public interface PhotographicStudioDao extends JpaRepository<PhotographicStudio, Integer> {
	
	List<PhotographicStudio> findByLocation(Location locationId);
	
}
