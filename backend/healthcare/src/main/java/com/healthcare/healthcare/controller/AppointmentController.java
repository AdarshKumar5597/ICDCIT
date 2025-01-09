package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.request.RequestListProficienciesDto;
import com.healthcare.healthcare.dto.response.DoctorResponseDto;
import com.healthcare.healthcare.dto.response.MeetingContractResponseDto;
import com.healthcare.healthcare.dto.response.RequestListResponseDto;
import com.healthcare.healthcare.dto.response.RequestResponseDto;
import com.healthcare.healthcare.model.*;
import com.healthcare.healthcare.service.appointment.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/appointments/")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create-request")
    public ResponseEntity<RequestResponseDto> createRequest(@RequestBody Request request) {
        try {
            return appointmentService.createRequest(request);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestResponseDto.builder()
                            .success(false)
                            .message("Failed to create request: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/create-meeting-contract")
    public ResponseEntity<MeetingContractResponseDto> createMeetingContract(@RequestBody MeetingContracts contract) {
        try {
            return appointmentService.createMeetingContract(contract);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to create meeting contract: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/doctor/requests/{doctorId}")
    public ResponseEntity<RequestListResponseDto> getRequestsByDoctorId(@PathVariable Long doctorId) {
        try {
            return appointmentService.getRequestsByDoctorId(doctorId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestListResponseDto.builder()
                            .success(false)
                            .message("Failed to fetch requests for doctor ID " + doctorId + ": " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/doctors-by-proficiencies")
    public ResponseEntity<List<DoctorResponseDto>> getDoctorsByProficiencies(
            @RequestBody RequestListProficienciesDto requestListProficienciesDto) {
        try {
            return appointmentService.getDoctorsByProficiencies(requestListProficienciesDto.getProficiencies());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }
    }

    @PostMapping("/accept-request/{requestId}")
    public ResponseEntity<MeetingContractResponseDto> acceptRequestAndCreateContract(
            @PathVariable Long requestId, @RequestBody MeetingContracts contract) {
        try {
            return appointmentService.acceptRequestAndCreateContract(requestId, contract);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to accept request and create meeting contract: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/update-request-patient/{requestId}")
    public ResponseEntity<MeetingContractResponseDto> updateMeetingContractCompletedByPatient(
            @PathVariable Long requestId) {
        try {
            return appointmentService.markMeetingAsCompletedByPatient(requestId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to mark meeting as completed by patient: " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/update-request-doctor/{requestId}")
    public ResponseEntity<MeetingContractResponseDto> updateMeetingContractCompletedByDoctor(
            @PathVariable Long requestId) {
        try {
            return appointmentService.markMeetingAsCompletedByDoctor(requestId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to mark meeting as completed by doctor: " + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("/user/requests/{patientId}")
    public ResponseEntity<RequestListResponseDto> getRequestsByPatientId(@PathVariable Long patientId) {
        try {
            return appointmentService.getRequestsByPatientId(patientId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestListResponseDto.builder()
                            .success(false)
                            .message("Failed to fetch requests for patient ID " + patientId + ": " + e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping("/reject-request/{requestId}")
    public ResponseEntity<RequestResponseDto> rejectRequest(@PathVariable Long requestId) {
        try {
            return appointmentService.rejectRequest(requestId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestResponseDto.builder()
                            .success(false)
                            .message("Failed to reject request: " + e.getMessage())
                            .build()
            );
        }
    }
}
