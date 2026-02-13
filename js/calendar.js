(function () {
  "use strict";

  var storage = window.GymStorage;
  var title = document.getElementById("calendar-title");
  var daysRoot = document.getElementById("calendar-days");
  var prevBtn = document.getElementById("prev-month");
  var nextBtn = document.getElementById("next-month");

  if (!storage || !daysRoot || !title) {
    return;
  }

  var monthNames = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];

  var today = new Date();
  var viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function renderCalendar(selectedDate) {
    daysRoot.innerHTML = "";

    var year = viewDate.getFullYear();
    var month = viewDate.getMonth();
    var firstDay = new Date(year, month, 1);
    var startOffset = (firstDay.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    title.textContent = monthNames[month] + " " + year;

    for (var i = 0; i < startOffset; i += 1) {
      var empty = document.createElement("div");
      daysRoot.appendChild(empty);
    }

    for (var day = 1; day <= daysInMonth; day += 1) {
      var date = new Date(year, month, day);
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "calendar__day";
      cell.textContent = String(day);

      if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        cell.classList.add("is-disabled");
      }

      if (sameDay(date, today)) {
        cell.classList.add("is-today");
      }

      if (selectedDate && sameDay(date, selectedDate)) {
        cell.classList.add("is-selected");
      }

      cell.addEventListener("click", function (event) {
        var picked = new Date(year, month, Number(event.currentTarget.textContent));
        storage.set("gymbook:date", picked.toISOString());
        renderCalendar(picked);
        document.dispatchEvent(new CustomEvent("gymbook:date-selected"));
      });

      daysRoot.appendChild(cell);
    }
  }

  function getStoredDate() {
    var stored = storage.get("gymbook:date", null);
    if (!stored) {
      return null;
    }
    var parsed = new Date(stored);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }
    return parsed;
  }

  function updateView(delta) {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
    renderCalendar(getStoredDate());
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      updateView(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      updateView(1);
    });
  }

  renderCalendar(getStoredDate());
})();
