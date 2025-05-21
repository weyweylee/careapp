
window.addEventListener('DOMContentLoaded', () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4 }
        });
      }, 1000);
    });
