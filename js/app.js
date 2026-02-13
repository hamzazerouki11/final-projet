(function () {
  "use strict";

  var storage = window.GymStorage;
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var progressFill = document.getElementById("progress-fill");
  var progressLabels = Array.prototype.slice.call(
    document.querySelectorAll(".progress__label")
  );

  var toStep2 = document.getElementById("to-step-2");
  var toStep3 = document.getElementById("to-step-3");
  var backTo1 = document.getElementById("back-to-1");
  var confirm = document.getElementById("confirm-booking");
  var recap = document.getElementById("recap");
  var historyGrid = document.getElementById("history-grid");
  var viewHistory = document.getElementById("view-history");
  var themeToggle = document.getElementById("theme-toggle");
  var bookingName = document.getElementById("booking-name");
  var bookingEmail = document.getElementById("booking-email");
  var bookingPhone = document.getElementById("booking-phone");
  var bookingNote = document.getElementById("booking-note");

  if (!storage || !progressFill || steps.length === 0) {
    return;
  }

  var currentStep = 1;
  var lastAddedId = null;
  var currentTheme = "dark";
  var revealObserver = null;

  function setStep(step) {
    currentStep = step;
    steps.forEach(function (section) {
      var isActive = Number(section.dataset.step) === step;
      section.classList.toggle("is-active", isActive);
      if (isActive) {
        section.classList.remove("is-animating");
        window.requestAnimationFrame(function () {
          section.classList.add("is-animating");
        });
      } else {
        section.classList.remove("is-animating");
      }
    });
    progressLabels.forEach(function (label, index) {
      label.classList.toggle("is-active", index < step);
    });
    progressFill.style.width = String((step - 1) * 50) + "%";
  }

  function applyTheme(theme) {
    currentTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (themeToggle) {
      themeToggle.textContent = currentTheme === "light" ? "Mode sombre" : "Mode clair";
    }
    storage.set("gymbook:theme", currentTheme);
  }

  function getPreferredTheme() {
    var stored = storage.get("gymbook:theme", null);
    if (stored) {
      return stored;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  }

  function formatDate(iso) {
    if (!iso) {
      return "--";
    }
    var date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return "--";
    }
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function setupReveal() {
    if (revealObserver) {
      revealObserver.disconnect();
    }
    if (!("IntersectionObserver" in window)) {
      return;
    }
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  function refreshReveal() {
    var targets = document.querySelectorAll(".panel, .exercise-card, .history-card");
    if (!targets.length) {
      return;
    }
    if (!revealObserver) {
      setupReveal();
    }
    targets.forEach(function (el, index) {
      if (!el.classList.contains("reveal")) {
        el.classList.add("reveal");
      }
      el.style.transitionDelay = String((index % 6) * 80) + "ms";
      if (revealObserver) {
        revealObserver.observe(el);
      } else {
        el.classList.add("is-visible");
      }
    });
  }

  function canGoStep2() {
    return Boolean(storage.get("gymbook:session", null));
  }

  function canGoStep3() {
    return (
      Boolean(storage.get("gymbook:time", null)) &&
      Boolean(storage.get("gymbook:date", null)) &&
      Boolean(storage.get("gymbook:name", null)) &&
      Boolean(storage.get("gymbook:email", null))
    );
  }

  function updateButtons() {
    if (toStep2) {
      toStep2.disabled = !canGoStep2();
    }
    if (toStep3) {
      toStep3.disabled = !canGoStep3();
    }
  }

  function buildRecap() {
    if (!recap) {
      return;
    }
    recap.innerHTML = "";
    var session = storage.get("gymbook:session", "--");
    var date = formatDate(storage.get("gymbook:date", null));
    var time = storage.get("gymbook:time", "--");
    var name = storage.get("gymbook:name", "--");
    var email = storage.get("gymbook:email", "--");
    var phone = storage.get("gymbook:phone", "--");
    var note = storage.get("gymbook:note", "--");

    var items = [
      { label: "Seance", value: session },
      { label: "Date", value: date },
      { label: "Heure", value: time },
      { label: "Nom", value: name },
      { label: "Email", value: email },
      { label: "Telephone", value: phone },
      { label: "Note", value: note }
    ];

    items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "recap__item";
      row.innerHTML = "<span class=\"muted\">" + item.label + "</span><span>" + item.value + "</span>";
      recap.appendChild(row);
    });
  }

  function renderHistory() {
    if (!historyGrid) {
      return;
    }
    var history = storage.get("gymbook:history", []);
    historyGrid.innerHTML = "";

    if (!history.length) {
      var empty = document.createElement("div");
      empty.className = "muted";
      empty.textContent = "Aucune reservation pour le moment.";
      historyGrid.appendChild(empty);
      return;
    }

    history.forEach(function (entry) {
      var card = document.createElement("div");
      card.className = "history-card";
      if (entry.id === lastAddedId) {
        card.classList.add("is-new");
      }
      card.innerHTML =
        "<div><strong>" +
        entry.session +
        "</strong></div>" +
        "<div class=\"muted\">" +
        entry.name +
        "</div>" +
        "<div class=\"history-card__meta\">" +
        "<span>" +
        entry.date +
        "</span>" +
        "<span>" +
        entry.time +
        "</span>" +
        "</div>" +
        "<button class=\"ghost\" type=\"button\" data-id=\"" +
        entry.id +
        "\">Supprimer</button>";

      card.querySelector("button").addEventListener("click", function (event) {
        var id = event.currentTarget.getAttribute("data-id");
        card.classList.add("is-removing");
        window.setTimeout(function () {
          var next = history.filter(function (item) {
            return item.id !== id;
          });
          storage.set("gymbook:history", next);
          renderHistory();
        }, 240);
      });

      historyGrid.appendChild(card);
    });

    if (lastAddedId) {
      window.setTimeout(function () {
        lastAddedId = null;
      }, 500);
    }

    refreshReveal();
  }

  if (toStep2) {
    toStep2.addEventListener("click", function () {
      setStep(2);
    });
  }

  if (toStep3) {
    toStep3.addEventListener("click", function () {
      buildRecap();
      setStep(3);
    });
  }

  if (backTo1) {
    backTo1.addEventListener("click", function () {
      setStep(1);
    });
  }

  if (confirm) {
    confirm.addEventListener("click", function () {
      var history = storage.get("gymbook:history", []);
      var entry = {
        id: String(Date.now()),
        session: storage.get("gymbook:session", "--"),
        date: formatDate(storage.get("gymbook:date", null)),
        time: storage.get("gymbook:time", "--"),
        name: storage.get("gymbook:name", "--"),
        email: storage.get("gymbook:email", "--"),
        phone: storage.get("gymbook:phone", "--"),
        note: storage.get("gymbook:note", "--")
      };
      lastAddedId = entry.id;
      storage.set("gymbook:history", [entry].concat(history));
      renderHistory();
      buildRecap();
      if (viewHistory) {
        viewHistory.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (viewHistory) {
    viewHistory.addEventListener("click", function () {
      var historySection = document.getElementById("history");
      if (historySection) {
        historySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  document.addEventListener("gymbook:session-selected", updateButtons);
  document.addEventListener("gymbook:date-selected", updateButtons);
  document.addEventListener("gymbook:time-selected", updateButtons);
  document.addEventListener("gymbook:exercises-rendered", refreshReveal);

  function persistField(key, value) {
    storage.set(key, value.trim());
    updateButtons();
  }

  if (bookingName) {
    bookingName.value = storage.get("gymbook:name", "");
    bookingName.addEventListener("input", function () {
      persistField("gymbook:name", bookingName.value);
    });
  }

  if (bookingEmail) {
    bookingEmail.value = storage.get("gymbook:email", "");
    bookingEmail.addEventListener("input", function () {
      persistField("gymbook:email", bookingEmail.value);
    });
  }

  if (bookingPhone) {
    bookingPhone.value = storage.get("gymbook:phone", "");
    bookingPhone.addEventListener("input", function () {
      persistField("gymbook:phone", bookingPhone.value);
    });
  }

  if (bookingNote) {
    bookingNote.value = storage.get("gymbook:note", "");
    bookingNote.addEventListener("input", function () {
      persistField("gymbook:note", bookingNote.value);
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(currentTheme === "light" ? "dark" : "light");
    });
  }

  applyTheme(getPreferredTheme());

  updateButtons();
  renderHistory();
  refreshReveal();
  setStep(1);
})();
