package com.kn.assessment.wallet.dto;

import com.kn.assessment.wallet.model.Wallet;

public class WalletCreateResponse {

  public Wallet wallet;
  public ResponseStatus status = new ResponseStatus();

  public WalletCreateResponse() {
  }

}
