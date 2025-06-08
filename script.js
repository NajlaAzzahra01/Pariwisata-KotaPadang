// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  // Function to show section
  function showSection(sectionId) {
      // Hide all sections
      sections.forEach(section => {
          section.classList.remove('active');
      });

      // Remove active class from all nav buttons
      navButtons.forEach(btn => {
          btn.classList.remove('active');
      });

      // Show target section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
          targetSection.classList.add('active');
      }

      // Add active class to clicked button
      const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeButton) {
          activeButton.classList.add('active');
          
          // Update button colors based on section
          updateButtonColor(activeButton, sectionId);
      }

      // Scroll to top smoothly
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  }

  // Function to update button color based on section
  function updateButtonColor(button, sectionId) {
      // Remove all color classes
      button.classList.remove('blue', 'green', 'purple', 'orange');
      
      // Add appropriate color class
      switch(sectionId) {
          case 'beranda':
              button.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
              break;
          case 'peta':
              button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
              break;
          case 'informasi':
              button.style.background = 'linear-gradient(135deg, #8b5cf6, #a855f7)';
              break;
          case 'profil':
              button.style.background = 'linear-gradient(135deg, #ea580c, #dc2626)';
              break;
      }
  }

  // Add click event listeners to navigation buttons
  navButtons.forEach(button => {
      button.addEventListener('click', function() {
          const sectionId = this.getAttribute('data-section');
          showSection(sectionId);
      });
  });

  // Initialize with beranda section
  showSection('beranda');

  // Add smooth hover effects to cards
  const cards = document.querySelectorAll('.destination-card, .food-card, .stat-card, .info-card, .profile-card');
  
  cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px)';
          this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          // Add ripple effect
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
              this.style.transform = 'scale(1)';
          }, 150);
      });
  });

  // Animate elements on scroll
  function animateOnScroll() {
      const elements = document.querySelectorAll('.stat-card, .destination-card, .food-card, .info-card');
      
      elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  }

  // Initialize elements for scroll animation
  const animatedElements = document.querySelectorAll('.stat-card, .destination-card, .food-card, .info-card');
  animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
  
  // Run animation on load
  animateOnScroll();

  // Add sparkle animation to hero icons
  const sparkles = document.querySelectorAll('.fa-sparkles');
  sparkles.forEach(sparkle => {
      setInterval(() => {
          sparkle.style.transform = 'scale(1.2)';
          setTimeout(() => {
              sparkle.style.transform = 'scale(1)';
          }, 300);
      }, 2000);
  });

  // Mobile menu handling
  function handleMobileMenu() {
      const header = document.querySelector('.header');
      const nav = document.querySelector('.nav');
      
      if (window.innerWidth <= 768) {
          header.style.height = 'auto';
          nav.style.flexWrap = 'wrap';
      } else {
          header.style.height = '96px';
          nav.style.flexWrap = 'nowrap';
      }
  }

  // Add resize event listener
  window.addEventListener('resize', handleMobileMenu);
  
  // Run on load
  handleMobileMenu();

  // Add loading animation
  function showLoadingAnimation() {
      const body = document.body;
      body.style.opacity = '0';
      
      setTimeout(() => {
          body.style.transition = 'opacity 0.5s ease';
          body.style.opacity = '1';
      }, 100);
  }

  // Run loading animation
  showLoadingAnimation();

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
          // Ensure focus is visible
          document.body.classList.add('keyboard-navigation');
      }
  });

  document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
  });

  // Add search functionality (basic)
  function addSearchFunctionality() {
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Cari destinasi...';
      searchInput.className = 'search-input';
      searchInput.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 20px;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          display: none;
      `;

      document.body.appendChild(searchInput);

      // Toggle search with Ctrl+K
      document.addEventListener('keydown', function(e) {
          if (e.ctrlKey && e.key === 'k') {
              e.preventDefault();
              searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
              if (searchInput.style.display === 'block') {
                  searchInput.focus();
              }
          }
      });

      // Search functionality
      searchInput.addEventListener('input', function() {
          const query = this.value.toLowerCase();
          const destinationCards = document.querySelectorAll('.destination-card');
          
          destinationCards.forEach(card => {
              const title = card.querySelector('h3').textContent.toLowerCase();
              const description = card.querySelector('p').textContent.toLowerCase();
              
              if (title.includes(query) || description.includes(query)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = query === '' ? 'block' : 'none';
              }
          });
      });
  }

  // Initialize search functionality
  addSearchFunctionality();

  // Add smooth transitions for all interactive elements
  const interactiveElements = document.querySelectorAll('button, .card, .nav-btn, .logo-small, .logo-main');
  interactiveElements.forEach(element => {
      element.style.transition = 'all 0.3s ease';
  });

  // Console welcome message
  console.log('%c🏔️ Selamat datang di Penjelajah Pariwisata Ranah Minang! 🏔️', 
              'color: #ea580c; font-size: 16px; font-weight: bold;');
  console.log('%cWebsite ini dibuat untuk memperkenalkan keindahan pariwisata Kota Padang', 
              'color: #6b7280; font-size: 12px;');
});

// Additional utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
  }).format(amount);
}

function getRandomColor() {
  const colors = ['blue', 'orange', 'green', 'purple', 'pink', 'emerald', 'yellow', 'red'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
  // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

