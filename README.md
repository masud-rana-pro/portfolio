# Md. Masud Rana Portfolio

Static, responsive portfolio hosted with GitHub Pages.

- Live site: https://masud-rana-pro.github.io/portfolio/
- Main page: `index.html`
- Design: `assets/css/style.css`
- Interaction: `assets/js/script.js`
- Profile image: `assets/img/masud-rana.jpg`
- Downloadable CV: `assets/cv/Md_Masud_Rana_CV.pdf`

## সহজে Portfolio Edit করার নিয়ম

### 1. নিজের তথ্য বা লেখা পরিবর্তন

`index.html` file খুলুন। তারপর editor-এর search (`Ctrl + F`) দিয়ে বর্তমান লেখা খুঁজে পরিবর্তন করুন।

- Navbar: `<header id="top">`
- Hero/name/title: `<section id="home">`
- About: `<section id="about">`
- Education: `<section id="education">`
- Skills: `<section id="skills">`
- Projects: `<section id="projects">`
- Certifications: `<section id="certifications">`
- Research/languages: `<section id="research">`
- References: `<section id="references">`
- Contact: `<section id="contact">`
- Footer: `<footer>`

### 2. Project link বা video link যোগ

`index.html`-এ project-এর নাম search করুন। Placeholder text-এর জায়গায় এই format ব্যবহার করুন:

```html
<a href="https://your-video-link.com" target="_blank" rel="noopener">Watch Video ↗</a>
```

GitHub link-এর জন্য:

```html
<a href="https://github.com/your-repository" target="_blank" rel="noopener">GitHub ↗</a>
```

### 3. Profile image পরিবর্তন

নতুন image-কে `masud-rana.jpg` নাম দিয়ে এই file replace করুন:

`assets/img/masud-rana.jpg`

একই filename রাখলে HTML edit করতে হবে না।

### 4. Reference photo যোগ

ছবি দুটি এখানে রাখুন:

- `assets/img/reference-moshaidul.jpg`
- `assets/img/reference-maruf.jpg`

তারপর `index.html`-এর reference card-এ থাকা initials `<span>MI</span>` / `<span>MH</span>` সরিয়ে পাশের HTML comment-এ দেওয়া `<img>` code ব্যবহার করুন।

### 5. Final CV পরিবর্তন

নতুন PDF-কে ঠিক এই নামে রাখুন:

`assets/cv/Md_Masud_Rana_CV.pdf`

পুরোনো PDF replace করলেই Navbar, Hero এবং Contact-এর তিনটি download button নতুন CV download করবে।

### 6. Color ও design পরিবর্তন

`assets/css/style.css` file-এর শুরুতে `:root` section আছে। প্রধান color variables:

```css
--bg: #07100d;
--bg2: #0b1511;
--card: #101d18;
--text: #f7faf8;
--muted: #9baaa2;
--cyan: #34d27b;
--blue: #a3d64a;
--purple: #f4a340;
```

শুধু এই values পরিবর্তন করলেই পুরো site-এর theme বদলে যাবে।

### 7. Animation বা mobile menu পরিবর্তন

`assets/js/script.js` থেকে mobile menu, scroll reveal, active navigation এবং animated job titles নিয়ন্ত্রণ করা হয়। `roles` array edit করে animated title পরিবর্তন করুন:

```js
const roles = ['Full Stack Developer', 'Spring Boot Developer'];
```

### 8. পরিবর্তন GitHub-এ প্রকাশ

Project folder-এ terminal খুলে চালান:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages সাধারণত 1-3 মিনিটের মধ্যে live site update করে। পুরোনো version দেখালে `Ctrl + F5` চাপুন।

## গুরুত্বপূর্ণ সতর্কতা

- File বা folder-এর নাম অকারণে পরিবর্তন করবেন না।
- HTML tag-এর `<`, `>`, closing tag বা quotation marks যেন মুছে না যায়।
- পরিবর্তনের আগে backup বা Git commit রাখুন।
- ছবি web-friendly JPG/WebP এবং PDF compressed রাখলে site দ্রুত load হবে।
