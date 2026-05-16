// ─── SCROLL REVEAL ───────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ─── SKILL BARS ANIMADAS ─────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, 300);
            });
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) barObserver.observe(skillsGrid);

// ─── NAVBAR ACTIVA POR SECCIÓN ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) {
            current = sec.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ─── EMAILJS - FORMULARIO REAL ───────────────────────────
// 📌 REEMPLAZA AQUÍ TUS DATOS REALES
const EMAILJS_PUBLIC_KEY = "QPS7MpqICLllnoSky";   // Tu public key (con comillas)
const EMAILJS_SERVICE_ID  = "service_lrndl7l";      // Cámbialo por tu Service ID (ej: 'service_abc123')
const EMAILJS_TEMPLATE_ID = "template_kfgjvmf";     // Cámbialo por tu Template ID (ej: 'template_xyz789')

// Inicializar EmailJS
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

async function handleFormSubmit(e) {
    e.preventDefault();

    // Mostrar estado "enviando"
    statusDiv.style.display = 'block';
    statusDiv.textContent = '📧 Enviando mensaje...';
    statusDiv.classList.remove('error');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Obtener datos del formulario
    const formData = new FormData(form);
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        time: new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })
    };

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        statusDiv.textContent = '✅ ¡Mensaje enviado correctamente! Te responderé pronto.';
        statusDiv.classList.remove('error');
        form.reset();
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 6000);
    } catch (error) {
        console.error('Error al enviar:', error);
        statusDiv.textContent = '❌ Error al enviar. Por favor, intentá de nuevo más tarde.';
        statusDiv.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensaje →';
        setTimeout(() => {
            if (statusDiv.textContent !== '✅ ¡Mensaje enviado correctamente! Te responderé pronto.') {
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 3000);
            }
        }, 8000);
    }
}

form.addEventListener('submit', handleFormSubmit);