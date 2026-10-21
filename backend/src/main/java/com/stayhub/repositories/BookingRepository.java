package com.stayhub.repositories;

import com.stayhub.models.Booking;
import com.stayhub.models.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

    List<Booking> findByGuestIdOrderByCreatedAtDesc(UUID guestId);

    @Query("""
        SELECT COUNT(b) > 0 FROM Booking b
        WHERE b.listing.id = :listingId
          AND b.status NOT IN (:cancelledStatus)
          AND b.checkInDate < :checkOutDate
          AND b.checkOutDate > :checkInDate
    """)
    boolean existsOverlappingBooking(
            @Param("listingId") UUID listingId,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("cancelledStatus") BookingStatus cancelledStatus
    );
}