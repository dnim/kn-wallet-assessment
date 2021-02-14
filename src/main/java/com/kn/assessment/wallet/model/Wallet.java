package com.kn.assessment.wallet.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;
import javax.validation.constraints.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "wallet")
public class Wallet {

  @Id
  @GeneratedValue
  private Long id;

  @NonNull
  @Size(min = 1, max = 30)
  @NotBlank
  @Column(unique = true)
  private String name;

  @Digits(integer = 20, fraction = 4)
  @Min(0)
  @NotNull
  private BigDecimal balance = BigDecimal.ZERO;

  @Version
  private Integer version;
}
