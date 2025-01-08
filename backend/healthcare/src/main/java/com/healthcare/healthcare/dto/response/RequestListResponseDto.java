package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.Request;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RequestListResponseDto {
    private boolean success;
    private String message;
    private List<Request> requests;
}
