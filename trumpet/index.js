(() => {
  const ROUNDS_TO_MASTER = 3;
  const STORAGE_KEY = "trumpetRecall.poolProgress.v1";
  const SETTINGS_KEY = "trumpetRecall.settings.v1";

  const noteData = {
    "F#3": { valves: [1, 1, 1], staffLine: -2.5, midi: 54 },
    "G3":  { valves: [1, 0, 1], staffLine: -2.0, midi: 55 },
    "G#3": { valves: [0, 1, 1], staffLine: -2.0, midi: 56, accidental: "#" },
    "A3":  { valves: [1, 1, 0], staffLine: -1.5, midi: 57 },
    "Bb3": { valves: [1, 0, 0], staffLine: -1.5, midi: 58, accidental: "b" },
    "B3":  { valves: [0, 1, 0], staffLine: -1.0, midi: 59 },
    "C4":  { valves: [0, 0, 0], staffLine: -1.0, midi: 60 },
    "C#4": { valves: [1, 1, 1], staffLine: -1.0, midi: 61, accidental: "#" },
    "D4":  { valves: [1, 0, 1], staffLine: -0.5, midi: 62 },
    "Eb4": { valves: [0, 1, 1], staffLine: -0.5, midi: 63, accidental: "b" },
    "E4":  { valves: [1, 1, 0], staffLine: 0.0, midi: 64 },
    "F4":  { valves: [1, 0, 0], staffLine: 0.5, midi: 65 },
    "F#4": { valves: [0, 1, 0], staffLine: 0.5, midi: 66, accidental: "#" },
    "G4":  { valves: [0, 0, 0], staffLine: 1.0, midi: 67 },
    "G#4": { valves: [0, 1, 1], staffLine: 1.0, midi: 68, accidental: "#" },
    "A4":  { valves: [1, 1, 0], staffLine: 1.5, midi: 69 },
    "Bb4": { valves: [1, 0, 0], staffLine: 1.5, midi: 70, accidental: "b" },
    "B4":  { valves: [0, 1, 0], staffLine: 2.0, midi: 71 },
    "C5":  { valves: [0, 0, 0], staffLine: 2.5, midi: 72 },
    "D5":  { valves: [1, 0, 0], staffLine: 3.5, midi: 74 },
    "E5":  { valves: [0, 0, 0], staffLine: 4.5, midi: 76 }
  };

  const pools = [
    {
      id: "first-five", level: "Starter pool", name: "First Five Notes", notes: ["C4", "D4", "E4", "F4", "G4"],
      description: "The foundational notes for every beginning trumpet player.",
      song: { 
        title: "When the Saints", artist: "Traditional", version: "simplified practice loop", 
        melody: [
          {n:"C4", d:1}, {n:"E4", d:1}, {n:"F4", d:1}, {n:"G4", d:2}, 
          {n:"C4", d:1}, {n:"E4", d:1}, {n:"F4", d:1}, {n:"G4", d:2}
        ], 
        demo: { bpm: 100 }
      }
    },
    {
      id: "c-major", level: "Starter pool", name: "C Major Scale (Lower)", notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
      description: "The complete one-octave C major scale.",
      song: { 
        title: "Ode to Joy", artist: "Beethoven", version: "simplified melody", 
        melody: [
          {n:"E4", d:1}, {n:"E4", d:1}, {n:"F4", d:1}, {n:"G4", d:1}, 
          {n:"G4", d:1}, {n:"F4", d:1}, {n:"E4", d:1}, {n:"D4", d:1}, 
          {n:"C4", d:1}, {n:"C4", d:1}, {n:"D4", d:1}, {n:"E4", d:2}
        ], 
        demo: { bpm: 90 }, note: "A classic melody strictly using the C major scale." 
      }
    },
    {
      id: "low-register", level: "Technique pool", name: "The Low Register", notes: ["F#3", "G3", "A3", "Bb3", "B3"],
      description: "Loosen the embouchure to hit the warm lower limits of the horn.",
      song: { 
        title: "Low Brass Jam", artist: "Brass Tacks", version: "practice loop", 
        melody: [
          {n:"G3", d:1}, {n:"A3", d:1}, {n:"Bb3", d:1}, 
          {n:"G3", d:1}, {n:"F#3", d:1}, {n:"G3", d:2}
        ], 
        demo: { bpm: 70 }, note: "Focus on tone quality and avoid pressing the mouthpiece too hard." 
      }
    },
    {
      id: "fly-me-moon", 
      level: "Intermediate pool", 
      name: "Descending Jazz Phrase", 
      notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
      description: "Practice your descending scale control using one of the most famous jazz standards.",
      song: { 
        title: "Fly Me to the Moon", 
        artist: "Frank Sinatra", 
        version: "extended melody", 
        melody: [
          // Fly me to the moon
          {n:"C5", d:1.5}, {n:"B4", d:0.5}, {n:"A4", d:1}, {n:"G4", d:1}, 
          {n:"F4", d:2}, 
          // Let me play among the stars
          {n:"A4", d:1}, {n:"C5", d:1}, {n:"B4", d:1.5}, {n:"A4", d:0.5}, 
          {n:"G4", d:1}, {n:"F4", d:1}, {n:"E4", d:4}, 
          // Let me see what spring is like
          {n:"A4", d:1.5}, {n:"G4", d:0.5}, {n:"F4", d:1}, {n:"E4", d:1}, 
          {n:"D4", d:2},
          // On Jupiter and Mars
          {n:"F4", d:1}, {n:"A4", d:1}, {n:"C5", d:1.5}, {n:"B4", d:0.5}, 
          {n:"A4", d:1}, {n:"G4", d:1}, {n:"C4", d:4}
        ], 
        demo: { bpm: 118 }, 
        note: "Keep the airstream steady as you walk down from C5. Give the 0.5-beat notes a slight swing feel to match the classic recording." 
      }
    }
  ];

  const $ = (sel) => document.querySelector(sel);
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const elements = {
    poolKicker: $("#poolKicker"), poolTitle: $("#poolTitle"), poolDescription: $("#poolDescription"), roundBadge: $("#roundBadge"),
    progressFill: $("#progressFill"), masteryRow: $("#masteryRow"), rewardTitle: $("#rewardTitle"), rewardState: $("#rewardState"),
    quizCard: $("#quizCard"), eyebrow: $("#eyebrow"), forwardPrompt: $("#forwardPrompt"), reversePrompt: $("#reversePrompt"),
    noteName: $("#noteName"), reverseDiagram: $("#reverseDiagram"), choiceGrid: $("#choiceGrid"), hearBtn: $("#hearBtn"), showBtn: $("#showBtn"),
    forwardActions: $("#forwardActions"), feedbackRow: $("#feedbackRow"), feedbackCopy: $("#feedbackCopy"), continueBtn: $("#continueBtn"),
    diagramCard: $("#diagramCard"), diagramTitle: $("#diagramTitle"), diagram: $("#diagram"), songCard: $("#songCard"), songTitle: $("#songTitle"),
    songMeta: $("#songMeta"), songNote: $("#songNote"), demoTempo: $("#demoTempo"), demoTempoValue: $("#demoTempoValue"), 
    demoCurrentDiagram: $("#demoCurrentDiagram"), demoTimeline: $("#demoTimeline"), demoStepLabel: $("#demoStepLabel"), 
    demoPlayBtn: $("#demoPlayBtn"), demoHearBtn: $("#demoHearBtn"), demoStatus: $("#demoStatus"),
    poolList: $("#poolList"), drawerBackdrop: $("#drawerBackdrop"), reverseChance: $("#reverseChance"), reverseChanceValue: $("#reverseChanceValue"),
    sampleStatusTitle: $("#sampleStatusTitle"), sampleStatusNote: $("#sampleStatusNote"), sampleCount: $("#sampleCount"), sampleProgressFill: $("#sampleProgressFill"),
    sampleFilesInput: $("#sampleFilesInput"), sampleChecklist: $("#sampleChecklist"), clearSamplesBtn: $("#clearSamplesBtn")
  };

  let progress = loadJSON(STORAGE_KEY, {});
  let settings = loadJSON(SETTINGS_KEY, { poolId: pools[0].id, reverseChance: 30 });
  if (!pools.some(p => p.id === settings.poolId)) settings.poolId = pools[0].id;
  settings.reverseChance = clamp(Number(settings.reverseChance ?? 30), 0, 100);

  let currentNote = null;
  let previousNote = null;
  let questionType = "forward";
  let answered = false;
  let isRevealed = false;
  let audioCtx = null;
  let audioMaster = null;
  const sampleBank = new Map();
  let demoIndex = 0;
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
    if (!progress[pool.id]) progress[pool.id] = { mastery: {} };
    if (!progress[pool.id].mastery) progress[pool.id].mastery = {};
    pool.notes.forEach(note => {
      const value = Number(progress[pool.id].mastery[note] || 0);
      progress[pool.id].mastery[note] = clamp(value, 0, ROUNDS_TO_MASTER);
    });
    return progress[pool.id];
  }

  function masteryFor(pool, note) { return ensurePoolProgress(pool).mastery[note] || 0; }
  function poolCompleted(pool) { return pool.notes.every(note => masteryFor(pool, note) >= ROUNDS_TO_MASTER); }
  function poolPercent(pool) {
    const total = pool.notes.length * ROUNDS_TO_MASTER;
    const earned = pool.notes.reduce((sum, note) => sum + masteryFor(pool, note), 0);
    return Math.round((earned / total) * 100);
  }
  function currentRound(pool) {
    if (poolCompleted(pool)) return ROUNDS_TO_MASTER;
    const low = Math.min(...pool.notes.map(note => masteryFor(pool, note)));
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

    elements.masteryRow.innerHTML = pool.notes.map(note => {
      const count = masteryFor(pool, note);
      const dots = Array.from({ length: ROUNDS_TO_MASTER }, (_, i) => `<span class="mastery-dot ${i < count ? "on" : ""}"></span>`).join("");
      return `<div class="mastery-chip"><strong>${note}</strong><span class="mastery-dots" aria-label="${count} of ${ROUNDS_TO_MASTER} rounds complete">${dots}</span></div>`;
    }).join("");
  }

  function renderPoolList() {
    const active = currentPool().id;
    elements.poolList.innerHTML = pools.map(pool => {
      const pct = poolPercent(pool);
      const done = poolCompleted(pool);
      return `<button class="pool-card ${pool.id === active ? "active" : ""}" data-pool-id="${pool.id}">
        <div class="pool-card-top"><strong>${pool.name}</strong><span class="pct">${pct}%</span></div>
        <div class="pool-chords">${pool.notes.join(" · ")}</div>
        <div class="pool-song ${done ? "unlocked" : ""}">${done ? "✓" : "♩"} ${pool.song.title}</div>
      </button>`;
    }).join("");
  }

  function nextNoteCandidate(pool) {
    const counts = pool.notes.map(note => masteryFor(pool, note));
    const minCount = Math.min(...counts);
    let candidates = pool.notes.filter(note => masteryFor(pool, note) === minCount);
    if (candidates.length > 1 && previousNote) candidates = candidates.filter(c => c !== previousNote);
    if (!candidates.length) candidates = pool.notes.filter(note => masteryFor(pool, note) === minCount);
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
    previousNote = currentNote;
    currentNote = nextNoteCandidate(pool);
    questionType = Math.random() * 100 < settings.reverseChance ? "reverse" : "forward";

    if (questionType === "reverse") renderReverseQuestion();
    else renderForwardQuestion();
  }

  function renderForwardQuestion() {
    elements.eyebrow.textContent = `Round ${currentRound(currentPool())} · play this note`;
    elements.forwardPrompt.style.display = "block";
    elements.reversePrompt.classList.remove("show");
    elements.noteName.textContent = currentNote;
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
    elements.reverseDiagram.innerHTML = buildValveSVG(currentNote, noteData[currentNote], true);

    const pool = currentPool();
    const allNames = Object.keys(noteData).filter(name => name !== currentNote);
    const preferred = pool.notes.filter(name => name !== currentNote);
    const distractors = shuffle([...preferred, ...shuffle(allNames.filter(n => !preferred.includes(n)))])
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .slice(0, 3);
    const options = shuffle([currentNote, ...distractors]);
    elements.choiceGrid.innerHTML = options.map(name => `<button class="choice-btn" data-choice="${name}">${name}</button>`).join("");
  }

  function advanceMastery(note) {
    const pool = currentPool();
    const p = ensurePoolProgress(pool);
    p.mastery[note] = clamp((p.mastery[note] || 0) + 1, 0, ROUNDS_TO_MASTER);
    saveJSON(STORAGE_KEY, progress);
    renderPoolStatus();
    renderPoolList();
    return p.mastery[note];
  }

  function gradeForward(correct) {
    if (answered || questionType !== "forward") return;
    answered = true;
    elements.forwardActions.style.display = "none";

    if (correct) {
      const count = advanceMastery(currentNote);
      const mastered = count >= ROUNDS_TO_MASTER;
      showFeedback(true, mastered ? `${currentNote} mastered` : `${currentNote} cleared this round`, mastered ? "That note has now been recalled correctly in all three rounds." : "One clean recall added to this pool's mastery progress.");
    } else {
      showDiagram(true);
      showFeedback(false, `${currentNote} stays in this round`, "No progress was lost. Review the fingerings, then it will come back again later.");
    }
  }

  function gradeReverse(choice, button) {
    if (answered || questionType !== "reverse") return;
    answered = true;
    const correct = choice === currentNote;
    const buttons = [...elements.choiceGrid.querySelectorAll(".choice-btn")];
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.choice === currentNote) btn.classList.add("correct");
    });
    if (!correct) button.classList.add("wrong");

    if (correct) {
      const count = advanceMastery(currentNote);
      const mastered = count >= ROUNDS_TO_MASTER;
      showFeedback(true, mastered ? `${currentNote} mastered` : "Correct note match", mastered ? "That note is now complete across all three rounds." : `${currentNote} moved forward one mastery round.`);
    } else {
      showFeedback(false, `That was ${currentNote}`, "The note does not advance. You will see it again later in this round.");
    }
  }

  function showFeedback(success, title, detail) {
    elements.feedbackCopy.className = `feedback-copy ${success ? "success" : "error"}`;
    elements.feedbackCopy.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    elements.feedbackRow.classList.add("show");
    elements.continueBtn.textContent = poolCompleted(currentPool()) ? "Unlock song →" : "Next note →";
  }

  function showDiagram(forceOpen = false) {
    if (questionType !== "forward") return;
    if (isRevealed && !forceOpen) { hideDiagram(); return; }
    isRevealed = true;
    elements.diagramTitle.textContent = `${currentNote} valves & staff`;
    elements.diagram.innerHTML = buildValveSVG(currentNote, noteData[currentNote]);
    elements.diagramCard.classList.add("show");
    elements.showBtn.classList.add("revealed");
    elements.showBtn.innerHTML = '<span aria-hidden="true">◉</span> Hide valves';
  }

  function hideDiagram() {
    isRevealed = false;
    elements.diagramCard.classList.remove("show");
    elements.showBtn.classList.remove("revealed");
    elements.showBtn.innerHTML = '<span aria-hidden="true">◉</span> Show valves';
  }

  function resetCurrentPool() {
    const pool = currentPool();
    progress[pool.id] = { mastery: {} };
    ensurePoolProgress(pool);
    saveJSON(STORAGE_KEY, progress);
    currentNote = null;
    previousNote = null;
    elements.songCard.classList.remove("show");
    elements.quizCard.style.display = "block";
    newQuestion();
  }

  function resetAllProgress() {
    progress = {};
    pools.forEach(ensurePoolProgress);
    saveJSON(STORAGE_KEY, progress);
    currentNote = null;
    previousNote = null;
    renderPoolStatus();
    renderPoolList();
    newQuestion();
  }

  function selectPool(poolId) {
    if (!pools.some(pool => pool.id === poolId)) return;
    settings.poolId = poolId;
    saveJSON(SETTINGS_KEY, settings);
    currentNote = null;
    previousNote = null;
    renderPoolStatus();
    renderPoolList();
    closeSettings();
    newQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  function buildValveSVG(name, data, compact = false) {
    const W = 360, H = compact ? 220 : 260;
    let svg = `<svg viewBox="0 0 ${W} ${H}" width="min(100%, ${compact ? 315 : 390}px)" role="img" aria-label="${name} trumpet note diagram" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<style>
      .staff-line { stroke: #4a565d; stroke-width: 1.5; }
      .ledger-line { stroke: #77858d; stroke-width: 2; }
      .note-head { fill: #f5f0e7; }
      .valve { stroke: #cfd6d9; stroke-width: 2; fill: transparent; }
      .valve.pressed { fill: #e6b85c; stroke: #e6b85c; }
      .valve-num { fill: #87949b; font: 600 12px system-ui; text-anchor: middle; }
    </style>`;

    const staffYStart = 50;
    const spacing = 12;
    for (let i = 0; i < 5; i++) {
      svg += `<line class="staff-line" x1="60" y1="${staffYStart + i * spacing}" x2="300" y2="${staffYStart + i * spacing}" />`;
    }

    const bottomLineY = staffYStart + 4 * spacing;
    const noteY = bottomLineY - (data.staffLine * spacing);
    
    if (data.staffLine <= -1) {
      for (let l = -1; l >= data.staffLine; l--) {
        const ly = bottomLineY - (l * spacing);
        svg += `<line class="ledger-line" x1="164" y1="${ly}" x2="196" y2="${ly}" />`;
      }
    }
    if (data.staffLine >= 5) {
      for (let l = 5; l <= data.staffLine; l++) {
        const ly = bottomLineY - (l * spacing);
        svg += `<line class="ledger-line" x1="164" y1="${ly}" x2="196" y2="${ly}" />`;
      }
    }

    if (data.accidental) {
      svg += `<text x="156" y="${noteY + 4}" fill="#f5f0e7" font-size="18" font-family="serif" text-anchor="end">${data.accidental}</text>`;
    }

    svg += `<ellipse class="note-head" cx="180" cy="${noteY}" rx="8" ry="6" transform="rotate(-15 180 ${noteY})" />`;

    const valveY = compact ? 180 : 210;
    const vSpace = 45;
    const vStart = 180 - vSpace;
    
    data.valves.forEach((pressed, i) => {
      const vx = vStart + i * vSpace;
      svg += `<circle class="valve ${pressed ? 'pressed' : ''}" cx="${vx}" cy="${valveY}" r="12" />`;
      if (!compact) svg += `<text class="valve-num" x="${vx}" y="${valveY + 28}">${i + 1}</text>`;
    });

    svg += `</svg>`;
    return svg;
  }

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
    audioMaster.gain.value = 0.8;
    limiter.threshold.value = -3;
    limiter.knee.value = 2;
    limiter.ratio.value = 10;
    limiter.attack.value = 0.005;
    limiter.release.value = 0.1;
    audioMaster.connect(limiter).connect(ctx.destination);
  }

  function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  async function loadSampleFiles(fileList) {
    const files = [...fileList];
    const ctx = getAudioContext();
    let loaded = 0;
    
    for (const file of files) {
      const nameMatch = file.name.match(/^([A-Ga-g][#b]?\d)\.(wav|mp3|ogg)$/i);
      if (!nameMatch) continue;
      const noteNameClean = nameMatch[1].toUpperCase();
      const finalName = Object.keys(noteData).find(k => k.toUpperCase() === noteNameClean) || noteNameClean;
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer);
        sampleBank.set(finalName, buffer);
        loaded++;
      } catch (err) {
        console.warn("Could not decode", file.name);
      }
    }
    elements.sampleCount.textContent = `${sampleBank.size} / ${Object.keys(noteData).length}`;
    elements.sampleStatusNote.textContent = `${loaded} new recording(s) loaded.`;
  }

  function clearSampleLibrary() {
    sampleBank.clear();
    elements.sampleFilesInput.value = "";
    elements.sampleCount.textContent = `0 / ${Object.keys(noteData).length}`;
    elements.sampleStatusNote.textContent = "Memory cleared. Reverted to synthetic brass fallback.";
  }

  function scheduleSyntheticBrass(ctx, freq, when, duration, gainValue = 0.5) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = freq;

    filter.type = 'lowpass';
    filter.Q.value = 2;
    filter.frequency.setValueAtTime(freq * 0.8, when);
    filter.frequency.linearRampToValueAtTime(freq * 2.5, when + 0.05);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, when + duration);

    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(gainValue, when + 0.04);
    gain.gain.setValueAtTime(gainValue, when + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, when + duration);

    osc.connect(filter).connect(gain).connect(audioMaster || ctx.destination);
    osc.start(when);
    osc.stop(when + duration);
  }

  function playNoteAudio(name, when, duration = 1.0) {
    if (!name || !noteData[name]) return;
    const ctx = getAudioContext();
    
    if (sampleBank.has(name)) {
      const buffer = sampleBank.get(name);
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      const naturalEnd = when + Math.min(buffer.duration, duration);
      gain.gain.setValueAtTime(0.7, when);
      gain.gain.linearRampToValueAtTime(0, naturalEnd);
      source.connect(gain).connect(audioMaster || ctx.destination);
      source.start(when);
      source.stop(naturalEnd + 0.1);
    } else {
      scheduleSyntheticBrass(ctx, midiToFreq(noteData[name].midi), when, duration, 0.45);
    }
  }

  async function playNote(name = currentNote) {
    const ctx = getAudioContext();
    playNoteAudio(name, ctx.currentTime + 0.02, 1.2);
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
    elements.songNote.textContent = song.note || "";

    demoIndex = 0;
    demoBpm = clamp(Number(song.demo?.bpm || 72), 45, 180);
    elements.demoTempo.value = demoBpm;
    elements.demoTempoValue.textContent = `${demoBpm} BPM`;
    elements.demoStatus.textContent = "Ready.";
    renderSongDemo();
  }

  function renderSongDemo() {
    const song = currentPool().song;
    if (!song.melody || !song.melody.length) return;
    
    demoIndex = clamp(demoIndex, 0, song.melody.length - 1);
    const currentNoteObj = song.melody[demoIndex];

    elements.demoTimeline.innerHTML = song.melody.map((noteObj, i) => {
      const activeClass = i === demoIndex ? "active" : (i < demoIndex ? "played" : "");
      const widthFactor = noteObj.d * 40; 
      return `<div class="timeline-note ${activeClass}" style="min-width:${widthFactor}px;" data-note="${noteObj.n}">${noteObj.n}</div>`;
    }).join("");

    const activeEl = elements.demoTimeline.children[demoIndex];
    if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    elements.demoCurrentDiagram.innerHTML = buildValveSVG(currentNoteObj.n, noteData[currentNoteObj.n], true);
    elements.demoStepLabel.textContent = `Note ${demoIndex + 1} of ${song.melody.length}`;
    elements.demoPlayBtn.textContent = demoPlaying ? "Ⅱ Pause" : (demoIndex === 0 ? "▶ Start playback" : "▶ Resume");
  }

  function demoTick() {
    if (!demoPlaying) return;
    const song = currentPool().song;
    const noteObj = song.melody[demoIndex];
    
    renderSongDemo();
    
    const ctx = getAudioContext();
    const beatMs = 60000 / demoBpm;
    const durationMs = noteObj.d * beatMs;
    
    playNoteAudio(noteObj.n, ctx.currentTime + 0.02, (durationMs / 1000) * 0.90);

    clearTimeout(demoTimer);
    
    demoTimer = setTimeout(() => {
      if (!demoPlaying) return;
      demoIndex++;
      
      if (demoIndex >= song.melody.length) {
        demoIndex = 0;
        stopSongDemo(false);
        elements.demoStatus.textContent = "Playback complete.";
        renderSongDemo();
        return;
      }
      demoTick();
    }, durationMs);
  }

  async function startSongDemo() {
    if (demoPlaying) {
      stopSongDemo(true);
      elements.demoStatus.textContent = "Paused.";
      return;
    }
    demoPlaying = true;
    elements.demoStatus.textContent = "Playing...";
    
    if (demoIndex >= currentPool().song.melody.length) demoIndex = 0;
    
    demoTick();
  }

  function stopSongDemo(keepPosition = true) {
    demoPlaying = false;
    if (demoTimer) clearTimeout(demoTimer);
    demoTimer = null;
    if (!keepPosition) demoIndex = 0;
    if (elements.demoPlayBtn) renderSongDemo();
  }

  $("#gotItBtn").addEventListener("click", () => gradeForward(true));
  $("#missedBtn").addEventListener("click", () => gradeForward(false));
  elements.continueBtn.addEventListener("click", newQuestion);
  elements.hearBtn.addEventListener("click", () => playNote());
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
  elements.clearSamplesBtn.addEventListener("click", clearSampleLibrary);

  $("#restartBtn").addEventListener("click", resetCurrentPool);
  $("#practiceAgainBtn").addEventListener("click", resetCurrentPool);
  $("#choosePoolBtn").addEventListener("click", openSettings);
  elements.demoPlayBtn.addEventListener("click", startSongDemo);
  elements.demoHearBtn.addEventListener("click", () => playNote(currentPool().song.melody[demoIndex].n));
  elements.demoTempo.addEventListener("input", () => {
    demoBpm = clamp(Number(elements.demoTempo.value), 45, 180);
    elements.demoTempoValue.textContent = `${demoBpm} BPM`;
    if (demoPlaying) {
      clearTimeout(demoTimer);
      demoTick();
    }
  });
  $("#resetAllBtn").addEventListener("click", () => {
    if (confirm("Reset progress for every note pool?")) resetAllProgress();
  });

  document.addEventListener("keydown", (e) => {
    if (elements.drawerBackdrop.classList.contains("open")) {
      if (e.key === "Escape") closeSettings();
      return;
    }
    if (e.code === "Space") { e.preventDefault(); playNote(); }
    if (e.key.toLowerCase() === "f" && questionType === "forward") { e.preventDefault(); showDiagram(); }
    if (e.key === "1" && questionType === "forward" && !answered) gradeForward(true);
    if (e.key === "2" && questionType === "forward" && !answered) gradeForward(false);
    if (e.key === "Enter" && answered) { e.preventDefault(); newQuestion(); }
  });

  pools.forEach(ensurePoolProgress);
  saveJSON(STORAGE_KEY, progress);
  renderPoolStatus();
  renderPoolList();
  newQuestion();
})();