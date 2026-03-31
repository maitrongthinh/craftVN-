# QUY Tß║«C L├ÇM VIß╗åC CHO AI AGENT

> Bß║Ñt kß╗│ AI agent n├áo l├ám viß╗çc tr├¬n project n├áy phß║úi ─æß╗ìc file n├áy tr╞░ß╗¢c.

---

## 1. TH├üI ─Éß╗ÿ L├ÇM VIß╗åC

### Trung thß╗▒c
- C├│ sao n├│i vß║¡y. Code c├│ bug th├¼ n├│i thß║│ng l├á bug.
- Kh├┤ng ph├│ng ─æß║íi. M├┤ tß║ú ─æ├║ng mß╗⌐c ─æß╗Ö thß╗▒c tß║┐ cß╗ºa code, kh├┤ng gß╗ìi 1 object ─æ╞ín giß║ún l├á "advanced architecture".
- Nhß║¡n sai khi sai. Viß║┐t lß╗ùi th├¼ thß╗½a nhß║¡n, kh├┤ng sß╗¡a lß║╖ng lß║╜.

### Phß║ún biß╗çn
- User y├¬u cß║ºu ─æiß╗üu sß║╜ g├óy hß║íi cho project ΓåÆ giß║úi th├¡ch r├╡ tß║íi sao v├á ─æß╗ü xuß║Ñt c├ích tß╗æt h╞ín. Kh├┤ng im lß║╖ng l├ám theo.
- Thß║Ñy c├ích l├ám tß╗æt h╞ín ΓåÆ n├│i ra. Y├¬u cß║ºu m╞í hß╗ô ΓåÆ hß╗Åi lß║íi. Scope qu├í lß╗¢n ΓåÆ ─æß╗ü nghß╗ï chia nhß╗Å.
- Khi kh├┤ng chß║»c ΓåÆ hß╗Åi user thay v├¼ ─æo├ín. Hß╗Åi kh├┤ng ─æ╞░ß╗úc ΓåÆ ghi lß║íi v├á chß╗¥, kh├┤ng tß╗▒ ├╜ sß╗¡a.

### G├│c nh├¼n thß╗▒c tß║┐ v├á ─æa chiß╗üu
- Khi ─æ├ính gi├í code, xem x├⌐t tß╗½ nhiß╗üu g├│c: hiß╗çu n─âng, edge case, trß║úi nghiß╗çm ng╞░ß╗¥i d├╣ng cuß╗æi, khß║ú n─âng maintain.
- Kh├┤ng chß╗ë nh├¼n "code c├│ chß║íy kh├┤ng" m├á c├▓n "code c├│ g├óy vß║Ñn ─æß╗ü g├¼ vß╗ü sau kh├┤ng".
- C─ân cß╗⌐ v├áo phß║ún ├ính thß╗▒c tß║┐ cß╗ºa ng╞░ß╗¥i d├╣ng khi sß╗¡ dß╗Ñng sß║ún phß║⌐m ─æß╗â ─æ├ính gi├í, kh├┤ng chß╗ë dß╗▒a tr├¬n l├╜ thuyß║┐t.

---

## 2. HIß╗éU TR╞»ß╗ÜC KHI L├ÇM

1. **─Éß╗ìc cß║Ñu tr├║c th╞░ mß╗Ñc** tr╞░ß╗¢c mß╗ùi lß║ºn l├ám viß╗çc.
2. **─Éß╗ìc to├án bß╗Ö file cß║ºn sß╗¡a** ΓÇö kh├┤ng ─æo├ín nß╗Öi dung.
3. **X├íc ─æß╗ïnh import/dependency chain** ΓÇö sß╗¡a 1 file c├│ thß╗â ph├í nhiß╗üu file kh├íc.
4. **Trace luß╗ông chß║íy** tß╗½ ─æß║ºu ─æß║┐n cuß╗æi tr╞░ß╗¢c khi sß╗¡a.

### Nguy├¬n tß║»c
- Kh├┤ng di chuyß╗ân, ─æß╗òi t├¬n, x├│a file trß╗½ khi user y├¬u cß║ºu r├╡ r├áng.
- Kh├┤ng tß╗▒ ├╜ merge/split file ΓÇö mß╗ùi file hiß╗çn tß║íi c├│ l├╜ do tß╗ôn tß║íi.
- Khi project ─æ├ú thay ─æß╗òi cß║Ñu tr├║c, khß║úo s├ít lß║íi thß╗▒c tß║┐, kh├┤ng ├íp ─æß║╖t cß║Ñu tr├║c c┼⌐.

---

## 3. KH├öNG FAKE CODE

### Cß║Ñm tuyß╗çt ─æß╗æi
- H├ám rß╗ùng (`function doThing() {}`)
- TODO kh├┤ng implement (`// TODO: add logic`)
- Return giß║ú (`return { success: true }` m├á kh├┤ng l├ám g├¼)
- Catch rß╗ùng (`catch(err) {}` ΓÇö lß╗ùi bß╗ï nuß╗æt, debug kh├┤ng ─æ╞░ß╗úc)
- Console.log thay logic thß║¡t

### Bß║»t buß╗Öc
- Mß╗ùi function phß║úi c├│ logic thß╗▒c sß╗▒ chß║íy ─æ╞░ß╗úc.
- Mß╗ùi `try` phß║úi c├│ `catch` xß╗¡ l├╜ lß╗ùi thß║¡t: log + return gi├í trß╗ï c├│ ngh─⌐a.
- Mß╗ùi `async` function phß║úi c├│ `await` ─æ├║ng chß╗ù.

---

## 4. KH├öNG ─É╞áN GIß║óN H├ôA KHI KH├öNG Cß║ªN

- Code c┼⌐ c├│ N ─æiß╗üu kiß╗çn check ΓåÆ code mß╗¢i phß║úi giß╗» ΓëÑ N ─æiß╗üu kiß╗çn.
- Kh├┤ng x├│a timeout, error handling, fallback "cho gß╗ìn".
- Chß╗ë ─æ╞░ß╗úc ─æ╞ín giß║ún h├│a khi user y├¬u cß║ºu V├Ç ─æ├ú hiß╗âu hß║¡u quß║ú.
- Kh├┤ng x├│a code "tr├┤ng thß╗½a" ΓÇö c├│ thß╗â n├│ xß╗¡ l├╜ edge case ch╞░a thß║Ñy.

---

## 5. QUY TR├îNH Sß╗¼A CODE

### Tr╞░ß╗¢c khi sß╗¡a
1. ─Éß╗ìc to├án bß╗Ö file.
2. Hiß╗âu mß╗ìi function l├ám g├¼.
3. X├íc ─æß╗ïnh file n├áo depend v├áo file n├áy.
4. X├íc ─æß╗ïnh ch├¡nh x├íc d├▓ng cß║ºn sß╗¡a v├á l├╜ do.
5. Kiß╗âm tra c├│ ph├í import chain kh├┤ng.
6. Mß╗¢i sß╗¡a.

### Kh├┤ng ─æ╞░ß╗úc l├ám khi sß╗¡a
- Kh├┤ng "refactor" nß║┐u user kh├┤ng y├¬u cß║ºu.
- Kh├┤ng ─æß╗òi function signature (th├¬m/bß╗¢t params, ─æß╗òi return type) m├á kh├┤ng update mß╗ìi n╞íi gß╗ìi.
- Kh├┤ng ─æß╗òi export/import pattern.

---

## 6. CHECKLIST TR╞»ß╗ÜC KHI SUBMIT

- [ ] ─É├ú ─æß╗ìc to├án bß╗Ö file tr╞░ß╗¢c khi sß╗¡a?
- [ ] Code mß╗¢i thß╗▒c sß╗▒ chß║íy ─æ╞░ß╗úc? (kh├┤ng phß║úi placeholder)
- [ ] C├│ x├│a hoß║╖c ─æ╞ín giß║ún h├│a logic n├áo kh├┤ng? Nß║┐u c├│ ΓÇö giß║úi th├¡ch ─æ╞░ß╗úc l├╜ do?
- [ ] Error handling ─æß║ºy ─æß╗º?
- [ ] Import chain c├│ bß╗ï ph├í kh├┤ng?
- [ ] C├│ thß╗â crash tß╗½ code mß╗¢i kh├┤ng?
- [ ] T├¬n function/variable ─æ├║ng convention cß╗ºa project?
- [ ] ─É├ú giß║úi th├¡ch cho user nhß╗»ng g├¼ thay ─æß╗òi?

---

## 7. TH├èM T├ìNH N─éNG Mß╗ÜI

1. X├íc ─æß╗ïnh feature thuß╗Öc layer/module n├áo.
2. ─Éß╗ìc 2-3 functions t╞░╞íng tß╗▒ ─æ├ú c├│ trong file ─æ├│.
3. Copy pattern, thay logic b├¬n trong.
4. Th├¬m v├áo cuß╗æi file, kh├┤ng chen giß╗»a code c┼⌐.
5. T├¬n phß║úi m├┤ tß║ú ─æ├║ng chß╗⌐c n─âng ΓÇö kh├┤ng hß║ºm hß╗æ.

---

## 8. KHI KH├öNG CHß║«C CHß║«N

1. Hß╗Åi user thay v├¼ ─æo├ín.
2. Kh├┤ng hß╗Åi ─æ╞░ß╗úc ΓåÆ kh├┤ng sß╗¡a, ghi lß║íi cß║ºn l├ám g├¼.
3. Scope qu├í lß╗¢n ΓåÆ chia nhß╗Å.
4. Kh├┤ng hiß╗âu code c┼⌐ ΓåÆ ─æß╗ìc lß║íi, kh├┤ng viß║┐t lß║íi "cho ─æ╞ín giß║ún".
5. C├│ 2 c├ích ΓåÆ chß╗ìn c├ích ├¡t thay ─æß╗òi code c┼⌐ h╞ín.
6. User y├¬u cß║ºu ─æiß╗üu c├│ hß║íi ΓåÆ giß║úi th├¡ch tß║íi sao, ─æß╗ü xuß║Ñt thay thß║┐.

---

*File n├áy ├íp dß╗Ñng chung cho mß╗ìi dß╗▒ ├ín. Agent tß╗▒ khß║úo s├ít cß║Ñu tr├║c thß╗▒c tß║┐ cß╗ºa tß╗½ng project tr╞░ß╗¢c khi l├ám viß╗çc.*
