(function() {
  const container = document.getElementById('project-ring-container');
  if (!container) return;

  const data = window.INDEX_DATA;
  if (!data) return;

  let lang = 'en';
  if (document.documentElement.lang && document.documentElement.lang.startsWith('zh')) {
    lang = 'zh';
  }

  const projects = data[lang].projects;
  if (!projects || projects.length === 0) return;

  const numItems = projects.length;
  
  const ringWrapper = document.createElement('div');
  ringWrapper.className = 'project-ring-wrapper';
  
  const ring = document.createElement('div');
  ring.className = 'project-ring';
  
  const items = [];
  projects.forEach((proj, i) => {
    const item = document.createElement('div');
    item.className = 'project-ring-item';
    
    const text = document.createElement('span');
    text.textContent = proj.title;
    item.appendChild(text);
    
    ring.appendChild(item);
    items.push({ el: item, index: i, slug: proj.slug, textEl: text });
    
    item.addEventListener('click', (e) => {
      if (item.classList.contains('active')) {
        const base = /\/projects\//.test(window.location.pathname) ? '' : 'projects/';
        window.location.href = base + proj.slug + '.html';
      } else {
        // Compute shortest path to this item
        let targetAngle = -i * angleStep;
        
        // Find closest equivalent angle
        let diff = (targetAngle - currentRotation) % 360;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        targetRotation = currentRotation + diff;
      }
    });
  });
  
  ringWrapper.appendChild(ring);
  container.appendChild(ringWrapper);

  const radius = window.innerWidth < 600 ? 160 : 250; 
  const angleStep = 360 / numItems;
  
  let currentRotation = 0;
  let targetRotation = 0;
  let isDragging = false;
  let prevX = 0;
  let velocityX = 0;
  let activeIndex = -1;
  let isTouch = false;

  function onPointerDown(e) {
    isDragging = true;
    isTouch = e.type === 'touchstart';
    prevX = isTouch ? e.touches[0].clientX : e.clientX;
    velocityX = 0;
    ringWrapper.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const dx = clientX - prevX;
    prevX = clientX;
    velocityX = dx;
    targetRotation += dx * 0.6; 
    
    // Prevent default scroll when swiping horizontally on the ring
    if (Math.abs(dx) > 2 && e.cancelable) {
      e.preventDefault();
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    ringWrapper.style.cursor = 'grab';
    
    targetRotation += velocityX * 1.5;
    
    const snapped = Math.round(targetRotation / angleStep) * angleStep;
    targetRotation = snapped;
  }

  ringWrapper.addEventListener('mousedown', onPointerDown);
  ringWrapper.addEventListener('touchstart', onPointerDown, { passive: false });
  
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);

  function animate() {
    currentRotation += (targetRotation - currentRotation) * 0.1;
    
    let newActiveIndex = -1;
    let minDistance = Infinity;

    items.forEach((itemObj) => {
      const i = itemObj.index;
      const baseAngle = i * angleStep;
      const angle = baseAngle + currentRotation;
      
      let normalizedAngle = ((angle % 360) + 360) % 360;
      if (normalizedAngle > 180) normalizedAngle -= 360;
      
      const absAngle = Math.abs(normalizedAngle);
      
      if (absAngle < minDistance) {
        minDistance = absAngle;
        newActiveIndex = i;
      }
      
      const isFront = absAngle < (angleStep / 2);
      
      let scale = 0.5;
      if (absAngle < 90) {
        scale = 0.5 + Math.pow((1 - absAngle / 90), 2) * 1.0; 
      }
      
      const opacity = 0.2 + (1 - Math.min(absAngle / 180, 1)) * 0.8;
      
      itemObj.el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`;
      itemObj.el.style.opacity = opacity;
      
      if (isFront) {
        itemObj.el.classList.add('active');
        itemObj.textEl.style.opacity = 1;
        itemObj.el.style.background = 'rgba(255, 255, 255, 1)';
        itemObj.el.style.borderColor = '#fff';
      } else {
        itemObj.el.classList.remove('active');
        itemObj.textEl.style.opacity = 0;
        itemObj.el.style.background = 'transparent';
        itemObj.el.style.borderColor = 'rgba(255, 255, 255, 0.4)';
      }
    });
    
    if (newActiveIndex !== activeIndex) {
      activeIndex = newActiveIndex;
      if (navigator.vibrate) {
        try { navigator.vibrate(15); } catch(e) {}
      }
    }

    requestAnimationFrame(animate);
  }

  ringWrapper.style.cursor = 'grab';
  
  // Initialize position to the current project if possible
  const currentPath = window.location.pathname;
  let startIndex = 0;
  projects.forEach((p, idx) => {
    if (currentPath.includes(p.slug)) startIndex = idx;
  });
  
  currentRotation = -startIndex * angleStep;
  targetRotation = currentRotation;

  animate();
})();