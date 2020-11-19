const app = {
  ready: (callback) => {
    // In case the document is already rendered
    if (document.readyState!='loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
  },
  menu: {},
  keys: {},
  overlay: {},
  animations: { tracked: [] }
};

const dispatch = e => document.dispatchEvent(new Event(e));
const select = selector => document.querySelector(selector)
const selectAll = selector => document.querySelectorAll(selector)

const listen = (obj, event, callback) => {
  obj = typeof obj === "string" ? select(obj) : obj;
  obj.addEventListener(event, callback);
}

const listenAll = (objs, event, callback) => {
  objs = typeof objs === "string" ? selectAll(objs) : objs;
  for (const obj of objs) { listen(obj, event, callback) }
}

app.ready(() => {
  listen(document, "keyup", e => { if (e.keyCode == app.keys.ESC) app.keys.handleESC() });
    
  listen(document, "keydown", e => {
    if (e.keyCode == app.keys.arrowUp) app.keys.handleArrowUp(e);
    else if (e.keyCode == app.keys.arrowDown) app.keys.handleArrowDown(e);
    else if (e.keyCode == app.keys.enter) app.keys.handleEnter(e);
  });

  listen(window, "scroll", app.animations.onlyPlayVisible);
});

app.menu.visible = false;
app.ready(() => {
  app.menu.icon = select(".menu-js");
  listen(app.menu.icon, "click", e => !app.menu.visible ? app.menu.reveal(e) : app.menu.hide(e));
});

app.menu.toggleStates = () => {
  select('body').classList.toggle('no-scroll');
  app.menu.icon.classList.toggle('menu-active');
  select('.nav-js').classList.toggle('nav-active');
}

app.menu.reveal = e => {
  app.menu.visible = true;
  app.menu.toggleStates();
  dispatch("app:menuWillShow");

  app.overlay.show({
    position: app.clickPosition(e),
    fill: "#31296d"
  });

  anime.remove('.nav-js, .nav-js-header-line, .nav-js-animate');

  let containerDelay = 200;
  anime({
    targets:'.nav-js',
    opacity: [0, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  var menuItemDelay = 90;
  containerDelay += 75;
  select(".nav-js-header").style.opacity = 0;
  anime({
    targets: ".nav-js-header",
    opacity: [0,1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });
  
  select(".nav-js-header-line").style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(0.2)');
  anime({
    targets:'.nav-js-header-line',
    scaleX: [0.28, .7],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 600
  });
  containerDelay += 350;

  for (let animated of selectAll(".nav-js-animate")) {
    animated.style.opacity = 0;
    animated.style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(0.9)');
  }

  anime({
    targets: '.nav-js-animate',
    translateY: ["-7px", 0],
    scale: [0.9, 1],
    opacity: [0, 1],
    delay: (el, i) => containerDelay + menuItemDelay * (i+1),
    duration: 1100,
    easing: "easeOutExpo",
    complete: () => dispatch('app:menuDidReveal')
  });
}

app.menu.hide = (e) => {
  app.menu.visible = false;
  app.menu.toggleStates();
  dispatch("app:menuWillHide");

  app.overlay.hide({
    position: app.overlay.lastStartingPoint,
    fill: "#31296d",
    complete: () => dispatch("app:menuDidHide")
  });

  anime.remove('.nav-js, .nav-js-header-line, .nav-js-animate');

  anime({
    targets:'.nav-js',
    opacity: 0,
    easing: "easeInOutExpo",
    duration: 200
  });

  anime({
    targets:'.nav-js-header-line',
    scale: 0.5,
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets: '.nav-js-animate',
    translateY: "10px",
    scale: 0.9,
    opacity: 0,
    easing: "easeInExpo",
    duration: 200
  });
}

// Management of animations
app.animations.track = (animeTimeline, el) => {
  // Add object to list of tracked animations
  app.animations.tracked.push({
    timeline: animeTimeline, 
    element: el
  });
}

app.animations.onlyPlayVisible = () => {
  app.animations.tracked.forEach((animation) => {
    app.animations.shouldPlay(animation) ? animation.timeline.play() : animation.timeline.pause();
  });
}

app.animations.shouldPlay = (animation) => {
  var winHeight = window.innerHeight;
  var bounds = animation.element.getBoundingClientRect();
  var offset = 5; // Greater offset -> animations will play less often

  // Check if bottom of animation is above view or if top of animation is below view
  if (bounds.bottom < 0+offset || bounds.top > winHeight-offset) return false;
  // Default to true
  return true;
}

app.ready(() => {
  app.overlay.c = select(".nav-canvas");
  app.overlay.ctx = app.overlay.c.getContext("2d");
  app.overlay.cH;
  app.overlay.cW;
  app.overlay.bgColor = "transparent";
  app.overlay.resizeCanvas();
  app.overlay.lastStartingPoint = {x: 0, y: 0};

  listen(window, "resize", app.overlay.resizeCanvas);
});

app.overlay.resizeCanvas = function() {
  app.overlay.cW = window.innerWidth;
  app.overlay.cH = window.innerHeight;
  app.overlay.c.width = app.overlay.cW * window.devicePixelRatio;
  app.overlay.c.height = app.overlay.cH * window.devicePixelRatio;
  app.overlay.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  app.overlay.ctx.fillStyle = app.overlay.bgColor;
  app.overlay.ctx.fillRect(0, 0, app.overlay.cW, app.overlay.cH);
}

app.overlay.show = options => {
  app.overlay.c.style.display = "block";
  app.overlay.lastStartingPoint = options.position;

  options.targetRadius = app.overlay.calcPageFillRadius(options.position.x, options.position.y);
  options.startRadius = 0;
  options.easing = "easeOutQuart";
  app.overlay.animate(options);
}

// Hide the overlay. Args:
// fill: color to animate with
// position: position to target as the circle shrinks
// complete: completion callback
app.overlay.hide = options => {
  options.targetRadius = 0;
  options.easing = "easeInOutQuart";

  const callback = options.complete;
  options.complete = () => { 
    app.overlay.c.style.display = "none";
    app.overlay.bgColor = "transparent";
    if (callback) callback();
  };

  options.startRadius = app.overlay.calcPageFillRadius(options.position.x, options.position.y);
  app.overlay.animate(options);
}

// Animate from one size to another. Args:
// position: {x, y}
// fill: "color" 
// startRadius: number
// targetRadius: number
// complete: callback method
app.overlay.animate = (options) => {
  const minCoverDuration = 750;
  app.overlay.bgColor = options.fill;
  
  app.overlay.circle.x = options.position.x;
  app.overlay.circle.y = options.position.y;
  app.overlay.circle.r = options.startRadius;
  app.overlay.circle.fill = options.fill;

  anime.remove(app.overlay.circle)

  anime({
    targets: app.overlay.circle,
    r: options.targetRadius,
    duration:  Math.max(options.targetRadius/2, minCoverDuration),
    easing: options.easing,
    complete: options.complete ? options.complete : null,
    update: () => app.overlay.circle.draw({
      startRadius: options.startRadius,
      targetRadius: options.targetRadius
    })
  });
}

app.overlay.calcPageFillRadius = function(x, y) {
  var l = Math.max(x - 0, app.overlay.cW - x);
  var h = Math.max(y - 0, app.overlay.cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

app.clickPosition = (e) => {
  if (e.touches) e = e.touches[0];

  if (e.clientX && e.clientY) return {
    x: e.clientX, 
    y: e.clientY
  }

  // If there was no clientX and Y set, use the center position of
  // the target as a backup
  var rect = e.target.getBoundingClientRect();
  return {
    x: rect.top + (rect.bottom - rect.top)/2,
    y: rect.left + (rect.right - rect.left)/2
  }
}

app.overlay.circle = {};

app.overlay.circle.draw = function(options) {
  if (options.targetRadius < options.startRadius) {
    app.overlay.ctx.clearRect(0,0, app.overlay.cW, app.overlay.cH);
  }

  app.overlay.ctx.beginPath();
  app.overlay.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  app.overlay.ctx.fillStyle = this.fill;
  app.overlay.ctx.fill();
  app.overlay.ctx.closePath();
}
