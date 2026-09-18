(function(){
  // ---- Scroll reveal ----
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(revealEls.length){
    if(reduceMotion || !('IntersectionObserver' in window)){
      revealEls.forEach(function(el){ el.classList.add('visible'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
      revealEls.forEach(function(el){ io.observe(el); });
    }
  }

  // ---- Nav shadow on scroll ----
  var nav = document.querySelector('.nav');
  if(nav){
    var onScroll = function(){
      if(window.scrollY > 8) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // ---- Acts accordion ----
  var acts = Array.prototype.slice.call(document.querySelectorAll('.act'));
  acts.forEach(function(act){
    act.querySelector('.act-head').addEventListener('click', function(){
      var wasOpen = act.classList.contains('open');
      acts.forEach(function(a){a.classList.remove('open');});
      if(!wasOpen) act.classList.add('open');
    });
  });

  // ---- Quiz wizard ----
  var TOTAL = 6;
  var state = {resp:'', respLabel:'', nombre:'', email:'', telefono:'', situacion:'', freno:'', frenoLabel:''};
  var current = 1;
  var history = [1];
  var steps = Array.prototype.slice.call(document.querySelectorAll('.quiz-step'));
  var progressFill = document.getElementById('progressFill');
  var stepLabel = document.getElementById('stepLabel');
  var backBtn = document.getElementById('backBtn');

  function showStep(n){
    steps.forEach(function(s){ s.hidden = (parseInt(s.dataset.step,10) !== n); });
    current = n;
    if(n <= TOTAL){
      progressFill.style.width = ((n/TOTAL)*100)+'%';
      stepLabel.textContent = 'PÁGINA ' + n + ' DE ' + TOTAL;
    } else {
      progressFill.style.width = '100%';
      stepLabel.textContent = 'LISTO';
    }
    backBtn.hidden = (n === 1 || n > TOTAL);
  }

  function goTo(n){
    history.push(n);
    showStep(n);
  }

  backBtn.addEventListener('click', function(){
    if(history.length > 1){
      history.pop();
      showStep(history[history.length-1]);
    }
  });

  // Step 1 & 6: option buttons
  document.querySelectorAll('.opt[data-field]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var field = btn.dataset.field;
      state[field] = btn.dataset.value;
      if(field === 'resp'){
        state.respLabel = btn.dataset.label;
        goTo(2);
      } else if(field === 'freno'){
        state.frenoLabel = btn.dataset.label;
        buildWhatsapp();
        goTo(7);
      }
    });
  });

  // Steps 2-5: text inputs
  function wireTextStep(inputId, field, nextStep, validator){
    var input = document.getElementById(inputId);
    var btn = document.querySelector('[data-step-next="'+nextStep+'"]');
    function check(){ btn.disabled = !validator(input.value.trim()); }
    input.addEventListener('input', function(){ state[field] = input.value.trim(); check(); });
    check();
    btn.addEventListener('click', function(){
      if(!btn.disabled) goTo(nextStep + 1);
    });
  }
  wireTextStep('q-nombre', 'nombre', 2, function(v){ return v.length > 1; });
  wireTextStep('q-email', 'email', 3, function(v){ return /\S+@\S+\.\S+/.test(v); });
  wireTextStep('q-telefono', 'telefono', 4, function(v){ return v.replace(/[^0-9]/g,'').length >= 6; });
  wireTextStep('q-situacion', 'situacion', 5, function(v){ return v.length > 4; });

  function buildWhatsapp(){
    var lines = [
      'Hola Mario, quiero reescribir mi guion.',
      '',
      'Respuesta inicial: ' + state.respLabel,
      'Nombre: ' + state.nombre,
      'Email: ' + state.email,
      'Teléfono: ' + state.telefono,
      'Situación: ' + state.situacion,
      'Mayor freno: ' + state.frenoLabel
    ];
    var text = encodeURIComponent(lines.join('\n'));
    document.getElementById('waLink').href = 'https://wa.me/34633712475?text=' + text;
  }

  showStep(1);
})();
