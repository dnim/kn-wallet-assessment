package com.kn.assessment.wallet.api;

import com.kn.assessment.wallet.dto.BalanceChangeResponse;
import com.kn.assessment.wallet.dto.TransactionRequest;
import com.kn.assessment.wallet.dto.TransferMoneyRequest;
import com.kn.assessment.wallet.dto.WalletCreateResponse;
import com.kn.assessment.wallet.model.Wallet;
import com.kn.assessment.wallet.model.WalletRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

  @Autowired
  private WalletService service;

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
  ResponseEntity<WalletCreateResponse> create(@Valid @RequestBody Wallet wallet) throws URISyntaxException {
    log.debug("Creating wallet: {}", wallet);
    Wallet result;
    Long id = -1L;
    WalletCreateResponse response = new WalletCreateResponse();
    try {
      result = repository.save(wallet);
      response.wallet = result;
      id = result.getId();
    } catch (DataIntegrityViolationException exception) {
      response.status.isError = true;
      response.status.message = "Wallet with the provided name already exists in the system";
    }
    return ResponseEntity.created(new URI("/api/wallet/" + id)).body(response);
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
    BalanceChangeResponse response = service.performTransaction(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/transferBetweenWallets")
  ResponseEntity<BalanceChangeResponse> transferMoney(@Valid @RequestBody TransferMoneyRequest request) {
    BalanceChangeResponse response = new BalanceChangeResponse("message");
    return ResponseEntity.ok(response);
  }

}
