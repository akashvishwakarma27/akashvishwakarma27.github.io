let menu = document.getElementById('menu-icon')
let navbar = document.querySelector('.navbar')
let m = document.querySelector('.main-body')
let count = 0
menu.addEventListener('click', () => {
	menu.classList.toggle('bx-x')
	navbar.classList.toggle('open')

	m.style.marginTop = '200px'
	count++
	if (count % 2 == 0) {
		m.style.marginTop = '0px'
	}

	if (m.classList.contains('m-t')) {
		m.classList.remove('m-t')
	} else {
		m.classList.add('m-t')
	}
})

document.getElementById('resume-button-1').onclick = () => {
	window.open(
		'https://drive.google.com/file/d/1IEaQZ-84AfoAtweWqwHMa0gbD5II87MW/view?usp=sharing',
		`_blank`
	)
}

document.getElementById('resume-button-2').onclick = () => {
	window.open(
		'https://drive.google.com/file/d/1IEaQZ-84AfoAtweWqwHMa0gbD5II87MW/view?usp=sharing',
		`_blank`
	)
}
