package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.MeetingContracts;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeetingContractResponseDto {
    private boolean success;
    private String message;
    private MeetingContracts contract;
}
