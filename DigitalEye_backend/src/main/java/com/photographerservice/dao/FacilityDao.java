package com.photographerservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.photographerservice.entity.Facility;

@Repository
public interface FacilityDao extends JpaRepository<Facility, Integer> {

}
