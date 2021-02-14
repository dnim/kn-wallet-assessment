package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

public class TransferMoneyRequest {
  @NotNull
  public Long fromId;
  @NotNull
  public Long toId;
  @NotNull
  public BigDecimal amount;
}