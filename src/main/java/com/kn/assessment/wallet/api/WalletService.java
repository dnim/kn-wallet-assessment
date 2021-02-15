package com.kn.assessment.wallet.api;

import java.math.BigDecimal;
import java.util.Optional;

import javax.persistence.OptimisticLockException;
import javax.validation.ConstraintViolationException;

import com.kn.assessment.wallet.dto.TransferResponse;
import com.kn.assessment.wallet.dto.ResponseStatus;
import com.kn.assessment.wallet.dto.TransactionRequest;
import com.kn.assessment.wallet.dto.TransactionResponse;
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
  public TransactionResponse performTransaction(TransactionRequest request) {
    Wallet wallet = repository.findById(request.walletId).orElse(null);
    TransactionResponse response = new TransactionResponse();
    ResponseStatus status = response.status;
    if (wallet == null) {
      status.isError = true;
      status.message = "Wallet not found";
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
            status.isError = true;
            status.message = "Not enough money on the account";
          }
          break;
        default:
          status.isError = true;
          status.message = "Transaction type '" + request.type + "' is not supported";
      }
    }
    if (!status.isError) {
      try {
        Wallet result = repository.save(wallet);
        response.newBalance = result.getBalance();
      } catch (OptimisticLockException exception) {
        log.error("Optimistic lock error on wallet " + wallet, exception);
        status.isError = true;
        status.message = "Can't do the transaction. Probably, the wallet was updated in enother transaction. Please, refresh the page.";
      }
    }
    return response;
  }

  @Transactional
  public TransferResponse transferMoney(TransferMoneyRequest request) {
    TransferResponse response = new TransferResponse();
    Wallet from = repository.findByIdWithReadLock(request.fromId).orElse(null);
    Wallet to = repository.findByIdWithReadLock(request.toId).orElse(null);
    if (from == null || to == null) {
      response.status.isError = true;
      response.status.message = "Can't find wallet(s)";
    } else if (from.getBalance().compareTo(request.amount) == -1) {
      response.status.isError = true;
      response.status.message = "Not enough money on the balance";
    } else {
      BigDecimal fromNewBalance = from.getBalance().subtract(request.amount);
      from.setBalance(fromNewBalance);
      BigDecimal toNewBalance = to.getBalance().add(request.amount);
      to.setBalance(toNewBalance);
      try {
        response.from = repository.save(from);
        response.to = repository.save(to);
      } catch(ConstraintViolationException e) {
        response.status.isError = true;
        response.status.message = "The value after point should be not more than 4 digits. For example '43.3233'";
      }
      // TODO: handle other exceptions (locks, saving, etc.)
    }
    return response;
  }

}
