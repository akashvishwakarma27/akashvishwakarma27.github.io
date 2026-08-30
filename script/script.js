/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu')
navToggle = document.getElementById('nav-toggle')
navClose = document.getElementById('nav-close')

if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu')
	})
}
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu')
	})
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
	const navMenu = document.getElementById('nav-menu')
	navMenu.classList.remove('show-menu')
}
navLink.forEach((n) => n.addEventListener('click', linkAction))

/*==================== SKILLS (accordion) ====================*/
const skillsContent = document.getElementsByClassName('skills_content')
const skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills() {
	const panel = this.parentNode
	const willOpen = panel.className.indexOf('skills_close') !== -1

	for (let i = 0; i < skillsContent.length; i++) {
		skillsContent[i].className = 'skills_content skills_close'
		const h = skillsContent[i].querySelector('.skills_header')
		if (h) h.setAttribute('aria-expanded', 'false')
	}
	if (willOpen) {
		panel.className = 'skills_content skills_open'
		this.setAttribute('aria-expanded', 'true')
	}
}

skillsHeader.forEach((element) => {
	element.setAttribute('tabindex', '0')
	element.setAttribute('role', 'button')
	element.setAttribute(
		'aria-expanded',
		element.parentNode.className.indexOf('skills_open') !== -1 ? 'true' : 'false'
	)
	element.addEventListener('click', toggleSkills)
	element.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			toggleSkills.call(this)
		}
	})
})

/*==================== QUALIFICATION ====================*/
// const tabs = document.querySelectorAll('[data-target]')
// tabContents = document.querySelectorAll('[data-content]')

// tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         const target = document.querySelector(tab.dataset.target)

//         tabContents.forEach(tabContent => {
//             tabContent.classList.remove('qualification_active')
//         })
//         target.classList.add('qualification_active')

//         tab.forEach(tab => {
//             tab.classList.remove('qualification_active')
//         })
//         tab.classList.add('qualification_active')
//     })
// })

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
	const scrollY = window.pageYOffset

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight
		const sectionTop = current.offsetTop - 50
		const sectionId = current.getAttribute('id')
		const link = document.querySelector(
			'.nav_menu a[href*="' + sectionId + '"]'
		)
		if (!link) return

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			link.classList.add('active-link')
		} else {
			link.classList.remove('active-link')
		}
	})
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
	const nav = document.getElementById('header')
	// When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 80) nav.classList.add('scroll-header')
	else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
	const scrollUp = document.getElementById('scroll-up')
	// When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollUp.classList.add('show-scroll')
	else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK / LIGHT THEME ====================*/
// The initial theme is set pre-paint by an inline script in <head>.
;(function () {
	const btn = document.getElementById('theme-toggle')
	if (!btn) return
	const root = document.documentElement
	const icon = btn.querySelector('i')

	function paint(theme) {
		root.setAttribute('data-theme', theme)
		const dark = theme === 'dark'
		btn.setAttribute('aria-pressed', String(dark))
		btn.setAttribute(
			'aria-label',
			dark ? 'Switch to light theme' : 'Switch to dark theme'
		)
		if (icon) {
			icon.classList.toggle('uil-sun', dark)
			icon.classList.toggle('uil-moon', !dark)
		}
	}

	paint(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')

	btn.addEventListener('click', () => {
		const next =
			root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
		try {
			localStorage.setItem('theme', next)
		} catch (e) {}
		paint(next)
	})

	// follow the OS if the user never made an explicit choice
	const mq = window.matchMedia('(prefers-color-scheme: dark)')
	mq.addEventListener &&
		mq.addEventListener('change', (e) => {
			try {
				if (localStorage.getItem('theme')) return
			} catch (err) {}
			paint(e.matches ? 'dark' : 'light')
		})
})()

/*==================== CONTACT FORM (AJAX + inline status) ====================*/
const contactForm = document.getElementById('contact-form')
const contactStatus = document.getElementById('contact-status')

if (contactForm && contactStatus && window.fetch) {
	const setStatus = (msg, ok) => {
		contactStatus.textContent = msg
		contactStatus.hidden = false
		contactStatus.classList.toggle('is-ok', !!ok)
		contactStatus.classList.toggle('is-error', !ok)
	}

	contactForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const btn = contactForm.querySelector('button[type="submit"]')
		const original = btn.innerHTML
		btn.disabled = true
		btn.textContent = 'Sending…'

		try {
			const res = await fetch(contactForm.action, {
				method: 'POST',
				body: new FormData(contactForm),
				headers: { Accept: 'application/json' },
			})
			if (res.ok) {
				contactForm.reset()
				setStatus("Thanks — your message has been sent. I'll get back to you soon.", true)
			} else {
				const data = await res.json().catch(() => ({}))
				const detail =
					data && data.errors && data.errors.length
						? data.errors.map((x) => x.message).join(', ')
						: 'Something went wrong. Please email me directly instead.'
				setStatus(detail, false)
			}
		} catch (err) {
			setStatus('Network error — please email me directly instead.', false)
		} finally {
			btn.disabled = false
			btn.innerHTML = original
		}
	})
}
