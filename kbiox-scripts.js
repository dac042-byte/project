/**
 * K-BioX Networks - Accessible JavaScript
 * Implements WCAG 2.1 Level AA compliant interactive features
 * Ensures keyboard accessibility, ARIA support, and screen reader compatibility
 * Last Updated: January 2025
 */

(function() {
	'use strict';

	// ============================================
	// UTILITY FUNCTIONS
	// ============================================

	/**
	 * Trap focus within an element for modals and menus
	 * @param {HTMLElement} element - The element to trap focus within
	 */
	function trapFocus(element) {
		const focusableElements = element.querySelectorAll(
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);

		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];

		element.addEventListener('keydown', function(e) {
			if (e.key !== 'Tab') return;

			if (e.shiftKey) {
				if (document.activeElement === firstFocusable) {
					lastFocusable.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastFocusable) {
					firstFocusable.focus();
					e.preventDefault();
				}
			}
		});
	}

	/**
	 * Generate unique ID for elements
	 * @returns {string} Unique ID
	 */
	function generateId() {
		return 'kbiox-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
	}

	/**
	 * Announce to screen readers
	 * @param {string} message - Message to announce
	 * @param {string} priority - Priority level ('polite' or 'assertive')
	 */
	function announce(message, priority = 'polite') {
		const announcer = document.getElementById('aria-live-announcer');
		if (!announcer) {
			const newAnnouncer = document.createElement('div');
			newAnnouncer.id = 'aria-live-announcer';
			newAnnouncer.setAttribute('aria-live', priority);
			newAnnouncer.setAttribute('aria-atomic', 'true');
			newAnnouncer.className = 'visually-hidden';
			document.body.appendChild(newAnnouncer);

			// Give the DOM time to recognize the new element
			setTimeout(() => {
				newAnnouncer.textContent = message;
			}, 100);
		} else {
			announcer.setAttribute('aria-live', priority);
			announcer.textContent = message;
		}
	}

	// ============================================
	// LANGUAGE SELECTOR
	// ============================================

	function initLanguageSelector() {
		const langToggle = document.querySelector('.lang-toggle');
		const langMenu = document.getElementById('lang-menu');

		if (!langToggle || !langMenu) return;

		// Toggle language menu
		langToggle.addEventListener('click', function() {
			const isExpanded = this.getAttribute('aria-expanded') === 'true';

			if (isExpanded) {
				closeLangMenu();
			} else {
				openLangMenu();
			}
		});

		function openLangMenu() {
			langToggle.setAttribute('aria-expanded', 'true');
			langMenu.removeAttribute('hidden');
			const firstLink = langMenu.querySelector('a');
			if (firstLink) firstLink.focus();
			announce('언어 메뉴가 열렸습니다');
		}

		function closeLangMenu() {
			langToggle.setAttribute('aria-expanded', 'false');
			langMenu.setAttribute('hidden', '');
			langToggle.focus();
			announce('언어 메뉴가 닫혔습니다');
		}

		// Close on Escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && !langMenu.hasAttribute('hidden')) {
				closeLangMenu();
			}
		});

		// Close when clicking outside
		document.addEventListener('click', function(e) {
			if (!e.target.closest('.language-selector')) {
				closeLangMenu();
			}
		});
	}

	// ============================================
	// SEARCH PANEL FUNCTIONALITY
	// ============================================

	function initSearchPanel() {
		const searchToggle = document.querySelector('.search-toggle');
		const searchPanel = document.getElementById('search-panel');
		const searchInput = document.getElementById('site-search');
		const searchClear = document.querySelector('.search-clear');

		if (!searchToggle || !searchPanel) return;

		// Toggle search panel
		searchToggle.addEventListener('click', function() {
			const isExpanded = this.getAttribute('aria-expanded') === 'true';

			if (isExpanded) {
				closeSearchPanel();
			} else {
				openSearchPanel();
			}
		});

		function openSearchPanel() {
			searchToggle.setAttribute('aria-expanded', 'true');
			searchPanel.removeAttribute('hidden');
			searchInput.focus();
			announce('검색 패널이 열렸습니다');

			// Trap focus in search panel
			trapFocus(searchPanel);
		}

		function closeSearchPanel() {
			searchToggle.setAttribute('aria-expanded', 'false');
			searchPanel.setAttribute('hidden', '');
			searchToggle.focus();
			announce('검색 패널이 닫혔습니다');
		}

		// Clear search input
		if (searchClear && searchInput) {
			searchClear.addEventListener('click', function() {
				searchInput.value = '';
				searchInput.focus();
				announce('검색어가 지워졌습니다');
			});
		}

		// Close on Escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && !searchPanel.hasAttribute('hidden')) {
				closeSearchPanel();
			}
		});

		// Show/hide clear button based on input
		if (searchInput && searchClear) {
			searchInput.addEventListener('input', function() {
				if (this.value.length > 0) {
					searchClear.classList.remove('visually-hidden');
				} else {
					searchClear.classList.add('visually-hidden');
				}
			});
		}
	}

	// ============================================
	// MOBILE MENU FUNCTIONALITY
	// ============================================

	function initMobileMenu() {
		const mobileToggle = document.querySelector('.mobile-nav-toggle');
		const mainNav = document.getElementById('nav-menu');

		if (!mobileToggle || !mainNav) return;

		mobileToggle.addEventListener('click', function() {
			const isExpanded = this.getAttribute('aria-expanded') === 'true';

			if (isExpanded) {
				closeMobileMenu();
			} else {
				openMobileMenu();
			}
		});

		function openMobileMenu() {
			mobileToggle.setAttribute('aria-expanded', 'true');
			mobileToggle.querySelector('.menu-text').textContent = '닫기';
			mainNav.style.display = 'flex';
			announce('네비게이션 메뉴가 열렸습니다');
		}

		function closeMobileMenu() {
			mobileToggle.setAttribute('aria-expanded', 'false');
			mobileToggle.querySelector('.menu-text').textContent = '메뉴';
			mainNav.style.display = 'none';
			announce('네비게이션 메뉴가 닫혔습니다');
		}

		// Close on Escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && mainNav.style.display === 'flex') {
				closeMobileMenu();
			}
		});

		// Close when resizing to desktop
		window.addEventListener('resize', function() {
			if (window.innerWidth >= 768) {
				mainNav.style.display = '';
				mobileToggle.setAttribute('aria-expanded', 'false');
				mobileToggle.querySelector('.menu-text').textContent = '메뉴';
			}
		});
	}

	// ============================================
	// DROPDOWN MENU FUNCTIONALITY
	// ============================================

	function initDropdownMenus() {
		const navItems = document.querySelectorAll('.nav-item');

		navItems.forEach(function(navItem) {
			const navLink = navItem.querySelector('.nav-link');
			const dropdown = navItem.querySelector('.dropdown-menu');

			if (!navLink || !dropdown) return;

			// Ensure dropdown has proper ARIA
			const dropdownId = dropdown.id || generateId();
			dropdown.id = dropdownId;
			navLink.setAttribute('aria-controls', dropdownId);

			// Click handler
			navLink.addEventListener('click', function(e) {
				const isExpanded = this.getAttribute('aria-expanded') === 'true';

				// Close all other dropdowns
				closeAllDropdowns();

				if (!isExpanded) {
					openDropdown(this, dropdown);
					e.preventDefault();
				}
			});

			// Keyboard navigation
			navLink.addEventListener('keydown', function(e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					const isExpanded = this.getAttribute('aria-expanded') === 'true';

					if (isExpanded) {
						closeDropdown(this, dropdown);
					} else {
						closeAllDropdowns();
						openDropdown(this, dropdown);
					}
				} else if (e.key === 'Escape') {
					closeDropdown(this, dropdown);
				} else if (e.key === 'ArrowDown') {
					e.preventDefault();
					if (this.getAttribute('aria-expanded') !== 'true') {
						openDropdown(this, dropdown);
					}
					const firstLink = dropdown.querySelector('a');
					if (firstLink) firstLink.focus();
				}
			});

			// Arrow key navigation within dropdown
			const dropdownLinks = dropdown.querySelectorAll('a');
			dropdownLinks.forEach(function(link, index) {
				link.addEventListener('keydown', function(e) {
					if (e.key === 'ArrowDown') {
						e.preventDefault();
						const nextLink = dropdownLinks[index + 1];
						if (nextLink) {
							nextLink.focus();
						} else {
							dropdownLinks[0].focus(); // Loop back to first
						}
					} else if (e.key === 'ArrowUp') {
						e.preventDefault();
						const prevLink = dropdownLinks[index - 1];
						if (prevLink) {
							prevLink.focus();
						} else {
							navLink.focus(); // Go back to parent
						}
					} else if (e.key === 'Escape') {
						e.preventDefault();
						closeDropdown(navLink, dropdown);
						navLink.focus();
					}
				});
			});

			// Hover for desktop
			if (window.innerWidth >= 768) {
				navItem.addEventListener('mouseenter', function() {
					closeAllDropdowns();
					openDropdown(navLink, dropdown);
				});

				navItem.addEventListener('mouseleave', function() {
					closeDropdown(navLink, dropdown);
				});
			}
		});

		function openDropdown(link, dropdown) {
			link.setAttribute('aria-expanded', 'true');
			dropdown.removeAttribute('hidden');
		}

		function closeDropdown(link, dropdown) {
			link.setAttribute('aria-expanded', 'false');
			dropdown.setAttribute('hidden', '');
		}

		function closeAllDropdowns() {
			navItems.forEach(function(item) {
				const link = item.querySelector('.nav-link');
				const dropdown = item.querySelector('.dropdown-menu');
				if (link && dropdown) {
					closeDropdown(link, dropdown);
				}
			});
		}

		// Close dropdowns when clicking outside
		document.addEventListener('click', function(e) {
			const isNavItem = e.target.closest('.nav-item');
			if (!isNavItem) {
				closeAllDropdowns();
			}
		});
	}

	// ============================================
	// SMOOTH SCROLL WITH FOCUS MANAGEMENT
	// ============================================

	function initSmoothScroll() {
		const links = document.querySelectorAll('a[href^="#"]');

		links.forEach(function(link) {
			link.addEventListener('click', function(e) {
				const href = this.getAttribute('href');
				if (href === '#') return;

				const target = document.querySelector(href);
				if (!target) return;

				e.preventDefault();

				// Smooth scroll
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});

				// Manage focus for accessibility
				target.setAttribute('tabindex', '-1');
				target.focus();

				// Announce to screen readers
				const targetName = target.getAttribute('aria-label') ||
				                  target.querySelector('h1, h2, h3')?.textContent ||
				                  '대상 섹션';
				announce(targetName + '(으)로 이동했습니다');
			});
		});
	}

	// ============================================
	// ENHANCED FOCUS INDICATORS
	// ============================================

	function initFocusManagement() {
		// Add keyboard-user class to body when Tab is pressed
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Tab') {
				document.body.classList.add('keyboard-user');
			}
		});

		// Remove keyboard-user class on mouse click
		document.addEventListener('mousedown', function() {
			document.body.classList.remove('keyboard-user');
		});

		// Enhanced focus for interactive elements
		const interactiveElements = document.querySelectorAll(
			'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
		);

		interactiveElements.forEach(function(element) {
			element.addEventListener('focus', function() {
				this.classList.add('has-focus');
			});

			element.addEventListener('blur', function() {
				this.classList.remove('has-focus');
			});
		});
	}

	// ============================================
	// FORM VALIDATION AND ACCESSIBILITY
	// ============================================

	function initFormAccessibility() {
		const forms = document.querySelectorAll('form');

		forms.forEach(function(form) {
			form.setAttribute('novalidate', ''); // Use custom validation

			form.addEventListener('submit', function(e) {
				const isValid = validateForm(this);

				if (!isValid) {
					e.preventDefault();
					const firstError = this.querySelector('.field-error');
					if (firstError) {
						firstError.focus();
						announce('양식에 오류가 있습니다. 수정 후 다시 시도해주세요.', 'assertive');
					}
				}
			});

			// Real-time validation
			const inputs = form.querySelectorAll('input, textarea, select');
			inputs.forEach(function(input) {
				input.addEventListener('blur', function() {
					validateField(this);
				});

				input.addEventListener('input', function() {
					// Clear error on input
					clearFieldError(this);
				});
			});
		});

		function validateForm(form) {
			let isValid = true;
			const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

			inputs.forEach(function(input) {
				if (!validateField(input)) {
					isValid = false;
				}
			});

			return isValid;
		}

		function validateField(field) {
			clearFieldError(field);

			if (field.hasAttribute('required') && !field.value.trim()) {
				showFieldError(field, '이 필드는 필수입니다');
				return false;
			}

			if (field.type === 'email' && field.value) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(field.value)) {
					showFieldError(field, '유효한 이메일 주소를 입력해주세요');
					return false;
				}
			}

			return true;
		}

		function showFieldError(field, message) {
			field.setAttribute('aria-invalid', 'true');
			field.classList.add('field-error');

			const errorId = field.id + '-error';
			let errorElement = document.getElementById(errorId);

			if (!errorElement) {
				errorElement = document.createElement('div');
				errorElement.id = errorId;
				errorElement.className = 'error-message';
				errorElement.setAttribute('role', 'alert');
				errorElement.style.color = 'var(--color-error)';
				errorElement.style.fontSize = 'var(--font-size-small)';
				errorElement.style.marginTop = 'var(--spacing-xs)';
				field.setAttribute('aria-describedby', errorId);
				field.parentNode.insertBefore(errorElement, field.nextSibling);
			}

			errorElement.textContent = message;
		}

		function clearFieldError(field) {
			field.removeAttribute('aria-invalid');
			field.classList.remove('field-error');

			const errorId = field.id + '-error';
			const errorElement = document.getElementById(errorId);

			if (errorElement) {
				errorElement.textContent = '';
			}
		}
	}

	// ============================================
	// ACCESSIBLE MODALS/DIALOGS
	// ============================================

	function initModals() {
		const modalTriggers = document.querySelectorAll('[data-modal]');

		modalTriggers.forEach(function(trigger) {
			trigger.addEventListener('click', function(e) {
				e.preventDefault();
				const modalId = this.getAttribute('data-modal');
				const modal = document.getElementById(modalId);

				if (modal) {
					openModal(modal);
				}
			});
		});

		function openModal(modal) {
			// Store the element that opened the modal
			modal.dataset.triggerElement = document.activeElement.id ||
			                              document.activeElement.className;

			modal.removeAttribute('hidden');
			modal.setAttribute('aria-modal', 'true');
			modal.setAttribute('role', 'dialog');

			// Focus the first focusable element in the modal
			const firstFocusable = modal.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);

			if (firstFocusable) {
				firstFocusable.focus();
			}

			trapFocus(modal);

			// Close on escape
			const escapeHandler = function(e) {
				if (e.key === 'Escape') {
					closeModal(modal);
					document.removeEventListener('keydown', escapeHandler);
				}
			};
			document.addEventListener('keydown', escapeHandler);

			announce('모달이 열렸습니다');
		}

		function closeModal(modal) {
			modal.setAttribute('hidden', '');
			modal.removeAttribute('aria-modal');

			// Return focus to trigger element
			const triggerSelector = modal.dataset.triggerElement;
			if (triggerSelector) {
				const trigger = document.getElementById(triggerSelector) ||
				               document.querySelector('.' + triggerSelector);
				if (trigger) {
					trigger.focus();
				}
			}

			announce('모달이 닫혔습니다');
		}

		// Close buttons in modals
		const closeButtons = document.querySelectorAll('[data-modal-close]');
		closeButtons.forEach(function(button) {
			button.addEventListener('click', function() {
				const modal = this.closest('[role="dialog"]');
				if (modal) {
					closeModal(modal);
				}
			});
		});
	}

	// ============================================
	// CURRENT YEAR IN FOOTER
	// ============================================

	function updateCurrentYear() {
		const yearElement = document.getElementById('current-year');
		if (yearElement) {
			yearElement.textContent = new Date().getFullYear();
		}
	}

	// ============================================
	// LAZY LOADING IMAGES
	// ============================================

	function initLazyLoading() {
		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						const img = entry.target;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.removeAttribute('data-src');
						}
						observer.unobserve(img);
					}
				});
			});

			const lazyImages = document.querySelectorAll('img[data-src]');
			lazyImages.forEach(function(img) {
				imageObserver.observe(img);
			});
		} else {
			// Fallback for browsers that don't support IntersectionObserver
			const lazyImages = document.querySelectorAll('img[data-src]');
			lazyImages.forEach(function(img) {
				if (img.dataset.src) {
					img.src = img.dataset.src;
					img.removeAttribute('data-src');
				}
			});
		}
	}

	// ============================================
	// INITIALIZE ALL COMPONENTS
	// ============================================

	function init() {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initializeAll);
		} else {
			initializeAll();
		}
	}

	function initializeAll() {
		initLanguageSelector();
		initSearchPanel();
		initMobileMenu();
		initDropdownMenus();
		initSmoothScroll();
		initFocusManagement();
		initFormAccessibility();
		initModals();
		updateCurrentYear();
		initLazyLoading();

		// Announce page load to screen readers
		setTimeout(function() {
			announce('페이지가 성공적으로 로드되었습니다');
		}, 1000);
	}

	// Start initialization
	init();

	// ============================================
	// EXPOSE PUBLIC API
	// ============================================

	window.KBioXAccessibility = {
		announce: announce,
		trapFocus: trapFocus
	};

})();
