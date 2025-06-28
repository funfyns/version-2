document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (27 Februari 2026, 00:00:00 WIB)
    // IMPORTANT: Ganti ini dengan tanggal dan waktu yang sesuai!
    const countDownDate = new Date("Feb 27, 2026 00:00:00").getTime();

    // Update the countdown every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the corresponding elements, ensuring two digits
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
            // Optional: You can display a message when the countdown ends
            // document.querySelector('.countdown-timer').innerHTML = "<span style='color: var(--accent-color); font-size: 1.5rem;'>Acara telah dimulai!</span>";
        }
    }, 1000);

    // --- Fungsi untuk menyalin nomor rekening ---
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.dataset.account;
            navigator.clipboard.writeText(accountNumber)
                .then(() => {
                    const originalText = this.textContent;
                    const originalBg = this.style.backgroundColor; // Store original background
                    this.textContent = 'Disalin!';
                    this.style.backgroundColor = '#28a745'; // Green for success
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = originalBg; // Restore original background
                    }, 2000);
                })
                .catch(err => {
                    console.error('Gagal menyalin teks: ', err);
                    alert('Gagal menyalin nomor rekening. Mohon salin manual: ' + accountNumber);
                });
        });
    });

    // --- Fungsi untuk RSVP Form (Konfirmasi Kehadiran) ---
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccessMessage = document.createElement('div'); // Create success message element
    rsvpSuccessMessage.id = 'rsvpSuccessMessage';
    rsvpForm.parentNode.insertBefore(rsvpSuccessMessage, rsvpForm.nextSibling); // Insert after form

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('rsvpName').value;
            const guests = document.getElementById('rsvpGuests').value;
            const attendance = document.querySelector('input[name="kehadiran"]:checked').value;

            let messageText = `Terima kasih, ${name}! Konfirmasi kehadiran Anda (${attendance}) untuk ${guests} orang telah kami terima.`;

            // Display success message on the page
            rsvpSuccessMessage.textContent = messageText;
            rsvpSuccessMessage.style.display = 'block';
            rsvpSuccessMessage.style.opacity = '0'; // Start invisible for fade-in
            rsvpSuccessMessage.style.transition = 'opacity 0.5s ease-in-out';

            setTimeout(() => {
                rsvpSuccessMessage.style.opacity = '1';
            }, 10); // Short delay for transition to work

            // Hide message after a few seconds
            setTimeout(() => {
                rsvpSuccessMessage.style.opacity = '0';
                rsvpSuccessMessage.addEventListener('transitionend', function handler() {
                    rsvpSuccessMessage.style.display = 'none';
                    rsvpSuccessMessage.removeEventListener('transitionend', handler);
                });
            }, 5000); // Hide after 5 seconds

            // Optional: You can still send to WhatsApp here if desired
            // const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
            // const whatsappMessage = `Halo, saya ${name} ingin mengkonfirmasi kehadiran untuk Undangan Pernikahan Dio & Leviana. Jumlah tamu: ${guests} orang. Status kehadiran: ${attendance}.`;
            // const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            // window.open(whatsappUrl, '_blank');

            this.reset(); // Clear the form
        });
    }
});