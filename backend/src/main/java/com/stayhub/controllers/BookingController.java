package com.stayhub.controllers;

import com.stayhub.models.Booking;
import com.stayhub.models.User;
import com.stayhub.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public record ReservationReq(UUID listingId, LocalDate checkInDate, LocalDate checkOutDate, int guestCount) {}

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @AuthenticationPrincipal User user,
            @RequestBody ReservationReq req
    ) {
        return ResponseEntity.ok(bookingService.createBooking(
                user, req.listingId(), req.checkInDate(), req.checkOutDate(), req.guestCount()
        ));
    }

    @GetMapping("/my-stays")
    public ResponseEntity<List<Booking>> getMyStays(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(bookingService.getGuestBookings(user.getId()));
    }
}