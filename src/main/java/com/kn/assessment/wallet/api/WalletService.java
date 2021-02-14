package com.kn.assessment.wallet.api;

import java.math.BigDecimal;
import java.util.Optional;

import javax.persistence.OptimisticLockException;

import com.kn.assessment.wallet.dto.BalanceChangeResponse;
import com.kn.assessment.wallet.dto.TransactionRequest;
import com.kn.assessment.wallet.dto.TransferMoneyRequest;
import com.kn.assessment.wallet.model.Wallet;
import com.kn.assessment.wallet.model.WalletRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

/**
 * TODO: overall, the pessimistic lock is preferable in case of transactions
 */
@Slf4j
@Component
public class WalletService {

  @Autowired
  private WalletRepository repository;

  @Transactional
  public BalanceChangeResponse transferMoney(TransferMoneyRequest request) {

    BalanceChangeResponse response = new BalanceChangeResponse("message");
    return response;
  }

  @Transactional
  public BalanceChangeResponse performTransaction(TransactionRequest request) {
    Wallet wallet = repository.findById(request.walletId).orElse(null);
    BalanceChangeResponse response = new BalanceChangeResponse("The wallet balance was updated successfully.");
    if (wallet == null) {
      response.isError = true;
      response.message = "Wallet not found";
    } else {
      BigDecimal newBalance;
      switch (request.type) {
        case TOPUP:
          newBalance = wallet.getBalance().add(request.amount);
          wallet.setBalance(newBalance);
          break;
        case WITHDRAW:
          if (wallet.getBalance().compareTo(request.amount) >= 0) {
            newBalance = wallet.getBalance().subtract(request.amount);
            wallet.setBalance(newBalance);
          } else {
            response.isError = true;
            response.message = "Not enough money on the account";
          }
          break;
        default:
          response.isError = true;
          response.message = "Transaction type '" + request.type + "' is not supported";
      }
    }
    if (!response.isError) {
      try {
        Wallet result = repository.save(wallet);
        response.newBalance = result.getBalance();
      } catch(OptimisticLockException exception) {
        log.error("Optimistic lock error on wallet " + wallet, exception);
        response.isError = true;
        response.message = "Can't do the transaction. Probably, the wallet was updated in enother transaction. Please, refresh the page.";
      }
    }
    return response;
  }

  @Transactional
  public BalanceChangeResponse transfer(TransferMoneyRequest request) {
    // TODO: implement me! 
    return null;
  }

}
