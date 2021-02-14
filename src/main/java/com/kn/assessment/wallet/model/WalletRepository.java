package com.kn.assessment.wallet.model;

import java.util.Optional;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

  @Lock(LockModeType.PESSIMISTIC_READ)
  @QueryHints({ @QueryHint(name = "javax.persistence.lock.timeout", value = "500") })
  @Query("SELECT w FROM Wallet w WHERE w.id = ?1")
  public Optional<Wallet> findByIdWithReadLock(Long walletId);
}
