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

    public Long getDoctorProficiencyId() {
        return doctorProficiencyId;
    }

    public void setDoctorProficiencyId(Long doctorProficiencyId) {
        this.doctorProficiencyId = doctorProficiencyId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getProficiencyId() {
        return proficiencyId;
    }

    public void setProficiencyId(Long proficiencyId) {
        this.proficiencyId = proficiencyId;
    }
}
