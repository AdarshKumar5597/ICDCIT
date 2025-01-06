package com.healthcare.healthcare.dto.response;

import com.healthcare.healthcare.model.Room;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomListResponseDTO {
    private List<Room> roomList;
    private Boolean success;
    private String message;
}
