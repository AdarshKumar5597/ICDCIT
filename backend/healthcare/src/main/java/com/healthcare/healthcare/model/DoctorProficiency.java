package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "DoctorProficiency")
public class DoctorProficiency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_proficiency_id")
    private Long doctorProficiencyId;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "proficiency_id")
    private Long proficiencyId;
}
