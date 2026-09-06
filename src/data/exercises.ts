import type { Exercise, Level } from '../types'

export function getExercises(level: Level): Exercise[] {
  const L = level

  const exercises: Exercise[] = [
    // ── OBEDIENCE ──────────────────────────────────────────────────
    {
      id: 'heel',
      discipline: 'ob',
      name: 'Heeling Without Leash',
      maxPts: { 1: 6, 2: 6, 3: 6 },
      penalties: [
        { id: 'heel1', desc: 'Dog forges, lags, or goes wide', pts: -0.5, perUnit: true, unit: 'mistakes' },
        { id: 'heel2', desc: 'Dog abandons or does not follow handler', pts: -6 },
        { id: 'heel3', desc: 'Handler makes minor error in pattern', pts: 0, label: 'G.A. Note', isGA: true },
        { id: 'heel4', desc: 'Handler error avoids a difficulty — all points lost', pts: 'ALL' },
        { id: 'heel5', desc: 'Dog/handler starts before Judge\'s signal', pts: -4 },
        { id: 'heel6', desc: 'Extra command after start — all points lost', pts: 'ALL' },
      ],
    },
    {
      id: 'absence',
      discipline: 'ob',
      name: 'Absence of Handler',
      maxPts: { 1: 10, 2: 10, 3: 10 },
      penalties: [
        { id: 'ab1', desc: 'Dog changes position during 1 min absence', pts: -10 },
        { id: 'ab2', desc: 'Dog changes position going to blind', pts: -10 },
        { id: 'ab3', desc: 'Handler looks back towards dog', pts: -10 },
        { id: 'ab4', desc: 'Dog moves without changing position', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'ab5', desc: 'Dog changes position on handler\'s return', pts: -2 },
        { id: 'ab6', desc: 'Handler shows himself during exercise', pts: -10 },
        { id: 'ab7', desc: 'Irregular or disallowed command', pts: -10 },
      ],
    },
    {
      id: 'sendaway',
      discipline: 'ob',
      name: 'Send Away',
      maxPts: { 1: 12, 2: 12, 3: 12 },
      penalties: [
        { id: 'sa1', desc: 'Command by voice AND gesture', pts: -2 },
        { id: 'sa2', desc: 'Extra command to send dog forward', pts: -4, perUnit: true, unit: 'extra commands' },
        { id: 'sa3', desc: 'Dog zigzags', pts: -1, perUnit: true, unit: 'changes of direction' },
        { id: 'sa4', desc: 'Dog returns before command', pts: -2, perUnit: true, unit: 'times' },
        { id: 'sa5', desc: 'Dog/handler starts before Judge\'s signal', pts: -4 },
        { id: 'sa6', desc: 'Dog starts after signal but before command', pts: -2 },
        { id: 'sa7', desc: 'Dog does not pass line within 20 sec — all lost', pts: 'ALL' },
        { id: 'sa8', desc: 'Extra command to recall dog', pts: -2 },
        { id: 'sa9', desc: 'Dog does not return within 20 sec — all lost', pts: 'ALL' },
        { id: 'sa10', desc: 'Dog wanders loosely back to handler', pts: 0, label: '-1 G.A.', isGA: true },
        { id: 'sa11', desc: 'Handler waits too long to recall dog', pts: 0, label: '-1 G.A.', isGA: true },
      ],
    },
    {
      id: 'positions',
      discipline: 'ob',
      name: 'Positions',
      maxPts: { 1: 10, 2: 20, 3: 20 },
      penalties: [
        { id: 'pos1', desc: 'Dog changes from initial position', pts: -2 },
        { id: 'pos2', desc: 'Handler does not sit dog first / disrespects signal', pts: 0, label: '-1 G.A.', isGA: true },
        { id: 'pos3', desc: 'Dog does not execute indicated position', pts: -3, perUnit: true, unit: 'positions missed' },
        { id: 'pos4', desc: 'Dog moves towards handler', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'pos5', desc: `Dog returns before end — per meter (${L === 1 ? '-1' : '-2'} per m)`, pts: L === 1 ? -1 : -2, perUnit: true, unit: 'meters' },
        { id: 'pos6', desc: 'Dog rotates on itself', pts: 0, label: 'G.A.', isGA: true },
        { id: 'pos7', desc: 'Dog moves forward 0.5 m (not perfect)', pts: 0, label: '-0.5 G.A.', isGA: true },
      ],
    },
    {
      id: 'food',
      discipline: 'ob',
      name: 'Refusal of Food',
      maxPts: { 1: 5, 2: 10, 3: 10 },
      penalties: [
        { id: 'fd1', desc: 'Dog licks, eats, or takes food in mouth — all lost', pts: 'ALL' },
        { id: 'fd2', desc: 'Dog moves away from thrown food', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'fd3', desc: 'Handler breaks in or interferes — all lost', pts: 'ALL' },
        { id: 'fd4', desc: 'Dog moves when food thrown (max 3m)', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'fd5', desc: 'Dog changes position after handler left (before food)', pts: -2 },
        { id: 'fd6', desc: 'Dog moves upon handler\'s return', pts: -2 },
      ],
    },
    {
      id: 'retrieve',
      discipline: 'ob',
      name: 'Retrieve of a Thrown Object',
      maxPts: { 1: 12, 2: 12, 3: 12 },
      penalties: [
        { id: 'ret1', desc: 'Extra or irregular command — all lost', pts: 'ALL' },
        { id: 'ret2', desc: 'Command by voice AND gesture', pts: -2 },
        { id: 'ret3', desc: 'Object not retrieved within 15 sec — all lost', pts: 'ALL' },
        { id: 'ret4', desc: 'Dog/handler starts before Judge\'s signal', pts: -4 },
        { id: 'ret5', desc: 'Dog starts after signal but before command', pts: -2 },
        { id: 'ret6', desc: 'Dog plays with or chews object', pts: -1, perUnit: true, unit: 'times' },
        { id: 'ret7', desc: 'Dog drops object while returning', pts: -1, perUnit: true, unit: 'times' },
        { id: 'ret8', desc: 'Dog not sitting when handler takes object', pts: -1 },
        { id: 'ret9', desc: 'Dog drops at handler\'s feet — handler picks up', pts: -3 },
        { id: 'ret10', desc: 'Handler moves as dog returns — all lost', pts: 'ALL' },
        { id: 'ret11', desc: 'Handler must move feet to get object — all lost', pts: 'ALL' },
      ],
    },

    // Level II & III only
    ...(L >= 2
      ? [
          {
            id: 'search',
            discipline: 'ob' as const,
            name: 'Search for an Object',
            maxPts: { 1: 0, 2: 15, 3: 15 },
            penalties: [
              { id: 'srch1', desc: 'Handler shows dog the wood — all lost', pts: 'ALL' as const },
              { id: 'srch2', desc: 'Commands by voice AND gesture', pts: -2 },
              { id: 'srch3', desc: 'Additional send commands — all lost', pts: 'ALL' as const },
              { id: 'srch4', desc: 'Object not brought back / not in time — all lost', pts: 'ALL' as const },
              { id: 'srch5', desc: 'Dog/handler starts before Judge\'s signal', pts: -4 },
              { id: 'srch6', desc: 'Dog starts after signal but before command', pts: -2 },
              { id: 'srch7', desc: 'Dog chews the object', pts: -1 },
              { id: 'srch8', desc: 'Dog drops object during return', pts: -1, perUnit: true, unit: 'times' },
              { id: 'srch9', desc: 'Dog drops wood at feet — handler picks up', pts: -3 },
              { id: 'srch10', desc: 'Object retrieved but dog not sitting', pts: -1 },
              { id: 'srch11', desc: 'Dog leaves place before handler returns (>2m) — all lost', pts: 'ALL' as const },
              { id: 'srch12', desc: 'Dog moves within 2m radius', pts: -1, perUnit: true, unit: 'meters' },
              { id: 'srch13', desc: 'Dog selects wrong object — all lost', pts: 'ALL' as const },
              { id: 'srch14', desc: 'Handler moves as dog returns — all lost', pts: 'ALL' as const },
              { id: 'srch15', desc: 'Handler must move feet to get object — all lost', pts: 'ALL' as const },
              { id: 'srch16', desc: 'Handler puts hand in pocket too early — all lost', pts: 'ALL' as const },
              { id: 'srch17', desc: 'Handler places wood incorrectly — all lost', pts: 'ALL' as const },
              { id: 'srch18', desc: 'Handler manipulates object / extra scent — all lost', pts: 'ALL' as const },
            ],
          },
        ]
      : []),

    // ── JUMPING ────────────────────────────────────────────────────
    {
      id: 'palisade',
      discipline: 'jmp',
      name: 'Palisade',
      maxPts: { 1: 15, 2: 15, 3: 15 },
      note: 'Lv I: 1.8m=15 | Lv II: up to 2.1m | Lv III: up to 2.3m',
      jumpOptions: {
        1: [{ label: '1.80 m', pts: 15 }],
        2: [{ label: '1.80 m', pts: 12 }, { label: '1.90 m', pts: 13 }, { label: '2.00 m', pts: 14 }, { label: '2.10 m', pts: 15 }],
        3: [{ label: '1.80 m', pts: 5 }, { label: '1.90 m', pts: 7 }, { label: '2.00 m', pts: 9 }, { label: '2.10 m', pts: 11 }, { label: '2.20 m', pts: 13 }, { label: '2.30 m', pts: 15 }],
      },
      penalties: [
        { id: 'pal1', desc: 'Dog starts before Judge\'s signal (loses one attempt)', pts: -4 },
        { id: 'pal2', desc: 'Dog starts after signal but before command', pts: -2 },
        { id: 'pal3', desc: 'Command by voice AND gesture', pts: -2 },
        { id: 'pal4', desc: 'Refusal or going around', pts: -4, perUnit: true, unit: 'refusals' },
        { id: 'pal5', desc: 'Knocking down boards', pts: -2, perUnit: true, unit: 'times' },
        { id: 'pal6', desc: 'Missing (attempt failed)', pts: -2, perUnit: true, unit: 'times' },
        { id: 'pal7', desc: 'Failure to take position behind obstacle', pts: -2 },
        { id: 'pal8', desc: 'Additional command for position/placement/recall', pts: -2, perUnit: true, unit: 'commands' },
        { id: 'pal9', desc: 'Additional send command', pts: -5, perUnit: true, unit: 'commands' },
        { id: 'pal10', desc: 'Dog does not return to heel within 10 sec', pts: -2 },
      ],
    },
    // Levels II & III only — Level I runs the palisade or the hurdle
    ...(L >= 2
      ? [
          {
            id: 'longjump',
            discipline: 'jmp' as const,
            name: 'Long Jump',
            maxPts: { 1: 0, 2: 15, 3: 20 },
            note: 'Lv II: 3–3.5m | Lv III: 3–4m',
            jumpOptions: {
              1: [],
              2: [{ label: '3.00 m', pts: 10 }, { label: '3.50 m', pts: 15 }],
              3: [{ label: '3.00 m', pts: 12 }, { label: '3.50 m', pts: 16 }, { label: '4.00 m', pts: 20 }],
            },
            penalties: [
              { id: 'lj1', desc: 'Dog starts before Judge\'s signal (loses one attempt)', pts: -4 },
              { id: 'lj2', desc: 'Dog starts after signal but before command', pts: -2 },
              { id: 'lj3', desc: 'Command by voice AND gesture', pts: -2 },
              { id: 'lj4', desc: 'Refusal or going around', pts: -4, perUnit: true, unit: 'refusals' },
              { id: 'lj5', desc: 'Dog steps within the frame', pts: -4 },
              { id: 'lj6', desc: 'Knocking down boards', pts: -2, perUnit: true, unit: 'times' },
              { id: 'lj7', desc: 'Missing (attempt failed)', pts: -2, perUnit: true, unit: 'times' },
              { id: 'lj8', desc: 'Failure to take position behind obstacle', pts: -2 },
              { id: 'lj9', desc: 'Additional command', pts: -2, perUnit: true, unit: 'commands' },
              { id: 'lj10', desc: 'Additional send command', pts: -5, perUnit: true, unit: 'commands' },
              { id: 'lj11', desc: 'Dog does not return to heel within 10 sec', pts: -2 },
            ],
          },
        ]
      : []),

    {
      id: 'hurdle',
      discipline: 'jmp',
      name: 'Hurdle',
      maxPts: { 1: 15, 2: 20, 3: 20 },
      note: 'Lv I: 1.0m | Lv II: up to 1.1m | Lv III: up to 1.2m',
      jumpOptions: {
        1: [{ label: '1.00 m', pts: 15 }],
        2: [{ label: '1.00 m', pts: 12 }, { label: '1.10 m', pts: 16 }, { label: '1.20 m', pts: 20 }],
        3: [{ label: '1.00 m', pts: 12 }, { label: '1.10 m', pts: 16 }, { label: '1.20 m', pts: 20 }],
      },
      penalties: [
        { id: 'hrd1', desc: 'Dog starts before Judge\'s signal (loses one attempt)', pts: -4 },
        { id: 'hrd2', desc: 'Dog starts after signal but before command', pts: -2 },
        { id: 'hrd3', desc: 'Command by voice AND gesture', pts: -2 },
        { id: 'hrd4', desc: 'Refusal or going around (forward or return)', pts: -4, perUnit: true, unit: 'refusals' },
        { id: 'hrd5', desc: 'Knocking down boards (forward or return)', pts: -2, perUnit: true, unit: 'times' },
        { id: 'hrd6', desc: 'Missing forward or back', pts: -2, perUnit: true, unit: 'times' },
        { id: 'hrd7', desc: 'Failure to take position behind obstacle', pts: -2 },
        { id: 'hrd8', desc: 'Additional command for position/recall', pts: -2, perUnit: true, unit: 'commands' },
        { id: 'hrd9', desc: 'Additional send command', pts: -5, perUnit: true, unit: 'commands' },
        { id: 'hrd10', desc: 'Dog does not return to heel within 10 sec', pts: -2 },
        { id: 'hrd11', desc: 'Position command by voice AND gesture (after forward jump)', pts: -2 },
        { id: 'hrd12', desc: 'Dog touches hurdle (forward or return)', pts: -1, perUnit: true, unit: 'times' },
        { id: 'hrd13', desc: 'Dog pushes hurdle but it does not fall', pts: -2, perUnit: true, unit: 'times' },
      ],
    },

    // ── BITING ─────────────────────────────────────────────────────
    {
      id: 'facebaton',
      discipline: 'bit',
      name: 'Face Attack with Baton',
      maxPts: { 1: 50, 2: 40, 3: 50 },
      note: 'Lv I: 30m | Lv II: 40m (+ obstacle) | Lv III: 50m (+ obstacle)',
      penalties: [
        { id: 'fb1', desc: 'Starting before Judge\'s signal (+5 G.A.)', pts: -10 },
        { id: 'fb2', desc: 'Second offense of starting before signal — ALL', pts: 'ALL' },
        { id: 'fb3', desc: 'Starting after signal but before command', pts: -5 },
        { id: 'fb4', desc: 'Additional attack command', pts: -10, perUnit: true, unit: 'extra commands' },
        { id: 'fb5', desc: 'Per second not biting', pts: L === 2 ? -2 : -3, perUnit: true, unit: 'seconds' },
        { id: 'fb6', desc: 'Per rapid change in bite', pts: -1, perUnit: true, unit: 'changes' },
        { id: 'fb7', desc: 'Per second biting after out command', pts: -2, perUnit: true, unit: 'seconds' },
        { id: 'fb8', desc: 'Additional bite after end of exercise', pts: -2, perUnit: true, unit: 'bites' },
        { id: 'fb9', desc: 'Additional recall command', pts: -5, perUnit: true, unit: 'extra recalls' },
        { id: 'fb10', desc: 'Not biting at time of recall (+per sec not biting)', pts: -5 },
        { id: 'fb11', desc: 'Failure to return within 30 sec', pts: -10 },
        { id: 'fb12', desc: 'Dog does not attack or bite — ALL', pts: 'ALL' },
        { id: 'fb13', desc: 'Handler leaves starting line — ALL', pts: 'ALL' },
        ...(L >= 2
          ? [
              { id: 'fb14', desc: 'Dog hesitates in front of obstacle (from start pts)', pts: -5 },
              { id: 'fb15', desc: 'Dog bypasses obstacle (from bite pts)', pts: L === 2 ? -10 : -15 },
            ]
          : []),
        { id: 'fb16', desc: 'Dog creeps forward at start line', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'fb17', desc: 'Dog stops biting at horn and returns to handler', pts: -5 },
      ],
    },

    ...(L >= 2
      ? [
          {
            id: 'faceacc',
            discipline: 'bit' as const,
            name: 'Face Attack with Accessories',
            maxPts: { 1: 0, 2: 40, 3: 50 },
            note: 'Distance: 30m | Same penalties as Face Attack with Baton',
            penalties: [
              { id: 'fa1', desc: 'Starting before Judge\'s signal (+5 G.A.)', pts: -10 },
              { id: 'fa2', desc: 'Second offense of starting before signal — ALL', pts: 'ALL' as const },
              { id: 'fa3', desc: 'Starting after signal but before command', pts: -5 },
              { id: 'fa4', desc: 'Additional attack command', pts: -10, perUnit: true, unit: 'extra commands' },
              { id: 'fa5', desc: 'Per second not biting', pts: L === 2 ? -2 : -3, perUnit: true, unit: 'seconds' },
              { id: 'fa6', desc: 'Per rapid change in bite', pts: -1, perUnit: true, unit: 'changes' },
              { id: 'fa7', desc: 'Per second biting after out command', pts: -2, perUnit: true, unit: 'seconds' },
              { id: 'fa8', desc: 'Additional bite after end of exercise', pts: -2, perUnit: true, unit: 'bites' },
              { id: 'fa9', desc: 'Additional recall command', pts: -5, perUnit: true, unit: 'extra recalls' },
              { id: 'fa10', desc: 'Not biting at time of recall (+per sec not biting)', pts: -5 },
              { id: 'fa11', desc: 'Failure to return within 30 sec', pts: -10 },
              { id: 'fa12', desc: 'Dog does not attack or bite — ALL', pts: 'ALL' as const },
              { id: 'fa13', desc: 'Handler leaves starting line — ALL', pts: 'ALL' as const },
              { id: 'fa14', desc: 'Dog hesitates in front of obstacle (from start pts)', pts: -5 },
              { id: 'fa15', desc: 'Dog bypasses obstacle', pts: L === 2 ? -10 : -15 },
              { id: 'fa16', desc: 'Dog creeps forward at start line', pts: -1, perUnit: true, unit: 'meters' },
              { id: 'fa17', desc: 'Dog stops biting at horn and returns to handler', pts: -5 },
              { id: 'fa18', desc: 'Dog aggresses a civilian — exercise terminated, ALL', pts: 'ALL' as const },
            ],
          },
        ]
      : []),

    {
      id: 'flee',
      discipline: 'bit',
      name: 'Flee Attack',
      maxPts: { 1: 50, 2: 30, 3: 30 },
      note: 'Distance: 30–40m | Duration: 10 sec',
      penalties: [
        { id: 'fl1', desc: 'Starting before Judge\'s signal (+5 G.A.)', pts: -10 },
        { id: 'fl2', desc: 'Second offense of starting before signal — ALL', pts: 'ALL' },
        { id: 'fl3', desc: 'Starting after signal but before command', pts: -5 },
        { id: 'fl4', desc: 'Additional attack command', pts: -10, perUnit: true, unit: 'extra commands' },
        { id: 'fl5', desc: 'Per second not biting', pts: L === 1 ? -3 : -1, perUnit: true, unit: 'seconds' },
        { id: 'fl6', desc: 'Per rapid change in bite', pts: -1, perUnit: true, unit: 'changes' },
        { id: 'fl7', desc: 'Per second biting after out command', pts: -2, perUnit: true, unit: 'seconds' },
        { id: 'fl8', desc: 'Additional bite after end of exercise', pts: -2, perUnit: true, unit: 'bites' },
        { id: 'fl9', desc: 'Additional recall command', pts: -5, perUnit: true, unit: 'extra recalls' },
        { id: 'fl10', desc: 'Not biting at time of recall (+per sec not biting)', pts: -5 },
        { id: 'fl11', desc: 'Failure to return within 30 sec', pts: -10 },
        { id: 'fl12', desc: 'Dog does not attack or bite — ALL', pts: 'ALL' },
        { id: 'fl13', desc: 'Handler leaves starting line — ALL', pts: 'ALL' },
        { id: 'fl14', desc: 'Dog creeps forward at start line', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'fl15', desc: 'Dog stops biting at horn and returns to handler', pts: -5 },
      ],
    },

    ...(L >= 3
      ? [
          {
            id: 'stoppedFlee',
            discipline: 'bit' as const,
            name: 'Stopped Flee Attack',
            maxPts: { 1: 0, 2: 0, 3: 30 },
            note: 'Score = 1/3 of other attack biting pts + start pts | Lv III only',
            penalties: [
              { id: 'sf1', desc: 'Starting before Judge\'s signal (+5 G.A.)', pts: -10 },
              { id: 'sf2', desc: 'Starting after signal but before command', pts: -5 },
              { id: 'sf3', desc: 'Dog bites — all lost', pts: 'ALL' as const },
              { id: 'sf4', desc: 'Per extra meter beyond 3m from decoy (at recall)', pts: -2, perUnit: true, unit: 'extra meters' },
              { id: 'sf5', desc: 'Additional recall if dog within 3m of handler', pts: -5 },
              { id: 'sf6', desc: 'Additional recall if dog outside 3m of handler', pts: -20 },
            ],
          },
        ]
      : []),

    ...(L >= 2
      ? [
          {
            id: 'searchescort',
            discipline: 'bit' as const,
            name: 'Search and Escort',
            maxPts: { 1: 0, 2: 40, 3: 40 },
            note: 'Discovery: 10pts | Escort: 30pts | Time: 2–3 min',
            penalties: [
              { id: 'se1', desc: 'Additional search command (only one allowed)', pts: -10 },
              { id: 'se2', desc: 'Dog does not search despite second command — all', pts: 'ALL' as const },
              { id: 'se3', desc: 'Dog does not discover decoy in time — all', pts: 'ALL' as const },
              { id: 'se4', desc: 'Dog does not bark in allotted time', pts: -5 },
              { id: 'se5', desc: 'Dog bites within the blind', pts: -5 },
              { id: 'se6', desc: 'Dog does not guard closely at blind', pts: -1, perUnit: true, unit: 'meters escaped' },
              { id: 'se7', desc: 'Handler runs to blind (G.A.)', pts: 0, label: '-2 G.A.', isGA: true },
              { id: 'se8', desc: 'Each bite during escort or after "out"', pts: -2, perUnit: true, unit: 'bites' },
              { id: 'se9', desc: 'Additional "out" command', pts: -2, perUnit: true, unit: 'commands' },
              { id: 'se10', desc: 'Dog lets decoy escape', pts: -1, perUnit: true, unit: 'meters' },
              { id: 'se11', desc: 'Handler does not maintain 3m distance during escort', pts: -10 },
              { id: 'se12', desc: 'Handler interferes with decoy during escape', pts: -30 },
              { id: 'se13', desc: 'Dog does not guard closely for 5 sec before horn', pts: -5 },
              { id: 'se14', desc: 'Dog leaves guard at Judge\'s signal', pts: -2 },
              { id: 'se15', desc: 'Dog does not return within 10 sec of recall', pts: -5 },
              { id: 'se16', desc: 'Dog barks without having discovered decoy', pts: -5 },
            ],
          },
        ]
      : []),

    {
      id: 'defence',
      discipline: 'bit',
      name: 'Defence of the Handler',
      maxPts: { 1: 30, 2: 30, 3: 30 },
      note: 'Attack: 20pts | Guard & Recall: 10pts | Duration: 10 sec',
      penalties: [
        { id: 'def1', desc: 'Handler talks to dog after start command', pts: -30 },
        { id: 'def2', desc: 'Handler responds to conversation without authorization', pts: -30 },
        { id: 'def3', desc: 'Dog bites before or during meeting/conversation', pts: -30 },
        { id: 'def4', desc: 'Dog bites after meeting but before aggression', pts: -2, perUnit: true, unit: 'meters' },
        { id: 'def5', desc: 'Dog moves away from handler without biting (1m allowance)', pts: -1, perUnit: true, unit: 'meters' },
        { id: 'def6', desc: 'Dog abandons handler beyond 10m — all lost', pts: 'ALL' },
        { id: 'def7', desc: 'Dog attacks third person — all lost', pts: 'ALL' },
        { id: 'def8', desc: 'Dog does not defend during 2 sec aggression — all lost', pts: 'ALL' },
        { id: 'def9', desc: 'Handler encourages dog / does not stay 3m away — all lost', pts: 'ALL' },
        { id: 'def10', desc: 'Bites after "out"', pts: -2, perUnit: true, unit: 'bites' },
        { id: 'def11', desc: 'Per second not biting', pts: -2, perUnit: true, unit: 'seconds' },
        { id: 'def12', desc: 'Dog does not return within 10 sec of recall', pts: -5 },
        { id: 'def13', desc: 'Dog leaves guard in place before command', pts: -2 },
        { id: 'def14', desc: 'Dog does not guard closely for 5 sec', pts: -5 },
      ],
    },

    ...(L >= 3
      ? [
          {
            id: 'guardobj',
            discipline: 'bit' as const,
            name: 'Guarding an Object',
            maxPts: { 1: 0, 2: 0, 3: 30 },
            note: 'Inner circle: 2m | Outer circle: 5m | 3 steal attempts',
            penalties: [
              { id: 'go1', desc: 'Dog bites Decoy within 2m zone before touching object', pts: 0, label: 'No penalty' },
              { id: 'go2', desc: 'Dog bites & dragged beyond 2m circle', pts: -1, perUnit: true, unit: 'meters' },
              { id: 'go3', desc: 'Dog bites & dragged beyond 5m from bite spot', pts: -15 },
              { id: 'go4', desc: 'Dragged beyond 5m — does not release in 10 sec', pts: -30 },
              { id: 'go5', desc: 'Dog lets decoy move object, bites inside circles', pts: -1, perUnit: true, unit: 'meters' },
              { id: 'go6', desc: 'Dog lets decoy move object, bites at 5–10m', pts: -15 },
              { id: 'go7', desc: 'Dog lets decoy take object beyond 10m', pts: -30 },
              { id: 'go8', desc: 'Dog bites decoy between 2m and 5m', pts: -5 },
              { id: 'go9', desc: 'Dog bites decoy beyond 5m — exercise ended', pts: -30 },
              { id: 'go10', desc: 'Handler looks back heading to blind — all lost', pts: 'ALL' as const },
              { id: 'go11', desc: 'Decoy succeeds in stealing object (any attempt)', pts: -30 },
            ],
          },
        ]
      : []),
  ]

  return exercises
}

export const LEVEL_MAX: Record<Level, number> = { 1: 200, 2: 300, 3: 400 }
/**
 * Which jumps are performed, per the club scoresheet: a value marked with an
 * asterisk there is a jump the handler chooses. Level I runs the palisade or
 * the hurdle — there is no long jump at that level; Level II stars only the
 * palisade and the long jump, so the hurdle is compulsory and one of those two
 * joins it; Level III stars none and runs all three.
 */
export const JUMP_RULE: Record<Level, { compulsory: string[]; choose: string[]; pick: number }> = {
  1: { compulsory: [], choose: ['palisade', 'hurdle'], pick: 1 },
  2: { compulsory: ['hurdle'], choose: ['palisade', 'longjump'], pick: 1 },
  3: { compulsory: ['palisade', 'longjump', 'hurdle'], choose: [], pick: 0 },
}

export const DISC_LABELS: Record<string, string> = {
  ob: 'Obedience',
  jmp: 'Jumping',
  bit: 'Biting',
}

export const LEVEL_LABELS: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
}
