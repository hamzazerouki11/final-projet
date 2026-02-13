(function () {
  "use strict";

  var storage = window.GymStorage;
  var sessionCards = document.querySelectorAll(".session-card");
  var sessionGrid = document.getElementById("session-grid");
  var sessionPrev = document.getElementById("session-prev");
  var sessionNext = document.getElementById("session-next");
  var timeGrid = document.getElementById("time-grid");

  if (!storage) {
    return;
  }

  var times = [
    { label: "08:00", available: true },
    { label: "10:00", available: true },
    { label: "12:00", available: false },
    { label: "18:00", available: true },
    { label: "20:00", available: true }
  ];

  function setSelectedSession(session) {
    storage.set("gymbook:session", session);
    sessionCards.forEach(function (card) {
      card.classList.toggle("is-selected", card.dataset.session === session);
    });
    document.dispatchEvent(new CustomEvent("gymbook:session-selected"));
  }

  function setVisibleSession(index, autoSelect) {
    var total = sessionCards.length;
    if (!total) {
      return;
    }
    var nextIndex = ((index % total) + total) % total;
    sessionCards.forEach(function (card, idx) {
      card.classList.toggle("is-visible", idx === nextIndex);
    });
    storage.set("gymbook:session-index", nextIndex);
    if (autoSelect) {
      var visible = sessionCards[nextIndex];
      if (visible) {
        setSelectedSession(visible.dataset.session);
      }
    }
  }

  sessionCards.forEach(function (card) {
    card.addEventListener("click", function () {
      setSelectedSession(card.dataset.session);
    });
  });

  if (sessionPrev) {
    sessionPrev.addEventListener("click", function () {
      var current = storage.get("gymbook:session-index", 0);
      setVisibleSession(current - 1, true);
    });
  }

  if (sessionNext) {
    sessionNext.addEventListener("click", function () {
      var current = storage.get("gymbook:session-index", 0);
      setVisibleSession(current + 1, true);
    });
  }

  if (sessionGrid) {
    var touchStartX = 0;
    var touchStartY = 0;
    sessionGrid.addEventListener("touchstart", function (event) {
      var touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });

    sessionGrid.addEventListener("touchend", function (event) {
      var touch = event.changedTouches[0];
      var deltaX = touch.clientX - touchStartX;
      var deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }
      var current = storage.get("gymbook:session-index", 0);
      if (deltaX < 0) {
        setVisibleSession(current + 1, true);
      } else {
        setVisibleSession(current - 1, true);
      }
    });
  }

  function renderTimes() {
    if (!timeGrid) {
      return;
    }
    var stored = storage.get("gymbook:time", null);
    timeGrid.innerHTML = "";
    times.forEach(function (slot) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "time-slot";
      button.textContent = slot.label;

      if (!slot.available) {
        button.classList.add("is-disabled");
      }

      if (stored === slot.label) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", function () {
        storage.set("gymbook:time", slot.label);
        renderTimes();
        document.dispatchEvent(new CustomEvent("gymbook:time-selected"));
      });

      timeGrid.appendChild(button);
    });
  }

  function bootSession() {
    var saved = storage.get("gymbook:session", null);
    var savedIndex = storage.get("gymbook:session-index", 0);
    if (saved) {
      var idx = Array.prototype.findIndex.call(sessionCards, function (card) {
        return card.dataset.session === saved;
      });
      if (idx >= 0) {
        savedIndex = idx;
      }
    }
    setVisibleSession(savedIndex, !saved);
    if (saved) {
      setSelectedSession(saved);
    }
  }

  renderTimes();
  bootSession();
})();
