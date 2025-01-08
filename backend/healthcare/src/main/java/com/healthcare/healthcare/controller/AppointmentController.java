package com.healthcare.healthcare.controller;

import com.healthcare.healthcare.dto.request.RequestListProficienciesDto;
import com.healthcare.healthcare.dto.response.DoctorListResponseDto;
import com.healthcare.healthcare.dto.response.MeetingContractResponseDto;
import com.healthcare.healthcare.dto.response.RequestListResponseDto;
import com.healthcare.healthcare.dto.response.RequestResponseDto;
import com.healthcare.healthcare.model.*;
import com.healthcare.healthcare.service.appointment.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/requests/{doctorId}")
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
    public ResponseEntity<DoctorListResponseDto> getDoctorsByProficiencies(
            @RequestBody RequestListProficienciesDto requestListProficienciesDto) {
        try {
            return appointmentService.getDoctorsByProficiencies(requestListProficienciesDto.getProficiencies());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    DoctorListResponseDto.builder()
                            .success(false)
                            .message("Failed to fetch doctors by proficiencies: " + e.getMessage())
                            .build()
            );
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
}
