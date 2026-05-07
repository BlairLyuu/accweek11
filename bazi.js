// bazi.js

const DAY_MASTERS = {
  '甲': {
    pinyin: 'Jiǎ', element: 'Wood',
    tagline: 'The ancient tree.',
    copy: `<p>甲 Jiǎ Wood · Yang Wood</p>
<p>There is something in you that was always reaching upward, long before you had a reason to. You don't pivot easily — not because you're rigid, but because your roots go deep and changing course costs something real.</p>
<p>People call it <strong>stubbornness</strong>. You know it as integrity.</p>
<p>You're not trying to dominate the space around you. You're just growing — and you've been growing longer than most.</p>`
  },
  '乙': {
    pinyin: 'Yǐ', element: 'Wood',
    tagline: 'The vine.',
    copy: `<p>乙 Yǐ Wood · Yin Wood</p>
<p>You adapt in ways that look effortless from the outside and cost everything from the inside. You're not weak — you're <strong>supple</strong>, which is harder to be and rarer to find.</p>
<p>You survive situations that would snap something more rigid. Then you're mistaken for someone who didn't really struggle.</p>
<p>The wall never moved. You did. And you got there anyway.</p>`
  },
  '丙': {
    pinyin: 'Bǐng', element: 'Fire',
    tagline: 'The sun.',
    copy: `<p>丙 Bǐng Fire · Yang Fire</p>
<p>Rooms change when you enter them. You've known this since you were young, and it has never been entirely comfortable. You warm people who don't think to warm you back.</p>
<p>You're drawn to sharing — ideas, energy, yourself. But <strong>the sun doesn't get to step into the shade</strong>.</p>
<p>What you need is someone who notices when your light is running low.</p>`
  },
  '丁': {
    pinyin: 'Dīng', element: 'Fire',
    tagline: 'The candle flame.',
    copy: `<p>丁 Dīng Fire · Yin Fire</p>
<p>You're not the loudest light in the room, but you're the one people lean toward when they want to actually see something. Your warmth is <strong>specific, intentional</strong> — it means something precisely because it's not given to everyone.</p>
<p>People underestimate you next to brighter flames. That's fine. You're the one they read by at night.</p>
<p>Small, steady, and almost impossible to fully extinguish.</p>`
  },
  '戊': {
    pinyin: 'Wù', element: 'Earth',
    tagline: 'The mountain.',
    copy: `<p>戊 Wù Earth · Yang Earth</p>
<p>You hold things — people's weight, their grief, their unfinished thoughts. You don't announce this. You just <strong>become the place where things can land</strong>.</p>
<p>You're described as reliable, grounded, calm. These are true. They're also the things people say when they've stopped really looking at you.</p>
<p>Mountains don't move. But they erode, slowly, in ways no one notices until much later.</p>`
  },
  '己': {
    pinyin: 'Jǐ', element: 'Earth',
    tagline: 'The fertile field.',
    copy: `<p>己 Jǐ Earth · Yin Earth</p>
<p>You receive, absorb, and transform. What comes into you doesn't leave the same way it arrived. This makes you a <strong>rare kind of listener</strong> — not just hearing, but composting, turning things into something useful.</p>
<p>You're often the quiet center of something thriving. Rarely the one receiving credit for it.</p>
<p>Fields need to lie fallow sometimes. You're allowed to let things go ungrown for a season.</p>`
  },
  '庚': {
    pinyin: 'Gēng', element: 'Metal',
    tagline: 'Unforged steel.',
    copy: `<p>庚 Gēng Metal · Yang Metal</p>
<p>You see what needs to be done and you do it, without the performance of deliberation. This directness is a form of <strong>respect</strong> — you don't dress up hard truths because you think people can handle them. Usually, you're right.</p>
<p>You're called blunt. Sometimes harsh. What you are is honest in a world that has made dishonesty very comfortable.</p>
<p>The edge isn't cruelty. It's precision.</p>`
  },
  '辛': {
    pinyin: 'Xīn', element: 'Metal',
    tagline: 'The cut gemstone.',
    copy: `<p>辛 Xīn Metal · Yin Metal</p>
<p>You notice what others don't — the temperature of a room, the slight wrongness in a word, the moment something shifts in a relationship. This isn't anxiety. It's <strong>calibration</strong>.</p>
<p>You hold yourself and others to a standard you rarely speak aloud. Not because you're cold — but because you understand, deeply, what refinement costs.</p>
<p>You're drawn to things that are unpolished. Maybe because you know exactly what it means to be shaped.</p>`
  },
  '壬': {
    pinyin: 'Rén', element: 'Water',
    tagline: 'The deep river.',
    copy: `<p>壬 Rén Water · Yang Water</p>
<p>You think in expanses. One idea opens into three, a conversation pulls you somewhere you didn't expect, and somehow that's where you needed to be. People call it scattered. It's not. It's <strong>a different kind of knowing</strong>.</p>
<p>You carry depths that don't show on the surface. The current looks calm. Underneath, everything is moving.</p>
<p>You're not searching for an answer. You're searching for the right size of question.</p>`
  },
  '癸': {
    pinyin: 'Guǐ', element: 'Water',
    tagline: 'Rain. Mist. The underground spring.',
    copy: `<p>癸 Guǐ Water · Yin Water</p>
<p>You don't flood a room — you seep into it. Quietly, completely, in ways people only notice after you've already changed something. Your presence is subtle and <strong>your absence leaves a specific kind of dryness</strong>.</p>
<p>You're intuitive in a way that makes other people slightly uncomfortable. You've learned to offer the insight without explaining where it came from.</p>
<p>Still water. The kind that runs deep enough to reach places no river can.</p>`
  }
};

// 2026 — 丙午年 Yang Fire
const LIUNIAN_2026 = {
  oneliner: {
    Wood:  'Fire year feeds Wood — a season of visibility. Let what you\'ve been growing be seen.',
    Fire:  'Fire meets Fire. High energy, high exposure. Protect your reserves.',
    Earth: 'Fire nourishes Earth. This year stabilises what you\'ve been building.',
    Metal: 'Fire meets Metal — pressure to refine. What are you willing to let go of?',
    Water: 'Fire challenges Water. A year of tension between what you feel and what you show.'
  }
};
