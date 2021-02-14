package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

public class TransferMoneyRequest {
  @NotNull
  Long fromId;
  @NotNull
  Long toId;
  @NotNull
  BigDecimal amount;
}