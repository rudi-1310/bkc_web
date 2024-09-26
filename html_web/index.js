// Toggle Navigation
document.getElementById("nav-btn").addEventListener("click", function () {
  document.getElementById("takeover-nav").classList.toggle("shown");
  document.querySelector('.sticky-nav').classList.toggle("difference");
});

// Initiation Variables
var icon = document.getElementById("nav-btn");
var topLine = document.getElementById("top-line-1");
var middleLine = document.getElementById("middle-line-1");
var bottomLine = document.getElementById("bottom-line-1");
var state = "menu";  // can be "menu" or "arrow"
var segmentDuration = 15;
var currentFrame = 1;
var animating = false; // To prevent continuous animation

// Ease Functions (Simple replacements for AJS.easeInBack and AJS.easeOutBack)
function easeInOutBack(t, b, c, d) {
  var s = 1.70158;
  if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
  return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

// Menu Disappear Animation
function menuDisappearAnimation() {
  if (currentFrame <= segmentDuration) {
    requestAnimationFrame(menuDisappearAnimation);
    var topLineY = easeInOutBack(currentFrame, 37, 13, segmentDuration);
    var bottomLineY = easeInOutBack(currentFrame, 63, -13, segmentDuration);
    topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
    bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
    currentFrame++;
  } else {
    middleLine.style.opacity = "0";
    currentFrame = 1;
    openMenuAnimation();
  }
}

// Arrow Appear Animation
function arrowAppearAnimation() {
  if (currentFrame <= segmentDuration) {
    requestAnimationFrame(arrowAppearAnimation);
    var topLeftX = easeInOutBack(currentFrame, 30, 5, segmentDuration);
    var topLeftY = easeInOutBack(currentFrame, 50, -15, segmentDuration);
    var bottomRightX = easeInOutBack(currentFrame, 70, -5, segmentDuration);
    var bottomRightY = easeInOutBack(currentFrame, 50, 15, segmentDuration);
    topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
    var bottomLeftX = easeInOutBack(currentFrame, 30, 5, segmentDuration);
    var bottomLeftY = easeInOutBack(currentFrame, 50, 15, segmentDuration);
    var topRightX = easeInOutBack(currentFrame, 70, -5, segmentDuration);
    var topRightY = easeInOutBack(currentFrame, 50, -15, segmentDuration);
    bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
    currentFrame++;
  } else {
    currentFrame = 1;
    animating = false; // Animation complete, reset flag
  }
}

// Combined Open Menu Animation
function openMenuAnimation() {
  if (state === "menu") {
    menuDisappearAnimation();
  } else {
    arrowAppearAnimation();
  }
}

// Arrow Disappear Animation
function arrowDisappearAnimation() {
  if (currentFrame <= segmentDuration) {
    requestAnimationFrame(arrowDisappearAnimation);
    var topLeftX = easeInOutBack(currentFrame, 35, -5, segmentDuration);
    var topLeftY = easeInOutBack(currentFrame, 35, 15, segmentDuration);
    var bottomRightX = easeInOutBack(currentFrame, 65, 5, segmentDuration);
    var bottomRightY = easeInOutBack(currentFrame, 65, -15, segmentDuration);
    topLine.setAttribute("d", "M" + topLeftX + "," + topLeftY + " L" + bottomRightX + "," + bottomRightY);
    var bottomLeftX = easeInOutBack(currentFrame, 35, -5, segmentDuration);
    var bottomLeftY = easeInOutBack(currentFrame, 65, -15, segmentDuration);
    var topRightX = easeInOutBack(currentFrame, 65, 5, segmentDuration);
    var topRightY = easeInOutBack(currentFrame, 35, 15, segmentDuration);
    bottomLine.setAttribute("d", "M" + bottomLeftX + "," + bottomLeftY + " L" + topRightX + "," + topRightY);
    currentFrame++;
  } else {
    middleLine.style.opacity = "1";
    currentFrame = 1;
    closeMenuAnimation();
  }
}

// Menu Appear Animation
function menuAppearAnimation() {
  if (currentFrame <= segmentDuration) {
    requestAnimationFrame(menuAppearAnimation);
    var topLineY = easeInOutBack(currentFrame, 50, -13, segmentDuration);
    var bottomLineY = easeInOutBack(currentFrame, 50, 13, segmentDuration);
    topLine.setAttribute("d", "M30," + topLineY + " L70," + topLineY);
    bottomLine.setAttribute("d", "M30," + bottomLineY + " L70," + bottomLineY);
    currentFrame++;
  } else {
    currentFrame = 1;
    animating = false; // Animation complete, reset flag
  }
}

// Close Menu Animation
function closeMenuAnimation() {
  if (state === "arrow") {
    arrowDisappearAnimation();
  } else {
    menuAppearAnimation();
  }
}

// Events
icon.addEventListener("click", function () {
  if (!animating) { // Prevent new animation if one is already running
    animating = true;
    if (state === "menu") {
      openMenuAnimation();
      state = "arrow";
    } else {
      closeMenuAnimation();
      state = "menu";
    }
  }
});

// Cursor
document.addEventListener("DOMContentLoaded", function () {
  var cursor = document.querySelector(".custom-cursor");
  var links = document.querySelectorAll("a, button, #nav-btn, input.btn");
  var initCursor = false;

  links.forEach(function (link) {
    link.addEventListener("mouseover", function () {
      cursor.classList.add("custom-cursor--link");
    });
    link.addEventListener("mouseout", function () {
      cursor.classList.remove("custom-cursor--link");
    });
  });

  window.onmousemove = function (e) {
    if (!initCursor) {
      cursor.style.opacity = 1;
      initCursor = true;
    }
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  };

  window.ontouchmove = function (e) {
    if (!initCursor) {
      cursor.style.opacity = 1;
      initCursor = true;
    }
    cursor.style.top = e.touches[0].clientY + "px";
    cursor.style.left = e.touches[0].clientX + "px";
  };

  window.onmouseout = function () {
    cursor.style.opacity = 0;
    initCursor = false;
  };

  window.ontouchstart = function () {
    cursor.style.opacity = 1;
  };

  window.ontouchend = function () {
    setTimeout(function () {
      cursor.style.opacity = 0;
    }, 200);
  };
});
