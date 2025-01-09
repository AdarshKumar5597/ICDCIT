package com.healthcare.healthcare.dto;

import com.healthcare.healthcare.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDto {
    private Users doctor;
    private String image;
}
