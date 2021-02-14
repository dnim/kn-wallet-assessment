package com.kn.assessment.wallet;

import com.kn.assessment.wallet.model.Wallet;
import com.kn.assessment.wallet.model.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@Profile("!prod || !test")
public class Bootstrap implements CommandLineRunner {

  @Autowired
  private WalletRepository walletRepository;

  @Override
  public void run(String... args) {
    Stream.of("Vacation", "Charity", "Pension", "Additional", "One more", "And more")
        .forEach(name -> walletRepository.save(new Wallet(name)));
    walletRepository.findAll().forEach(System.out::println);
  }
}
