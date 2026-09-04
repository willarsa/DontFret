(() => {
  const ROUNDS_TO_MASTER = 3;
  const STORAGE_KEY = "fretRecall.poolProgress.v2";
  const SETTINGS_KEY = "fretRecall.settings.v2";

  const chordData = {
    "Am":    { type:"minor",   frets:[-1,0,2,2,1,0], fingers:[0,0,2,3,1,0], notes:["×","A","E","A","C","E"] },
    "C":     { type:"major",   frets:[-1,3,2,0,1,0], fingers:[0,3,2,0,1,0], notes:["×","C","E","G","C","E"] },
    "G":     { type:"major",   frets:[3,2,0,0,0,3], fingers:[2,1,0,0,0,3], notes:["G","B","D","G","B","G"] },
    "Em":    { type:"minor",   frets:[0,2,2,0,0,0], fingers:[0,2,3,0,0,0], notes:["E","B","E","G","B","E"] },
    "A":     { type:"major",   frets:[-1,0,2,2,2,0], fingers:[0,0,1,2,3,0], notes:["×","A","E","A","C♯","E"] },
    "A7":    { type:"seventh", frets:[-1,0,2,0,2,0], fingers:[0,0,2,0,3,0], notes:["×","A","E","G","C♯","E"] },
    "E7":    { type:"seventh", frets:[0,2,0,1,0,0], fingers:[0,2,0,1,0,0], notes:["E","B","D","G♯","B","E"] },
    "D7":    { type:"seventh", frets:[-1,-1,0,2,1,2], fingers:[0,0,0,2,1,3], notes:["×","×","D","A","C","F♯"] },
    "F":     { type:"major",   frets:[1,3,3,2,1,1], fingers:[1,3,4,2,1,1], notes:["F","C","F","A","C","F"], barre:{fret:1, from:0, to:5, finger:1} },
    "Dm":    { type:"minor",   frets:[-1,-1,0,2,3,1], fingers:[0,0,0,2,3,1], notes:["×","×","D","A","D","F"] },
    "G7":    { type:"seventh", frets:[3,2,0,0,0,1], fingers:[3,2,0,0,0,1], notes:["G","B","D","G","B","F"] },
    "Asus2": { type:"sus",     frets:[-1,0,2,2,0,0], fingers:[0,0,2,3,0,0], notes:["×","A","E","A","B","E"] },
    "E":     { type:"major",   frets:[0,2,2,1,0,0], fingers:[0,2,3,1,0,0], notes:["E","B","E","G♯","B","E"] },
    "D":     { type:"major",   frets:[-1,-1,0,2,3,2], fingers:[0,0,0,1,3,2], notes:["×","×","D","A","D","F♯"] },
    "C7":    { type:"seventh", frets:[-1,3,2,3,1,0], fingers:[0,3,2,4,1,0], notes:["×","C","E","B♭","C","E"] },
    "B7":    { type:"seventh", frets:[-1,2,1,2,0,2], fingers:[0,2,1,3,0,4], notes:["×","B","D♯","A","B","F♯"] }
  };

  const pools = [
    {
      id:"rock-ade", level:"Starter pool", name:"Three-Chord Rock", chords:["A","D","E"],
      description:"Build fast changes between the classic I–IV–V shapes in A.",
      song:{ title:"Wild Thing", artist:"The Troggs", version:"simplified practice loop", progression:["A","D","E","D"], demo:{bpm:72, feel:"4/4 practice pulse", steps:["↓","↓↑","↓","↓↑"]}, pattern:"↓  ↓↑  ↓  ↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"Use this as a chord-change exercise inspired by the song rather than an exact transcription. Keep the fretting hand relaxed and aim for clean changes before adding speed." }
    },
    {
      id:"riptide", level:"Song pool", name:"Riptide", chords:["Am","G","C"],
      description:"Master the three open-chord shapes used throughout a capo-1 practice arrangement of Vance Joy’s Riptide.",
      song:{ title:"Riptide", artist:"Vance Joy", version:"capo 1 · standard tuning · simplified practice loop", progression:["Am","G","C","C"], demo:{bpm:102, feel:"4/4 indie-folk practice pulse", steps:["↓","↓↑","↑","↓↑"]}, pattern:"↓  ↓↑  ↑  ↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"Put a capo on fret 1. Practice the repeating Am → G → C progression, holding C for the extra measure before returning to Am. Focus on smooth changes and steady rhythm before increasing speed." }
    },
    {
      id:"g-family", level:"Starter pool", name:"G-Family Changes", chords:["G","C","D","Em"],
      description:"Four open chords that unlock a huge amount of beginner rhythm guitar.",
      song:{ title:"Stand by Me", artist:"Ben E. King", version:"practice key of G", progression:["G","Em","C","D"], demo:{bpm:70, feel:"4/4 practice pulse", steps:["↓","↓↑","↑","↓↑"]}, pattern:"↓  ↓↑  ↑↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"This is a transposed practice version of the familiar I–vi–IV–V loop. Start slowly and keep your strumming hand moving through the chord changes." }
    },
    {
      id:"d-rock", level:"Starter pool", name:"D–A–G Rock", chords:["D","A","G"],
      description:"A second three-chord family with a different set of anchor fingers.",
      song:{ title:"Bad Moon Rising", artist:"Creedence Clearwater Revival", version:"simplified practice loop", progression:["D","A","G","D"], demo:{bpm:76, feel:"4/4 practice pulse", steps:["↓","↓↑","↑","↓↑"]}, pattern:"↓  ↓↑  ↑↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"The goal here is smooth chord movement and a steady right hand. The displayed loop is a compact practice version, not a full song chart." }
    },
    {
      id:"story-minor", level:"Intermediate pool", name:"Minor Story Chords", chords:["Am","C","D","F","E"],
      description:"Mix open chords with the F barre shape and stronger major/minor contrast.",
      song:{ title:"House of the Rising Sun", artist:"The Animals", version:"simplified chord cycle", progression:["Am","C","D","F","Am","C","E","E"], demo:{bpm:78, feel:"6/8 picking pulse", steps:["low","mid","high","mid","high","mid"]}, pattern:"1  2  3  4  5  6", count:"6/8 feel: pick low → middle → high → middle", note:"This song is often practiced as a rolling 6/8 arpeggio rather than a flat strum. Use the six-count pattern as a picking guide and focus on landing each new chord cleanly on beat 1." }
    },
    {
      id:"country-e", level:"Intermediate pool", name:"E-Country Turnaround", chords:["E","A","B7"],
      description:"Learn the B7 shape and hear how a dominant chord pulls strongly back to E.",
      song:{ title:"Folsom Prison Blues", artist:"Johnny Cash", version:"simplified practice key", progression:["E","E","A","E","B7","E"], demo:{bpm:82, feel:"Country boom-chuck", steps:["bass","strum","bass","strum"]}, pattern:"↓  ↓↑  ↓  ↓↑", count:"Boom-chuck feel: bass / strum / bass / strum", note:"Use a light alternating-bass feel if you want the country character. The progression shown is condensed for practicing the three chord shapes rather than representing every measure." }
    },
    {
      id:"two-chord-country", level:"Short pool", name:"C + G7 Changes", chords:["C","G7"],
      description:"A tiny pool for drilling one very common tonic-to-dominant movement.",
      song:{ title:"Jambalaya (On the Bayou)", artist:"Hank Williams", version:"practice key of C", progression:["C","G7","G7","C"], demo:{bpm:74, feel:"4/4 practice pulse", steps:["↓","↓↑","↓","↓↑"]}, pattern:"↓  ↓↑  ↓  ↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"Because there are only two shapes, use this pool to work on timing: make the change without stopping the strumming motion." }
    },
    {
      id:"blues-a", level:"Blues pool", name:"A7 12-Bar Set", chords:["A7","D7","E7"],
      description:"Three dominant-seventh shapes for a complete blues form in A.",
      song:{ title:"12-Bar Blues in A", artist:"song-ready jam", version:"classic I7–IV7–V7 form", progression:["A7","A7","D7","A7","E7","D7","A7","E7"], demo:{bpm:72, feel:"Shuffle practice pulse", steps:["↓","·","↓↑","·"]}, pattern:"↓  ·  ↓↑  ·  ↓↑", count:"Shuffle feel: 1 a 2 a 3 a 4 a", note:"This reward is a reusable blues form rather than one fixed song. Once these three chords feel automatic, you can use the same shapes to jam over many blues and early rock-and-roll tunes." }
    },
    {
      id:"minor-gym", level:"Technique pool", name:"Open Minor Gym", chords:["Am","Dm","Em"],
      description:"Separate the three common open minor shapes so your hand recognizes them instantly.",
      song:{ title:"Minor-Key Practice Jam", artist:"Fret Recall", version:"original practice loop", progression:["Am","Dm","Em","Am"], demo:{bpm:68, feel:"4/4 practice pulse", steps:["↓","↓↑","↑","↓↑"]}, pattern:"↓  ↓↑  ↑↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"This one is intentionally a practice jam rather than a specific song. Listen to how Dm and Em create different tension before resolving back to Am." }
    },
    {
      id:"color-chords", level:"Technique pool", name:"Open-Chord Colors", chords:["A","Asus2","D","E"],
      description:"Train the small finger movement between A and Asus2 while keeping common tones ringing.",
      song:{ title:"Open-Chord Color Jam", artist:"Fret Recall", version:"original practice loop", progression:["A","Asus2","D","E"], demo:{bpm:66, feel:"4/4 practice pulse", steps:["↓","↓↑","↑","↓↑"]}, pattern:"↓  ↓↑  ↑↓↑", count:"Count: 1 & 2 & 3 & 4 &", note:"Let the open strings ring and listen to the suspended sound of Asus2. This pool is about touch and chord color more than speed." }
    },
    {
      id:"dominant-colors", level:"Technique pool", name:"Dominant 7th Colors", chords:["C7","G7","D7","B7"],
      description:"Compare four dominant-seventh shapes that each want to resolve somewhere different.",
      song:{ title:"Dominant 7th Turnaround Jam", artist:"Fret Recall", version:"original practice loop", progression:["C7","G7","D7","B7"], demo:{bpm:70, feel:"Shuffle practice pulse", steps:["↓","·","↓↑","·"]}, pattern:"↓  ·  ↓↑  ·  ↓↑", count:"Loose shuffle: 1 a 2 a 3 a 4 a", note:"Treat this as an ear-and-shape workout. The chords deliberately move outside one key so you can learn each seventh shape by feel instead of relying on a predictable progression." }
    }
  ];

  const $ = (sel) => document.querySelector(sel);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i=a.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const elements = {
    poolKicker:$("#poolKicker"), poolTitle:$("#poolTitle"), poolDescription:$("#poolDescription"), roundBadge:$("#roundBadge"),
    progressFill:$("#progressFill"), masteryRow:$("#masteryRow"), rewardTitle:$("#rewardTitle"), rewardState:$("#rewardState"),
    quizCard:$("#quizCard"), eyebrow:$("#eyebrow"), forwardPrompt:$("#forwardPrompt"), reversePrompt:$("#reversePrompt"),
    chordName:$("#chordName"), reverseDiagram:$("#reverseDiagram"), choiceGrid:$("#choiceGrid"), hearBtn:$("#hearBtn"), showBtn:$("#showBtn"),
    forwardActions:$("#forwardActions"), feedbackRow:$("#feedbackRow"), feedbackCopy:$("#feedbackCopy"), continueBtn:$("#continueBtn"),
    diagramCard:$("#diagramCard"), diagramTitle:$("#diagramTitle"), diagram:$("#diagram"), songCard:$("#songCard"), songTitle:$("#songTitle"),
    songMeta:$("#songMeta"), songNote:$("#songNote"), songProgression:$("#songProgression"), strumPattern:$("#strumPattern"), strumCount:$("#strumCount"),
    demoTempo:$("#demoTempo"), demoTempoValue:$("#demoTempoValue"), demoCurrentDiagram:$("#demoCurrentDiagram"), demoNextDiagram:$("#demoNextDiagram"),
    demoStepLabel:$("#demoStepLabel"), demoChordName:$("#demoChordName"), demoNextChord:$("#demoNextChord"), demoFeel:$("#demoFeel"), demoBeatCount:$("#demoBeatCount"),
    demoBeats:$("#demoBeats"), demoPlayBtn:$("#demoPlayBtn"), demoPrevBtn:$("#demoPrevBtn"), demoNextBtn:$("#demoNextBtn"), demoHearBtn:$("#demoHearBtn"), demoStatus:$("#demoStatus"),
    poolList:$("#poolList"), drawerBackdrop:$("#drawerBackdrop"), reverseChance:$("#reverseChance"), reverseChanceValue:$("#reverseChanceValue"),
    sampleStatusTitle:$("#sampleStatusTitle"), sampleStatusNote:$("#sampleStatusNote"), sampleCount:$("#sampleCount"), sampleProgressFill:$("#sampleProgressFill"),
    sampleFilesInput:$("#sampleFilesInput"), sampleFolderInput:$("#sampleFolderInput"), sampleChecklist:$("#sampleChecklist"), clearSamplesBtn:$("#clearSamplesBtn"), loadBuiltInSamplesBtn:$("#loadBuiltInSamplesBtn")
  };

  let progress = loadJSON(STORAGE_KEY, {});
  let settings = loadJSON(SETTINGS_KEY, { poolId:pools[0].id, reverseChance:30 });
  if (!pools.some(p => p.id === settings.poolId)) settings.poolId = pools[0].id;
  settings.reverseChance = clamp(Number(settings.reverseChance ?? 30), 0, 100);

  let currentChord = null;
  let previousChord = null;
  let questionType = "forward";
  let answered = false;
  let isRevealed = false;
  let audioCtx = null;
  let audioMaster = null;
  const sampleBank = new Map();
  const loadedSampleNames = new Set();
  const lastVariationByKey = new Map();
  const fallbackBufferCache = new Map();
  const remoteLoadPromises = new Map();
  const remoteFailedKeys = new Set();
  let preloadAllPromise = null;
  const stringLabels = ["low E", "A", "D", "G", "B", "high E"];
  const WAVEBASE_ROOT = "https://media.githubusercontent.com/media/cluesurf/wavebase/refs/heads/make/base/guitar/stratocaster/";
  const BUILTIN_SAMPLE_FILES = {
    s1_f0:"string-6-E-as-E2.wav", s1_f1:"string-6-F-as-F2.wav", s1_f3:"string-6-G-as-G2.wav",
    s2_f0:"string-5-A-as-A2.wav", s2_f2:"string-5-B-as-B2.wav", s2_f3:"string-5-C-as-C3.wav",
    s3_f0:"string-4-D-as-D3.wav", s3_f1:"string-4-Dx-as-Dx3.wav", s3_f2:"string-4-E-as-E3.wav", s3_f3:"string-4-F-as-F3.wav",
    s4_f0:"string-3-G-as-G3.wav", s4_f1:"string-3-Gx-as-Gx3.wav", s4_f2:"string-3-A-as-A3.wav", s4_f3:"string-3-Ax-as-Ax3.wav",
    s5_f0:"string-2-B-as-B3.wav", s5_f1:"string-2-C-as-C4.wav", s5_f2:"string-2-Cx-as-Cx4.wav", s5_f3:"string-2-D-as-D4.wav",
    s6_f0:"string-1-E-as-E4.wav", s6_f1:"string-1-F-as-F4.wav", s6_f2:"string-1-Fx-as-Fx4.wav", s6_f3:"string-1-G-as-G4.wav"
  };
  let demoIndex = 0;
  let demoBeat = 0;
  let demoPlaying = false;
  let demoTimer = null;
  let demoBpm = 72;

  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }
  function currentPool() { return pools.find(p => p.id === settings.poolId) || pools[0]; }

  function ensurePoolProgress(pool) {
    if (!progress[pool.id]) progress[pool.id] = { mastery:{} };
    if (!progress[pool.id].mastery) progress[pool.id].mastery = {};
    pool.chords.forEach(chord => {
      const value = Number(progress[pool.id].mastery[chord] || 0);
      progress[pool.id].mastery[chord] = clamp(value, 0, ROUNDS_TO_MASTER);
    });
    return progress[pool.id];
  }

  function masteryFor(pool, chord) { return ensurePoolProgress(pool).mastery[chord] || 0; }
  function poolCompleted(pool) { return pool.chords.every(chord => masteryFor(pool, chord) >= ROUNDS_TO_MASTER); }
  function poolPercent(pool) {
    const total = pool.chords.length * ROUNDS_TO_MASTER;
    const earned = pool.chords.reduce((sum, chord) => sum + masteryFor(pool, chord), 0);
    return Math.round((earned / total) * 100);
  }
  function currentRound(pool) {
    if (poolCompleted(pool)) return ROUNDS_TO_MASTER;
    const low = Math.min(...pool.chords.map(chord => masteryFor(pool, chord)));
    return low + 1;
  }

  function renderPoolStatus() {
    const pool = currentPool();
    const complete = poolCompleted(pool);
    const round = currentRound(pool);
    elements.poolKicker.textContent = pool.level;
    elements.poolTitle.textContent = pool.name;
    elements.poolDescription.textContent = pool.description;
    elements.roundBadge.textContent = complete ? "3 of 3 rounds complete" : `Round ${round} of ${ROUNDS_TO_MASTER}`;
    elements.progressFill.style.width = `${poolPercent(pool)}%`;
    elements.rewardTitle.textContent = pool.song.title;
    elements.rewardState.textContent = complete ? "Unlocked ✓" : "Locked · master the pool";
    elements.rewardState.classList.toggle("unlocked", complete);

    elements.masteryRow.innerHTML = pool.chords.map(chord => {
      const count = masteryFor(pool, chord);
      const dots = Array.from({length:ROUNDS_TO_MASTER}, (_, i) => `<span class="mastery-dot ${i < count ? "on" : ""}"></span>`).join("");
      return `<div class="mastery-chip"><strong>${chord}</strong><span class="mastery-dots" aria-label="${count} of ${ROUNDS_TO_MASTER} rounds complete">${dots}</span></div>`;
    }).join("");
  }

  function renderPoolList() {
    const active = currentPool().id;
    elements.poolList.innerHTML = pools.map(pool => {
      const pct = poolPercent(pool);
      const done = poolCompleted(pool);
      return `<button class="pool-card ${pool.id === active ? "active" : ""}" data-pool-id="${pool.id}">
        <div class="pool-card-top"><strong>${pool.name}</strong><span class="pct">${pct}%</span></div>
        <div class="pool-chords">${pool.chords.join(" · ")}</div>
        <div class="pool-song ${done ? "unlocked" : ""}">${done ? "✓" : "♩"} ${pool.song.title}</div>
      </button>`;
    }).join("");
  }

  function nextChordCandidate(pool) {
    const counts = pool.chords.map(chord => masteryFor(pool, chord));
    const minCount = Math.min(...counts);
    let candidates = pool.chords.filter(chord => masteryFor(pool, chord) === minCount);
    if (candidates.length > 1 && previousChord) candidates = candidates.filter(c => c !== previousChord);
    if (!candidates.length) candidates = pool.chords.filter(chord => masteryFor(pool, chord) === minCount);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function newQuestion() {
    stopSongDemo(false);
    const pool = currentPool();
    renderPoolStatus();
    renderPoolList();
    hideDiagram();
    elements.feedbackRow.classList.remove("show");
    elements.forwardActions.style.display = "none";
    answered = false;

    if (poolCompleted(pool)) {
      showSongReward();
      return;
    }

    elements.songCard.classList.remove("show");
    elements.quizCard.style.display = "block";
    previousChord = currentChord;
    currentChord = nextChordCandidate(pool);
    questionType = Math.random() * 100 < settings.reverseChance ? "reverse" : "forward";

    if (questionType === "reverse") renderReverseQuestion();
    else renderForwardQuestion();
  }

  function renderForwardQuestion() {
    elements.eyebrow.textContent = `Round ${currentRound(currentPool())} · play this chord`;
    elements.forwardPrompt.style.display = "block";
    elements.reversePrompt.classList.remove("show");
    elements.chordName.textContent = currentChord;
    elements.showBtn.style.display = "inline-flex";
    elements.forwardActions.style.display = "grid";
    elements.choiceGrid.innerHTML = "";
  }

  function renderReverseQuestion() {
    elements.eyebrow.textContent = `Round ${currentRound(currentPool())} · reverse quiz`;
    elements.forwardPrompt.style.display = "none";
    elements.reversePrompt.classList.add("show");
    elements.showBtn.style.display = "none";
    elements.forwardActions.style.display = "none";
    elements.reverseDiagram.innerHTML = buildChordSVG(currentChord, chordData[currentChord], true);

    const pool = currentPool();
    const allNames = Object.keys(chordData).filter(name => name !== currentChord);
    const preferred = pool.chords.filter(name => name !== currentChord);
    const distractors = shuffle([...preferred, ...shuffle(allNames.filter(n => !preferred.includes(n)))])
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .slice(0, 3);
    const options = shuffle([currentChord, ...distractors]);
    elements.choiceGrid.innerHTML = options.map(name => `<button class="choice-btn" data-choice="${name}">${name}</button>`).join("");
  }

  function advanceMastery(chord) {
    const pool = currentPool();
    const p = ensurePoolProgress(pool);
    p.mastery[chord] = clamp((p.mastery[chord] || 0) + 1, 0, ROUNDS_TO_MASTER);
    saveJSON(STORAGE_KEY, progress);
    renderPoolStatus();
    renderPoolList();
    return p.mastery[chord];
  }

  function gradeForward(correct) {
    if (answered || questionType !== "forward") return;
    answered = true;
    elements.forwardActions.style.display = "none";

    if (correct) {
      const count = advanceMastery(currentChord);
      const mastered = count >= ROUNDS_TO_MASTER;
      showFeedback(true, mastered ? `${currentChord} mastered` : `${currentChord} cleared this round`, mastered ? "That shape has now been recalled correctly in all three rounds." : "One clean recall added to this pool's mastery progress.");
    } else {
      showDiagram(true);
      showFeedback(false, `${currentChord} stays in this round`, "No progress was lost. Review the fingering, then it will come back again later.");
    }
  }

  function gradeReverse(choice, button) {
    if (answered || questionType !== "reverse") return;
    answered = true;
    const correct = choice === currentChord;
    const buttons = [...elements.choiceGrid.querySelectorAll(".choice-btn")];
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.choice === currentChord) btn.classList.add("correct");
    });
    if (!correct) button.classList.add("wrong");

    if (correct) {
      const count = advanceMastery(currentChord);
      const mastered = count >= ROUNDS_TO_MASTER;
      showFeedback(true, mastered ? `${currentChord} mastered` : "Correct fingering match", mastered ? "That chord is now complete across all three rounds." : `${currentChord} moved forward one mastery round.`);
    } else {
      showFeedback(false, `That was ${currentChord}`, "The chord does not advance. You will see it again later in this round.");
    }
  }

  function showFeedback(success, title, detail) {
    elements.feedbackCopy.className = `feedback-copy ${success ? "success" : "error"}`;
    elements.feedbackCopy.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    elements.feedbackRow.classList.add("show");
    elements.continueBtn.textContent = poolCompleted(currentPool()) ? "Unlock song →" : "Next chord →";
  }

  function showDiagram(forceOpen = false) {
    if (questionType !== "forward") return;
    if (isRevealed && !forceOpen) { hideDiagram(); return; }
    isRevealed = true;
    elements.diagramTitle.textContent = `${currentChord} fingering`;
    elements.diagram.innerHTML = buildChordSVG(currentChord, chordData[currentChord]);
    elements.diagramCard.classList.add("show");
    elements.showBtn.classList.add("revealed");
    elements.showBtn.innerHTML = '<span aria-hidden="true">◉</span> Hide fingering';
  }

  function hideDiagram() {
    isRevealed = false;
    elements.diagramCard.classList.remove("show");
    elements.showBtn.classList.remove("revealed");
    elements.showBtn.innerHTML = '<span aria-hidden="true">◉</span> Show fingering';
  }

  function showSongReward() {
    const pool = currentPool();
    const song = pool.song;
    stopSongDemo(false);
    elements.quizCard.style.display = "none";
    elements.diagramCard.classList.remove("show");
    elements.songCard.classList.add("show");
    elements.songTitle.textContent = song.title;
    elements.songMeta.textContent = `${song.artist} · ${song.version}`;
    elements.songNote.textContent = song.note;
    elements.songProgression.innerHTML = song.progression.map((chord, i) => `${i ? '<span class="arrow">→</span>' : ''}<span class="progression-chord" data-demo-index="${i}">${chord}</span>`).join("");
    elements.strumPattern.textContent = song.pattern;
    elements.strumCount.textContent = song.count;

    demoIndex = 0;
    demoBeat = 0;
    demoBpm = clamp(Number(song.demo?.bpm || 72), 45, 130);
    elements.demoTempo.value = demoBpm;
    elements.demoTempoValue.textContent = `${demoBpm} BPM`;
    elements.demoStatus.textContent = "Ready · the demo stops after one full progression.";
    renderSongDemo();
  }

  function resetCurrentPool() {
    const pool = currentPool();
    progress[pool.id] = { mastery:{} };
    ensurePoolProgress(pool);
    saveJSON(STORAGE_KEY, progress);
    currentChord = null;
    previousChord = null;
    elements.songCard.classList.remove("show");
    elements.quizCard.style.display = "block";
    newQuestion();
  }

  function resetAllProgress() {
    progress = {};
    pools.forEach(ensurePoolProgress);
    saveJSON(STORAGE_KEY, progress);
    currentChord = null;
    previousChord = null;
    renderPoolStatus();
    renderPoolList();
    newQuestion();
  }

  function selectPool(poolId) {
    if (!pools.some(pool => pool.id === poolId)) return;
    settings.poolId = poolId;
    saveJSON(SETTINGS_KEY, settings);
    currentChord = null;
    previousChord = null;
    renderPoolStatus();
    renderPoolList();
    closeSettings();
    newQuestion();
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  function openSettings() {
    renderPoolList();
    elements.drawerBackdrop.classList.add("open");
    elements.drawerBackdrop.setAttribute("aria-hidden", "false");
  }
  function closeSettings() {
    elements.drawerBackdrop.classList.remove("open");
    elements.drawerBackdrop.setAttribute("aria-hidden", "true");
  }

  function buildChordSVG(name, data, compact = false) {
    const W = 360, H = compact ? 278 : 330;
    const x0 = 65, x1 = 295;
    const yTop = 62, yBottom = compact ? 226 : 252;
    const strings = 6, fretsShown = 5;
    const stringGap = (x1 - x0) / (strings - 1);
    const fretGap = (yBottom - yTop) / fretsShown;
    const positiveFrets = data.frets.filter(f => f > 0);
    const maxFret = Math.max(0, ...positiveFrets);
    const minPositive = positiveFrets.length ? Math.min(...positiveFrets) : 1;
    const baseFret = maxFret > 5 ? minPositive : 1;

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="min(100%, ${compact ? 315 : 390}px)" role="img" aria-label="${name} guitar chord diagram" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<style>
      .s{stroke:#cfd6d9;stroke-width:1.7}.f{stroke:#77858d;stroke-width:1.35}.nut{stroke:#f4eee3;stroke-width:5}
      .dot{fill:#f4eee3}.finger{fill:#11161a;font:700 14px system-ui;text-anchor:middle;dominant-baseline:middle}
      .note{fill:#87949b;font:600 12px system-ui;text-anchor:middle}.fretno{fill:#87949b;font:600 12px system-ui;text-anchor:end}.barre{stroke:#f4eee3;stroke-width:23;stroke-linecap:round}
    </style>`;

    data.frets.forEach((f, i) => {
      const x = x0 + i * stringGap;
      if (f === 0) svg += `<circle cx="${x}" cy="35" r="9" fill="none" stroke="#d9e0e3" stroke-width="2"/>`;
      if (f < 0) svg += `<path d="M${x-7} 28 L${x+7} 42 M${x+7} 28 L${x-7} 42" stroke="#d9e0e3" stroke-width="2" stroke-linecap="round"/>`;
    });

    for (let i=0;i<strings;i++) {
      const x = x0 + i * stringGap;
      svg += `<line class="s" x1="${x}" y1="${yTop}" x2="${x}" y2="${yBottom}"/>`;
    }
    for (let f=0;f<=fretsShown;f++) {
      const y = yTop + f * fretGap;
      const cls = (f===0 && baseFret===1) ? "nut" : "f";
      svg += `<line class="${cls}" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>`;
    }
    if (baseFret > 1) svg += `<text class="fretno" x="53" y="${yTop + fretGap*.68}">${baseFret}fr</text>`;

    if (data.barre) {
      const fretIndex = data.barre.fret - baseFret;
      const y = yTop + (fretIndex + .5) * fretGap;
      const bx0 = x0 + data.barre.from * stringGap;
      const bx1 = x0 + data.barre.to * stringGap;
      svg += `<line class="barre" x1="${bx0}" y1="${y}" x2="${bx1}" y2="${y}"/>`;
      svg += `<text class="finger" x="${bx0}" y="${y}">${data.barre.finger}</text>`;
    }

    data.frets.forEach((f, i) => {
      if (f <= 0) return;
      if (data.barre && f === data.barre.fret && data.fingers[i] === data.barre.finger) return;
      const x = x0 + i * stringGap;
      const fretIndex = f - baseFret;
      const y = yTop + (fretIndex + .5) * fretGap;
      svg += `<circle class="dot" cx="${x}" cy="${y}" r="15"/>`;
      if (data.fingers[i]) svg += `<text class="finger" x="${x}" y="${y+1}">${data.fingers[i]}</text>`;
    });

    if (!compact) {
      data.notes.forEach((n, i) => {
        const x = x0 + i * stringGap;
        svg += `<text class="note" x="${x}" y="282">${n}</text>`;
      });
      svg += `<text x="180" y="314" fill="#5f6c73" font-size="11" text-anchor="middle" font-family="system-ui">low E  ·  A  ·  D  ·  G  ·  B  ·  high E</text>`;
    } else {
      svg += `<text x="180" y="264" fill="#5f6c73" font-size="10.5" text-anchor="middle" font-family="system-ui">E · A · D · G · B · E</text>`;
    }
    svg += `</svg>`;
    return svg;
  }

  function requiredSamplePositions() {
    const seen = new Set();
    Object.values(chordData).forEach(data => data.frets.forEach((fret, i) => {
      if (fret >= 0) seen.add(`s${i + 1}_f${fret}`);
    }));
    return [...seen].sort((a, b) => {
      const pa = a.match(/s(\d+)_f(\d+)/).slice(1).map(Number);
      const pb = b.match(/s(\d+)_f(\d+)/).slice(1).map(Number);
      return pa[0] - pb[0] || pa[1] - pb[1];
    });
  }
  const REQUIRED_SAMPLE_KEYS = requiredSamplePositions();

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      buildAudioOutput(audioCtx);
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function buildAudioOutput(ctx) {
    audioMaster = ctx.createGain();
    const limiter = ctx.createDynamicsCompressor();
    audioMaster.gain.value = .92;
    limiter.threshold.value = -5;
    limiter.knee.value = 2;
    limiter.ratio.value = 12;
    limiter.attack.value = .002;
    limiter.release.value = .09;
    audioMaster.connect(limiter).connect(ctx.destination);
  }
  function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function sampleKey(stringIndex, fret) { return `s${stringIndex + 1}_f${fret}`; }

  function parseSampleFilename(name) {
    const base = name.split(/[\\/]/).pop();
    let match = base.match(/^s([1-6])[_-]?f(\d{1,2})(?:[_-]?v(\d+))?(?:[_-]?(soft|normal|hard))?\.(wav|wave|mp3|m4a|aac|ogg)$/i);
    if (!match) {
      match = base.match(/^string([1-6])[_-]?fret(\d{1,2})(?:[_-]?(?:take|v)(\d+))?(?:[_-]?(soft|normal|hard))?\.(wav|wave|mp3|m4a|aac|ogg)$/i);
    }
    if (!match) return null;
    return {
      stringIndex:Number(match[1]) - 1,
      fret:Number(match[2]),
      variation:Number(match[3] || 1),
      layer:(match[4] || "normal").toLowerCase(),
      fileName:base
    };
  }

  function trimDecodedSample(ctx, sourceBuffer, maxSeconds = 3.2) {
    const frames = Math.min(sourceBuffer.length, Math.floor(sourceBuffer.sampleRate * maxSeconds));
    if (frames >= sourceBuffer.length) return sourceBuffer;
    const trimmed = ctx.createBuffer(sourceBuffer.numberOfChannels, frames, sourceBuffer.sampleRate);
    for (let channel = 0; channel < sourceBuffer.numberOfChannels; channel++) {
      trimmed.copyToChannel(sourceBuffer.getChannelData(channel).subarray(0, frames), channel);
    }
    return trimmed;
  }

  async function loadBuiltInSampleKey(key) {
    if ((sampleBank.get(key) || []).length) return true;
    if (!BUILTIN_SAMPLE_FILES[key] || remoteFailedKeys.has(key)) return false;
    if (remoteLoadPromises.has(key)) return remoteLoadPromises.get(key);

    const promise = (async () => {
      try {
        const ctx = getAudioContext();
        const response = await fetch(WAVEBASE_ROOT + encodeURIComponent(BUILTIN_SAMPLE_FILES[key]), { mode:"cors", cache:"force-cache" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const bytes = await response.arrayBuffer();
        const decoded = await ctx.decodeAudioData(bytes.slice(0));
        const buffer = trimDecodedSample(ctx, decoded);
        const m = key.match(/s(\d+)_f(\d+)/);
        const meta = { stringIndex:Number(m[1]) - 1, fret:Number(m[2]), variation:1, layer:"normal", fileName:`Wavebase/${BUILTIN_SAMPLE_FILES[key]}`, builtIn:true };
        const list = sampleBank.get(key) || [];
        if (!list.some(item => item.fileName === meta.fileName)) list.push({ buffer, ...meta });
        sampleBank.set(key, list);
        loadedSampleNames.add(`builtin:${key}`);
        remoteFailedKeys.delete(key);
        renderSampleLibrary();
        return true;
      } catch (err) {
        console.warn("Could not load built-in guitar sample", key, err);
        remoteFailedKeys.add(key);
        renderSampleLibrary();
        return false;
      } finally {
        remoteLoadPromises.delete(key);
      }
    })();
    remoteLoadPromises.set(key, promise);
    return promise;
  }

  function keysForChord(name) {
    const data = chordData[name];
    if (!data) return [];
    return data.frets.map((fret, i) => fret >= 0 ? sampleKey(i, fret) : null).filter(Boolean);
  }

  async function ensureSamplesForChords(names) {
    const keys = [...new Set(names.flatMap(keysForChord))];
    if (!keys.length) return;
    elements.sampleStatusTitle.textContent = "Loading real Stratocaster strings…";
    elements.sampleStatusNote.textContent = "Fetching only the recorded notes needed for what you are about to hear.";
    await Promise.all(keys.map(loadBuiltInSampleKey));
    renderSampleLibrary();
  }

  async function preloadAllBuiltInSamples(showStatus = false) {
    if (preloadAllPromise) return preloadAllPromise;
    preloadAllPromise = (async () => {
      if (showStatus) {
        elements.sampleStatusTitle.textContent = "Loading the full Stratocaster library…";
        elements.sampleStatusNote.textContent = "Downloading and decoding the 22 recorded notes used by the chord library.";
      }
      const remaining = REQUIRED_SAMPLE_KEYS.filter(key => !(sampleBank.get(key) || []).length && BUILTIN_SAMPLE_FILES[key] && !remoteFailedKeys.has(key));
      for (let i = 0; i < remaining.length; i += 4) {
        await Promise.all(remaining.slice(i, i + 4).map(loadBuiltInSampleKey));
      }
      renderSampleLibrary();
    })().finally(() => { preloadAllPromise = null; });
    return preloadAllPromise;
  }

  async function loadSampleFiles(fileList) {
    const files = [...fileList].filter(file => parseSampleFilename(file.name));
    if (!files.length) {
      elements.sampleStatusNote.textContent = "No matching sample names found. Use names like S1_F0_V1.wav or String1_Fret0_Take1.wav.";
      return;
    }
    const ctx = getAudioContext();
    elements.sampleStatusTitle.textContent = `Loading ${files.length} recording${files.length === 1 ? "" : "s"}…`;
    elements.sampleStatusNote.textContent = "Decoding the selected audio. Existing loaded samples are kept.";
    let loaded = 0;
    let failed = 0;
    for (const file of files) {
      const meta = parseSampleFilename(file.name);
      const uniqueName = `${meta.stringIndex}:${meta.fret}:${meta.variation}:${meta.layer}:${file.name}`;
      if (loadedSampleNames.has(uniqueName)) continue;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
        const key = sampleKey(meta.stringIndex, meta.fret);
        const list = sampleBank.get(key) || [];
        list.push({ buffer, ...meta });
        list.sort((a,b) => a.variation - b.variation);
        sampleBank.set(key, list);
        loadedSampleNames.add(uniqueName);
        loaded++;
      } catch (err) {
        console.warn("Could not decode sample", file.name, err);
        failed++;
      }
      renderSampleLibrary();
    }
    const suffix = failed ? ` ${failed} file${failed === 1 ? "" : "s"} could not be decoded.` : "";
    elements.sampleStatusNote.textContent = `${loaded} new recording${loaded === 1 ? "" : "s"} loaded.${suffix}`;
    renderSampleLibrary();
  }

  function renderSampleLibrary() {
    const loadedPositions = REQUIRED_SAMPLE_KEYS.filter(key => (sampleBank.get(key) || []).length > 0).length;
    const total = REQUIRED_SAMPLE_KEYS.length;
    const pct = total ? Math.round(loadedPositions / total * 100) : 0;
    elements.sampleCount.textContent = `${loadedPositions} / ${total}`;
    elements.sampleProgressFill.style.width = `${pct}%`;
    const loadingCount = remoteLoadPromises.size;
    if (loadingCount) {
      elements.sampleStatusTitle.textContent = `Loading ${loadingCount} real guitar note${loadingCount === 1 ? "" : "s"}…`;
    } else if (loadedPositions === 0 && remoteFailedKeys.size === 0) {
      elements.sampleStatusTitle.textContent = "Real Stratocaster samples ready to load";
      elements.sampleStatusNote.textContent = "Press Hear chord and the exact recorded strings for that chord will load automatically.";
    } else if (loadedPositions === 0 && remoteFailedKeys.size) {
      elements.sampleStatusTitle.textContent = "Online samples unavailable";
      elements.sampleStatusNote.textContent = "The real-guitar host could not be reached. Playback will use the physical-model fallback unless you load your own WAV files.";
    } else if (loadedPositions < total) {
      elements.sampleStatusTitle.textContent = "Real guitar samples partially loaded";
      elements.sampleStatusNote.textContent = `${loadedPositions} of ${total} required recorded notes are ready. Missing notes load automatically as needed.`;
    } else {
      elements.sampleStatusTitle.textContent = "Real Stratocaster samples active";
      elements.sampleStatusNote.textContent = "All 22 recorded string positions are decoded and ready for chord and song playback.";
    }
    elements.sampleChecklist.innerHTML = REQUIRED_SAMPLE_KEYS.map(key => {
      const m = key.match(/s(\d+)_f(\d+)/);
      const s = Number(m[1]);
      const fret = Number(m[2]);
      const list = sampleBank.get(key) || [];
      const count = list.length;
      const loaded = count > 0;
      const builtIn = list.some(item => item.builtIn);
      const status = loaded ? (builtIn ? "real" : "custom") : (remoteFailedKeys.has(key) ? "failed" : "ready");
      return `<div class="sample-key ${loaded ? "loaded" : ""}"><span>${loaded ? "✓" : "○"} ${stringLabels[s-1]} · ${fret === 0 ? "open" : `fret ${fret}`}</span><code>${status}${count > 1 ? ` +${count-1}` : ""}</code></div>`;
    }).join("");
  }

  function clearSampleLibrary() {
    sampleBank.clear();
    loadedSampleNames.clear();
    lastVariationByKey.clear();
    remoteFailedKeys.clear();
    elements.sampleFilesInput.value = "";
    elements.sampleFolderInput.value = "";
    elements.sampleStatusNote.textContent = "Sample memory cleared. Real recordings will load again the next time you play a chord.";
    renderSampleLibrary();
  }

  function chooseSampleForKey(key, gainValue = .35) {
    const list = sampleBank.get(key) || [];
    if (!list.length) return null;
    const desiredLayer = gainValue < .32 ? "soft" : gainValue > .40 ? "hard" : "normal";
    let candidates = list.filter(item => item.layer === desiredLayer);
    if (!candidates.length) candidates = list.filter(item => item.layer === "normal");
    if (!candidates.length) candidates = list;
    if (candidates.length === 1) return candidates[0];
    const rotationKey = `${key}:${desiredLayer}`;
    const last = lastVariationByKey.get(rotationKey);
    let index = Math.floor(Math.random() * candidates.length);
    if (index === last) index = (index + 1 + Math.floor(Math.random() * (candidates.length - 1))) % candidates.length;
    lastVariationByKey.set(rotationKey, index);
    return candidates[index];
  }

  function makeKarplusStrongBuffer(ctx, freq, stringIndex, duration = 2.2) {
    const cacheKey = `${ctx.sampleRate}:${freq.toFixed(3)}:${stringIndex}:${duration}`;
    if (fallbackBufferCache.has(cacheKey)) return fallbackBufferCache.get(cacheKey);
    const sampleRate = ctx.sampleRate;
    const length = Math.ceil(sampleRate * duration);
    const period = Math.max(2, Math.round(sampleRate / freq - .5));
    const ring = new Float32Array(period);
    let previousNoise = 0;
    for (let i=0; i<period; i++) {
      const noise = Math.random() * 2 - 1;
      ring[i] = (noise * .72 + previousNoise * .28) * .72;
      previousNoise = noise;
    }
    const output = new Float32Array(length);
    let idx = 0;
    const damping = .9948 + (5 - stringIndex) * .00018;
    for (let n=0; n<length; n++) {
      const current = ring[idx];
      const nextIndex = (idx + 1) % period;
      const averaged = .5 * (current + ring[nextIndex]);
      ring[idx] = averaged * damping;
      const attackTaper = n < 24 ? n / 24 : 1;
      output[n] = current * attackTaper;
      idx = nextIndex;
    }
    const buffer = ctx.createBuffer(1, length, sampleRate);
    buffer.copyToChannel(output, 0);
    fallbackBufferCache.set(cacheKey, buffer);
    return buffer;
  }

  function scheduleRecordedString(ctx, sample, when, duration, gainValue) {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = sample.buffer;
    const naturalEnd = when + Math.min(sample.buffer.duration, duration);
    const fadeStart = Math.max(when + .08, naturalEnd - .055);
    gain.gain.setValueAtTime(gainValue, when);
    if (fadeStart > when) gain.gain.setValueAtTime(gainValue, fadeStart);
    gain.gain.exponentialRampToValueAtTime(.0001, naturalEnd);
    source.connect(gain).connect(audioMaster || ctx.destination);
    source.start(when);
    source.stop(naturalEnd + .02);
  }

  function scheduleFallbackString(ctx, freq, stringIndex, when, duration, gainValue) {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = makeKarplusStrongBuffer(ctx, freq, stringIndex, Math.max(1.0, duration + .25));
    const naturalEnd = when + Math.min(source.buffer.duration, duration);
    const fadeStart = Math.max(when + .12, naturalEnd - .06);
    gain.gain.setValueAtTime(gainValue * .82, when);
    gain.gain.setValueAtTime(gainValue * .82, fadeStart);
    gain.gain.exponentialRampToValueAtTime(.0001, naturalEnd);
    source.connect(gain).connect(audioMaster || ctx.destination);
    source.start(when);
    source.stop(naturalEnd + .02);
  }

  function scheduleString(stringIndex, fret, when, duration = 1.45, gainValue = .35) {
    const ctx = getAudioContext();
    const tuningMidi = [40,45,50,55,59,64];
    const key = sampleKey(stringIndex, fret);
    const sample = chooseSampleForKey(key, gainValue);
    if (sample) {
      scheduleRecordedString(ctx, sample, when, duration, gainValue);
      return "sample";
    }
    scheduleFallbackString(ctx, midiToFreq(tuningMidi[stringIndex] + fret), stringIndex, when, duration, gainValue);
    return "fallback";
  }

  function activeStrings(name) {
    const data = chordData[name];
    if (!data) return [];
    return data.frets.map((fret, i) => ({fret, i})).filter(item => item.fret >= 0);
  }
  function scheduleChord(name, startTime, direction = "down", duration = 1.35) {
    const ctx = getAudioContext();
    let strings = activeStrings(name);
    if (!strings.length) return;
    if (direction === "up") strings = [...strings].reverse();
    strings.forEach((item, order) => {
      const emphasis = direction === "up" ? (order / Math.max(1, strings.length - 1)) : (1 - order / Math.max(1, strings.length - 1));
      const gain = .29 + emphasis * .055;
      scheduleString(item.i, item.fret, startTime + order * .022, duration + order * .008, gain);
    });
  }
  function scheduleSingleString(name, startTime, position = "low") {
    const strings = activeStrings(name);
    if (!strings.length) return;
    let pick = strings[0];
    if (position === "high") pick = strings[strings.length - 1];
    if (position === "mid") pick = strings[Math.floor((strings.length - 1) / 2)];
    scheduleString(pick.i, pick.fret, startTime, .88, .48);
  }
  async function playChord(name = currentChord) {
    if (!name || !chordData[name]) return;
    await ensureSamplesForChords([name]);
    const ctx = getAudioContext();
    scheduleChord(name, ctx.currentTime + .035);
    preloadAllBuiltInSamples(false);
  }
  async function playProgression() {
    const pool = currentPool();
    await ensureSamplesForChords(pool.song.progression.filter(name => chordData[name]));
    const ctx = getAudioContext();
    const t0 = ctx.currentTime + .08;
    pool.song.progression.forEach((name, index) => {
      if (chordData[name]) scheduleChord(name, t0 + index * 1.0, "down", .93);
    });
    preloadAllBuiltInSamples(false);
  }

  function songDemoConfig(song = currentPool().song) {
    const demo = song.demo || {};
    const steps = Array.isArray(demo.steps) && demo.steps.length ? demo.steps : ["↓","↓↑","↓","↓↑"];
    return { bpm:clamp(Number(demo.bpm || 72),45,130), feel:demo.feel || "4/4 practice pulse", steps };
  }

  function renderSongDemo() {
    const song = currentPool().song;
    const cfg = songDemoConfig(song);
    if (!song.progression.length) return;
    demoIndex = clamp(demoIndex, 0, song.progression.length - 1);
    demoBeat = clamp(demoBeat, 0, cfg.steps.length - 1);
    const chord = song.progression[demoIndex];
    const nextIndex = (demoIndex + 1) % song.progression.length;
    const nextChord = song.progression[nextIndex];

    elements.demoCurrentDiagram.innerHTML = buildChordSVG(chord, chordData[chord], true);
    elements.demoNextDiagram.innerHTML = buildChordSVG(nextChord, chordData[nextChord], true);
    elements.demoStepLabel.textContent = `Chord ${demoIndex + 1} of ${song.progression.length}`;
    elements.demoChordName.textContent = chord;
    elements.demoNextChord.textContent = nextChord;
    elements.demoFeel.textContent = cfg.feel;
    elements.demoBeatCount.textContent = `Beat ${demoBeat + 1} of ${cfg.steps.length}`;
    elements.demoBeats.style.setProperty("--demo-steps", cfg.steps.length);
    elements.demoBeats.innerHTML = cfg.steps.map((step, i) => `<div class="demo-beat ${i === demoBeat ? "active" : ""}">${step}</div>`).join("");
    [...elements.songProgression.querySelectorAll(".progression-chord")].forEach((el, i) => {
      el.classList.toggle("demo-active", i === demoIndex);
      el.classList.toggle("demo-done", demoPlaying && i < demoIndex);
    });
    elements.demoPlayBtn.textContent = demoPlaying ? "Ⅱ Pause demo" : (demoIndex === 0 && demoBeat === 0 ? "▶ Start demo" : "▶ Resume demo");
  }

  function playDemoStep(chord, step) {
    const ctx = getAudioContext();
    const when = ctx.currentTime + .025;
    const beatSeconds = 60 / demoBpm;
    if (step === "·") return;
    if (step === "bass") { scheduleSingleString(chord, when, "low"); return; }
    if (step === "strum") { scheduleChord(chord, when, "down", Math.min(1.1, beatSeconds * 1.35)); return; }
    if (step === "low" || step === "mid" || step === "high") { scheduleSingleString(chord, when, step); return; }
    if (step.includes("↓")) scheduleChord(chord, when, "down", Math.min(1.0, beatSeconds * 1.2));
    if (step.includes("↑")) scheduleChord(chord, when + beatSeconds * .48, "up", Math.min(.8, beatSeconds));
  }

  function demoTick() {
    if (!demoPlaying) return;
    const song = currentPool().song;
    const cfg = songDemoConfig(song);
    const chord = song.progression[demoIndex];
    renderSongDemo();
    playDemoStep(chord, cfg.steps[demoBeat]);

    const beatMs = 60000 / demoBpm;
    clearTimeout(demoTimer);
    demoTimer = setTimeout(() => {
      if (!demoPlaying) return;
      demoBeat += 1;
      if (demoBeat >= cfg.steps.length) {
        demoBeat = 0;
        demoIndex += 1;
        if (demoIndex >= song.progression.length) {
          demoIndex = 0;
          demoBeat = 0;
          stopSongDemo(false);
          elements.demoStatus.textContent = "Demonstration complete · run it again or step through the changes manually.";
          renderSongDemo();
          return;
        }
      }
      demoTick();
    }, beatMs);
  }

  async function startSongDemo() {
    if (demoPlaying) {
      stopSongDemo(true);
      elements.demoStatus.textContent = "Paused · resume when your fretting hand is ready.";
      return;
    }
    elements.demoStatus.textContent = "Loading the real guitar strings used in this progression…";
    await ensureSamplesForChords(currentPool().song.progression.filter(name => chordData[name]));
    demoPlaying = true;
    elements.demoStatus.textContent = "Playing · change to the next shape when the count rolls over.";
    demoTick();
    preloadAllBuiltInSamples(false);
  }

  function stopSongDemo(keepPosition = true) {
    demoPlaying = false;
    if (demoTimer) clearTimeout(demoTimer);
    demoTimer = null;
    if (!keepPosition) {
      demoIndex = 0;
      demoBeat = 0;
    }
    if (elements.demoPlayBtn) renderSongDemo();
  }

  function moveDemoChord(delta) {
    const song = currentPool().song;
    if (!song.progression.length) return;
    stopSongDemo(true);
    demoIndex = (demoIndex + delta + song.progression.length) % song.progression.length;
    demoBeat = 0;
    elements.demoStatus.textContent = "Manual step · use Hear chord, or start the guided demo from here.";
    renderSongDemo();
  }

  $("#gotItBtn").addEventListener("click", () => gradeForward(true));
  $("#missedBtn").addEventListener("click", () => gradeForward(false));
  elements.continueBtn.addEventListener("click", newQuestion);
  elements.hearBtn.addEventListener("click", () => playChord());
  elements.showBtn.addEventListener("click", () => showDiagram());
  elements.choiceGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".choice-btn");
    if (!btn) return;
    gradeReverse(btn.dataset.choice, btn);
  });

  $("#settingsBtn").addEventListener("click", openSettings);
  $("#closeSettings").addEventListener("click", closeSettings);
  elements.drawerBackdrop.addEventListener("click", (e) => { if (e.target === elements.drawerBackdrop) closeSettings(); });
  elements.poolList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pool-id]");
    if (btn) selectPool(btn.dataset.poolId);
  });

  elements.reverseChance.value = settings.reverseChance;
  elements.reverseChanceValue.textContent = `${settings.reverseChance}%`;
  elements.reverseChance.addEventListener("input", () => {
    settings.reverseChance = Number(elements.reverseChance.value);
    elements.reverseChanceValue.textContent = `${settings.reverseChance}%`;
    saveJSON(SETTINGS_KEY, settings);
  });
  elements.sampleFilesInput.addEventListener("change", (e) => loadSampleFiles(e.target.files));
  elements.sampleFolderInput.addEventListener("change", (e) => loadSampleFiles(e.target.files));
  elements.clearSamplesBtn.addEventListener("click", clearSampleLibrary);
  elements.loadBuiltInSamplesBtn.addEventListener("click", () => preloadAllBuiltInSamples(true));

  $("#restartBtn").addEventListener("click", resetCurrentPool);
  $("#practiceAgainBtn").addEventListener("click", resetCurrentPool);
  $("#choosePoolBtn").addEventListener("click", openSettings);
  $("#playProgressionBtn").addEventListener("click", playProgression);
  elements.demoPlayBtn.addEventListener("click", startSongDemo);
  elements.demoPrevBtn.addEventListener("click", () => moveDemoChord(-1));
  elements.demoNextBtn.addEventListener("click", () => moveDemoChord(1));
  elements.demoHearBtn.addEventListener("click", () => playChord(currentPool().song.progression[demoIndex]));
  elements.demoTempo.addEventListener("input", () => {
    demoBpm = clamp(Number(elements.demoTempo.value), 45, 130);
    elements.demoTempoValue.textContent = `${demoBpm} BPM`;
    if (demoPlaying) {
      clearTimeout(demoTimer);
      demoTick();
    }
  });
  $("#resetAllBtn").addEventListener("click", () => {
    if (confirm("Reset progress for every chord pool?")) resetAllProgress();
  });

  document.addEventListener("keydown", (e) => {
    if (elements.drawerBackdrop.classList.contains("open")) {
      if (e.key === "Escape") closeSettings();
      return;
    }
    if (e.code === "Space") { e.preventDefault(); playChord(); }
    if (e.key.toLowerCase() === "f" && questionType === "forward") { e.preventDefault(); showDiagram(); }
    if (e.key === "1" && questionType === "forward" && !answered) gradeForward(true);
    if (e.key === "2" && questionType === "forward" && !answered) gradeForward(false);
    if (e.key === "Enter" && answered) { e.preventDefault(); newQuestion(); }
  });

  pools.forEach(ensurePoolProgress);
  saveJSON(STORAGE_KEY, progress);
  renderPoolStatus();
  renderPoolList();
  renderSampleLibrary();
  newQuestion();
})();
