package com.kn.assessment.wallet.dto;

import com.kn.assessment.wallet.model.Wallet;

public class TransferResponse {
  public Wallet from;
  public Wallet to;
  public ResponseStatus status = new ResponseStatus();
}
