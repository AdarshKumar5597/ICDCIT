package com.healthcare.healthcare.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Proficiency")
public class Proficiency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proficiency_id")
    private Long proficiencyId;

    @Column(nullable = false, unique = true, name = "proficiency_name")
    private String proficiencyName;

    public Long getProficiencyId() {
        return proficiencyId;
    }

    public void setProficiencyId(Long proficiencyId) {
        this.proficiencyId = proficiencyId;
    }

    public String getProficiencyName() {
        return proficiencyName;
    }

    public void setProficiencyName(String proficiencyName) {
        this.proficiencyName = proficiencyName;
    }
}
