import { gsap } from 'gsap';
import './style.css';

// State management using a closure
const createMenuState = () => {
    let isMenuClicked = false;
    return {
        get: () => isMenuClicked,
        toggle: () => {
            isMenuClicked = !isMenuClicked;
            return isMenuClicked;
        },
        set: (value) => {
            isMenuClicked = value;
            return isMenuClicked;
        }
    };
};

// Animation functions
const createMenuAnimation = () => {
    const timeline = gsap.timeline({ paused: true });
    
    const animateOpen = () => {
        timeline.clear();
        timeline
            .to(".overlay", {
                duration: 1.5,
                height: "100vh",
                ease: "power4.inOut"
            })
            .fromTo(".left",
                { width: "0" },
                { width: "100%", duration: 1, ease: "power4.inOut" }
            );
        timeline.play();
    };

    const animateClose = () => {
        timeline.clear();
        timeline
            .to(".overlay", {
                duration: 1.5,
                height: "0",
                ease: "power4.inOut"
            })
            .fromTo(".left",
                { width: "100%" },
                { width: "0", duration: 1, ease: "power4.inOut" }
            );
        timeline.play();
    };

    return {
        open: animateOpen,
        close: animateClose
    };
};

// UI update functions
const updateMenuAppearance = (isOpen) => {
    const menuLogo = document.querySelector('.menu-logo');
    const menuLine1 = document.querySelector('.menu-line-1');
    const menuLine2 = document.querySelector('.menu-line-2');

    if (isOpen) {
        menuLogo.classList.remove('text-white');
        menuLogo.classList.add('text-black');
        menuLine1.classList.add('translate-y-0', 'rotate-45', 'bg-black');
        menuLine1.classList.remove('-translate-y-1', 'bg-white');
        menuLine2.classList.add('translate-y-0', '-rotate-45', 'bg-black');
        menuLine2.classList.remove('translate-y-1', 'bg-white');
    } else {
        menuLogo.classList.add('text-white');
        menuLogo.classList.remove('text-black');
        menuLine1.classList.remove('translate-y-0', 'rotate-45', 'bg-black');
        menuLine1.classList.add('-translate-y-1', 'bg-white');
        menuLine2.classList.remove('translate-y-0', '-rotate-45', 'bg-black');
        menuLine2.classList.add('translate-y-1', 'bg-white');
    }
};

// Event handlers
const handleMenuClick = (menuState, menuAnimation) => {
    const isOpen = menuState.toggle();
    updateMenuAppearance(isOpen);
    
    if (isOpen) {
        menuAnimation.open();
    } else {
        menuAnimation.close();
    }
};

const handleNavClick = (menuState, menuAnimation) => {
    menuState.set(false);
    updateMenuAppearance(false);
    menuAnimation.close();
};

// Initialize header functionality
const initializeHeader = () => {
    const menuState = createMenuState();
    const menuAnimation = createMenuAnimation();

    // Set up menu button click handler
    const menuBtn = document.querySelector('.menubtn');
    menuBtn.addEventListener('click', () => handleMenuClick(menuState, menuAnimation));

    // Set up navigation link click handlers
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => handleNavClick(menuState, menuAnimation));
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeHeader);