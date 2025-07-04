document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');

    let currentImageIndex; // To keep track of the currently displayed image

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openModal(this.src, this.alt, index); // Pass index to openModal
        });
    });

    // Function to open the modal
    function openModal(imageSrc, imageAlt, index) {
        modal.style.display = 'block';
        modal.style.animation = 'fadeIn 0.3s forwards';
        modalImage.src = imageSrc;
        captionText.innerHTML = imageAlt;
        currentImageIndex = index; // Set the current image index

        // Apply zoomIn animation to the image
        modalImage.style.animation = 'zoomIn 0.3s forwards';

        // Add keyboard event listener when modal is open
        document.addEventListener('keydown', handleKeyPress);
        modalImage.addEventListener('touchstart', handleTouchStart);
        modalImage.addEventListener('touchend', handleTouchEnd);
    }

    // Function to close the modal
    function closeModal() {
        modalImage.style.animation = 'zoomOut 0.3s forwards';
        modal.style.animation = 'fadeOut 0.3s forwards';
        modal.addEventListener('animationend', function handler() {
            modal.style.display = 'none';
            modal.removeEventListener('animationend', handler);
            // Remove keyboard event listener when modal is closed
            document.removeEventListener('keydown', handleKeyPress);
            modalImage.removeEventListener('touchstart', handleTouchStart);
            modalImage.removeEventListener('touchend', handleTouchEnd);

        }, { once: true });
    }

    // Function to navigate images
    function navigateImage(direction) { // direction: 'prev' or 'next'
        let nextIndex = currentImageIndex;

        if (direction === 'next') {
            nextIndex = (currentImageIndex + 1) % galleryItems.length;
        } else if (direction === 'prev') {
            nextIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        }

        const nextImage = galleryItems[nextIndex];
        // Instantly change image and caption without new modal animation
        modalImage.src = nextImage.src;
        captionText.innerHTML = nextImage.alt;
        currentImageIndex = nextIndex;
    }

    // Handle keyboard key presses
    function handleKeyPress(event) {
        if (modal.style.display === 'block') { // Only active if modal is open
            if (event.key === 'ArrowRight') {
                navigateImage('next');
            } else if (event.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (event.key === 'Escape') { // Also close with Escape key
                closeModal();
            }
        }
    }

    // When the user clicks on <span> (x), close the modal
    closeButton.addEventListener('click', closeModal);

    // When the user clicks anywhere outside of the image, close it
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });


        let touchStartX = 0;
    let touchEndX = 0;

    // Detect swipe direction
    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    }

    function handleGesture() {
        const swipeThreshold = 50; // Minimum px to be considered a swipe
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > swipeThreshold) {
            if (distance < 0) {
                // Swiped left → next
                navigateImage('next');
            } else {
                // Swiped right → previous
                navigateImage('prev');
            }
        }
    }


});


document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#0f161c"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                // "color": "#ffffff",
                "color": "#6db3ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    var count_particles, stats, update;
    stats = new Stats;
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
    count_particles = document.querySelector('.js-count-particles');
    update = function() {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);;
});