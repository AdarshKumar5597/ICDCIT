package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.Doctor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DoctorListResponseDto {
    private boolean success;
    private String message;
    private List<Doctor> doctors;
}
