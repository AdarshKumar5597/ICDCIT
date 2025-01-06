package com.healthcare.healthcare.repo;

import com.healthcare.healthcare.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {

    @Query(value = "SELECT * FROM room WHERE room_id = :roomId", nativeQuery = true)
    Room findByRoomId(@Param("roomId") Long roomId);

    @Query(value = "SELECT * FROM room", nativeQuery = true)
    List<Room> findAllRooms();

    @Query(value = "SELECT * FROM room WHERE LOWER(title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(summary) LIKE LOWER(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<Room> searchRoomsByKeyword(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM room WHERE :proficiency = ANY(proficiencies)", nativeQuery = true)
    List<Room> findByProficiency(@Param("proficiency") String proficiency);

    @Query(value = "SELECT * FROM room WHERE proficiencies && CAST(:proficiencies AS TEXT[])", nativeQuery = true)
    List<Room> findByProficiencies(@Param("proficiencies") List<String> proficiencies);
}
