function handleTickInit(tick) {
  // Configuración del idioma
  var locale = {
    YEAR_PLURAL: 'Años',
    YEAR_SINGULAR: 'Año',
    MONTH_PLURAL: 'Meses',
    MONTH_SINGULAR: 'Mes',
    WEEK_PLURAL: 'Semanas',
    WEEK_SINGULAR: 'Semana',
    DAY_PLURAL: 'Días',
    DAY_SINGULAR: 'Día',
    HOUR_PLURAL: 'Horas',
    HOUR_SINGULAR: 'Hora',
    MINUTE_PLURAL: 'Minutos',
    MINUTE_SINGULAR: 'Minuto',
    SECOND_PLURAL: 'Segundos',
    SECOND_SINGULAR: 'Segundo',
    MILLISECOND_PLURAL: 'Milisegundos',
    MILLISECOND_SINGULAR: 'Milisegundo'
  };

  // Establecer las constantes de idioma
  for (var key in locale) {
    if (!locale.hasOwnProperty(key)) { continue; }
    tick.setConstant(key, locale[key]);
  }

  // Inicializar el contador
  var countdownDate = "2025-02-03T00:00:00+01:00";
  var counter = Tick.count.down(countdownDate);

  counter.onupdate = function (value) {
    tick.value = value;
  };

  counter.onended = function () {
    // Aquí puedes añadir lo que sucede cuando termine la cuenta atrás
  };

  // Configurar las animaciones después de que el contador esté iniciado
  setTimeout(() => {
    initializeAnimations();
  }, 100);
}

function initializeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animar el título
        const title = entry.target.querySelector('#title h1');
        if (title) {
          title.classList.add('animate');
        }

        // Animar los grupos del contador
        const tickGroups = entry.target.querySelectorAll('.tick-group');
        tickGroups.forEach((group, index) => {
          setTimeout(() => {
            group.classList.add('animate');
          }, index * 100);
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  // Observar la sección del contador
  const counterSection = document.querySelector('#counter');
  if (counterSection) {
    observer.observe(counterSection);
  }
}
