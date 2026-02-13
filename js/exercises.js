(function () {
  "use strict";

  var storage = window.GymStorage;
  var grid = document.getElementById("exercise-grid");
  var shuffleButton = document.getElementById("shuffle-exercises");

  // Mapping exercise IDs to detail pages
  var exercisePageMap = {
    "cross-box": "box-jump.html",
    "cross-battle": "battle-rope.html",
    "cross-circuit": "circuit-kettlebell.html",
    "bike": "bike-interval.html",
    "rower": "confirmation.html",
    "hiit": "hiit-sprint.html"
  };

  var fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%231b1b24'/><stop offset='1' stop-color='%2322222d'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><circle cx='920' cy='180' r='140' fill='%23e10600' opacity='0.35'/><text x='80' y='420' fill='%23ffffff' font-family='Arial' font-size='64'>GYMZONE</text><text x='80' y='490' fill='%23b3b3b3' font-family='Arial' font-size='28'>Visuel temporaire</text></svg>";

  if (!grid) {
    return;
  }

  var allExercises = [
    {
      id: "squat",
      title: "Squat barre",
      category: "Musculation",
      focus: "Jambes",
      level: "Intermediaire",
      duration: "40 min",
      calories: "320 kcal",
      images: [
        "assets/Squat barre.png"
      ]
    },
    {
      id: "bench",
      title: "Developpe couche",
      category: "Musculation",
      focus: "Pectoraux",
      level: "Debutant",
      duration: "35 min",
      calories: "260 kcal",
      images: [
        "assets/Devleoppe chouche.png"
      ]
    },
    {
      id: "deadlift",
      title: "Souleve de terre",
      category: "Musculation",
      focus: "Dos",
      level: "Avance",
      duration: "45 min",
      calories: "360 kcal",
      images: [
        "assets/Souleve de terre.png"
      ]
    },
    {
      id: "shoulder",
      title: "Developpe militaire",
      category: "Musculation",
      focus: "Epaules",
      level: "Intermediaire",
      duration: "30 min",
      calories: "240 kcal",
      images: [
        "assets/Developpe militaire.png"
      ]
    },
    {
      id: "row",
      title: "Rowing barre",
      category: "Musculation",
      focus: "Dos",
      level: "Intermediaire",
      duration: "35 min",
      calories: "280 kcal",
      images: [
        "assets/Rowing barre.png"
      ]
    },
    {
      id: "pullup",
      title: "Tractions",
      category: "Musculation",
      focus: "Dos + bras",
      level: "Intermediaire",
      duration: "25 min",
      calories: "210 kcal",
      images: [
        "assets/Tractions.png"
      ]
    },
    {
      id: "hip-thrust",
      title: "Hip thrust",
      category: "Musculation",
      focus: "Fessiers",
      level: "Debutant",
      duration: "30 min",
      calories: "230 kcal",
      images: [
        "assets/Hip thrust.png"
      ]
    },
    {
      id: "curls",
      title: "Curl halteres",
      category: "Musculation",
      focus: "Biceps",
      level: "Debutant",
      duration: "20 min",
      calories: "160 kcal",
      images: [
        "assets/Curl halteres.png"
      ]
    },
    {
      id: "core",
      title: "Gainage charge",
      category: "Musculation",
      focus: "Core",
      level: "Intermediaire",
      duration: "20 min",
      calories: "150 kcal",
      images: [
        "assets/Gainage charge.png"
      ]
    },
    {
      id: "hiit",
      title: "HIIT sprint",
      category: "Cardio",
      focus: "Endurance",
      level: "Intermediaire",
      duration: "25 min",
      calories: "300 kcal",
      images: [
        "assets/HIIT sprint.png"
      ]
    },
    {
      id: "bike",
      title: "Bike interval",
      category: "Cardio",
      focus: "Cardio",
      level: "Debutant",
      duration: "30 min",
      calories: "260 kcal",
      images: [
        "assets/Bike interval.png"
      ]
    },
    {
      id: "rower",
      title: "Rameur",
      category: "Cardio",
      focus: "Full body",
      level: "Debutant",
      duration: "20 min",
      calories: "220 kcal",
      images: [
        "assets/Rameur.png"
      ]
    },
    {
      id: "cross-circuit",
      title: "Circuit kettlebell",
      category: "Cross Training",
      focus: "Full body",
      level: "Intermediaire",
      duration: "30 min",
      calories: "340 kcal",
      images: [
        "assets/Circuit kettlebell.png"
      ]
    },
    {
      id: "cross-box",
      title: "Box jump",
      category: "Cross Training",
      focus: "Explosivite",
      level: "Intermediaire",
      duration: "20 min",
      calories: "260 kcal",
      images: [
        "assets/Box jump.png"
      ]
    },
    {
      id: "cross-battle",
      title: "Battle rope",
      category: "Cross Training",
      focus: "Conditioning",
      level: "Avance",
      duration: "15 min",
      calories: "230 kcal",
      images: [
        "assets/Battle rope.png"
      ]
    },
    {
      id: "yoga-flow",
      title: "Flow dynamique",
      category: "Yoga",
      focus: "Mobilite",
      level: "Debutant",
      duration: "35 min",
      calories: "180 kcal",
      images: [
        "assets/Flow dynamique.png"
      ]
    },
    {
      id: "yoga-breath",
      title: "Respiration guidee",
      category: "Yoga",
      focus: "Relaxation",
      level: "Debutant",
      duration: "20 min",
      calories: "90 kcal",
      images: [
        "assets/Respiration guidee.png"
      ]
    },
    {
      id: "yoga-balance",
      title: "Equilibre",
      category: "Yoga",
      focus: "Stabilite",
      level: "Intermediaire",
      duration: "25 min",
      calories: "140 kcal",
      images: [
        "assets/Equilibre.png"
      ]
    }
  ];

  var cycleTimer = null;
  var currentIndex = {};
  var currentExercises = allExercises.slice();

  function resolveImageSrc(src) {
    if (!src) {
      return "";
    }
    // Handle spaces in filenames by replacing them with %20
    return src.replace(/\s/g, "%20");
  }

  // Category color mapping
  var categoryColors = {
    "Musculation": "tag--power",
    "Cardio": "tag--cardio",
    "Cross Training": "tag--cross",
    "Yoga": "tag--zen"
  };

  function getCategoryClass(category) {
    return categoryColors[category] || "tag--default";
  }

  function cardMarkup(exercise) {
    var encodedImagePath = resolveImageSrc(exercise.images[0]);
    var hasDetailPage = exercisePageMap[exercise.id];
    
    return (
      "<article class=\"exercise-card\" data-ex-id=\"" +
      exercise.id +
      "\">" +
      "<div class=\"exercise-media" +
      (exercise.mediaClass ? " " + exercise.mediaClass : "") +
      "\">" +
      "<img src=\"" +
      encodedImagePath +
      "\" data-raw-src=\"" +
      exercise.images[0] +
      "\" alt=\"" +
      exercise.title +
      "\" loading=\"lazy\" />" +
      "</div>" +
      "<div class=\"exercise-body\">" +
      "<div class=\"exercise-title\">" +
      exercise.title +
      "</div>" +
      "<div class=\"exercise-tags\">" +
      "<span class=\"exercise-tag " + getCategoryClass(exercise.category) + "\">" +
      exercise.category +
      "</span>" +
      "<span class=\"exercise-tag\">" +
      exercise.focus +
      "</span>" +
      "<span class=\"exercise-tag\">" +
      exercise.level +
      "</span>" +
      "</div>" +
      "<div class=\"exercise-meta\">" +
      "<span>" +
      exercise.duration +
      "</span>" +
      "<span>" +
      exercise.calories +
      "</span>" +
      "</div>" +
      "<div class=\"exercise-actions\">" +
      (hasDetailPage
        ? "<a href=\"" + exercisePageMap[exercise.id] + "\" class=\"exercise-cta\" style=\"text-decoration: none; display: inline-flex; align-items: center; gap: 0.5ch;\">Voir details >><span class=\"exercise-cta__glow\"></span></a>"
        : "<button class=\"exercise-cta\" type=\"button\" disabled>Non disponible<span class=\"exercise-cta__glow\"></span></button>") +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function render(list) {
    grid.innerHTML = list.map(cardMarkup).join("");
    attachImageFallback();
    document.dispatchEvent(new CustomEvent("gymbook:exercises-rendered"));
  }

  function attachImageFallback() {
    var images = grid.querySelectorAll("img");
    images.forEach(function (img) {
      if (img.dataset.fallbackReady) {
        return;
      }
      img.dataset.fallbackReady = "true";
      
      // Preload with encoded path
      var encodedSrc = resolveImageSrc(img.dataset.rawSrc);
      img.src = encodedSrc;
      
      img.addEventListener("error", function () {
        console.warn("Image failed to load:", img.src);
        if (img.src === fallbackImage) {
          return;
        }
        img.src = fallbackImage;
      });
    });
  }

  function filterBySession() {
    if (!storage) {
      currentExercises = allExercises.slice();
      return currentExercises;
    }
    var selected = storage.get("gymbook:session", null);
    if (!selected) {
      currentExercises = allExercises.slice();
      return currentExercises;
    }
    currentExercises = allExercises.filter(function (exercise) {
      return exercise.category === selected;
    });
    return currentExercises;
  }

  function shuffleExercises() {
    currentExercises = currentExercises.slice().sort(function () {
      return Math.random() - 0.5;
    });
    render(currentExercises);
    startCycle();
  }

  function startCycle() {
    var cards = grid.querySelectorAll(".exercise-card");
    currentIndex = {};

    if (cycleTimer) {
      window.clearInterval(cycleTimer);
    }

    cards.forEach(function (card) {
      var id = card.getAttribute("data-ex-id");
      currentIndex[id] = 0;
    });

    cycleTimer = window.setInterval(function () {
      cards.forEach(function (card) {
        var id = card.getAttribute("data-ex-id");
        var exercise = currentExercises.find(function (item) {
          return item.id === id;
        });
        var img = card.querySelector("img");
        if (!exercise || !img) {
          return;
        }
        if (exercise.images.length <= 1) {
          return;
        }
        var nextIndex = (currentIndex[id] + 1) % exercise.images.length;
        currentIndex[id] = nextIndex;
        img.style.opacity = "0.6";
        window.setTimeout(function () {
          var encodedPath = resolveImageSrc(exercise.images[nextIndex]);
          img.src = encodedPath;
          img.style.opacity = "1";
        }, 200);
      });
    }, 4200);
  }

  if (shuffleButton) {
    shuffleButton.addEventListener("click", shuffleExercises);
  }

  document.addEventListener("gymbook:session-selected", function () {
    filterBySession();
    render(currentExercises);
    startCycle();
  });

  window.setTimeout(function () {
    filterBySession();
    render(currentExercises);
    startCycle();
  }, 1100);
})();
