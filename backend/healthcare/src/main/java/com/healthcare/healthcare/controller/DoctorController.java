package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.request.DoctorListRequestDto;
import com.healthcare.healthcare.model.Users;
import com.healthcare.healthcare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/doctor-detail")
    public ResponseEntity<List<Users>> getDoctorDetail(@RequestBody DoctorListRequestDto doctorIds) {
        return doctorService.getDoctorById(doctorIds.getDoctorIds());
    }

    @GetMapping("/all-doctors")
    public ResponseEntity<List<Users>> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
}
