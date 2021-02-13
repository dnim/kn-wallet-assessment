package com.kn.assessment.wallet.dto;

import lombok.Data;

@Data
public class BalanceChangeResponse {
  String message;
  boolean isError;
}
