package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

import com.kn.assessment.wallet.model.Wallet;

public class TransactionRequest {
  TransactionType type;
  Wallet wallet;
  BigDecimal amount;
}
