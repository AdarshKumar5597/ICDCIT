package com.healthcare.healthcare.service;

import com.healthcare.healthcare.dto.DoctorDto;
import com.healthcare.healthcare.model.Users;
import com.healthcare.healthcare.repo.DoctorRepository;
import com.healthcare.healthcare.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
public class DoctorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public ResponseEntity<List<Users>> getDoctorById(List<Long> doctorIds) {
        try {
            List<Long> userIds = doctorRepository.findUserIdsByDoctorIds(doctorIds);
            System.out.println(userIds);

            List<Users> allDoctors = new ArrayList<>();
            userIds.forEach(userId -> {
                allDoctors.add(userRepository.findById(userId).get());
            });
            return new ResponseEntity<>(allDoctors, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Users>> getAllDoctors() {
        try {
            List<Long> userIds = doctorRepository.findAllUserIds();
            System.out.println(userIds);

            List<Users> allDoctors = new ArrayList<>();
            userIds.forEach(userId -> {
                Users doctor = userRepository.findById(userId).get();
                allDoctors.add(doctor);
            });
            return new ResponseEntity<>(allDoctors, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
