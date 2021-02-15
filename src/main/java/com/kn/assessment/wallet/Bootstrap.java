package com.kn.assessment.wallet;

import com.kn.assessment.wallet.model.Wallet;
import com.kn.assessment.wallet.model.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;
import java.util.stream.Stream;

@Component
@Profile("!prod || !test")
public class Bootstrap implements CommandLineRunner {

  @Autowired
  private WalletRepository walletRepository;

  @Override
  public void run(String... args) {
    Random r = new Random();
    
    Stream.of("Vacation", "Charity", "Pension", "For a rainy day").forEach(name -> {
      Wallet wallet = new Wallet(name);
      BigDecimal balance = BigDecimal.valueOf(0 + r.nextDouble() * (1e6 - 0)).setScale(4, RoundingMode.HALF_DOWN);
      wallet.setBalance(balance);
      walletRepository.save(wallet);
    });
    walletRepository.findAll().forEach(System.out::println);
  }
}
