// bazi.js — Core calculation logic

// 天干 Heavenly Stems
const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const STEMS_PINYIN = ['Jiǎ','Yǐ','Bǐng','Dīng','Wù','Jǐ','Gēng','Xīn','Rén','Guǐ'];
const STEMS_ELEMENT = ['Wood','Wood','Fire','Fire','Earth','Earth','Metal','Metal','Water','Water'];
const STEMS_POLARITY = ['Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin'];

// 地支 Earthly Branches
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// Element indices: 0=Wood, 1=Fire, 2=Earth, 3=Metal, 4=Water
const STEM_ELEMENT_INDEX = [0,0,1,1,2,2,3,3,4,4];
const BRANCH_ELEMENT_INDEX = [4,2,0,0,2,1,1,2,3,3,2,4]; // 子丑寅卯辰巳午未申酉戌亥

// Day master data
const DAY_MASTERS = {
  '甲': {
    pinyin: 'Jiǎ',
    element: 'Wood',
    tagline: 'The ancient tree.',
    taglineShort: 'You don\'t choose a direction — you become it.',
    copy: `<p>甲 Jiǎ Wood. The oldest tree in the forest.</p>
<p>There is something in you that was always reaching upward, long before you had a reason to. You don't pivot easily — not because you're rigid, but because your roots go deep and changing course costs something real.</p>
<p>People call it stubbornness. You know it as integrity.</p>
<p>You're not trying to dominate the space around you. You're just growing — and you've been growing longer than most.</p>`
  },
  '乙': {
    pinyin: 'Yǐ',
    element: 'Wood',
    tagline: 'The vine.',
    taglineShort: 'You\'ve never broken. You\'ve only ever found another way.',
    copy: `<p>乙 Yǐ Wood. The vine that moves around the wall.</p>
<p>You adapt in ways that look effortless from the outside and cost everything from the inside. You're not weak — you're supple, which is harder to be and rarer to find.</p>
<p>You survive situations that would snap something more rigid. Then you're mistaken for someone who didn't really struggle.</p>
<p>The wall never moved. You did. And you got there anyway.</p>`
  },
  '丙': {
    pinyin: 'Bǐng',
    element: 'Fire',
    tagline: 'The sun.',
    taglineShort: 'You give light without being asked. That\'s the gift — and the burden.',
    copy: `<p>丙 Bǐng Fire. The sun.</p>
<p>Rooms change when you enter them. You've known this since you were young, and it has never been entirely comfortable. You warm people who don't think to warm you back.</p>
<p>You're drawn to sharing — ideas, energy, yourself. But the sun doesn't get to step into the shade.</p>
<p>What you need is someone who notices when your light is running low.</p>`
  },
  '丁': {
    pinyin: 'Dīng',
    element: 'Fire',
    tagline: 'The candle flame.',
    taglineShort: 'You don\'t illuminate everything. You choose what\'s worth seeing.',
    copy: `<p>丁 Dīng Fire. The candle flame.</p>
<p>You're not the loudest light in the room, but you're the one people lean toward when they want to actually see something. Your warmth is specific, intentional, and it means something precisely because it's not given to everyone.</p>
<p>People underestimate you next to brighter flames. That's fine. You're the one they read by at night.</p>
<p>Small, steady, and almost impossible to fully extinguish.</p>`
  },
  '戊': {
    pinyin: 'Wù',
    element: 'Earth',
    tagline: 'The mountain.',
    taglineShort: 'Everyone comes to you to feel stable. No one thinks to ask if you are.',
    copy: `<p>戊 Wù Earth. The mountain.</p>
<p>You hold things — people's weight, their grief, their unfinished thoughts. You don't announce this. You just become the place where things can land.</p>
<p>You're described as reliable, grounded, calm. These are true. They're also the things people say when they've stopped really looking at you.</p>
<p>Mountains don't move. But they erode, slowly, in ways no one notices until much later.</p>`
  },
  '己': {
    pinyin: 'Jǐ',
    element: 'Earth',
    tagline: 'The fertile field.',
    taglineShort: 'Everything grows in you. The question is what you\'ve chosen to plant.',
    copy: `<p>己 Jǐ Earth. The soil.</p>
<p>You receive, absorb, and transform. What comes into you doesn't leave the same way it arrived. This makes you a rare kind of listener — not just hearing, but composting, turning things into something useful.</p>
<p>You're often the quiet center of something thriving. Rarely the one receiving credit for it.</p>
<p>Fields need to lie fallow sometimes. You're allowed to let things go ungrown for a season.</p>`
  },
  '庚': {
    pinyin: 'Gēng',
    element: 'Metal',
    tagline: 'Unforged steel.',
    taglineShort: 'You cut cleanly. Most people don\'t know how rare that is.',
    copy: `<p>庚 Gēng Metal. Unforged steel.</p>
<p>You see what needs to be done and you do it, without the performance of deliberation. This directness is a form of respect — you don't dress up hard truths because you think people can handle them. Usually, you're right.</p>
<p>You're called blunt. Sometimes harsh. What you are is honest in a world that has made dishonesty very comfortable.</p>
<p>The edge isn't cruelty. It's precision.</p>`
  },
  '辛': {
    pinyin: 'Xīn',
    element: 'Metal',
    tagline: 'The cut gemstone.',
    taglineShort: 'You were shaped by precision — and you\'ve never forgotten what was lost in the process.',
    copy: `<p>辛 Xīn Metal. The cut gemstone.</p>
<p>You notice what others don't — the temperature of a room, the slight wrongness in a word, the moment something shifts in a relationship. This isn't anxiety. It's calibration.</p>
<p>You hold yourself and others to a standard you rarely speak aloud. Not because you're cold — but because you understand, deeply, what refinement costs.</p>
<p>You're drawn to things that are unpolished. Maybe because you know exactly what it means to be shaped.</p>`
  },
  '壬': {
    pinyin: 'Rén',
    element: 'Water',
    tagline: 'The deep river.',
    taglineShort: 'You\'re always moving toward something larger than what you can see.',
    copy: `<p>壬 Rén Water. The deep river running to the sea.</p>
<p>You think in expanses. One idea opens into three, a conversation pulls you somewhere you didn't expect, and somehow that's where you needed to be. People call it scattered. It's not. It's a different kind of knowing.</p>
<p>You carry depths that don't show on the surface. The current looks calm. Underneath, everything is moving.</p>
<p>You're not searching for an answer. You're searching for the right size of question.</p>`
  },
  '癸': {
    pinyin: 'Guǐ',
    element: 'Water',
    tagline: 'Rain. Mist. The underground spring.',
    taglineShort: 'You know things you can\'t explain how you know.',
    copy: `<p>癸 Guǐ Water. Rain. Mist. The underground spring.</p>
<p>You don't flood a room — you seep into it. Quietly, completely, in ways people only notice after you've already changed something. Your presence is subtle and your absence leaves a specific kind of dryness.</p>
<p>You're intuitive in a way that makes other people slightly uncomfortable. You've learned to offer the insight without explaining where it came from.</p>
<p>Still water. The kind that runs deep enough to reach places no river can.</p>`
  }
};

// Element colors
const ELEMENT_COLORS = {
  'Wood':  { bg: '#1a2e1a', accent: '#4a7c4a', text: '#c8e6c8' },
  'Fire':  { bg: '#2e1a0f', accent: '#c45c1a', text: '#f5c5a0' },
  'Earth': { bg: '#2a2010', accent: '#8a7040', text: '#e0d0a0' },
  'Metal': { bg: '#1a1a22', accent: '#8090b0', text: '#d0d8e8' },
  'Water': { bg: '#0f1a2e', accent: '#2060a0', text: '#a0c4e8' }
};

// 2026 is 丙午年 — Yang Fire year
const LIUNIAN_2026 = {
  stem: '丙',
  branch: '午',
  element: 'Fire',
  copy: `<p>2026 is a 丙午 year — Yang Fire on Yang Fire. The energy is expansive, visible, and at times overwhelming.</p>
<p>For you, this year asks a simple question: <em>what do you actually want to be seen for?</em> The fire doesn't hide. It illuminates, but it also reveals. What's been quiet in you may find its moment this year.</p>
<p>Move toward warmth. Be careful of burning through what took time to build.</p>`
};

// ─── Calculation Functions ───────────────────────────────────────────

function getStemIndex(year, month, day) {
  // Use lunar-javascript to get the day stem
  // lunar-javascript exposes a Lunar object
  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    const bazi  = lunar.getEightChar();
    const dayStem = bazi.getDayGan(); // 天干
    return { dayStem, bazi };
  } catch(e) {
    console.error('Calculation error:', e);
    return null;
  }
}

function getElementDistribution(bazi) {
  // Count elements across all 8 characters (4 stems + 4 branches)
  const counts = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  const elementNames = ['Wood','Fire','Earth','Metal','Water'];

  const stems   = [bazi.getYearGan(), bazi.getMonthGan(), bazi.getDayGan(), bazi.getTimeGan()];
  const branches= [bazi.getYearZhi(), bazi.getMonthZhi(), bazi.getDayZhi(), bazi.getTimeZhi()];

  stems.forEach(s => {
    const idx = STEMS.indexOf(s);
    if (idx !== -1) counts[elementNames[STEM_ELEMENT_INDEX[idx]]]++;
  });
  branches.forEach(b => {
    const idx = BRANCHES.indexOf(b);
    if (idx !== -1) counts[elementNames[BRANCH_ELEMENT_INDEX[idx]]]++;
  });

  return counts;
}

function getMissingElements(counts) {
  return Object.entries(counts)
    .filter(([,v]) => v === 0)
    .map(([k]) => k);
}
