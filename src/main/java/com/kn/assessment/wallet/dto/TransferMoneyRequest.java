package com.kn.assessment.wallet.dto;

import java.math.BigDecimal;

import com.kn.assessment.wallet.model.Wallet;

public class TransferMoneyRequest {
  Wallet from;
  Wallet to;
  BigDecimal amount;
}