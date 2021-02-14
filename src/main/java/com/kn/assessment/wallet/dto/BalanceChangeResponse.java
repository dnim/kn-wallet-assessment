package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

public class BalanceChangeResponse {
  public String message;
  public boolean isError = false;
  public BigDecimal newBalance;

  public BalanceChangeResponse() {}

  public BalanceChangeResponse(String message) {
    this.message = message;
  }
}
