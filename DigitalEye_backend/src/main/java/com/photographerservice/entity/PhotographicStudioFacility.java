package com.photographerservice.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PhotographicStudioFacility {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int studioId;

	private int facilityId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStudioId() {
		return studioId;
	}

	public void setStudioId(int studioId) {
		this.studioId = studioId;
	}

	public int getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(int facilityId) {
		this.facilityId = facilityId;
	}

	@Override
	public String toString() {
		return "PhotographicStudioFacility [id=" + id + ", studioId=" + studioId + ", facilityId=" + facilityId + "]";
	}
	

}
