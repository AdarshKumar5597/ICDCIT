package com.healthcare.healthcare.service.appointment;

import com.healthcare.healthcare.dto.response.DoctorResponseDto;
import com.healthcare.healthcare.dto.response.MeetingContractResponseDto;
import com.healthcare.healthcare.dto.response.RequestListResponseDto;
import com.healthcare.healthcare.dto.response.RequestResponseDto;
import com.healthcare.healthcare.eum.RequestStatus;
import com.healthcare.healthcare.eum.Status;
import com.healthcare.healthcare.model.*;
import com.healthcare.healthcare.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private DoctorProficiencyRepo doctorProficiencyRepo;

    @Autowired
    private ProficiencyRepo proficiencyRepo;

    @Autowired
    private RequestRepo requestRepo;

    @Autowired
    private MeetingContractRepo meetingContractRepo;

    @Autowired
    private UserRepository userRepository;

    // Create a request
    public ResponseEntity<RequestResponseDto> createRequest(Request request) {
        try {
            request.setStatus(RequestStatus.PENDING);
            request.setCreatedAt(new Date());
            Request savedRequest = requestRepo.save(request);
            return ResponseEntity.ok(
                    RequestResponseDto.builder()
                            .success(true)
                            .message("Request created successfully")
                            .request(savedRequest)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestResponseDto.builder()
                            .success(false)
                            .message("Failed to create request: " + e.getMessage())
                            .build()
            );
        }
    }

    // Create a meeting contract
    public ResponseEntity<MeetingContractResponseDto> createMeetingContract(MeetingContracts contract) {
        try {
            Optional<Request> requestOpt = requestRepo.findById(contract.getRequestId());
            if (requestOpt.isPresent()) {
                Request request = requestOpt.get();
                request.setStatus(RequestStatus.ACCEPTED);
                requestRepo.save(request);
            }
            contract.setStatus(Status.PENDING);
            contract.setCreatedAt(new Date());
            contract.setCompletedByDoctor(false);
            contract.setCompletedByPatient(false);
            MeetingContracts savedContract = meetingContractRepo.save(contract);
            return ResponseEntity.ok(
                    MeetingContractResponseDto.builder()
                            .success(true)
                            .message("Meeting contract created successfully")
                            .contract(savedContract)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to create meeting contract: " + e.getMessage())
                            .build()
            );
        }
    }

    // Fetch all requests based on doctor ID
    public ResponseEntity<RequestListResponseDto> getRequestsByDoctorId(Long doctorId) {
        try {
            List<Request> requests = requestRepo.findByDoctorID(doctorId);
            return ResponseEntity.ok(
                    RequestListResponseDto.builder()
                            .success(true)
                            .message("Requests fetched successfully")
                            .requests(requests)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestListResponseDto.builder()
                            .success(false)
                            .message("Failed to fetch requests: " + e.getMessage())
                            .build()
            );
        }
    }

    public ResponseEntity<RequestListResponseDto> getRequestsByPatientId(Long patientId) {
        try {
            List<Request> requests = requestRepo.findByPatientID(patientId);
            return ResponseEntity.ok(
                    RequestListResponseDto.builder()
                            .success(true)
                            .message("Requests fetched successfully")
                            .requests(requests)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    RequestListResponseDto.builder()
                            .success(false)
                            .message("Failed to fetch requests: " + e.getMessage())
                            .build()
            );
        }
    }

    // Fetch all doctor details based on a proficiency or list of proficiencies
    public ResponseEntity<List<DoctorResponseDto>> getDoctorsByProficiencies(List<String> proficiencies) {
        try {
            List<Long> proficiencyIds = proficiencyRepo.findByProficiencyNameIn(proficiencies)
                    .stream().map(Proficiency::getProficiencyId).collect(Collectors.toList());
            List<Long> doctorIds = doctorProficiencyRepo.findDoctorIdsByProficiencyIds(proficiencyIds);
            List<Doctor> doctors = doctorRepo.findByProficiencyIds(doctorIds);
            List<DoctorResponseDto> doctorResponseDtoList = new ArrayList<>();
            doctors.forEach(doctor -> {
                Users user = userRepository.findById(doctor.getUserId()).get();
                doctorResponseDtoList.add(DoctorResponseDto.builder()
                                .userId(user.getUserId())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .password(user.getPassword())
                                .role(user.getRole().name())
                                .profileImage(user.getProfileImage())
                                .bio(user.getBio())
                                .createdAt(user.getCreatedAt())
                                .rating(user.getRating())
                                .reviewCount(user.getReviewCount())
                                .doctorId(doctor.getDoctorId())
                        .build());
            });
            return ResponseEntity.ok(
                    doctorResponseDtoList
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ArrayList<>());
        }
    }

    // Accept a request and create a meeting contract
    @Transactional
    public ResponseEntity<MeetingContractResponseDto> acceptRequestAndCreateContract(Long requestId, MeetingContracts contract) {
        try {
            Optional<Request> requestOpt = requestRepo.findById(requestId);
            if (requestOpt.isPresent()) {
                Request request = requestOpt.get();
                request.setStatus(RequestStatus.ACCEPTED);
                requestRepo.save(request);

                contract.setRequestId(requestId);
                contract.setCreatedAt(new Date());
                contract.setCompletedByPatient(false);
                contract.setCompletedByDoctor(false);
                MeetingContracts savedContract = meetingContractRepo.save(contract);

                return ResponseEntity.ok(
                        MeetingContractResponseDto.builder()
                                .success(true)
                                .message("Request accepted and meeting contract created successfully")
                                .contract(savedContract)
                                .build()
                );
            } else {
                return ResponseEntity.badRequest().body(
                        MeetingContractResponseDto.builder()
                                .success(false)
                                .message("Request not found")
                                .build()
                );
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to accept request and create meeting contract: " + e.getMessage())
                            .build()
            );
        }
    }

    @Transactional
    public ResponseEntity<MeetingContractResponseDto> markMeetingAsCompletedByPatient(Long requestId) {
        try {
            Optional<MeetingContracts> contractOpt = meetingContractRepo.findByRequestId(requestId);
            if (contractOpt.isPresent()) {
                MeetingContracts contract = contractOpt.get();
                contract.setCompletedByPatient(true);
                MeetingContracts updatedContract = meetingContractRepo.save(contract);

                if (updatedContract.getCompletedByPatient() && updatedContract.getCompletedByDoctor()) {
                    Optional<Request> request = requestRepo.findById(updatedContract.getRequestId());
                    if (request.isPresent()) {
                        Request requestToBeUpdated = request.get();
                        requestToBeUpdated.setStatus(RequestStatus.COMPLETED);
                        requestRepo.save(requestToBeUpdated);
                    }
                }

                return ResponseEntity.ok(
                        MeetingContractResponseDto.builder()
                                .success(true)
                                .message("Meeting marked as completed by the patient successfully")
                                .contract(updatedContract)
                                .build()
                );
            } else {
                return ResponseEntity.badRequest().body(
                        MeetingContractResponseDto.builder()
                                .success(false)
                                .message("Meeting contract not found")
                                .build()
                );
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to mark meeting as completed by patient: " + e.getMessage())
                            .build()
            );
        }
    }

    @Transactional
    public ResponseEntity<MeetingContractResponseDto> markMeetingAsCompletedByDoctor(Long requestId) {
        try {
            Optional<MeetingContracts> contractOpt = meetingContractRepo.findByRequestId(requestId);
            if (contractOpt.isPresent()) {
                MeetingContracts contract = contractOpt.get();
                contract.setCompletedByDoctor(true);
                MeetingContracts updatedContract = meetingContractRepo.save(contract);

                if (updatedContract.getCompletedByPatient() && updatedContract.getCompletedByDoctor()) {
                    Optional<Request> request = requestRepo.findById(updatedContract.getRequestId());
                    if (request.isPresent()) {
                        Request requestToBeUpdated = request.get();
                        requestToBeUpdated.setStatus(RequestStatus.COMPLETED);
                        requestRepo.save(requestToBeUpdated);
                    }
                }

                return ResponseEntity.ok(
                        MeetingContractResponseDto.builder()
                                .success(true)
                                .message("Meeting marked as completed by the doctor successfully")
                                .contract(updatedContract)
                                .build()
                );
            } else {
                return ResponseEntity.badRequest().body(
                        MeetingContractResponseDto.builder()
                                .success(false)
                                .message("Meeting contract not found")
                                .build()
                );
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    MeetingContractResponseDto.builder()
                            .success(false)
                            .message("Failed to mark meeting as completed by doctor: " + e.getMessage())
                            .build()
            );
        }
    }

    public ResponseEntity<RequestResponseDto> rejectRequest(Long requestId) {
        try {
            Optional<Request> requestOpt = requestRepo.findById(requestId);
            if (requestOpt.isPresent()) {
                Request request = requestOpt.get();
                request.setStatus(RequestStatus.REJECTED);
                request.setCreatedAt(new Date());
                Request savedRequest = requestRepo.save(request);

                return ResponseEntity.ok(
                        RequestResponseDto.builder()
                                .success(true)
                                .message("Request rejected successfully")
                                .request(savedRequest)
                                .build()
                );
            }
            return ResponseEntity.ok(
                    RequestResponseDto.builder()
                            .success(true)
                            .message("Request rejected Unsuccessful")
                            .build()
            );

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
