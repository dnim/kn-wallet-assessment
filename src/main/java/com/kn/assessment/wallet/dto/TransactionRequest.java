package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

public class TransactionRequest {
  @NotNull
  public TransactionType type;
  @NotNull
  public Long walletId;
  @NotNull
  public BigDecimal amount;
}
