package com.stayhub.config;

import com.stayhub.models.*;
import com.stayhub.repositories.ListingRepository;
import com.stayhub.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@SuppressWarnings("null")
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           ListingRepository listingRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (listingRepository.count() > 0) return;

        User host = User.builder()
                .email("host@stayhub.com")
                .password(passwordEncoder.encode("password123"))
                .firstName("Elena")
                .lastName("Rostova")
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")
                .role(Role.HOST)
                .build();
        userRepository.save(host);

        Listing villa1 = new Listing();
        villa1.setHost(host);
        villa1.setTitle("Cliffside Sunset Villa overlooking the Aegean");
        villa1.setDescription("Perched on the volcanic cliffs of Oia, this cave-style villa features breathtaking caldera views and private infinity jacuzzi.");
        villa1.setCategory("Beachfront");
        villa1.setStreetAddress("Caldera Pathway 14");
        villa1.setCity("Santorini");
        villa1.setState("Cyclades");
        villa1.setCountry("Greece");
        villa1.setPricePerNight(new BigDecimal("420.00"));
        villa1.setCleaningFee(new BigDecimal("80.00"));
        villa1.setMaxGuests(4);
        villa1.setBedrooms(2);
        villa1.setBeds(2);
        villa1.setBathrooms(2);
        villa1.setAmenities(Set.of("Fast Wi-Fi", "Infinity Jacuzzi", "Sea View", "Air Conditioning"));
        villa1.setImageUrls(List.of(
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        ));
        listingRepository.save(villa1);

        Listing chalet2 = new Listing();
        chalet2.setHost(host);
        chalet2.setTitle("Architectural Alpine Chalet with Matterhorn View");
        chalet2.setDescription("Ski-in/ski-out contemporary chalet with floor-to-ceiling glass windows and private sauna.");
        chalet2.setCategory("Cabins");
        chalet2.setStreetAddress("Bahnhofstrasse 88");
        chalet2.setCity("Zermatt");
        chalet2.setState("Valais");
        chalet2.setCountry("Switzerland");
        chalet2.setPricePerNight(new BigDecimal("650.00"));
        chalet2.setCleaningFee(new BigDecimal("120.00"));
        chalet2.setMaxGuests(6);
        chalet2.setBedrooms(3);
        chalet2.setBeds(4);
        chalet2.setBathrooms(3);
        chalet2.setAmenities(Set.of("Ski Storage", "Sauna", "Fireplace", "Mountain View"));
        chalet2.setImageUrls(List.of(
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
        ));
        listingRepository.save(chalet2);

        System.out.println(">>> Demo StayHub listings successfully seeded! <<<");
    }
}