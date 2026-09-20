import type { Level } from '../types'

export type Lang = 'en' | 'fr' | 'he'

export interface Translations {
  dir: 'ltr' | 'rtl'
  langName: string

  // App
  appName: string
  appTagline: string

  // Language picker
  langEn: string
  langFr: string
  langHe: string

  // Setup
  newTrial: string
  competitionLevel: string
  addParticipantsBtn: string
  alertSelectLevel: string

  // Exercise order
  orderTitle: (lvl: string) => string
  orderHint: string
  orderFixedLast: string
  orderResetBtn: string
  orderConfirmBtn: string
  errOrderMissing: string
  errOrderDuplicate: (n: number) => string
  orderJumpsHint: (lvl: string, n: number) => string
  errOrderJumps: (n: number) => string
  jumpPerformedLabel: string
  jumpDefaultNote: string
  orderMaxNote: (achievable: number, levelMax: number) => string

  // Practice mode
  practiceBtn: string
  practiceBtnHint: string
  practiceTitle: string
  practiceIntro: string
  practiceSearch: string
  practiceResults: (n: number) => string
  practiceNoResults: string
  practiceTapHint: string
  practiceRemains: (after: number, max: number) => string
  practiceAllLost: string
  practiceNoDeduct: string
  practiceLost: string
  practiceRemaining: string
  practiceResetAll: string
  practiceJumpChoice: string

  // Score drill
  quizBtn: string
  quizBtnHint: string
  quizTitle: string
  quizIntro: (n: number) => string
  quizModeLabel: string
  quizUntimed: string
  quizTimed: (sec: number) => string
  quizUntimedHint: string
  quizTimedHint: string
  quizStartBtn: string
  quizMastered: (done: number, total: number) => string
  quizMapTitle: (lvl: string, max: number) => string
  quizPts: (n: number) => string
  quizAllAnswer: string
  quizAskExPts: (ex: string, lvl: string) => string
  quizAskPtsEx: (pts: number, lvl: string) => string
  quizAskJump: (ex: string, height: string, lvl: string) => string
  quizAskPen: (ex: string, pen: string) => string
  quizCorrectLabel: string
  quizRight: string
  quizWrong: string
  quizTimeUp: string
  quizCorrectIs: (answer: string) => string
  quizFinishBtn: string
  quizPerfect: string
  quizMissedTitle: (n: number) => string
  quizTime: (sec: number) => string
  quizAgainBtn: string
  quizBackToStart: string

  // Resume, paperwork, printing, stopwatch
  qual: Record<string, string>
  resumeTitle: string
  resumeDetail: (lvl: string, count: number, when: string) => string
  resumeBtn: string
  resumeDiscardBtn: string
  trialDetailsTitle: string
  detailDate: string
  detailLocation: string
  detailClub: string
  detailJudge: string
  detailDecoys: string
  extraFieldsTitle: string
  extraFields: Record<string, string>
  printBtn: string
  competitorCounter: (pos: number, total: number) => string
  confirmDisqTitle: string
  confirmDisqBody: (ex: string, pts: number) => string
  confirmDisqOk: string
  confirmCancel: string
  swTitle: string
  swStart: string
  swPause: string
  swReset: string
  swClose: string
  swTargetLabel: string
  swSeconds: (n: number) => string
  swPassed: (n: number) => string
  saveBtn: string
  cancelEditBtn: string
  editBtn: string
  deleteBtn: string
  markStatusTitle: (dog: string, handler: string) => string
  markStatusBody: string
  markAbsent: string
  markAbsentHint: string
  markEliminated: string
  markEliminatedHint: string
  statusLabel: Record<string, string>
  jumpSlotName: string
  jumpSlotHint: string
  orderSlotHint: (lvl: string, n: number) => string
  judgeJumpPick: string

  // Printed report
  detailOrganization: string
  sigJudge: string
  sigDecoys: string
  sigClear: string
  sigHint: string
  sexOptions: Record<string, string>
  remarksLabel: string
  remarksPlaceholder: string
  reportBtn: string
  reportAllBtn: string
  reportTitle: string
  reportShareBtn: string
  reportWorking: (done: number, total: number) => string
  reportWorkingShort: string
  reportShared: string
  reportDownloaded: string
  reportError: (msg: string) => string
  sheetHeightNote: (label: string, pts: number, nominal: number) => string
  eliminatedNote: string
  levelShort: (lvl: string) => string

  // Participants
  back: string
  levelParticipants: (lvl: string) => string
  startNumLabel: string
  handlerLabel: string
  dogLabel: string
  handlerPlaceholder: string
  dogPlaceholder: string
  addBtn: string
  errValidStartNum: string
  errStartNumUsed: (n: number) => string
  errHandlerRequired: string
  errDogRequired: string
  errAddAtLeastOne: string
  noParticipantsYet: string
  handlerDogCol: string
  competitorsRegistered: (n: number) => string
  beginTrial: string

  // Judge
  levelCompetitor: (lvl: string, n: number, total: number) => string
  scoresheetBtn: string
  prevBtn: string
  nextBtn: string
  maxPtsMeta: (pts: number) => string
  notScoredMeta: string
  jumpHeightLabel: string
  notPerformedLabel: string
  notPerformedMsg: string
  jumpsHint: (lvl: string, n: number, total: number) => string
  jumpLimitMsg: (n: number) => string
  clearJumpLabel: string
  maxLabel: string
  deductedLabel: string
  scoreLabel: string
  resetBtn: string
  tappedLabel: string
  noneYetLabel: string
  tapToDeductHint: string
  perUnitLabel: (unit: string) => string
  disqualifyLabel: string
  gaNoteLabel: string
  noPenaltyLabel: string
  notScoredMsg: (lvl: string) => string

  // Modal
  modalEachUnit: (unit: string, pts: number) => string
  applyBtn: (pts: number) => string
  cancelBtn: string

  // Sheet
  scoreSheetTitle: string
  backToJudgingBtn: string
  startNumMeta: string
  handlerMeta: string
  dogMeta: string
  levelMeta: string
  obExercises: string
  jmpExercises: string
  bitExercises: string
  subtotalLabel: (disc: string) => string
  naLabel: string
  finalResult: string
  outOfPts: (max: number) => string
  dqLabel: string
  nextCompetitorBtn: (pos: number, total: number) => string
  finishTrialBtn: string

  // Results
  trialResults: string
  trialResultsSpan: string
  resultsSubtitle: (lvl: string, count: number) => string
  newTrialBtn: string
  rankCol: string
  handlerDogColResults: string
  resultCol: string
  scoreCol: string

  // Qualifiers
  qualExcellent: string
  qualVeryGood: string
  qualGood: string
  qualSufficient: string
  qualInsufficient: string
  qualQualified: string
  qualNotQualified: string

  // Disciplines
  disc: Record<string, string>

  // Exercise names by ID
  exNames: Record<string, string>

  // Exercise notes by ID (optional)
  exNotes: Partial<Record<string, string>>

  // Penalty descriptions by ID (may be function for level-dependent text)
  penDescs: Record<string, string | ((level: Level) => string)>

  // Unit names
  units: Record<string, string>
}

// ─────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────
const en: Translations = {
  dir: 'ltr',
  langName: 'English',

  appName: 'Mondioring – ScoreRing',
  appTagline: 'Judge Scoring App',

  langEn: 'EN',
  langFr: 'FR',
  langHe: 'עב',

  newTrial: 'New Trial',
  competitionLevel: 'Competition Level',
  addParticipantsBtn: 'Add Participants →',
  alertSelectLevel: 'Please select a competition level.',

  back: '← Back',
  orderTitle: lvl => `Level ${lvl} — Exercise Order`,
  orderHint: 'Give each exercise its running number for this trial. Every number must be unique.',
  orderFixedLast: 'Always last',
  orderResetBtn: 'Default order',
  orderConfirmBtn: 'Confirm Order →',
  errOrderMissing: 'Every exercise needs a number.',
  errOrderDuplicate: n => `Number ${n} is used more than once.`,
  orderJumpsHint: (lvl, n) => `Level ${lvl}: tap + on the ${n === 1 ? 'jump' : `${n} jumps`} the handler chose; the rest are dropped. Jumps without a + are compulsory at this level.`,
  errOrderJumps: n => `Tap ✓ on exactly ${n === 1 ? 'one jump' : `${n} jumps`} to include ${n === 1 ? 'it' : 'them'} in the trial.`,
  practiceBtn: 'Score Check',
  practiceBtnHint: 'See what each mistake costs — no trial',
  practiceTitle: 'Score Check',
  practiceIntro: 'Tap any mistake to see what it costs and what the dog is left with. Nothing here is recorded as a trial.',
  practiceSearch: 'Search a mistake…',
  practiceResults: n => `${n} matching ${n === 1 ? 'mistake' : 'mistakes'} — tap one to open its exercise`,
  practiceNoResults: 'No matching mistake at this level.',
  practiceTapHint: 'Tap a mistake to subtract it',
  practiceRemains: (after, max) => `leaves ${after} of ${max}`,
  practiceAllLost: 'the whole exercise is lost',
  practiceNoDeduct: 'no points deducted',
  practiceLost: 'Lost',
  practiceRemaining: 'Left',
  practiceResetAll: 'Start over',
  practiceJumpChoice: 'Which jump is performed',
  quizBtn: 'Score Drill',
  quizBtnHint: 'Learn the points by heart',
  quizTitle: 'Score Drill',
  quizIntro: n => `${n} questions a round. Whatever you miss comes back in the next round, and what you know returns days later.`,
  quizModeLabel: 'Timing',
  quizUntimed: 'No timer',
  quizTimed: sec => `Timed · ${sec}s`,
  quizUntimedHint: 'Take as long as you like on each question.',
  quizTimedHint: 'A question left unanswered when the bar runs out counts as wrong.',
  quizStartBtn: 'Start round',
  quizMastered: (done, total) => `${done} of ${total} answered right twice or more`,
  quizMapTitle: (lvl, max) => `Score map — Level ${lvl}, ${max} points`,
  quizPts: n => `${n} pts`,
  quizAllAnswer: 'the whole exercise',
  quizAskExPts: (ex, lvl) => `How many points is “${ex}” worth at Level ${lvl}?`,
  quizAskPtsEx: (pts, lvl) => `Which exercise is worth ${pts} points at Level ${lvl}?`,
  quizAskJump: (ex, height, lvl) => `How many points is the ${ex} at ${height} worth at Level ${lvl}?`,
  quizAskPen: (ex, pen) => `${ex} — how much comes off for “${pen}”?`,
  quizCorrectLabel: 'right',
  quizRight: 'Correct',
  quizWrong: 'Not quite',
  quizTimeUp: 'Time up',
  quizCorrectIs: answer => `The answer is ${answer}`,
  quizFinishBtn: 'See result',
  quizPerfect: 'Every answer right.',
  quizMissedTitle: n => `${n} to go over`,
  quizTime: sec => `${sec} seconds`,
  quizAgainBtn: 'Another round',
  quizBackToStart: 'Back',
  qual: {
    excellent: 'Excellent', veryGood: 'Very good', good: 'Good', sufficient: 'Sufficient',
    insufficient: 'Insufficient', qualified: 'Qualified', notQualified: 'Not qualified',
  },
  resumeTitle: 'A trial is still open',
  resumeDetail: (lvl, count, when) => `Level ${lvl} · ${count} competitors · saved ${when}`,
  resumeBtn: 'Carry on judging',
  resumeDiscardBtn: 'Discard it',
  trialDetailsTitle: 'Trial details (optional)',
  detailDate: 'Date',
  detailLocation: 'Location',
  detailClub: 'Club',
  detailJudge: 'Judge',
  detailDecoys: 'Decoys',
  extraFieldsTitle: 'More about the dog (optional)',
  extraFields: {
    breed: 'Breed', birthDate: 'Date of birth', chip: 'Chip',
    pedigree: 'Pedigree no.', scorebook: 'Scorebook no.', catalog: 'Catalogue no.',
    sex: 'Sex', phone: 'Phone',
  },
  printBtn: 'Print / PDF',
  competitorCounter: (pos, total) => `Competitor ${pos} of ${total}`,
  confirmDisqTitle: 'Lose the whole exercise?',
  confirmDisqBody: (ex, pts) => `${ex} drops to 0 — ${pts} points lost.`,
  confirmDisqOk: 'Yes, zero it',
  confirmCancel: 'Cancel',
  swTitle: 'Stopwatch',
  swStart: 'Start',
  swPause: 'Pause',
  swReset: 'Reset',
  swClose: 'Close stopwatch',
  swTargetLabel: 'Limit',
  swSeconds: n => `${n}s`,
  swPassed: n => `Past ${n < 60 ? `${n} seconds` : `${n / 60} minutes`}.`,
  saveBtn: 'Save',
  cancelEditBtn: 'Cancel edit',
  editBtn: 'Edit competitor',
  deleteBtn: 'Remove competitor',
  markStatusTitle: (dog, handler) => `End the run for ${dog} / ${handler}?`,
  markStatusBody: 'The competitor moves to the results and judging continues with the next one.',
  markAbsent: 'Absent',
  markAbsentHint: 'Never came to the ring — no score',
  markEliminated: 'Eliminated',
  markEliminatedHint: 'Sent out mid-trial — keeps the points scored so far',
  statusLabel: { absent: 'Absent', eliminated: 'Eliminated' },
  jumpSlotName: 'Jump — handler\'s choice',
  jumpSlotHint: 'Apparatus chosen at the ring',
  orderSlotHint: (lvl, n) => `Level ${lvl}: ${n === 1 ? 'one jump is' : `${n} jumps are`} run, and each handler chooses the apparatus for their own dog. Number the slot here; pick the apparatus while judging.`,
  judgeJumpPick: 'Which jump is this handler running',
  detailOrganization: 'Organization',
  sigJudge: 'Judge\'s signature',
  sigDecoys: 'Decoys\' signature',
  sigClear: 'Clear',
  sigHint: 'Sign here with a finger',
  sexOptions: { '': '—', male: 'Male', female: 'Female' },
  remarksLabel: 'Judge\'s remarks',
  remarksPlaceholder: 'Printed on the scoresheet — optional',
  reportBtn: 'Produce scoresheet',
  reportAllBtn: 'Produce all scoresheets',
  reportTitle: 'Scoresheet',
  reportShareBtn: 'Share / save PDF',
  reportWorking: (d, t) => `Preparing PDF… ${d}/${t}`,
  reportWorkingShort: 'Preparing…',
  reportShared: 'PDF ready.',
  reportDownloaded: 'PDF downloaded.',
  reportError: m => `Could not create the PDF: ${m}`,
  sheetHeightNote: (label, pts, nominal) => `${pts - nominal} · jumped ${label} (${pts} of ${nominal})`,
  eliminatedNote: 'Not run — eliminated',
  levelShort: lvl => `Level ${lvl}`,
  jumpPerformedLabel: 'Jumping · performed',
  jumpDefaultNote: 'Counting the full height until you record the one the handler chose.',
  orderMaxNote: (a, m) => `These jumps allow at most ${a} of ${m} points — the hurdle is worth more than the palisade or the long jump at this level.`,
  levelParticipants: lvl => `Level ${lvl} — Participants`,
  startNumLabel: '#',
  handlerLabel: 'Handler',
  dogLabel: 'Dog',
  handlerPlaceholder: 'e.g. John Smith',
  dogPlaceholder: 'e.g. Rex',
  addBtn: '+ Add',
  errValidStartNum: 'Enter a valid start number.',
  errStartNumUsed: n => `Start number ${n} is already used.`,
  errHandlerRequired: 'Handler name is required.',
  errDogRequired: 'Dog name is required.',
  errAddAtLeastOne: 'Add at least one participant.',
  noParticipantsYet: 'No participants yet — add competitors above',
  handlerDogCol: 'Handler / Dog',
  competitorsRegistered: n => `${n} competitor${n !== 1 ? 's' : ''} registered`,
  beginTrial: 'Begin Trial →',

  levelCompetitor: (lvl, n, total) => `Level ${lvl} · Competitor ${n} of ${total}`,
  scoresheetBtn: 'Scoresheet →',
  prevBtn: '← Prev',
  nextBtn: 'Next →',
  maxPtsMeta: pts => `Max: ${pts} pts`,
  notScoredMeta: 'Not scored at this level',
  jumpHeightLabel: 'Height / distance chosen by handler',
  notPerformedLabel: 'Not performed',
  notPerformedMsg: 'This jump is not performed — the level\'s jump quota is already filled.',
  jumpsHint: (lvl, n, total) => n === total
    ? `Level ${lvl}: all ${total} jumps are performed`
    : `Level ${lvl}: ${n === 1 ? 'one jump' : `${n} jumps`} of ${total}, chosen by the handler`,
  jumpLimitMsg: n => `${n === 1 ? 'The jump for this level has' : `The ${n} jumps for this level have`} already been chosen. To score this one instead, clear the choice on the other jump.`,
  clearJumpLabel: 'Clear choice',
  maxLabel: 'Max',
  deductedLabel: 'Deducted',
  scoreLabel: 'Score',
  resetBtn: 'Reset',
  tappedLabel: 'Tapped:',
  noneYetLabel: 'None yet',
  tapToDeductHint: 'Tap a penalty to deduct from score',
  perUnitLabel: unit => `per ${unit}`,
  disqualifyLabel: 'DISQUALIFY',
  gaNoteLabel: 'G.A.',
  noPenaltyLabel: 'No Penalty',
  notScoredMsg: lvl => `This exercise is not scored at Level ${lvl}`,

  modalEachUnit: (unit, pts) => `Each ${unit}: ${pts} pts · Enter number of ${unit}`,
  applyBtn: pts => `Apply — ${pts} pts deducted`,
  cancelBtn: 'Cancel',

  scoreSheetTitle: 'Score',
  backToJudgingBtn: '← Back to Judging',
  startNumMeta: 'Start #',
  handlerMeta: 'Handler',
  dogMeta: 'Dog',
  levelMeta: 'Level',
  obExercises: 'Obedience Exercises',
  jmpExercises: 'Jumping Exercises',
  bitExercises: 'Biting Exercises',
  subtotalLabel: disc => `Subtotal ${disc}`,
  naLabel: 'N/A',
  finalResult: 'Final Result',
  outOfPts: max => `out of ${max} pts`,
  dqLabel: '⚠ DQ:',
  nextCompetitorBtn: (pos, total) => `Next Competitor (${pos}/${total}) →`,
  finishTrialBtn: 'Finish Trial →',

  trialResults: 'Trial',
  trialResultsSpan: 'Results',
  resultsSubtitle: (lvl, count) => `Mondioring – ScoreRing — Level ${lvl} · ${count} competitors`,
  newTrialBtn: 'New Trial',
  rankCol: 'Rank',
  handlerDogColResults: 'Handler / Dog',
  resultCol: 'Result',
  scoreCol: 'Score',

  qualExcellent: 'Excellent',
  qualVeryGood: 'Very Good',
  qualGood: 'Good',
  qualSufficient: 'Sufficient',
  qualInsufficient: 'Insufficient',
  qualQualified: 'Qualified',
  qualNotQualified: 'Not Qualified',

  disc: { ob: 'Obedience', jmp: 'Jumping', bit: 'Biting' },

  exNames: {
    heel:          'Heeling Without Leash',
    absence:       'Absence of Handler',
    sendaway:      'Send Away',
    positions:     'Positions',
    food:          'Refusal of Food',
    retrieve:      'Retrieve of a Thrown Object',
    search:        'Search for an Object',
    palisade:      'Palisade',
    longjump:      'Long Jump',
    hurdle:        'Hurdle',
    facebaton:     'Face Attack with Baton',
    faceacc:       'Face Attack with Accessories',
    flee:          'Flee Attack',
    stoppedFlee:   'Stopped Flee Attack',
    searchescort:  'Search and Escort',
    defence:       'Defence of the Handler',
    guardobj:      'Guarding an Object',
  },

  exNotes: {},

  penDescs: {
    // Heeling
    heel1: 'Dog forges, lags, or goes wide',
    heel2: 'Dog abandons or does not follow handler',
    heel3: 'Handler makes minor error in pattern',
    heel4: 'Handler error avoids a difficulty — all points lost',
    heel5: "Dog/handler starts before Judge's signal",
    heel6: 'Extra command after start — all points lost',
    // Absence
    ab1: 'Dog changes position during 1 min absence',
    ab2: 'Dog changes position going to blind',
    ab3: 'Handler looks back towards dog',
    ab4: 'Dog moves without changing position',
    ab5: "Dog changes position on handler's return",
    ab6: 'Handler shows himself during exercise',
    ab7: 'Irregular or disallowed command',
    // Send Away
    sa1: 'Command by voice AND gesture',
    sa2: 'Extra command to send dog forward',
    sa3: 'Dog zigzags',
    sa4: 'Dog returns before command',
    sa5: "Dog/handler starts before Judge's signal",
    sa6: 'Dog starts after signal but before command',
    sa7: 'Dog does not pass line within 20 sec — all lost',
    sa8: 'Extra command to recall dog',
    sa9: 'Dog does not return within 20 sec — all lost',
    sa10: 'Dog wanders loosely back to handler',
    sa11: 'Handler waits too long to recall dog',
    // Positions
    pos1: 'Dog changes from initial position',
    pos2: "Handler does not sit dog first / disrespects signal",
    pos3: 'Dog does not execute indicated position',
    pos4: 'Dog moves towards handler',
    pos5: lvl => `Dog returns before end — per meter (${lvl === 1 ? '-1' : '-2'} per m)`,
    pos6: 'Dog rotates on itself',
    pos7: 'Dog moves forward 0.5 m (not perfect)',
    // Food
    fd1: 'Dog licks, eats, or takes food in mouth — all lost',
    fd2: 'Dog moves away from thrown food',
    fd3: 'Handler breaks in or interferes — all lost',
    fd4: 'Dog moves when food thrown (max 3m)',
    fd5: 'Dog changes position after handler left (before food)',
    fd6: "Dog moves upon handler's return",
    // Retrieve
    ret1: 'Extra or irregular command — all lost',
    ret2: 'Command by voice AND gesture',
    ret3: 'Object not retrieved within 15 sec — all lost',
    ret4: "Dog/handler starts before Judge's signal",
    ret5: 'Dog starts after signal but before command',
    ret6: 'Dog plays with or chews object',
    ret7: 'Dog drops object while returning',
    ret8: 'Dog not sitting when handler takes object',
    ret9: "Dog drops at handler's feet — handler picks up",
    ret10: "Handler moves as dog returns — all lost",
    ret11: 'Handler must move feet to get object — all lost',
    // Search for Object
    srch1: 'Handler shows dog the wood — all lost',
    srch2: 'Commands by voice AND gesture',
    srch3: 'Additional send commands — all lost',
    srch4: 'Object not brought back / not in time — all lost',
    srch5: "Dog/handler starts before Judge's signal",
    srch6: 'Dog starts after signal but before command',
    srch7: 'Dog chews the object',
    srch8: 'Dog drops object during return',
    srch9: 'Dog drops wood at feet — handler picks up',
    srch10: 'Object retrieved but dog not sitting',
    srch11: 'Dog leaves place before handler returns (>2m) — all lost',
    srch12: 'Dog moves within 2m radius',
    srch13: 'Dog selects wrong object — all lost',
    srch14: 'Handler moves as dog returns — all lost',
    srch15: 'Handler must move feet to get object — all lost',
    srch16: 'Handler puts hand in pocket too early — all lost',
    srch17: 'Handler places wood incorrectly — all lost',
    srch18: 'Handler manipulates object / extra scent — all lost',
    // Palisade
    pal1: "Dog starts before Judge's signal (loses one attempt)",
    pal2: 'Dog starts after signal but before command',
    pal3: 'Command by voice AND gesture',
    pal4: 'Refusal or going around',
    pal5: 'Knocking down boards',
    pal6: 'Missing (attempt failed)',
    pal7: 'Failure to take position behind obstacle',
    pal8: 'Additional command for position/placement/recall',
    pal9: 'Additional send command',
    pal10: 'Dog does not return to heel within 10 sec',
    // Long Jump
    lj1: "Dog starts before Judge's signal (loses one attempt)",
    lj2: 'Dog starts after signal but before command',
    lj3: 'Command by voice AND gesture',
    lj4: 'Refusal or going around',
    lj5: 'Dog steps within the frame',
    lj6: 'Knocking down boards',
    lj7: 'Missing (attempt failed)',
    lj8: 'Failure to take position behind obstacle',
    lj9: 'Additional command',
    lj10: 'Additional send command',
    lj11: 'Dog does not return to heel within 10 sec',
    // Hurdle
    hrd1: "Dog starts before Judge's signal (loses one attempt)",
    hrd2: 'Dog starts after signal but before command',
    hrd3: 'Command by voice AND gesture',
    hrd4: 'Refusal or going around (forward or return)',
    hrd5: 'Knocking down boards (forward or return)',
    hrd6: 'Missing forward or back',
    hrd7: 'Failure to take position behind obstacle',
    hrd8: 'Additional command for position/recall',
    hrd9: 'Additional send command',
    hrd10: 'Dog does not return to heel within 10 sec',
    hrd11: 'Position command by voice AND gesture (after forward jump)',
    hrd12: 'Dog touches hurdle (forward or return)',
    hrd13: 'Dog pushes hurdle but it does not fall',
    // Face Attack Baton
    fb1: "Starting before Judge's signal (+5 G.A.)",
    fb2: 'Second offense of starting before signal — ALL',
    fb3: 'Starting after signal but before command',
    fb4: 'Additional attack command',
    fb5: 'Per second not biting',
    fb6: 'Per rapid change in bite',
    fb7: 'Per second biting after out command',
    fb8: 'Additional bite after end of exercise',
    fb9: 'Additional recall command',
    fb10: 'Not biting at time of recall (+per sec not biting)',
    fb11: 'Failure to return within 30 sec',
    fb12: 'Dog does not attack or bite — ALL',
    fb13: 'Handler leaves starting line — ALL',
    fb14: 'Dog hesitates in front of obstacle (from start pts)',
    fb15: 'Dog bypasses obstacle (from bite pts)',
    fb16: 'Dog creeps forward at start line',
    fb17: 'Dog stops biting at horn and returns to handler',
    // Face Attack Accessories
    fa1: "Starting before Judge's signal (+5 G.A.)",
    fa2: 'Second offense of starting before signal — ALL',
    fa3: 'Starting after signal but before command',
    fa4: 'Additional attack command',
    fa5: 'Per second not biting',
    fa6: 'Per rapid change in bite',
    fa7: 'Per second biting after out command',
    fa8: 'Additional bite after end of exercise',
    fa9: 'Additional recall command',
    fa10: 'Not biting at time of recall (+per sec not biting)',
    fa11: 'Failure to return within 30 sec',
    fa12: 'Dog does not attack or bite — ALL',
    fa13: 'Handler leaves starting line — ALL',
    fa14: 'Dog hesitates in front of obstacle (from start pts)',
    fa15: 'Dog bypasses obstacle',
    fa16: 'Dog creeps forward at start line',
    fa17: 'Dog stops biting at horn and returns to handler',
    fa18: 'Dog aggresses a civilian — exercise terminated, ALL',
    // Flee
    fl1: "Starting before Judge's signal (+5 G.A.)",
    fl2: 'Second offense of starting before signal — ALL',
    fl3: 'Starting after signal but before command',
    fl4: 'Additional attack command',
    fl5: 'Per second not biting',
    fl6: 'Per rapid change in bite',
    fl7: 'Per second biting after out command',
    fl8: 'Additional bite after end of exercise',
    fl9: 'Additional recall command',
    fl10: 'Not biting at time of recall (+per sec not biting)',
    fl11: 'Failure to return within 30 sec',
    fl12: 'Dog does not attack or bite — ALL',
    fl13: 'Handler leaves starting line — ALL',
    fl14: 'Dog creeps forward at start line',
    fl15: 'Dog stops biting at horn and returns to handler',
    // Stopped Flee
    sf1: "Starting before Judge's signal (+5 G.A.)",
    sf2: 'Starting after signal but before command',
    sf3: 'Dog bites — all lost',
    sf4: 'Per extra meter beyond 3m from decoy (at recall)',
    sf5: 'Additional recall if dog within 3m of handler',
    sf6: 'Additional recall if dog outside 3m of handler',
    // Search & Escort
    se1: 'Additional search command (only one allowed)',
    se2: 'Dog does not search despite second command — all',
    se3: 'Dog does not discover decoy in time — all',
    se4: 'Dog does not bark in allotted time',
    se5: 'Dog bites within the blind',
    se6: 'Dog does not guard closely at blind',
    se7: 'Handler runs to blind (G.A.)',
    se8: 'Each bite during escort or after "out"',
    se9: 'Additional "out" command',
    se10: 'Dog lets decoy escape',
    se11: 'Handler does not maintain 3m distance during escort',
    se12: 'Handler interferes with decoy during escape',
    se13: 'Dog does not guard closely for 5 sec before horn',
    se14: "Dog leaves guard at Judge's signal",
    se15: 'Dog does not return within 10 sec of recall',
    se16: 'Dog barks without having discovered decoy',
    // Defence
    def1: 'Handler talks to dog after start command',
    def2: 'Handler responds to conversation without authorization',
    def3: 'Dog bites before or during meeting/conversation',
    def4: 'Dog bites after meeting but before aggression',
    def5: 'Dog moves away from handler without biting (1m allowance)',
    def6: 'Dog abandons handler beyond 10m — all lost',
    def7: 'Dog attacks third person — all lost',
    def8: 'Dog does not defend during 2 sec aggression — all lost',
    def9: "Handler encourages dog / does not stay 3m away — all lost",
    def10: 'Bites after "out"',
    def11: 'Per second not biting',
    def12: 'Dog does not return within 10 sec of recall',
    def13: 'Dog leaves guard in place before command',
    def14: 'Dog does not guard closely for 5 sec',
    // Guard Object
    go1: 'Dog bites Decoy within 2m zone before touching object',
    go2: 'Dog bites & dragged beyond 2m circle',
    go3: 'Dog bites & dragged beyond 5m from bite spot',
    go4: 'Dragged beyond 5m — does not release in 10 sec',
    go5: 'Dog lets decoy move object, bites inside circles',
    go6: 'Dog lets decoy move object, bites at 5–10m',
    go7: 'Dog lets decoy take object beyond 10m',
    go8: 'Dog bites decoy between 2m and 5m',
    go9: 'Dog bites decoy beyond 5m — exercise ended',
    go10: 'Handler looks back heading to blind — all lost',
    go11: 'Decoy succeeds in stealing object (any attempt)',
  },

  units: {
    'mistakes': 'mistakes',
    'meters': 'meters',
    'extra commands': 'extra commands',
    'changes of direction': 'changes of direction',
    'times': 'times',
    'positions missed': 'positions missed',
    'refusals': 'refusals',
    'commands': 'commands',
    'seconds': 'seconds',
    'changes': 'changes',
    'bites': 'bites',
    'extra recalls': 'extra recalls',
    'meters escaped': 'meters escaped',
    'extra meters': 'extra meters',
  },
}

// ─────────────────────────────────────────────────────────────
// FRENCH
// ─────────────────────────────────────────────────────────────
const fr: Translations = {
  dir: 'ltr',
  langName: 'Français',

  appName: 'Mondioring – ScoreRing',
  appTagline: 'Application de Notation',

  langEn: 'EN',
  langFr: 'FR',
  langHe: 'עב',

  newTrial: 'Nouveau Concours',
  competitionLevel: 'Niveau de Compétition',
  addParticipantsBtn: 'Ajouter des Participants →',
  alertSelectLevel: 'Veuillez sélectionner un niveau de compétition.',

  back: '← Retour',
  orderTitle: lvl => `Niveau ${lvl} — Ordre des exercices`,
  orderHint: 'Attribuez à chaque exercice son numéro de passage pour ce concours. Chaque numéro doit être unique.',
  orderFixedLast: 'Toujours en dernier',
  orderResetBtn: 'Ordre par défaut',
  orderConfirmBtn: 'Valider l\'ordre →',
  errOrderMissing: 'Chaque exercice doit avoir un numéro.',
  errOrderDuplicate: n => `Le numéro ${n} est utilisé plusieurs fois.`,
  orderJumpsHint: (lvl, n) => `Niveau ${lvl} : touchez + sur ${n === 1 ? 'le saut choisi' : `les ${n} sauts choisis`} ; les autres sont retirés. Les sauts sans + sont obligatoires à ce niveau.`,
  errOrderJumps: n => `Touchez ✓ sur exactement ${n === 1 ? 'un saut' : `${n} sauts`} pour ${n === 1 ? "l'inclure" : 'les inclure'} au concours.`,
  practiceBtn: 'Simulateur',
  practiceBtnHint: 'Voir ce que coûte chaque faute — hors concours',
  practiceTitle: 'Simulateur',
  practiceIntro: 'Touchez une faute pour voir ce qu\'elle coûte et ce qu\'il reste au chien. Rien ici n\'est enregistré comme concours.',
  practiceSearch: 'Rechercher une faute…',
  practiceResults: n => `${n} faute${n === 1 ? '' : 's'} trouvée${n === 1 ? '' : 's'} — touchez pour ouvrir l\'exercice`,
  practiceNoResults: 'Aucune faute correspondante à ce niveau.',
  practiceTapHint: 'Touchez une faute pour la déduire',
  practiceRemains: (after, max) => `il reste ${after} sur ${max}`,
  practiceAllLost: 'tout l\'exercice est perdu',
  practiceNoDeduct: 'aucun point retiré',
  practiceLost: 'Perdu',
  practiceRemaining: 'Reste',
  practiceResetAll: 'Recommencer',
  practiceJumpChoice: 'Quel saut est effectué',
  quizBtn: 'Entraînement',
  quizBtnHint: 'Apprendre les points par cœur',
  quizTitle: 'Entraînement',
  quizIntro: n => `${n} questions par manche. Ce que vous ratez revient à la manche suivante, ce que vous savez revient des jours plus tard.`,
  quizModeLabel: 'Chronomètre',
  quizUntimed: 'Sans chrono',
  quizTimed: sec => `Chronométré · ${sec}s`,
  quizUntimedHint: 'Prenez le temps qu\'il vous faut à chaque question.',
  quizTimedHint: 'Une question sans réponse à la fin de la barre compte comme fausse.',
  quizStartBtn: 'Commencer',
  quizMastered: (done, total) => `${done} sur ${total} réussis au moins deux fois`,
  quizMapTitle: (lvl, max) => `Carte des points — Niveau ${lvl}, ${max} points`,
  quizPts: n => `${n} pts`,
  quizAllAnswer: 'tout l\'exercice',
  quizAskExPts: (ex, lvl) => `Combien vaut « ${ex} » au Niveau ${lvl} ?`,
  quizAskPtsEx: (pts, lvl) => `Quel exercice vaut ${pts} points au Niveau ${lvl} ?`,
  quizAskJump: (ex, height, lvl) => `Combien vaut ${ex} à ${height} au Niveau ${lvl} ?`,
  quizAskPen: (ex, pen) => `${ex} — combien retire-t-on pour « ${pen} » ?`,
  quizCorrectLabel: 'justes',
  quizRight: 'Correct',
  quizWrong: 'Raté',
  quizTimeUp: 'Temps écoulé',
  quizCorrectIs: answer => `La réponse est ${answer}`,
  quizFinishBtn: 'Voir le résultat',
  quizPerfect: 'Sans faute.',
  quizMissedTitle: n => `${n} à revoir`,
  quizTime: sec => `${sec} secondes`,
  quizAgainBtn: 'Nouvelle manche',
  quizBackToStart: 'Retour',
  qual: {
    excellent: 'Excellent', veryGood: 'Très bon', good: 'Bon', sufficient: 'Suffisant',
    insufficient: 'Insuffisant', qualified: 'Qualifié', notQualified: 'Non qualifié',
  },
  resumeTitle: 'Un concours est resté ouvert',
  resumeDetail: (lvl, count, when) => `Niveau ${lvl} · ${count} concurrents · enregistré ${when}`,
  resumeBtn: 'Reprendre le jugement',
  resumeDiscardBtn: 'Supprimer',
  trialDetailsTitle: 'Détails du concours (facultatif)',
  detailDate: 'Date',
  detailLocation: 'Lieu',
  detailClub: 'Club',
  detailJudge: 'Juge',
  detailDecoys: 'Hommes d\'attaque',
  extraFieldsTitle: 'En savoir plus sur le chien (facultatif)',
  extraFields: {
    breed: 'Race', birthDate: 'Date de naissance', chip: 'Puce',
    pedigree: 'N° de pedigree', scorebook: 'N° de carnet', catalog: 'N° de catalogue',
    sex: 'Sexe', phone: 'Téléphone',
  },
  printBtn: 'Imprimer / PDF',
  competitorCounter: (pos, total) => `Concurrent ${pos} sur ${total}`,
  confirmDisqTitle: 'Perdre tout l\'exercice ?',
  confirmDisqBody: (ex, pts) => `${ex} tombe à 0 — ${pts} points perdus.`,
  confirmDisqOk: 'Oui, mettre à zéro',
  confirmCancel: 'Annuler',
  swTitle: 'Chronomètre',
  swStart: 'Départ',
  swPause: 'Pause',
  swReset: 'Remise à zéro',
  swClose: 'Fermer le chronomètre',
  swTargetLabel: 'Limite',
  swSeconds: n => `${n}s`,
  swPassed: n => `Au-delà de ${n < 60 ? `${n} secondes` : `${n / 60} minutes`}.`,
  saveBtn: 'Enregistrer',
  cancelEditBtn: 'Annuler la modification',
  editBtn: 'Modifier le concurrent',
  deleteBtn: 'Retirer le concurrent',
  markStatusTitle: (dog, handler) => `Terminer le passage de ${dog} / ${handler} ?`,
  markStatusBody: 'Le concurrent passe aux résultats et le jugement continue avec le suivant.',
  markAbsent: 'Absent',
  markAbsentHint: 'Ne s\'est pas présenté — aucune note',
  markEliminated: 'Éliminé',
  markEliminatedHint: 'Sorti en cours de concours — garde les points acquis',
  statusLabel: { absent: 'Absent', eliminated: 'Éliminé' },
  jumpSlotName: 'Saut — au choix du conducteur',
  jumpSlotHint: 'Agrès choisi sur le terrain',
  orderSlotHint: (lvl, n) => `Niveau ${lvl} : ${n === 1 ? 'un saut est effectué' : `${n} sauts sont effectués`}, et chaque conducteur choisit l\'agrès pour son chien. Numérotez l\'emplacement ici ; choisissez l\'agrès pendant le jugement.`,
  judgeJumpPick: 'Quel saut ce conducteur effectue',
  detailOrganization: 'Organisation',
  sigJudge: 'Signature du juge',
  sigDecoys: 'Signature des hommes d\'attaque',
  sigClear: 'Effacer',
  sigHint: 'Signez ici avec le doigt',
  sexOptions: { '': '—', male: 'Mâle', female: 'Femelle' },
  remarksLabel: 'Remarques du juge',
  remarksPlaceholder: 'Imprimées sur la feuille — facultatif',
  reportBtn: 'Produire la feuille de notes',
  reportAllBtn: 'Produire toutes les feuilles',
  reportTitle: 'Feuille de notes',
  reportShareBtn: 'Partager / enregistrer le PDF',
  reportWorking: (d, t) => `Préparation du PDF… ${d}/${t}`,
  reportWorkingShort: 'Préparation…',
  reportShared: 'PDF prêt.',
  reportDownloaded: 'PDF téléchargé.',
  reportError: m => `Impossible de créer le PDF : ${m}`,
  sheetHeightNote: (label, pts, nominal) => `${pts - nominal} · saut à ${label} (${pts} sur ${nominal})`,
  eliminatedNote: 'Non effectué — éliminé',
  levelShort: lvl => `Niveau ${lvl}`,
  jumpPerformedLabel: 'Saut · effectué',
  jumpDefaultNote: 'La hauteur maximale est comptée tant que celle du conducteur n\'est pas saisie.',
  orderMaxNote: (a, m) => `Ces sauts permettent au maximum ${a} points sur ${m} — la haie vaut plus que la palissade ou le saut en longueur à ce niveau.`,
  levelParticipants: lvl => `Niveau ${lvl} — Participants`,
  startNumLabel: 'N°',
  handlerLabel: 'Conducteur',
  dogLabel: 'Chien',
  handlerPlaceholder: 'ex. Jean Dupont',
  dogPlaceholder: 'ex. Rex',
  addBtn: '+ Ajouter',
  errValidStartNum: 'Entrez un numéro de départ valide.',
  errStartNumUsed: n => `Le numéro de départ ${n} est déjà utilisé.`,
  errHandlerRequired: 'Le nom du conducteur est requis.',
  errDogRequired: 'Le nom du chien est requis.',
  errAddAtLeastOne: 'Ajoutez au moins un participant.',
  noParticipantsYet: 'Aucun participant — ajoutez des concurrents ci-dessus',
  handlerDogCol: 'Conducteur / Chien',
  competitorsRegistered: n => `${n} concurrent${n !== 1 ? 's' : ''} inscrit${n !== 1 ? 's' : ''}`,
  beginTrial: 'Démarrer le Concours →',

  levelCompetitor: (lvl, n, total) => `Niveau ${lvl} · Concurrent ${n} sur ${total}`,
  scoresheetBtn: 'Feuille de Notes →',
  prevBtn: '← Préc.',
  nextBtn: 'Suiv. →',
  maxPtsMeta: pts => `Max : ${pts} pts`,
  notScoredMeta: 'Non noté à ce niveau',
  jumpHeightLabel: 'Hauteur / distance choisie par le conducteur',
  notPerformedLabel: 'Non effectué',
  notPerformedMsg: 'Ce saut n\'est pas effectué — le quota de sauts du niveau est déjà atteint.',
  jumpsHint: (lvl, n, total) => n === total
    ? `Niveau ${lvl} : les ${total} sauts sont effectués`
    : `Niveau ${lvl} : ${n === 1 ? 'un saut' : `${n} sauts`} sur ${total}, au choix du conducteur`,
  jumpLimitMsg: n => `${n === 1 ? 'Le saut de ce niveau a' : `Les ${n} sauts de ce niveau ont`} déjà été choisi(s). Pour noter celui-ci, annulez le choix sur l'autre saut.`,
  clearJumpLabel: 'Annuler le choix',
  maxLabel: 'Max',
  deductedLabel: 'Déduit',
  scoreLabel: 'Note',
  resetBtn: 'Réinit.',
  tappedLabel: 'Appliqué :',
  noneYetLabel: 'Aucun',
  tapToDeductHint: 'Appuyez sur une pénalité pour déduire des points',
  perUnitLabel: unit => `par ${unit}`,
  disqualifyLabel: 'ÉLIMINATION',
  gaNoteLabel: 'A.G.',
  noPenaltyLabel: 'Sans pénalité',
  notScoredMsg: lvl => `Cet exercice n'est pas noté au Niveau ${lvl}`,

  modalEachUnit: (unit, pts) => `Par ${unit} : ${pts} pts · Entrez le nombre de ${unit}`,
  applyBtn: pts => `Appliquer — ${pts} pts déduits`,
  cancelBtn: 'Annuler',

  scoreSheetTitle: 'Feuille de',
  backToJudgingBtn: '← Retour à la Notation',
  startNumMeta: 'N° de Départ',
  handlerMeta: 'Conducteur',
  dogMeta: 'Chien',
  levelMeta: 'Niveau',
  obExercises: 'Exercices d\'Obéissance',
  jmpExercises: 'Exercices de Saut',
  bitExercises: 'Exercices de Mordant',
  subtotalLabel: disc => `Sous-total ${disc}`,
  naLabel: 'N/A',
  finalResult: 'Résultat Final',
  outOfPts: max => `sur ${max} pts`,
  dqLabel: '⚠ ÉLIM. :',
  nextCompetitorBtn: (pos, total) => `Concurrent suivant (${pos}/${total}) →`,
  finishTrialBtn: 'Terminer le Concours →',

  trialResults: 'Résultats',
  trialResultsSpan: 'du Concours',
  resultsSubtitle: (lvl, count) => `Mondioring – ScoreRing — Niveau ${lvl} · ${count} concurrent${count !== 1 ? 's' : ''}`,
  newTrialBtn: 'Nouveau Concours',
  rankCol: 'Rang',
  handlerDogColResults: 'Conducteur / Chien',
  resultCol: 'Résultat',
  scoreCol: 'Points',

  qualExcellent: 'Excellent',
  qualVeryGood: 'Très Bien',
  qualGood: 'Bien',
  qualSufficient: 'Suffisant',
  qualInsufficient: 'Insuffisant',
  qualQualified: 'Qualifié',
  qualNotQualified: 'Non Qualifié',

  disc: { ob: 'Obéissance', jmp: 'Saut', bit: 'Mordant' },

  exNames: {
    heel:         'Marche au pied sans laisse',
    absence:      'Absence du conducteur',
    sendaway:     'Envoi en avant',
    positions:    'Positions',
    food:         'Refus de nourriture',
    retrieve:     'Rapport d\'objet lancé',
    search:       'Recherche d\'un objet',
    palisade:     'La palissade',
    longjump:     'Le grand saut',
    hurdle:       'La haie',
    facebaton:    'Attaque de face au bâton',
    faceacc:      'Attaque de face aux accessoires',
    flee:         'Attaque en fuite',
    stoppedFlee:  'Fuite stoppée',
    searchescort: 'Recherche et escorte',
    defence:      'Défense du conducteur',
    guardobj:     'Garde d\'objet',
  },

  exNotes: {},

  penDescs: {
    // Marche au pied
    heel1: 'Chien en avant, en retard ou trop écarté',
    heel2: 'Le chien quitte ou ne suit pas le conducteur',
    heel3: 'Faute mineure du conducteur dans le parcours',
    heel4: 'Faute du conducteur évitant une difficulté — tous pts perdus',
    heel5: 'Chien/conducteur démarre avant le signal du juge',
    heel6: 'Commandement supplémentaire après le départ — tous pts perdus',
    // Absence
    ab1: 'Le chien change de position durant l\'absence (1 min)',
    ab2: 'Le chien change de position à l\'aller au cachot',
    ab3: 'Le conducteur se retourne vers le chien',
    ab4: 'Le chien se déplace sans changer de position',
    ab5: 'Le chien change de position au retour du conducteur',
    ab6: 'Le conducteur se montre pendant l\'exercice',
    ab7: 'Commandement irrégulier ou non autorisé',
    // Envoi en avant
    sa1: 'Commandement voix ET geste',
    sa2: 'Commandement supplémentaire pour envoyer le chien',
    sa3: 'Le chien fait des zigzags',
    sa4: 'Le chien revient avant le commandement',
    sa5: 'Chien/conducteur démarre avant le signal du juge',
    sa6: 'Le chien démarre après le signal mais avant la commande',
    sa7: 'Le chien ne passe pas la ligne en 20 sec — tous pts perdus',
    sa8: 'Commandement supplémentaire pour rappeler le chien',
    sa9: 'Le chien ne revient pas en 20 sec — tous pts perdus',
    sa10: 'Le chien revient librement sans ligne directe',
    sa11: 'Le conducteur attend trop longtemps pour rappeler',
    // Positions
    pos1: 'Le chien change de position initiale',
    pos2: 'Le conducteur ne met pas le chien assis en premier / non-respect du signal',
    pos3: 'Le chien n\'exécute pas la position indiquée',
    pos4: 'Le chien se déplace vers le conducteur',
    pos5: lvl => `Le chien revient avant la fin — par mètre (${lvl === 1 ? '-1' : '-2'}/m)`,
    pos6: 'Le chien tourne sur lui-même',
    pos7: 'Le chien avance de 0,5 m (non parfait)',
    // Refus de nourriture
    fd1: 'Le chien lèche, mange ou prend la nourriture en gueule — tous pts perdus',
    fd2: 'Le chien s\'éloigne de la nourriture lancée',
    fd3: 'Le conducteur intervient ou interfère — tous pts perdus',
    fd4: 'Le chien se déplace quand la nourriture est lancée (max 3m)',
    fd5: 'Le chien change de position après le départ du conducteur',
    fd6: 'Le chien se déplace au retour du conducteur',
    // Rapport
    ret1: 'Commandement supplémentaire ou irrégulier — tous pts perdus',
    ret2: 'Commandement voix ET geste',
    ret3: 'Objet non rapporté en 15 sec — tous pts perdus',
    ret4: 'Chien/conducteur démarre avant le signal du juge',
    ret5: 'Le chien démarre après le signal mais avant la commande',
    ret6: 'Le chien joue avec ou mâche l\'objet',
    ret7: 'Le chien lâche l\'objet en revenant',
    ret8: 'Le chien n\'est pas assis quand le conducteur prend l\'objet',
    ret9: 'Le chien dépose à ses pieds — le conducteur ramasse',
    ret10: 'Le conducteur se déplace au retour du chien — tous pts perdus',
    ret11: 'Le conducteur doit bouger les pieds pour prendre l\'objet — tous pts perdus',
    // Recherche d'objet
    srch1: 'Le conducteur montre le bois au chien — tous pts perdus',
    srch2: 'Commandements voix ET geste',
    srch3: 'Commandements d\'envoi supplémentaires — tous pts perdus',
    srch4: 'Objet non rapporté / hors délai — tous pts perdus',
    srch5: 'Chien/conducteur démarre avant le signal du juge',
    srch6: 'Le chien démarre après le signal mais avant la commande',
    srch7: 'Le chien mâche l\'objet',
    srch8: 'Le chien lâche l\'objet en revenant',
    srch9: 'Le chien dépose le bois aux pieds — le conducteur ramasse',
    srch10: 'Objet rapporté mais chien non assis',
    srch11: 'Le chien quitte sa place avant le retour (>2m) — tous pts perdus',
    srch12: 'Le chien se déplace dans le rayon de 2m',
    srch13: 'Le chien sélectionne le mauvais objet — tous pts perdus',
    srch14: 'Le conducteur se déplace au retour du chien — tous pts perdus',
    srch15: 'Le conducteur doit bouger les pieds — tous pts perdus',
    srch16: 'Le conducteur met la main en poche trop tôt — tous pts perdus',
    srch17: 'Le conducteur place le bois incorrectement — tous pts perdus',
    srch18: 'Le conducteur manipule l\'objet / odeur supplémentaire — tous pts perdus',
    // Palissade
    pal1: 'Le chien démarre avant le signal du juge (perd une tentative)',
    pal2: 'Le chien démarre après le signal mais avant la commande',
    pal3: 'Commandement voix ET geste',
    pal4: 'Refus ou contournement',
    pal5: 'Chute de planches',
    pal6: 'Manqué (tentative échouée)',
    pal7: 'Échec à prendre position derrière l\'obstacle',
    pal8: 'Commandement supplémentaire de position/placement/rappel',
    pal9: 'Commandement d\'envoi supplémentaire',
    pal10: 'Le chien ne revient pas au pied en 10 sec',
    // Grand saut
    lj1: 'Le chien démarre avant le signal du juge (perd une tentative)',
    lj2: 'Le chien démarre après le signal mais avant la commande',
    lj3: 'Commandement voix ET geste',
    lj4: 'Refus ou contournement',
    lj5: 'Le chien marche dans le cadre',
    lj6: 'Chute de planches',
    lj7: 'Manqué (tentative échouée)',
    lj8: 'Échec à prendre position derrière l\'obstacle',
    lj9: 'Commandement supplémentaire',
    lj10: 'Commandement d\'envoi supplémentaire',
    lj11: 'Le chien ne revient pas au pied en 10 sec',
    // Haie
    hrd1: 'Le chien démarre avant le signal du juge (perd une tentative)',
    hrd2: 'Le chien démarre après le signal mais avant la commande',
    hrd3: 'Commandement voix ET geste',
    hrd4: 'Refus ou contournement (aller ou retour)',
    hrd5: 'Chute de planches (aller ou retour)',
    hrd6: 'Manqué à l\'aller ou au retour',
    hrd7: 'Échec à prendre position derrière l\'obstacle',
    hrd8: 'Commandement supplémentaire de position/rappel',
    hrd9: 'Commandement d\'envoi supplémentaire',
    hrd10: 'Le chien ne revient pas au pied en 10 sec',
    hrd11: 'Commandement de position voix ET geste (après le saut aller)',
    hrd12: 'Le chien touche la haie (aller ou retour)',
    hrd13: 'Le chien pousse la haie sans la faire tomber',
    // Attaque de face au bâton
    fb1: 'Départ avant le signal du juge (+5 A.G.)',
    fb2: 'Deuxième départ avant le signal — ÉLIMINATION',
    fb3: 'Départ après le signal mais avant la commande',
    fb4: 'Commandement d\'attaque supplémentaire',
    fb5: 'Par seconde sans mordre',
    fb6: 'Par changement rapide de prise',
    fb7: 'Par seconde de morsure après la commande de lâcher',
    fb8: 'Morsure supplémentaire après la fin de l\'exercice',
    fb9: 'Commandement de rappel supplémentaire',
    fb10: 'Ne mord pas au rappel (+par sec sans mordre)',
    fb11: 'Retour non effectué en 30 sec',
    fb12: 'Le chien n\'attaque pas ou ne mord pas — ÉLIMINATION',
    fb13: 'Le conducteur quitte la ligne de départ — ÉLIMINATION',
    fb14: 'Le chien hésite devant l\'obstacle (pts de départ déduits)',
    fb15: 'Le chien contourne l\'obstacle (pts de mordant déduits)',
    fb16: 'Le chien rampe sur la ligne de départ',
    fb17: 'Le chien s\'arrête de mordre au signal et revient',
    // Attaque de face aux accessoires
    fa1: 'Départ avant le signal du juge (+5 A.G.)',
    fa2: 'Deuxième départ avant le signal — ÉLIMINATION',
    fa3: 'Départ après le signal mais avant la commande',
    fa4: 'Commandement d\'attaque supplémentaire',
    fa5: 'Par seconde sans mordre',
    fa6: 'Par changement rapide de prise',
    fa7: 'Par seconde de morsure après la commande de lâcher',
    fa8: 'Morsure supplémentaire après la fin de l\'exercice',
    fa9: 'Commandement de rappel supplémentaire',
    fa10: 'Ne mord pas au rappel (+par sec sans mordre)',
    fa11: 'Retour non effectué en 30 sec',
    fa12: 'Le chien n\'attaque pas ou ne mord pas — ÉLIMINATION',
    fa13: 'Le conducteur quitte la ligne de départ — ÉLIMINATION',
    fa14: 'Le chien hésite devant l\'obstacle (pts de départ déduits)',
    fa15: 'Le chien contourne l\'obstacle',
    fa16: 'Le chien rampe sur la ligne de départ',
    fa17: 'Le chien s\'arrête de mordre au signal et revient',
    fa18: 'Le chien agresse un civil — exercice arrêté, ÉLIMINATION',
    // Attaque en fuite
    fl1: 'Départ avant le signal du juge (+5 A.G.)',
    fl2: 'Deuxième départ avant le signal — ÉLIMINATION',
    fl3: 'Départ après le signal mais avant la commande',
    fl4: 'Commandement d\'attaque supplémentaire',
    fl5: 'Par seconde sans mordre',
    fl6: 'Par changement rapide de prise',
    fl7: 'Par seconde de morsure après la commande de lâcher',
    fl8: 'Morsure supplémentaire après la fin de l\'exercice',
    fl9: 'Commandement de rappel supplémentaire',
    fl10: 'Ne mord pas au rappel (+par sec sans mordre)',
    fl11: 'Retour non effectué en 30 sec',
    fl12: 'Le chien n\'attaque pas ou ne mord pas — ÉLIMINATION',
    fl13: 'Le conducteur quitte la ligne de départ — ÉLIMINATION',
    fl14: 'Le chien rampe sur la ligne de départ',
    fl15: 'Le chien s\'arrête de mordre au signal et revient',
    // Fuite stoppée
    sf1: 'Départ avant le signal du juge (+5 A.G.)',
    sf2: 'Départ après le signal mais avant la commande',
    sf3: 'Le chien mord — tous pts perdus',
    sf4: 'Par mètre supplémentaire au-delà de 3m (au rappel)',
    sf5: 'Rappel supplémentaire si chien à moins de 3m du conducteur',
    sf6: 'Rappel supplémentaire si chien à plus de 3m du conducteur',
    // Recherche et escorte
    se1: 'Commandement de recherche supplémentaire (un seul autorisé)',
    se2: 'Le chien ne cherche pas malgré le deuxième commandement — tous pts',
    se3: 'Le chien ne découvre pas le figurant dans le temps — tous pts',
    se4: 'Le chien n\'aboie pas dans le délai imparti',
    se5: 'Le chien mord dans le cachot',
    se6: 'Le chien ne garde pas de près au cachot',
    se7: 'Le conducteur court vers le cachot (A.G.)',
    se8: 'Chaque morsure durant l\'escorte ou après le lâcher',
    se9: 'Commandement de lâcher supplémentaire',
    se10: 'Le chien laisse le figurant s\'échapper',
    se11: 'Le conducteur ne maintient pas 3m pendant l\'escorte',
    se12: 'Le conducteur interfère avec le figurant durant la fuite',
    se13: 'Le chien ne garde pas de près 5 sec avant le signal',
    se14: 'Le chien quitte la garde au signal du juge',
    se15: 'Le chien ne revient pas en 10 sec au rappel',
    se16: 'Le chien aboie sans avoir découvert le figurant',
    // Défense
    def1: 'Le conducteur parle au chien après la commande de départ',
    def2: 'Le conducteur répond sans autorisation',
    def3: 'Le chien mord avant ou pendant la rencontre/conversation',
    def4: 'Le chien mord après la rencontre mais avant l\'agression',
    def5: 'Le chien s\'éloigne du conducteur sans mordre (tolérance 1m)',
    def6: 'Le chien abandonne le conducteur au-delà de 10m — tous pts perdus',
    def7: 'Le chien attaque une tierce personne — tous pts perdus',
    def8: 'Le chien ne défend pas durant les 2 sec d\'agression — tous pts perdus',
    def9: 'Le conducteur encourage le chien / ne reste pas à 3m — tous pts perdus',
    def10: 'Morsures après le lâcher',
    def11: 'Par seconde sans mordre',
    def12: 'Le chien ne revient pas en 10 sec au rappel',
    def13: 'Le chien quitte la garde avant le commandement',
    def14: 'Le chien ne garde pas de près 5 sec',
    // Garde d'objet
    go1: 'Le chien mord le figurant dans la zone de 2m avant contact avec l\'objet',
    go2: 'Le chien mord et est traîné au-delà du cercle de 2m',
    go3: 'Le chien mord et est traîné à plus de 5m du point de morsure',
    go4: 'Traîné au-delà de 5m — ne lâche pas en 10 sec',
    go5: 'Le chien laisse déplacer l\'objet, mord dans les cercles',
    go6: 'Le chien laisse déplacer l\'objet, mord à 5–10m',
    go7: 'Le chien laisse le figurant emmener l\'objet au-delà de 10m',
    go8: 'Le chien mord le figurant entre 2m et 5m',
    go9: 'Le chien mord le figurant au-delà de 5m — exercice terminé',
    go10: 'Le conducteur se retourne en allant au cachot — tous pts perdus',
    go11: 'Le figurant réussit à voler l\'objet (toute tentative)',
  },

  units: {
    'mistakes': 'fautes',
    'meters': 'mètres',
    'extra commands': 'commandements supplémentaires',
    'changes of direction': 'changements de direction',
    'times': 'fois',
    'positions missed': 'positions manquées',
    'refusals': 'refus',
    'commands': 'commandements',
    'seconds': 'secondes',
    'changes': 'changements',
    'bites': 'morsures',
    'extra recalls': 'rappels supplémentaires',
    'meters escaped': 'mètres de fuite',
    'extra meters': 'mètres supplémentaires',
  },
}

// ─────────────────────────────────────────────────────────────
// HEBREW
// ─────────────────────────────────────────────────────────────
const he: Translations = {
  dir: 'rtl',
  langName: 'עברית',

  appName: 'מונדיורינג – ScoreRing',
  appTagline: 'אפליקציית ניקוד שיפוט',

  langEn: 'EN',
  langFr: 'FR',
  langHe: 'עב',

  newTrial: 'תחרות חדשה',
  competitionLevel: 'רמת תחרות',
  addParticipantsBtn: 'הוספת משתתפים',
  alertSelectLevel: 'יש לבחור רמת תחרות.',

  back: 'חזרה',
  orderTitle: lvl => `רמה ${lvl} — סדר התרגילים`,
  orderHint: 'רשום ליד כל תרגיל את מספרו בסדר המבחן. לא יכולים להיות שני תרגילים עם אותו מספר.',
  orderFixedLast: 'תמיד אחרון',
  orderResetBtn: 'סדר ברירת מחדל',
  orderConfirmBtn: 'אישור הסדר',
  errOrderMissing: 'יש לתת מספר לכל תרגיל.',
  errOrderDuplicate: n => `המספר ${n} מופיע יותר מפעם אחת.`,
  orderJumpsHint: (lvl, n) => `רמה ${lvl}: לחץ על + ליד ${n === 1 ? 'הקפיצה שהנוהג בוחר' : `${n} הקפיצות שהנוהג בוחר`}; ${n === 1 ? 'האחרות לא יבוצעו' : 'השאר לא יבוצעו'}. קפיצות ללא + הן חובה ברמה זו.`,
  errOrderJumps: n => `יש לסמן ✓ על ${n === 1 ? 'קפיצה אחת בדיוק' : `${n} קפיצות בדיוק`} כדי לכלול אותן במבחן.`,
  practiceBtn: 'בדיקת ניקוד',
  practiceBtnHint: 'כמה עולה כל טעות — בלי תחרות',
  practiceTitle: 'בדיקת ניקוד',
  practiceIntro: 'לחץ על כל טעות כדי לראות כמה היא עולה וכמה נשאר לכלב. שום דבר כאן אינו נרשם כתחרות.',
  practiceSearch: 'חיפוש טעות…',
  practiceResults: n => `נמצאו ${n} טעויות — לחיצה פותחת את התרגיל`,
  practiceNoResults: 'לא נמצאה טעות מתאימה ברמה זו.',
  practiceTapHint: 'לחץ על טעות כדי להוריד אותה',
  practiceRemains: (after, max) => `יישאר ${after} מתוך ${max}`,
  practiceAllLost: 'כל נקודות התרגיל נאבדות',
  practiceNoDeduct: 'ללא הורדת נקודות',
  practiceLost: 'נאבד',
  practiceRemaining: 'נשאר',
  practiceResetAll: 'התחל מחדש',
  practiceJumpChoice: 'איזו קפיצה מבוצעת',
  quizBtn: 'אימון ניקוד',
  quizBtnHint: 'ללמוד את הניקוד בעל פה',
  quizTitle: 'אימון ניקוד',
  quizIntro: n => `${n} שאלות בסבב. מה שטעית בו חוזר בסבב הבא, ומה שידעת חוזר רק בעוד כמה ימים.`,
  quizModeLabel: 'מדידת זמן',
  quizUntimed: 'בלי זמן',
  quizTimed: sec => `עם זמן · ${sec} שנ׳`,
  quizUntimedHint: 'אפשר לקחת כמה זמן שצריך לכל שאלה.',
  quizTimedHint: 'שאלה שלא נענתה עד סוף הפס נחשבת כטעות.',
  quizStartBtn: 'התחל סבב',
  quizMastered: (done, total) => `${done} מתוך ${total} נענו נכון פעמיים או יותר`,
  quizMapTitle: (lvl, max) => `מפת הניקוד — רמה ${lvl}, ${max} נקודות`,
  quizPts: n => `${n} נק׳`,
  quizAllAnswer: 'כל נקודות התרגיל',
  quizAskExPts: (ex, lvl) => `כמה נקודות שווה ״${ex}״ ברמה ${lvl}?`,
  quizAskPtsEx: (pts, lvl) => `איזה תרגיל שווה ${pts} נקודות ברמה ${lvl}?`,
  quizAskJump: (ex, height, lvl) => `כמה נקודות שווה ${ex} ב-${height} ברמה ${lvl}?`,
  quizAskPen: (ex, pen) => `${ex} — כמה יורד על ״${pen}״?`,
  quizCorrectLabel: 'נכונות',
  quizRight: 'נכון',
  quizWrong: 'לא נכון',
  quizTimeUp: 'הזמן נגמר',
  quizCorrectIs: answer => `התשובה היא ${answer}`,
  quizFinishBtn: 'לתוצאה',
  quizPerfect: 'הכל נכון.',
  quizMissedTitle: n => `${n} לחזרה`,
  quizTime: sec => `${sec} שניות`,
  quizAgainBtn: 'סבב נוסף',
  quizBackToStart: 'חזרה',
  qual: {
    excellent: 'מצוין', veryGood: 'טוב מאוד', good: 'טוב', sufficient: 'מספיק',
    insufficient: 'לא מספיק', qualified: 'כשיר', notQualified: 'לא כשיר',
  },
  resumeTitle: 'יש תחרות שלא הסתיימה',
  resumeDetail: (lvl, count, when) => `רמה ${lvl} · ${count} מתחרים · נשמר ${when}`,
  resumeBtn: 'המשך בשיפוט',
  resumeDiscardBtn: 'מחיקה',
  trialDetailsTitle: 'פרטי התחרות (רשות)',
  detailDate: 'תאריך',
  detailLocation: 'מקום המבחן',
  detailClub: 'מועדון',
  detailJudge: 'שופט',
  detailDecoys: 'דיקויים',
  extraFieldsTitle: 'פרטים נוספים על הכלב (רשות)',
  extraFields: {
    breed: 'גזע', birthDate: 'תאריך לידה', chip: 'מספר שבב',
    pedigree: 'מספר סגיר', scorebook: 'מספר פנקס עבודה', catalog: 'מספר קטלוגי',
    sex: 'מין', phone: 'טלפון',
  },
  printBtn: 'הדפסה / PDF',
  competitorCounter: (pos, total) => `מתחרה ${pos} מתוך ${total}`,
  confirmDisqTitle: 'לאפס את כל התרגיל?',
  confirmDisqBody: (ex, pts) => `${ex} יורד ל-0 — ${pts} נקודות נאבדות.`,
  confirmDisqOk: 'כן, לאפס',
  confirmCancel: 'ביטול',
  swTitle: 'סטופר',
  swStart: 'התחל',
  swPause: 'עצור',
  swReset: 'איפוס',
  swClose: 'סגירת הסטופר',
  swTargetLabel: 'מגבלה',
  swSeconds: n => `${n} שנ׳`,
  swPassed: n => `חלפה המגבלה של ${n < 60 ? `${n} שניות` : `${n / 60} דקות`}.`,
  saveBtn: 'שמירה',
  cancelEditBtn: 'ביטול עריכה',
  editBtn: 'עריכת מתחרה',
  deleteBtn: 'הסרת מתחרה',
  markStatusTitle: (dog, handler) => `לסיים את המבחן של ${dog} / ${handler}?`,
  markStatusBody: 'המתחרה עובר לטבלת התוצאות והשיפוט ממשיך למתחרה הבא.',
  markAbsent: 'נעדר',
  markAbsentHint: 'לא הגיע לזירה — ללא ניקוד',
  markEliminated: 'פסול',
  markEliminatedHint: 'הורחק במהלך המבחן — הנקודות שנצברו נשמרות',
  statusLabel: { absent: 'נעדר', eliminated: 'פסול' },
  jumpSlotName: 'קפיצה — לבחירת הנוהג',
  jumpSlotHint: 'המתקן נבחר בזירה',
  orderSlotHint: (lvl, n) => `רמה ${lvl}: מבצעים ${n === 1 ? 'קפיצה אחת' : `${n} קפיצות`}, וכל נוהג בוחר בעצמו את המתקן לכלב שלו. כאן קובעים רק את מקומה בסדר; את המתקן בוחרים בזמן השיפוט.`,
  judgeJumpPick: 'איזו קפיצה מבצע הנוהג הזה',
  detailOrganization: 'ארגון',
  sigJudge: 'חתימת השופט',
  sigDecoys: 'חתימת הדיקויים',
  sigClear: 'ניקוי',
  sigHint: 'חתום כאן באצבע',
  sexOptions: { '': '—', male: 'זכר', female: 'נקבה' },
  remarksLabel: 'הערות השופט',
  remarksPlaceholder: 'יודפסו בדוח השיפוט — רשות',
  reportBtn: 'הפק דוח שיפוט',
  reportAllBtn: 'הפק דוחות שיפוט לכל המתחרים',
  reportTitle: 'דוח שיפוט',
  reportShareBtn: 'שתף / שמור PDF',
  reportWorking: (d, t) => `מכין PDF… ${d}/${t}`,
  reportWorkingShort: 'מכין…',
  reportShared: 'ה-PDF מוכן.',
  reportDownloaded: 'ה-PDF ירד למכשיר.',
  reportError: m => `לא הצלחתי ליצור את ה-PDF: ${m}`,
  sheetHeightNote: (label, pts, nominal) => `${pts - nominal} · קפיצה ב-${label} (${pts} מתוך ${nominal})`,
  eliminatedNote: 'לא בוצע — פסילה',
  levelShort: lvl => `רמה ${lvl}`,
  jumpPerformedLabel: 'קפיצה · מבוצע',
  jumpDefaultNote: 'נספר הגובה המלא עד שתסמן את הגובה שהנוהג בחר.',
  orderMaxNote: (a, m) => `הקפיצות שנבחרו מאפשרות עד ${a} נק׳ מתוך ${m} — המשוכה שווה יותר מקיר הקפיצה ומהקפיצה לרוחק ברמה זו.`,
  levelParticipants: lvl => `רמה ${lvl} — משתתפים`,
  startNumLabel: 'מס׳',
  handlerLabel: 'נוהג',
  dogLabel: 'כלב',
  handlerPlaceholder: 'למשל: ישראל ישראלי',
  dogPlaceholder: 'למשל: רקס',
  addBtn: '+ הוסף',
  errValidStartNum: 'יש להזין מספר הפעלה תקין.',
  errStartNumUsed: n => `מספר הפעלה ${n} כבר קיים.`,
  errHandlerRequired: 'שם הנוהג נדרש.',
  errDogRequired: 'שם הכלב נדרש.',
  errAddAtLeastOne: 'יש להוסיף לפחות משתתף אחד.',
  noParticipantsYet: 'אין משתתפים עדיין — הוסף מתחרים למעלה',
  handlerDogCol: 'נוהג / כלב',
  competitorsRegistered: n => `${n} מתחר${n !== 1 ? 'ים' : ''} רשומ${n !== 1 ? 'ים' : ''}`,
  beginTrial: 'התחל תחרות',

  levelCompetitor: (lvl, n, total) => `רמה ${lvl} · מתחר ${n} מתוך ${total}`,
  scoresheetBtn: 'גיליון ניקוד',
  prevBtn: 'קודם',
  nextBtn: 'הבא',
  maxPtsMeta: pts => `מקסימום: ${pts} נק׳`,
  notScoredMeta: 'לא מנוקד ברמה זו',
  jumpHeightLabel: 'גובה / מרחק לבחירת הנוהג',
  notPerformedLabel: 'לא מבוצע',
  notPerformedMsg: 'קפיצה זו אינה מבוצעת — מכסת הקפיצות של הרמה כבר מולאה.',
  jumpsHint: (lvl, n, total) => n === total
    ? `רמה ${lvl}: מבצעים את כל ${total} הקפיצות`
    : `רמה ${lvl}: ${n === 1 ? 'קפיצה אחת' : `${n} קפיצות`} מתוך ${total}, לבחירת הנוהג`,
  jumpLimitMsg: n => `${n === 1 ? 'הקפיצה של רמה זו כבר נבחרה' : `${n} הקפיצות של רמה זו כבר נבחרו`}. כדי לנקד את הקפיצה הזו במקום, בטל את הבחירה בקפיצה האחרת.`,
  clearJumpLabel: 'ביטול בחירה',
  maxLabel: 'מקסימום',
  deductedLabel: 'נוכה',
  scoreLabel: 'ניקוד',
  resetBtn: 'איפוס',
  tappedLabel: 'הופעל:',
  noneYetLabel: 'לא הופעל',
  tapToDeductHint: 'לחץ על קנס להפחתת נקודות',
  perUnitLabel: unit => `לכל ${unit}`,
  disqualifyLabel: 'פסילה',
  gaNoteLabel: 'ה.כ.',
  noPenaltyLabel: 'ללא קנס',
  notScoredMsg: lvl => `תרגיל זה אינו מנוקד ברמה ${lvl}`,

  modalEachUnit: (unit, pts) => `לכל ${unit}: ${pts} נק׳ · הזן מספר ${unit}`,
  applyBtn: pts => `החל — ${pts} נק׳ מנוכות`,
  cancelBtn: 'ביטול',

  scoreSheetTitle: 'גיליון',
  backToJudgingBtn: 'חזרה לשיפוט',
  startNumMeta: 'מס׳ הפעלה',
  handlerMeta: 'נוהג',
  dogMeta: 'כלב',
  levelMeta: 'רמה',
  obExercises: 'תרגילי ציות',
  jmpExercises: 'תרגילי קפיצה',
  bitExercises: 'תרגילי נשיכה',
  subtotalLabel: disc => `סיכום ${disc}`,
  naLabel: 'לא רלוונטי',
  finalResult: 'תוצאה סופית',
  outOfPts: max => `מתוך ${max} נק׳`,
  dqLabel: '⚠ פסול:',
  nextCompetitorBtn: (pos, total) => `מתחר הבא (${pos}/${total})`,
  finishTrialBtn: 'סיום תחרות',

  trialResults: 'תוצאות',
  trialResultsSpan: 'התחרות',
  resultsSubtitle: (lvl, count) => `ScoreRing — רמה ${lvl} · ${count} מתחרים`,
  newTrialBtn: 'תחרות חדשה',
  rankCol: 'דירוג',
  handlerDogColResults: 'נוהג / כלב',
  resultCol: 'תוצאה',
  scoreCol: 'ניקוד',

  qualExcellent: 'מצוין',
  qualVeryGood: 'טוב מאוד',
  qualGood: 'טוב',
  qualSufficient: 'מספיק',
  qualInsufficient: 'לא מספיק',
  qualQualified: 'כשיר',
  qualNotQualified: 'לא כשיר',

  disc: { ob: 'ציות', jmp: 'קפיצה', bit: 'נשיכה' },

  exNames: {
    heel:         'רגלי ללא רצועה',
    absence:      'היעדרות נוהג לדקה',
    sendaway:     'שליחה קדימה',
    positions:    'מיקומים לפי הוראת שופט',
    food:         'סירוב למזון',
    retrieve:     'החזרת עצם שנזרק',
    search:       'חיפוש עצם',
    palisade:     'קיר קפיצה',
    longjump:     'קפיצה לרוחק',
    hurdle:       'משוכה',
    facebaton:    'תקיפה חזיתית עם מקל במבוק',
    faceacc:      'תקיפה חזיתית עם אביזרים',
    flee:         'בריחה מתקיפה',
    stoppedFlee:  'תקיפה מדומה',
    searchescort: 'חיפוש וליווי',
    defence:      'הגנה על הנוהג',
    guardobj:     'שמירה על חפץ',
  },

  exNotes: {},

  penDescs: {
    // הליכה ליד
    heel1: 'הכלב קודם, מפגר או מרוחק',
    heel2: 'הכלב עוזב את הנוהג או אינו עוקב',
    heel3: 'טעות קלה של הנוהג במסלול',
    heel4: 'שגיאת נוהג שמדלגת על קושי — כל הנקודות אבדות',
    heel5: 'כלב/נוהג מתחיל לפני אות השופט',
    heel6: 'פקודה נוספת לאחר ההתחלה — כל הנקודות אבדות',
    // היעדרות
    ab1: 'הכלב משנה תנוחה במהלך ההיעדרות (דקה)',
    ab2: 'הכלב משנה תנוחה בדרך לסתר',
    ab3: 'הנוהג מסתכל לאחור לעבר הכלב',
    ab4: 'הכלב מתנועע מבלי לשנות תנוחה',
    ab5: 'הכלב משנה תנוחה בחזרת הנוהג',
    ab6: 'הנוהג נראה בזמן התרגיל',
    ab7: 'פקודה בלתי סדירה או אסורה',
    // שליחה
    sa1: 'פקודה קולית וגם ויזואלית',
    sa2: 'פקודה נוספת לשליחה קדימה',
    sa3: 'הכלב מצ׳קצ׳ק',
    sa4: 'הכלב חוזר לפני הפקודה',
    sa5: 'כלב/נוהג מתחיל לפני אות השופט',
    sa6: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    sa7: 'הכלב לא עובר את הקו תוך 20 שניות — כל הנקודות אבדות',
    sa8: 'פקודת חזרה נוספת',
    sa9: 'הכלב לא חוזר תוך 20 שניות — כל הנקודות אבדות',
    sa10: 'הכלב חוזר בצורה חופשית ולא ישירה',
    sa11: 'הנוהג ממתין יותר מדי לפני פקודת החזרה',
    // תנוחות
    pos1: 'הכלב משנה תנוחה ראשונית',
    pos2: 'הנוהג לא מושיב את הכלב ראשון / לא מכבד את האות',
    pos3: 'הכלב לא מבצע את התנוחה המצוינת',
    pos4: 'הכלב מתקדם לעבר הנוהג',
    pos5: lvl => `הכלב חוזר לפני הסיום — לכל מטר (${lvl === 1 ? '-1' : '-2'} לכל מ׳)`,
    pos6: 'הכלב מסתובב סביב עצמו',
    pos7: 'הכלב מתקדם 0.5 מ׳ (לא מושלם)',
    // סירוב למזון
    fd1: 'הכלב מלקק, אוכל או לוקח מזון לפה — כל הנקודות אבדות',
    fd2: 'הכלב מתרחק מהמזון שנזרק',
    fd3: 'הנוהג מתערב — כל הנקודות אבדות',
    fd4: 'הכלב מתנועע כשנזרק מזון (עד 3 מ׳)',
    fd5: 'הכלב משנה תנוחה לאחר יציאת הנוהג (לפני מזון)',
    fd6: 'הכלב מתנועע בחזרת הנוהג',
    // אחזור
    ret1: 'פקודה נוספת או בלתי סדירה — כל הנקודות אבדות',
    ret2: 'פקודה קולית וגם ויזואלית',
    ret3: 'החפץ לא הוחזר תוך 15 שניות — כל הנקודות אבדות',
    ret4: 'כלב/נוהג מתחיל לפני אות השופט',
    ret5: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    ret6: 'הכלב משחק עם החפץ או לועס אותו',
    ret7: 'הכלב מפיל את החפץ בזמן החזרה',
    ret8: 'הכלב לא יושב כשהנוהג לוקח את החפץ',
    ret9: 'הכלב מניח לרגלי הנוהג — הנוהג מרים',
    ret10: 'הנוהג מתנועע בזמן חזרת הכלב — כל הנקודות אבדות',
    ret11: 'הנוהג נאלץ להזיז רגליים לקבלת החפץ — כל הנקודות אבדות',
    // חיפוש חפץ
    srch1: 'הנוהג מראה לכלב את העץ — כל הנקודות אבדות',
    srch2: 'פקודות קוליות וגם ויזואליות',
    srch3: 'פקודות שליחה נוספות — כל הנקודות אבדות',
    srch4: 'החפץ לא הוחזר / לא בזמן — כל הנקודות אבדות',
    srch5: 'כלב/נוהג מתחיל לפני אות השופט',
    srch6: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    srch7: 'הכלב לועס את החפץ',
    srch8: 'הכלב מפיל את החפץ בזמן החזרה',
    srch9: 'הכלב מניח את העץ לרגלי הנוהג — הנוהג מרים',
    srch10: 'החפץ הוחזר אך הכלב לא יושב',
    srch11: 'הכלב עוזב את מקומו לפני חזרת הנוהג (>2 מ׳) — כל הנקודות אבדות',
    srch12: 'הכלב מתנועע ברדיוס של 2 מ׳',
    srch13: 'הכלב בוחר את החפץ הלא נכון — כל הנקודות אבדות',
    srch14: 'הנוהג מתנועע בחזרת הכלב — כל הנקודות אבדות',
    srch15: 'הנוהג נאלץ להזיז רגליים — כל הנקודות אבדות',
    srch16: 'הנוהג מכניס יד לכיס מוקדם מדי — כל הנקודות אבדות',
    srch17: 'הנוהג מניח את העץ לא נכון — כל הנקודות אבדות',
    srch18: 'הנוהג מתעסק עם החפץ / ריח נוסף — כל הנקודות אבדות',
    // קיר
    pal1: 'הכלב מתחיל לפני אות השופט (מאבד ניסיון)',
    pal2: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    pal3: 'פקודה קולית וגם ויזואלית',
    pal4: 'סירוב או עקיפה',
    pal5: 'הפלת לוחות',
    pal6: 'פספוס (ניסיון נכשל)',
    pal7: 'כישלון לתפוס עמדה מאחורי המכשול',
    pal8: 'פקודה נוספת לעמדה/מיקום/קריאה',
    pal9: 'פקודת שליחה נוספת',
    pal10: 'הכלב לא חוזר ליד תוך 10 שניות',
    // קפיצה לרוחב
    lj1: 'הכלב מתחיל לפני אות השופט (מאבד ניסיון)',
    lj2: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    lj3: 'פקודה קולית וגם ויזואלית',
    lj4: 'סירוב או עקיפה',
    lj5: 'הכלב דורך בתוך המסגרת',
    lj6: 'הפלת לוחות',
    lj7: 'פספוס (ניסיון נכשל)',
    lj8: 'כישלון לתפוס עמדה מאחורי המכשול',
    lj9: 'פקודה נוספת',
    lj10: 'פקודת שליחה נוספת',
    lj11: 'הכלב לא חוזר ליד תוך 10 שניות',
    // מכשול
    hrd1: 'הכלב מתחיל לפני אות השופט (מאבד ניסיון)',
    hrd2: 'הכלב מתחיל אחרי האות אך לפני הפקודה',
    hrd3: 'פקודה קולית וגם ויזואלית',
    hrd4: 'סירוב או עקיפה (הלוך או חזור)',
    hrd5: 'הפלת לוחות (הלוך או חזור)',
    hrd6: 'פספוס הלוך או חזור',
    hrd7: 'כישלון לתפוס עמדה מאחורי המכשול',
    hrd8: 'פקודה נוספת לעמדה/קריאה',
    hrd9: 'פקודת שליחה נוספת',
    hrd10: 'הכלב לא חוזר ליד תוך 10 שניות',
    hrd11: 'פקודת עמדה קולית וגם ויזואלית (אחרי קפיצה הלוך)',
    hrd12: 'הכלב נוגע במכשול (הלוך או חזור)',
    hrd13: 'הכלב דוחף את המכשול ללא הפלה',
    // תקיפת פנים עם מקל
    fb1: 'יציאה לפני אות השופט (+5 ה.כ.)',
    fb2: 'עבירה שנייה של יציאה מוקדמת — פסילה',
    fb3: 'יציאה אחרי האות אך לפני הפקודה',
    fb4: 'פקודת תקיפה נוספת',
    fb5: 'לכל שניה ללא נשיכה',
    fb6: 'לכל שינוי מהיר בנשיכה',
    fb7: 'לכל שניה נשיכה אחרי פקודת עזיבה',
    fb8: 'נשיכה נוספת לאחר סיום התרגיל',
    fb9: 'פקודת קריאה חזרה נוספת',
    fb10: 'לא נושך בזמן הקריאה (+לכל שניה ללא נשיכה)',
    fb11: 'לא חזר תוך 30 שניות',
    fb12: 'הכלב לא תוקף ולא נושך — פסילה',
    fb13: 'הנוהג עוזב את קו הזינוק — פסילה',
    fb14: 'הכלב מהסס לפני המכשול (מנקודות הזינוק)',
    fb15: 'הכלב עוקף את המכשול (מנקודות הנשיכה)',
    fb16: 'הכלב זוחל על קו הזינוק',
    fb17: 'הכלב מפסיק לנשוך בזמזם וחוזר לנוהג',
    // תקיפת פנים עם אביזרים
    fa1: 'יציאה לפני אות השופט (+5 ה.כ.)',
    fa2: 'עבירה שנייה של יציאה מוקדמת — פסילה',
    fa3: 'יציאה אחרי האות אך לפני הפקודה',
    fa4: 'פקודת תקיפה נוספת',
    fa5: 'לכל שניה ללא נשיכה',
    fa6: 'לכל שינוי מהיר בנשיכה',
    fa7: 'לכל שניה נשיכה אחרי פקודת עזיבה',
    fa8: 'נשיכה נוספת לאחר סיום התרגיל',
    fa9: 'פקודת קריאה חזרה נוספת',
    fa10: 'לא נושך בזמן הקריאה (+לכל שניה ללא נשיכה)',
    fa11: 'לא חזר תוך 30 שניות',
    fa12: 'הכלב לא תוקף ולא נושך — פסילה',
    fa13: 'הנוהג עוזב את קו הזינוק — פסילה',
    fa14: 'הכלב מהסס לפני המכשול (מנקודות הזינוק)',
    fa15: 'הכלב עוקף את המכשול',
    fa16: 'הכלב זוחל על קו הזינוק',
    fa17: 'הכלב מפסיק לנשוך בזמזם וחוזר לנוהג',
    fa18: 'הכלב תוקף אזרח — התרגיל מופסק, פסילה',
    // תקיפת מנוסה
    fl1: 'יציאה לפני אות השופט (+5 ה.כ.)',
    fl2: 'עבירה שנייה של יציאה מוקדמת — פסילה',
    fl3: 'יציאה אחרי האות אך לפני הפקודה',
    fl4: 'פקודת תקיפה נוספת',
    fl5: 'לכל שניה ללא נשיכה',
    fl6: 'לכל שינוי מהיר בנשיכה',
    fl7: 'לכל שניה נשיכה אחרי פקודת עזיבה',
    fl8: 'נשיכה נוספת לאחר סיום התרגיל',
    fl9: 'פקודת קריאה חזרה נוספת',
    fl10: 'לא נושך בזמן הקריאה (+לכל שניה ללא נשיכה)',
    fl11: 'לא חזר תוך 30 שניות',
    fl12: 'הכלב לא תוקף ולא נושך — פסילה',
    fl13: 'הנוהג עוזב את קו הזינוק — פסילה',
    fl14: 'הכלב זוחל על קו הזינוק',
    fl15: 'הכלב מפסיק לנשוך בזמזם וחוזר לנוהג',
    // מנוסה מופסקת
    sf1: 'יציאה לפני אות השופט (+5 ה.כ.)',
    sf2: 'יציאה אחרי האות אך לפני הפקודה',
    sf3: 'הכלב נושך — כל הנקודות אבדות',
    sf4: 'לכל מטר נוסף מעבר ל-3 מ׳ מהפיגר (בזמן קריאה)',
    sf5: 'קריאה נוספת כשהכלב בתוך 3 מ׳ מהנוהג',
    sf6: 'קריאה נוספת כשהכלב מחוץ ל-3 מ׳ מהנוהג',
    // חיפוש וליווי
    se1: 'פקודת חיפוש נוספת (מותרת רק אחת)',
    se2: 'הכלב לא מחפש למרות הפקודה השנייה — כל הנקודות',
    se3: 'הכלב לא מגלה את הפיגר בזמן — כל הנקודות',
    se4: 'הכלב לא נובח בזמן שהוקצב',
    se5: 'הכלב נושך בתוך הסתר',
    se6: 'הכלב לא שומר מקרוב ליד הסתר',
    se7: 'הנוהג רץ לסתר (ה.כ.)',
    se8: 'כל נשיכה בזמן הליווי או לאחר פקודת עזיבה',
    se9: 'פקודת עזיבה נוספת',
    se10: 'הכלב מאפשר לפיגר לברוח',
    se11: 'הנוהג לא שומר 3 מ׳ מרחק בזמן הליווי',
    se12: 'הנוהג מתערב בפיגר בזמן הבריחה',
    se13: 'הכלב לא שומר מקרוב 5 שניות לפני הזמזם',
    se14: 'הכלב עוזב שמירה באות השופט',
    se15: 'הכלב לא חוזר תוך 10 שניות מהקריאה',
    se16: 'הכלב נובח לפני שגילה את הפיגר',
    // הגנת הנוהג
    def1: 'הנוהג מדבר עם הכלב לאחר פקודת ההתחלה',
    def2: 'הנוהג מגיב לשיחה ללא אישור',
    def3: 'הכלב נושך לפני או במהלך המפגש/שיחה',
    def4: 'הכלב נושך אחרי המפגש אך לפני התקיפה',
    def5: 'הכלב מתרחק מהנוהג ללא נשיכה (סובלנות 1 מ׳)',
    def6: 'הכלב עוזב את הנוהג מעבר ל-10 מ׳ — כל הנקודות אבדות',
    def7: 'הכלב תוקף אדם שלישי — כל הנקודות אבדות',
    def8: 'הכלב לא מגן במהלך 2 שניות תקיפה — כל הנקודות אבדות',
    def9: 'הנוהג מעודד הכלב / לא נשאר ב-3 מ׳ — כל הנקודות אבדות',
    def10: 'נשיכות לאחר פקודת עזיבה',
    def11: 'לכל שניה ללא נשיכה',
    def12: 'הכלב לא חוזר תוך 10 שניות מהקריאה',
    def13: 'הכלב עוזב שמירה לפני הפקודה',
    def14: 'הכלב לא שומר מקרוב 5 שניות',
    // שמירה על חפץ
    go1: 'הכלב נושך את הפיגר באזור 2 מ׳ לפני שנגע בחפץ',
    go2: 'הכלב נושך ומגורר מעבר לעיגול 2 מ׳',
    go3: 'הכלב נושך ומגורר מעבר ל-5 מ׳ מנקודת הנשיכה',
    go4: 'גרירה מעבר ל-5 מ׳ — לא עוזב תוך 10 שניות',
    go5: 'הכלב מאפשר הזזת חפץ, נושך בתוך העיגולים',
    go6: 'הכלב מאפשר הזזת חפץ, נושך ב-5–10 מ׳',
    go7: 'הכלב מאפשר לפיגר לקחת חפץ מעבר ל-10 מ׳',
    go8: 'הכלב נושך את הפיגר בין 2 מ׳ ל-5 מ׳',
    go9: 'הכלב נושך את הפיגר מעבר ל-5 מ׳ — תרגיל הסתיים',
    go10: 'הנוהג מסתכל לאחור בדרך לסתר — כל הנקודות אבדות',
    go11: 'הפיגר מצליח לגנוב את החפץ (כל ניסיון)',
  },

  units: {
    'mistakes': 'טעות',
    'meters': 'מטר',
    'extra commands': 'פקודה נוספת',
    'changes of direction': 'שינוי כיוון',
    'times': 'פעם',
    'positions missed': 'תנוחה שהוחמצה',
    'refusals': 'סירוב',
    'commands': 'פקודה',
    'seconds': 'שנייה',
    'changes': 'שינוי',
    'bites': 'נשיכה',
    'extra recalls': 'קריאת חזרה נוספת',
    'meters escaped': 'מטר בריחה',
    'extra meters': 'מטר נוסף',
  },
}

export const TRANSLATIONS: Record<Lang, Translations> = { en, fr, he }
