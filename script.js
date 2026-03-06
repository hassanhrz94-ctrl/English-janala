const allWords = [
  { word:"Eager",     type:"adjective", bangla:"আগ্রহী",    phonetic:"/ˈiːɡər/",    example:"She is eager to learn English.", emoji:"🔥" },
  { word:"Hesitate",  type:"verb",      bangla:"দ্বিধা করা", phonetic:"/ˈhɛzɪteɪt/", example:"Don't hesitate to ask questions.", emoji:"🤔" },
  { word:"Linger",    type:"verb",      bangla:"দীর্ঘস্থায়ী হওয়া", phonetic:"/ˈlɪŋɡər/", example:"The smell lingered in the room.", emoji:"⏳" },
  { word:"Resilient", type:"adjective", bangla:"স্থিতিস্থাপক", phonetic:"/rɪˈzɪliənt/", example:"She is resilient in tough times.", emoji:"💪" },
  { word:"Reluctant", type:"adjective", bangla:"অনিচ্ছুক",   phonetic:"/rɪˈlʌktənt/", example:"He was reluctant to speak.", emoji:"😒" },
  { word:"Vague",     type:"adjective", bangla:"অস্পষ্ট",   phonetic:"/veɪɡ/",       example:"His answer was very vague.", emoji:"🌫️" },
  { word:"Journey",   type:"noun",      bangla:"যাত্রা",    phonetic:"/ˈdʒɜːni/",    example:"Life is a beautiful journey.", emoji:"🗺️" },
  { word:"Courage",   type:"noun",      bangla:"সাহস",      phonetic:"/ˈkʌrɪdʒ/",   example:"It takes courage to speak up.", emoji:"🦁" },
  { word:"Thrive",    type:"verb",      bangla:"উন্নতি করা", phonetic:"/θraɪv/",      example:"Plants thrive in sunlight.", emoji:"🌱" },
  { word:"Curious",   type:"adjective", bangla:"কৌতূহলী",   phonetic:"/ˈkjʊəriəs/", example:"Children are naturally curious.", emoji:"🔍" },
  { word:"Wisdom",    type:"noun",      bangla:"প্রজ্ঞা",   phonetic:"/ˈwɪzdəm/",   example:"He spoke with great wisdom.", emoji:"🦉" },
  { word:"Achieve",   type:"verb",      bangla:"অর্জন করা", phonetic:"/əˈtʃiːv/",   example:"You can achieve your goals.", emoji:"🏆" },
];

const faqs = [
  { q:"Is English Janala free to use?", a:"Yes! Our core lessons and vocabulary cards are completely free. Premium features like IELTS prep and live sessions require a subscription." },
  { q:"Can I learn English from scratch?", a:"Absolutely! Our Beginner module starts from the very basics — the alphabet, numbers, and simple greetings — so anyone can start." },
  { q:"How many lessons are available?", a:"We currently have 200+ lessons across three levels: Beginner, Intermediate, and Advanced. New lessons are added every week." },
  { q:"Is the content available in Bangla?", a:"Yes! All explanations, word meanings, and instructions are provided in Bangla to help you understand better." },
  { q:"Can I use English Janala on my phone?", a:"Yes, the platform is fully responsive and works great on any device — mobile, tablet, or desktop." },
];

// ─── RENDER VOCAB CARDS ─────────────────────────────────────
let visibleCount = 8;
let currentFilter = 'all';

function renderCards() {
  const grid = document.getElementById('vocab-grid');
  grid.innerHTML = '';
  const filtered = currentFilter === 'all' ? allWords : allWords.filter(w => w.type === currentFilter);
  const shown = filtered.slice(0, visibleCount);
  shown.forEach(w => {
    const card = document.createElement('div');
    card.className = 'flip-card h-44 word-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-front bg-white border border-purple-100 shadow-sm rounded-2xl">
          <div class="text-4xl mb-2">${w.emoji}</div>
          <p class="font-bold text-xl text-gray-800">${w.word}</p>
          <p class="text-xs text-purple-400 mt-1 uppercase tracking-wide">${w.type}</p>
          <p class="text-xs text-gray-400 mt-1">${w.phonetic}</p>
          <p class="text-xs text-gray-300 mt-2">tap to flip</p>
        </div>
        <div class="flip-back rounded-2xl">
          <div class="text-3xl mb-2">${w.emoji}</div>
          <p class="text-xl font-bold mb-1">${w.bangla}</p>
          <p class="text-xs opacity-80 italic">"${w.example}"</p>
          <button class="mt-3 text-xs underline opacity-80" onclick="openWordModal(event,'${w.word}')">More details</button>
        </div>
      </div>`;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
}

function filterCards(filter, btn) {
  currentFilter = filter;
  visibleCount = 8;
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.classList.add('bg-white','text-gray-600');
  });
  btn.classList.add('active');
  btn.classList.remove('bg-white','text-gray-600');
  renderCards();
}

function loadMoreCards() {
  visibleCount += 4;
  renderCards();
}

function openWordModal(e, wordName) {
  e.stopPropagation();
  const w = allWords.find(x => x.word === wordName);
  if (!w) return;
  document.getElementById('modal-word').textContent = w.word;
  document.getElementById('modal-type').textContent = w.type.charAt(0).toUpperCase() + w.type.slice(1);
  document.getElementById('modal-phonetic').textContent = w.phonetic;
  document.getElementById('modal-bangla').textContent = w.bangla;
  document.getElementById('modal-example').textContent = w.example;
  document.getElementById('word-modal').showModal();
}

// ─── RENDER FAQ ──────────────────────────────────────────────
function renderFAQ() {
  const list = document.getElementById('faq-list');
  faqs.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4';
    item.innerHTML = `
      <details>
        <summary class="flex justify-between items-center font-semibold text-gray-800 py-1">
          <span>${f.q}</span>
          <span class="faq-icon text-purple-600 text-xl ml-4 flex-shrink-0">+</span>
        </summary>
        <p class="text-gray-500 text-sm mt-3 leading-relaxed">${f.a}</p>
      </details>`;
    list.appendChild(item);
  });
}

// ─── INIT ────────────────────────────────────────────────────
renderCards();
renderFAQ();

// smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});