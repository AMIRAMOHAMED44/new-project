// ===== Register & Login =====
function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (!name || !email || !pass) {
    alert("يرجى ملء جميع الحقول");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, pass }));
  alert("تم إنشاء الحساب بنجاح ✅");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("logEmail").value.trim();
  const pass = document.getElementById("logPass").value.trim();

  const saved = JSON.parse(localStorage.getItem("user"));

  if (!saved) {
    alert("لم يتم العثور على حساب. يرجى التسجيل أولًا.");
    return;
  }

  if (email === saved.email && pass === saved.pass) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedUserName", saved.name);
    window.location.href = "home.html";
  } else {
    alert("بيانات غير صحيحة");
  }
}

// ===== User Name in Navbar =====
const userSpan = document.getElementById("userName");
if (userSpan) {
  const name = localStorage.getItem("loggedUserName");
  if (name) userSpan.innerText = `مرحباً، ${name} `;
}

// ===== Quran Data (30 Juz) =====
const juzData = {
  1: ["الفاتحة", "البقرة"],
  2: ["البقرة"],
  3: ["البقرة", "آل عمران"],
  4: ["آل عمران", "النساء"],
  5: ["النساء"],
  6: ["النساء", "المائدة"],
  7: ["المائدة", "الأنعام"],
  8: ["الأنعام", "الأعراف"],
  9: ["الأعراف", "الأنفال"],
  10: ["الأنفال", "التوبة"],
  11: ["التوبة", "يونس", "هود"],
  12: ["هود","يوسف"],
  13: ["يوسف", "الرعد", "ابراهيم"],
  14: ["الحجر", "النحل"],
  15: ["الإسراء", "الكهف"],
  16: ["الكهف", "مريم", "طه"],
  17: ["الأنبياء", "الحج"],
  18: ["المؤمنون", "النور", "الفرقان"],
  19: ["الفرقان", "الشعراء", "النمل"],
  20: ["النمل", "القصص", "العنكبوت"],
  21: ["العنكبوت", "الروم", "لقمان", "السجدة","الاحزاب"],
  22: ["الأحزاب", "سبأ", "فاطر","يس"],
  23: ["يس", "الصافات", "ص","الزمر"],
  24: ["الزمر", "غافر","فصلت"],
  25: ["فصلت", "الشورى", "الزخرف","الدخان","الجاثية"],
  26: ["الأحقاف", "محمد", "الفتح", "الحجرات","ق","الذاريات"],
  27: ["الذاريات", "الطور", "النجم", "القمر","الرحمن","الواقعة","الحديد"],
  28: ["المجادلة", "الحشر", "الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم"],
  29: ["الملك", "القلم", "الحاقة", "المعارج","نوح","الجن","المزمل","المدثر","القيامة","الانسان","المرسلات"],
  30: [
    "النبأ","النازعات","عبس","التكوير","الإنفطار","المطففين",
    "الإنشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر",
    "البلد","الشمس","الليل","الضحى","الشرح","التين","العلق",
    "القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر",
    "العصر","الهمزة","الفيل","قريش","الماعون","الكوثر",
    "الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"
  ]
};

// ===== Show Juz =====
if (document.getElementById("juzContainer")) {
  const container = document.getElementById("juzContainer");
  for (let i = 1; i <= 30; i++) {
    container.innerHTML += `
      <button onclick="openJuz(${i})"
        class="bg-white p-4 rounded shadow hover:bg-[#E5BA41] font-bold text-xl text-center cursor-pointer transition">
        الجزء ${i}
      </button>
    `;
  }
}

// ===== Open Juz =====
function openJuz(num) {
  localStorage.setItem("currentJuz", num);
  window.location.href = "surahs.html";
}

// ===== Show Surahs =====
if (document.getElementById("heart")) {
  const juz = localStorage.getItem("currentJuz");
  const surahs = juzData[juz];
  const juzTitle = document.getElementById("juzTitle"); // تأكد من وجود عنصر العنوان
  juzTitle.innerText = `سور الجزء ${juz}`;

  const heart = document.getElementById("heart");
  heart.innerHTML = ""; // تنظيف المحتوى قبل الإضافة

  // ===== جلب السور المكتملة من localStorage =====
  const completedSurahs = JSON.parse(localStorage.getItem(`completedJuz${juz}`)) || [];

  surahs.forEach((name, i) => {
    const surahId = `s${i}`;
    const isCompleted = completedSurahs.includes(surahId);
    heart.innerHTML += `
      <div class="surah ${isCompleted ? 'completed' : ''}"
           style="top:${(i % 3) * 90}px; left:${(i % 2) * 150}px"
           id="${surahId}"
           onclick="completeSurah('${surahId}')">
        ${name}
      </div>
    `;
  });
}

// ===== Complete Surah =====
function completeSurah(id) {
  const el = document.getElementById(id);
  if (el.classList.contains("completed")) return;

  el.classList.add("completed");
  alert("أحسنت 🌸 بارك الله فيك");

  // ===== حفظ الحالة في localStorage =====
  const juz = localStorage.getItem("currentJuz");
  let completedSurahs = JSON.parse(localStorage.getItem(`completedJuz${juz}`)) || [];
  if (!completedSurahs.includes(id)) {
    completedSurahs.push(id);
    localStorage.setItem(`completedJuz${juz}`, JSON.stringify(completedSurahs));
  }
}
