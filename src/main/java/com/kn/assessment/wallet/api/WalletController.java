package com.kn.assessment.wallet.api;

import com.kn.assessment.wallet.dto.BalanceChangeResponse;
import com.kn.assessment.wallet.dto.TransactionRequest;
import com.kn.assessment.wallet.dto.TransferMoneyRequest;
import com.kn.assessment.wallet.model.Wallet;
import com.kn.assessment.wallet.model.WalletRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/wallet")
public class WalletController {

  @Autowired
  private WalletRepository repository;

  @GetMapping("/list")
  Collection<Wallet> list() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  ResponseEntity<Wallet> get(@PathVariable Long id) {
    Optional<Wallet> wallet = repository.findById(id);
    return wallet.map(ResponseEntity::ok).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @PostMapping("/create")
  ResponseEntity<Wallet> create(@Valid @RequestBody Wallet wallet) throws URISyntaxException {
    log.debug("Creating wallet: {}", wallet);
    Wallet result = repository.save(wallet);
    return ResponseEntity.created(new URI("/api/wallet/" + result.getId())).body(result);
  }

  @PutMapping("/{id}")
  ResponseEntity<Wallet> update(@Valid @RequestBody Wallet wallet) {
    Wallet result = repository.save(wallet);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{id}")
  ResponseEntity<?> delete(@PathVariable Long id) {
    repository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/transaction")
  ResponseEntity<BalanceChangeResponse> transaction(@Valid @RequestBody TransactionRequest request) {
    BalanceChangeResponse response = new BalanceChangeResponse();
    response.setMessage("message");
    response.setError(false);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/transferBetweenWallets")
  ResponseEntity<BalanceChangeResponse> transferMoney(@Valid @RequestBody TransferMoneyRequest request) {
    BalanceChangeResponse response = new BalanceChangeResponse();
    response.setMessage("message");
    response.setError(false);
    return ResponseEntity.ok(response);
  }

}
