import { useState, useEffect, useRef } from 'react';
import portrait from './assets/potrait.jpg';
import { SKILLS, EXP, PROJECTS, EDU, T } from './data';

/* ── tiny hook: IntersectionObserver reveal ─────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/* ── SVG arrow icon ─────────────────────────────────────────── */
const Arrow = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 inline-block ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <path d="M2 10L10 2M10 2H4M10 2v6"/>
  </svg>
);

/* ── LANG TOGGLE ────────────────────────────────────────────── */
function LangBar({ lang, setLang }) {
  return (
    <div className="fixed top-3 left-3.5 z-[2100] flex items-center gap-1 bg-[rgba(12,14,22,0.9)] border border-white/10 rounded-full p-1 backdrop-blur-md">
      {['en','de'].map(l => (
        <button key={l} onClick={() => setLang(l)}
          className={`font-mono text-[0.6rem] tracking-widest font-semibold px-3.5 py-1 rounded-full border-none cursor-pointer transition-all duration-200
            ${lang === l ? 'bg-blue text-bg' : 'bg-transparent text-muted2 hover:text-snow'}`}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── NAVBAR ─────────────────────────────────────────────────── */
function Navbar({ lang, t, scrolled, menuOpen, setMenuOpen }) {
  const links = ['nav_skills','nav_exp','nav_proj','nav_edu','nav_contact'];
  const ids   = ['skills','experience','projects','education','contact'];
  const goTo  = id => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMenuOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-300
        ${scrolled ? 'bg-[rgba(8,9,13,0.92)] backdrop-blur-xl border-b border-white/5 py-3.5 px-14' : 'py-5 px-14'}`}>
        <div onClick={() => goTo('hero')}
          className="font-syne font-black text-2xl tracking-tight cursor-pointer ml-20 text-gradient-nav select-none">
          LJ<span className="text-blue">.</span>
        </div>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((k,i) => (
            <li key={k}>
              <button onClick={() => goTo(ids[i])}
                className="font-mono text-[0.68rem] tracking-widest text-muted2 uppercase hover:text-blue transition-colors bg-transparent border-none cursor-pointer">
                {t[k]}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => goTo('hire')}
              className="font-syne font-bold text-sm bg-gradient-to-br from-blue2 to-blue text-bg px-5 py-2.5 rounded-lg border-none cursor-pointer shadow-[0_4px_16px_rgba(99,179,237,0.22)] hover:shadow-[0_8px_24px_rgba(99,179,237,0.35)] hover:-translate-y-0.5 transition-all">
              {t.nav_hire}
            </button>
          </li>
        </ul>
        {/* hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1.5">
          <span className={`block w-5 h-px bg-snow rounded transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}/>
          <span className={`block w-5 h-px bg-snow rounded transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
          <span className={`block w-5 h-px bg-snow rounded transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}/>
        </button>
      </nav>
      {/* mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-[rgba(8,9,13,0.97)] backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
          {[...links.map((k,i) => ({ k, id: ids[i] })), { k:'nav_hire', id:'hire' }].map(({ k, id }) => (
            <button key={k} onClick={() => goTo(id)}
              className="font-syne font-bold text-3xl text-snow hover:text-blue transition-colors bg-transparent border-none cursor-pointer">
              {t[k]}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ── HERO ───────────────────────────────────────────────────── */
function Hero({ lang, t }) {
  const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <section id="hero" className="min-h-screen flex items-center px-14 pt-36 pb-20 relative overflow-hidden">
      {/* glow orbs */}
      <div className="absolute -top-[8%] -right-[4%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,.09)_0%,transparent_65%)] pointer-events-none" style={{animation:'float 8s ease-in-out infinite'}}/>
      <div className="absolute -bottom-[18%] -left-[8%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(183,148,244,.06)_0%,transparent_65%)] pointer-events-none" style={{animation:'float 11s ease-in-out infinite reverse'}}/>
      <div className="max-w-[1100px] mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-center">
        {/* text */}
        <div>
          <p className="animate-fade-up delay-0 font-mono text-[0.7rem] tracking-[0.2em] text-blue uppercase mb-4 flex items-center gap-2.5">
            <span className="block w-6 h-px bg-blue"/>{t.h_eye}
          </p>
          <h1 className="animate-fade-up delay-1 font-syne font-black leading-[0.95] tracking-tight mb-4" style={{fontSize:'clamp(2.6rem,5vw,4.6rem)'}}>
            <span className="block text-snow">Louis</span>
            <span className="block text-gradient-blue">Joseph.</span>
          </h1>
          <p className="animate-fade-up delay-2 font-outfit font-light text-muted2 mb-6" style={{fontSize:'clamp(.92rem,1.7vw,1.15rem)'}}>
            Full-Stack <span className="text-snow font-medium">Software Developer</span> — Web & Mobile
          </p>
          <p className="animate-fade-up delay-3 text-muted text-[0.97rem] leading-[1.85] mb-10 max-w-[460px] border-l-2 border-blue/25 pl-4">
            {t.h_desc}
          </p>
          <div className="animate-fade-up delay-4 flex gap-3 flex-wrap mb-10">
            <button onClick={() => goTo('projects')}
              className="font-syne font-bold text-sm px-8 py-3.5 rounded-lg bg-gradient-to-br from-blue2 to-blue text-bg border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(99,179,237,.3)] transition-all">
              {t.h_cta1}
            </button>
            <button onClick={() => goTo('hire')}
              className="font-syne font-semibold text-sm px-8 py-3.5 rounded-lg bg-transparent text-snow border border-white/15 cursor-pointer hover:border-blue hover:text-blue hover:-translate-y-0.5 transition-all">
              {t.h_cta2}
            </button>
          </div>
          <div className="animate-fade-up delay-5 flex gap-2 flex-wrap">
            {['React.js','Node.js','MongoDB','React Native','Figma','Express.js'].map(p => (
              <span key={p} className="font-mono text-[0.63rem] tracking-wide text-muted2 border border-white/10 px-3 py-1 rounded-full bg-white/[0.03] hover:border-blue/40 hover:text-blue transition-all">
                {p}
              </span>
            ))}
          </div>
        </div>
        {/* portrait */}
        <div className="flex items-center justify-center animate-fade-up delay-2 order-first lg:order-last">
          <div className="relative w-[360px] h-[360px] ring-blob flex-shrink-0">
            <div className="w-full h-full blob-shape overflow-hidden relative z-10 shadow-[0_24px_60px_rgba(0,0,0,.65),0_0_0_1px_rgba(99,179,237,.14)] bg-gradient-to-br from-bg3 to-bg2">
              <img src={portrait} alt="Louis Joseph" className="rounded-full w-full h-full object-cover object-top" onError={e => e.target.style.display='none'}/>
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[rgba(8,9,13,.55)] to-transparent pointer-events-none"/>
            </div>
            {/* accent dots */}
            <span className="absolute top-[9%] -right-2.5 w-3 h-3 rounded-full bg-blue shadow-[0_0_18px_rgba(99,179,237,.6)] z-20" style={{animation:'float 3s ease-in-out infinite'}}/>
            <span className="absolute bottom-[17%] -left-3 w-2 h-2 rounded-full bg-purple shadow-[0_0_13px_rgba(183,148,244,.6)] z-20" style={{animation:'float 4.2s ease-in-out infinite reverse'}}/>
            <span className="absolute bottom-[6%] right-[12%] w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_11px_rgba(246,173,85,.5)] z-20" style={{animation:'float 5s ease-in-out infinite'}}/>
          </div>
        </div>
      </div>
      {/* scroll hint */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-blue to-transparent" style={{animation:'blink 2s ease infinite'}}/>
        <span className="font-mono text-[0.56rem] tracking-widest text-muted uppercase">scroll</span>
      </div>
    </section>
  );
}

/* ── SECTION WRAPPER ────────────────────────────────────────── */
function Section({ id, alt, children }) {
  return (
    <div id={id} className={`${alt ? 'bg-bg2' : 'bg-bg'} py-24`}>
      <div className="max-w-[1100px] mx-auto px-10">{children}</div>
    </div>
  );
}

function SectionHead({ tag, title, em }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref}>
      <p className={`font-mono text-[0.65rem] tracking-[0.2em] text-blue uppercase mb-2.5 flex items-center gap-2 transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <span className="block w-5 h-px bg-blue"/>{tag}
      </p>
      <h2 className={`font-syne font-black tracking-tight leading-tight mb-12 transition-all duration-500 delay-100 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        style={{fontSize:'clamp(1.9rem,3.8vw,3rem)'}}>
        {title} <em className="not-italic bg-gradient-to-br from-blue to-purple bg-clip-text text-transparent">{em}</em>
      </h2>
    </div>
  );
}

/* ── SKILLS SUB-COMPONENT (FIXES ERR 1) ─────────────────────── */
function SkillCard({ s, i, lang }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref}
      style={{ transitionDelay:`${i*80}ms` }}
      className={`bg-card border border-white/10 rounded-2xl p-6 relative overflow-hidden group transition-all duration-500
        hover:border-blue/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,.4)]
        ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue to-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
      <p className="font-mono text-[0.62rem] tracking-widest text-blue uppercase mb-3">{s.cat[lang]}</p>
      <div className="flex flex-wrap gap-1.5">
        {s.items.map(item => (
          <span key={item} className="text-[0.73rem] px-2.5 py-1 rounded bg-blue/10 text-muted2 border border-blue/15">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── SKILLS ─────────────────────────────────────────────────── */
function Skills({ lang, t }) {
  return (
    <Section id="skills" alt>
      <SectionHead tag={t.sk_tag} title="Technical" em="Skills"/>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {SKILLS.map((s, i) => (
          <SkillCard key={i} s={s} i={i} lang={lang} />
        ))}
      </div>
    </Section>
  );
}

/* ── EXPERIENCE ─────────────────────────────────────────────── */
function Experience({ lang, t }) {
  const [active, setActive] = useState(0);
  const [ref, vis] = useReveal();

  return (
    <Section id="experience">
      <SectionHead tag={t.ex_tag} title="Work" em="Experience"/>
      <div ref={ref} className={`grid grid-cols-1 md:grid-cols-[220px_1fr] transition-all duration-500 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-5'}`}>
        {/* tabs */}
        <div className="flex md:flex-col flex-row overflow-x-auto md:border-r md:border-b-0 border-b border-white/10 md:pb-0 pb-0 mb-6 md:mb-0">
          {EXP.map((e,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{'--tc': e.col}}
              className={`flex flex-col items-start gap-1 px-4 py-3.5 bg-transparent border-none cursor-pointer text-left font-outfit transition-all whitespace-nowrap
                md:border-r-2 md:border-b-0 border-b-2 -mb-px md:-mr-px md:mb-0
                ${active===i ? 'md:border-r-[var(--tc)] border-b-[var(--tc)] bg-white/[0.03]' : 'border-transparent hover:bg-white/[0.02]'}`}>
              <span className={`text-[0.82rem] font-semibold transition-colors ${active===i ? 'text-[var(--tc)]' : 'text-muted2'}`}>{e.co}</span>
              <span className="font-mono text-[0.6rem] text-muted">{e.period}</span>
            </button>
          ))}
        </div>
        {/* detail */}
        <div key={active} className="md:pl-10 pt-1" style={{animation:'slideIn .3s ease'}}>
          <h3 className="font-syne font-bold text-xl mb-1.5" style={{color: EXP[active].col}}>{EXP[active].role[lang]}</h3>
          <p className="text-muted2 text-sm mb-1">{EXP[active].full}</p>
          <p className="font-mono text-[0.64rem] text-muted mb-6">{EXP[active].loc} · {EXP[active].period}</p>
          <ul className="flex flex-col gap-3 list-none">
            {EXP[active].pts[lang].map((pt,i) => (
              <li key={i} className="flex items-start gap-3 text-muted2 text-[0.92rem] leading-relaxed">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2.5" style={{background: EXP[active].col}}/>
                {pt}
              </li>
            ))}
          </ul>
          {EXP[active].links.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-5">
              {EXP[active].links.map(l => (
                <a key={l.t} href={l.u} target="_blank" rel="noreferrer"
                  className="group font-mono text-[0.64rem] tracking-wide text-blue border border-blue/30 px-3.5 py-1.5 rounded bg-blue/5 hover:bg-blue/15 hover:border-blue transition-all flex items-center gap-1.5">
                  {l.t}<Arrow/>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ── PROJECTS SUB-COMPONENT (FIXES ERR 2) ───────────────────── */
function ProjectCard({ p, i, lang }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref}
      style={{ transitionDelay:`${i*90}ms`, '--acc': p.acc }}
      className={`bg-card border border-white/10 rounded-2xl p-7 flex flex-col gap-3 group relative overflow-hidden transition-all duration-500
        hover:border-blue/40 hover:-translate-y-1.5 hover:shadow-[0_22px_46px_rgba(0,0,0,.5)]
        ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{background:`linear-gradient(135deg, ${p.acc} 0%, transparent 60%)`}}/>
      <div className="flex items-start justify-between gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 flex-shrink-0">{p.icon}</div>
        <span className="font-mono text-[0.57rem] tracking-wide uppercase px-2 py-1 rounded border mt-1 flex-shrink-0"
          style={{color:p.bc, borderColor:`${p.bc}40`, background:`${p.bc}14`}}>{p.badge}</span>
      </div>
      <div>
        <p className="font-syne font-bold text-snow leading-tight">{p.name}</p>
        <p className="font-mono text-[0.58rem] text-muted mt-0.5 tracking-wide">{p.sub[lang]}</p>
      </div>
      <p className="text-muted text-[0.84rem] leading-relaxed flex-1">{p.desc[lang]}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.stack.map(s => <span key={s} className="font-mono text-[0.59rem] text-muted bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>)}
      </div>
      <div className="flex gap-2 flex-wrap mt-1">
        {p.links.map(l => (
          <a key={l.t} href={l.u} target="_blank" rel="noreferrer"
            className="group/lnk font-mono text-[0.63rem] font-medium px-3 py-1.5 rounded border border-blue/25 text-blue bg-blue/5 hover:bg-blue/15 hover:border-blue hover:translate-x-0.5 transition-all flex items-center gap-1">
            {l.t}<Arrow/>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── PROJECTS ───────────────────────────────────────────────── */
function Projects({ lang, t }) {
  return (
    <Section id="projects" alt>
      <SectionHead tag={t.pj_tag} title="Featured" em="Projects"/>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(315px,1fr))] gap-5">
        {PROJECTS.map((p,i) => (
          <ProjectCard key={i} p={p} i={i} lang={lang} />
        ))}
      </div>
    </Section>
  );
}

/* ── EDUCATION SUB-COMPONENT (FIXES ERR 3) ──────────────────── */
function EducationCard({ e, i, lang }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref}
      style={{ transitionDelay:`${i*100}ms` }}
      className={`grid grid-cols-[64px_1fr] bg-card border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue/30 hover:translate-x-1.5 ${vis?'opacity-100 translate-x-0':'opacity-0 -translate-x-5'}`}>
      <div className="flex items-center justify-center text-3xl" style={{background: e.ea}}>{e.icon}</div>
      <div className="p-5">
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
          <span className="font-syne font-bold text-snow">{e.school}</span>
          <span className="font-mono text-[0.61rem] text-muted">{e.period}</span>
        </div>
        <p className="text-blue font-medium text-[0.8rem] mb-1.5">{e.deg[lang]}</p>
        <p className="text-muted text-[0.79rem] leading-relaxed">{e.det[lang]}</p>
      </div>
    </div>
  );
}

/* ── EDUCATION ──────────────────────────────────────────────── */
function Education({ lang, t }) {
  return (
    <Section id="education">
      <SectionHead tag={t.ed_tag} title="Education &" em="Training"/>
      <div className="flex flex-col gap-4">
        {EDU.map((e,i) => (
          <EducationCard key={i} e={e} i={i} lang={lang} />
        ))}
      </div>
    </Section>
  );
}

/* ── HIRE ME ────────────────────────────────────────────────── */
function HireMe({ lang, t }) {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // 'success' | 'fail'

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xeqbpyny', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Portfolio Contact: ${form.subject}` }),
      });
      setLoading(false);
      if (res.ok) { setForm({ name:'', email:'', subject:'', message:'' }); setModal('success'); }
      else setModal('fail');
    } catch { setLoading(false); setModal('fail'); }
  };

  const inp = "w-full bg-card border border-white/10 rounded-xl px-4 py-3.5 text-black font-outfit text-sm outline-none focus:border-blue/50 focus:ring-[3px] focus:ring-blue/10 placeholder:text-muted transition-all";

  return (
    <>
      <section id="hire" className="py-28 bg-bg">
        <div className="max-w-[720px] mx-auto px-10 text-center">
          <p className="font-mono text-[0.64rem] tracking-[0.2em] text-blue uppercase mb-3 flex items-center justify-center gap-2">
            <span className="block w-5 h-px bg-blue"/>{t.hi_tag}<span className="block w-5 h-px bg-blue"/>
          </p>
          <h2 className="font-syne font-black tracking-tight leading-tight mb-4" style={{fontSize:'clamp(1.9rem,3.8vw,3rem)'}}>
            {t.hi_title.split('Something')[0]}
            <em className="not-italic bg-gradient-to-br from-blue to-purple bg-clip-text text-transparent">
              {t.hi_title.includes('Something') ? `Something${t.hi_title.split('Something')[1]}` : ''}
            </em>
          </h2>
          <p className="text-muted text-[0.97rem] leading-relaxed mb-11">{t.hi_sub}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.59rem] tracking-widest text-muted uppercase">{t.f_name}</label>
                <input className={inp} value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} placeholder="John Doe" required/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.59rem] tracking-widest text-muted uppercase">{t.f_email}</label>
                <input type="email" className={inp} value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} placeholder="john@company.com" required/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.59rem] tracking-widest text-muted uppercase">{t.f_subj}</label>
              <input className={inp} value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))} placeholder="Project enquiry / Full-time role / Freelance" required/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[0.59rem] tracking-widest text-muted uppercase">{t.f_msg}</label>
              <textarea rows={5} className={`${inp} resize-none leading-relaxed`} value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} placeholder="Tell me about your project or opportunity..." required/>
            </div>
            <button type="submit" disabled={loading}
              className="self-end sm:self-end w-full sm:w-auto font-syne font-bold text-sm px-10 py-3.5 rounded-xl bg-gradient-to-br from-blue2 to-blue text-bg border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(99,179,237,.3)] transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2">
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : t.f_send}
            </button>
          </form>
          <p className="font-mono text-[0.62rem] tracking-widest text-muted mt-6">{t.hi_or}</p>
          <div className="flex justify-center gap-3 flex-wrap mt-4">
            {[
              { icon:'✉', label:'louisjoseph131@gmail.com', href:'mailto:louisjoseph131@gmail.com' },
              { icon:'💼', label:'LinkedIn', href:'https://www.linkedin.com/in/louis-udegbue-634558153/' },
              { icon:'🐙', label:'GitHub', href:'https://github.com/Bootstrap02' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 font-mono text-[0.65rem] tracking-wide text-blue border border-blue/28 px-4 py-2 rounded-lg bg-blue/5 hover:bg-blue/15 hover:border-blue hover:-translate-y-0.5 transition-all">
                <span>{l.icon}</span>{l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
          className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-card border border-white/10 rounded-3xl px-10 py-12 max-w-sm w-full text-center shadow-[0_40px_100px_rgba(0,0,0,.7)] animate-[fadeUp_.35s_ease_forwards]">
            <span className="text-5xl block mb-4">{modal === 'success' ? '✅' : '❌'}</span>
            <h3 className="font-syne font-black text-xl mb-2.5 text-snow">
              {modal === 'success' ? t.modal_ok_title : t.modal_fail_title}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-7">
              {modal === 'success' ? t.modal_ok_msg : t.modal_fail_msg}
            </p>
            <button onClick={() => setModal(null)}
              className={`font-syne font-bold text-sm px-8 py-3 rounded-xl border-none cursor-pointer transition-all hover:-translate-y-0.5
                ${modal==='success' ? 'bg-gradient-to-br from-blue2 to-blue text-bg' : 'bg-white/10 text-snow border border-white/15'}`}>
              {modal === 'success' ? t.modal_ok_btn : t.modal_fail_btn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── CONTACT STRIP ──────────────────────────────────────────── */
function Contact({ lang, t }) {
  const [ref, vis] = useReveal();
  return (
    <div id="contact" className="bg-bg2 border-t border-white/10 py-20">
      <div ref={ref} className={`max-w-[1100px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 transition-all duration-500 ${vis?'opacity-100 translate-y-0':'opacity-0 translate-y-5'}`}>
        <div>
          <h3 className="font-syne font-bold text-xl mb-3">{t.ct_title}</h3>
          <p className="text-muted text-sm leading-relaxed mb-5">{t.ct_desc}</p>
          <div className="flex flex-wrap gap-2">
            {['cp_ft','cp_fl','cp_ct','cp_rm','cp_rl'].map(k => (
              <span key={k} className="font-mono text-[0.62rem] tracking-wide text-muted2 border border-white/10 px-3 py-1 rounded-full">{t[k]}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { ico:'📞', lbl:t.ct_ph, val:'+234 704 238 0116', href:'tel:+2347042380116' },
            { ico:'✉️', lbl:t.ct_em, val:'louisjoseph131@gmail.com', href:'mailto:louisjoseph131@gmail.com' },
            { ico:'🐙', lbl:'GitHub', val:'github.com/Bootstrap02', href:'https://github.com/Bootstrap02' },
            { ico:'💼', lbl:'LinkedIn', val:'louisjoseph-634558153', href:'https://www.linkedin.com/in/louis-udegbue-634558153/' },
          ].map(item => (
            <a key={item.lbl} href={item.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-3.5 px-5 py-4 bg-card border border-white/10 rounded-xl hover:border-blue/40 hover:translate-x-1.5 hover:bg-white/[0.03] transition-all">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base bg-blue/10 flex-shrink-0">{item.ico}</div>
              <div>
                <div className="font-mono text-[0.56rem] tracking-widest text-muted uppercase mb-0.5">{item.lbl}</div>
                <div className="text-snow font-medium text-sm">{item.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="text-center py-9 border-t border-white/10 font-mono text-[0.64rem] tracking-widest text-muted">
      <p>Designed & built by <strong className="text-muted2 font-medium">Louis Joseph</strong> · {new Date().getFullYear()}</p>
      <p className="mt-1 opacity-40">React · Node.js · MongoDB · React Native</p>
    </footer>
  );
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="noise">
      <LangBar lang={lang} setLang={setLang}/>
      <Navbar lang={lang} t={t} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Hero lang={lang} t={t}/>
      <Skills lang={lang} t={t}/>
      <Experience lang={lang} t={t}/>
      <Projects lang={lang} t={t}/>
      <Education lang={lang} t={t}/>
      <HireMe lang={lang} t={t}/>
      <Contact lang={lang} t={t}/>
      <Footer/>
    </div>
  );
}