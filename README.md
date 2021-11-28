Cerinte: https://docs.google.com/document/d/1ONe1Wm7C3vDXv-TwnSANb1O5rs8Hv1hSOsMHfMYT3lA/edit#

# Creare Product Feed

Cam asta e rezultatul final, am implementat relativ grosier cerintele, dar sper ca am ajuns destul de departe.

## Ce s-a realizat:

- [x] Server de proxy pt a evita erori de pre-flight CORS.
- [x] UI care se muleaza pe cerinte cu TailwindCSS.
- [x] Proiect in React cu .
- [x] Filtreaza dupa nume fara refresh. _Doar luat individual, fara celelalte filtre._
- [x] Filtreaza dupa dupa marimi, pret, brand si tip de produs fara refresh. _Sort of.Nu exista un join, ci un union._

## Ce se putea face mai bine

- [x] Request-uri impartite in serverul de proxy(_Nu stiu daca se poate, dar dau cu presupusul._) si implicit o restructurare de cod
- [x] UI responsive.
- [x] Finisari de UI.

## Cerinte de rulare

NodeJS instalat global.

## Cum se ruleaza proiectul

Am inclus script-uri de VS Code pentru rulat mai lejer. Doar va duceti in tab-ul "Run and Debug" si ar trebui sa le detecteze. Mai intai trebuie rulate script-urile de instalare si apoi cele de rulare in ordinea asta: proxyServer, apoi client. La final, accesati localhost:3000/products.

## Detalii de dezvoltare

Incep prin a spune ca am vazut ca am eroare de CORS, prin prisma faptului ca browserul Chrome trimite request-uri pre-flight. Nu stiu daca era parte din challenge, dar am facut un server proxy in ExpressJS intrucat nu era prea greu. Cu Tailwindcss nu prea am lucrat, dar sper sa fie acceptabil, chiar daca nu e responsive. Cu NextJS am lucrat putin, dar sper sa fie ok.

Clientul are o functie de incarcare default a NextJS (`getServerSideProps()`) care ia din server-ul de proxy JSON-ul care este impartit in niste array-uri/set-uri. Acestea sunt trecute prin niste functii `Check____()` care manipuleaza logica de checkboxes si array-urile aferente. Acestea ulterior sunt procesate prin functia `intersectArrays()` care desi se numeste "intersect", in mod normal ar trebui sa fie un Join, si de fapt are un Union.

# Optimizare Frontend

As avea grija ca elementele CSS din diverse framework-uri(Bootstrap, TailwindCSS), cat si React sa fie importate individual, pentru a evita import-uri inutile. As avea grija sa reduc din animatii, cat si din clipuri video care ar putea sa fie pe autoplay si sa fie in format WebP lossy (in baza de date, daca se poate - am avea aceleasi clipuri la o sesime din marimea fisierului), iar imaginile de asemenea in format WebP. M-as folosi de NextJS pt. SEO, ca bonus, si as evita react-router-dom in cazul unui astfel de site. Gatsby e mai bun pentru site-uri statice, deci din start nu se potriveste pentru un astfel de task.

Cat despre alte utilitare, Chrome mai are diverse utilitare pe partea de performanta/retea/memorie.

# Style Lookalikes

Cred ca e genul de intrebare la care clientul, dupa un chestionar optional trimis clientilor, dar cat si unul trimis colegelor voastre styliste poate da o mai buna idee de ce cauta clientii la modul general.

Inteleg ca utilizatorul incepe prin a alege un buget, si primeste o oferta in jurul acelui pret, presupun plus-minus.

Primul si primul lucru ar fi brand-ul. Multa lume se uita dupa brand, poate chiar mai mult decat dupa cum arata purtand setul respectiv de haine. Fiecare brand are o audienta in general, aceste brand-uri implicit ar putea fi sortate dupa popularite si categoria de pret(premium, mid, budget) spre profitul firmei, bineinteles.

Alt criteriu principal ar fi bazat pe ce cauta oamenii. Sa zicem ca utilizatorul cauta pe site anumite haine in particular - o anumita geanta, o anumita pereche de pantaloni. Site-ul logheaza ce cauta utilizatorul, si poate inregistra ca fiind parte a preferintelor, pe baza de brand, colectie, model, culoare si pe ce au mai cautat alti oameni cand au ajuns la acel model de imbracaminte.

O alta abordare ar fi ca clientul sa fie intrebat de set-uri de haine care arata aproape identic, dar de la firme diferite, pentru a diferentia anumite produse ca si popularitate. Apoi si un blind test, cu haine, dar fara detalii de brand/pret.

Alte intrebari - "care este bugetul dvs. periodic pt haine", "care sunt firmele preferate de dvs.", si alte detalii legate de daca aceasta persoana cumpara haine doar pentru sine si daca are anumite dimensiuni ce doreste sa le aiba salvate.
