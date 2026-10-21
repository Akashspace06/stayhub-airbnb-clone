package com.stayhub.services;

import com.stayhub.models.Booking;
import com.stayhub.models.BookingStatus;
import com.stayhub.models.Listing;
import com.stayhub.models.User;
import com.stayhub.repositories.BookingRepository;
import com.stayhub.repositories.ListingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
 @SuppressWarnings("null")
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ListingRepository listingRepository;

    public BookingService(BookingRepository bookingRepository, ListingRepository listingRepository) {
        this.bookingRepository = bookingRepository;
        this.listingRepository = listingRepository;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Booking createBooking(User guest, UUID listingId, LocalDate checkIn, LocalDate checkOut, int guests) {
        if (!checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("Check-out must be after check-in.");
        }

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found."));

        boolean overlaps = bookingRepository.existsOverlappingBooking(listingId, checkIn, checkOut, BookingStatus.CANCELLED);
        if (overlaps) {
            throw new IllegalStateException("Selected dates are already booked.");
        }

        long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
        BigDecimal base = listing.getPricePerNight().multiply(BigDecimal.valueOf(nights));
        BigDecimal cleaning = listing.getCleaningFee() != null ? listing.getCleaningFee() : BigDecimal.ZERO;
        BigDecimal service = base.multiply(new BigDecimal("0.14"));
        BigDecimal total = base.add(cleaning).add(service);

        Booking booking = Booking.builder()
                .listing(listing)
                .guest(guest)
                .checkInDate(checkIn)
                .checkOutDate(checkOut)
                .totalNights((int) nights)
                .guestCount(guests)
                .pricePerNight(listing.getPricePerNight())
                .cleaningFee(cleaning)
                .serviceFee(service)
                .totalPrice(total)
                .status(BookingStatus.CONFIRMED)
                .build();

        return bookingRepository.save(booking);
    }

    public List<Booking> getGuestBookings(UUID guestId) {
        return bookingRepository.findByGuestIdOrderByCreatedAtDesc(guestId);
    }
}
