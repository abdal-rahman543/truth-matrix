/**
 * Countdown Timer for Truth Matrix
 * Displays a countdown to a specific event date
 */

// Set the date we're counting down to (March 17, 2025)
const countdownDate = new Date("March 17, 2025 00:00:00").getTime();

// Update the countdown every 1 second
const countdownTimer = setInterval(function() {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the distance between now and the countdown date
    const distance = countdownDate - now;
    
    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "Tiden är ute!";
        
        // Add any special effects or actions when countdown is complete
        document.body.classList.add("countdown-complete");
        
        // You could trigger a special modal, animation, or page change here
        return;
    }
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Format the numbers for display (add leading zeros)
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    
    // Display the countdown
    document.getElementById("countdown").innerHTML = 
        `${days}<span>d</span> ${formattedHours}<span>h</span> ${formattedMinutes}<span>m</span> ${formattedSeconds}<span>s</span>`;
    
    // Add pulse effect on seconds change
    if (seconds === 0) {
        document.getElementById("countdown").classList.add("pulse");
        setTimeout(() => {
            document.getElementById("countdown").classList.remove("pulse");
        }, 500);
    }
}, 1000);
