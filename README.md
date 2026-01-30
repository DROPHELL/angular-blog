# Angular Blog – Projekt zaliczeniowy

## Opis projektu

**Angular Blog** to pełnoprawna aplikacja blogowa stworzona w technologii **Angular** (frontend) oraz **Node.js + Express + MongoDB** (backend).

Aplikacja umożliwia:
- rejestrację i logowanie użytkowników  
- dodawanie, edycję i usuwanie postów 
- system komentarzy  
- polubienia i ocenianie postów  
- dodatkowe funkcjonalności rozszerzające wymagania laboratoriów  

Projekt został zrealizowany w ramach przedmiotu **Technologie aplikacji webowych**.

---

##  Wymagania systemowe

Do uruchomienia projektu wymagane są:

- **Node.js** (wersja 18 lub nowsza)
- **npm**
- **MongoDB** (lokalne lub MongoDB Atlas)
- **Angular CLI**

---

## Instrukcja uruchomienia projektu

### Backend (API – Node.js + Express + MongoDB)

1. Przejdź do katalogu backendu:
   ```bash
   cd server
2. Zainstaluj zależności:
   ```bash
   npm install
3. Utwórz plik .env w katalogu server i uzupełnij go:
   ```bash
   PORT=4000
   JWT_SECRET=super_secret_key
   MONGODB_URI=your_mongodb_connection_string
4. Uruchom serwer:
   ```bash
   npx ts-node server.ts
   
5. Backend będzie dostępny pod adresem:
   ```bash
   http://localhost:4000
### Frontend (Angular)
1. W nowym terminalu przejdź do katalogu głównego projektu:
   ```bash
   cd ../
2. Zainstaluj zależności:
   ```bash
   npm install
3. Uruchom aplikację Angular:
   ```bash
   ng serve
4. Aplikacja frontendowa będzie dostępna pod adresem:
   ```bash
   http://localhost:4200
### Funkcjonalności aplikacji
- Funkcjonalności podstawowe (laboratoria)
Rejestracja użytkownika

- Logowanie i wylogowanie (JWT)

- Dodawanie nowych postów

- Wyświetlanie listy postów

- Strona szczegółów posta

- Paginacja postów

- Edycja i usuwanie postów (tylko autor)

- Profil użytkownika

- Edycja danych profilu

- System komentarzy

- Usuwanie własnych komentarzy

- Ochrona tras (AuthGuard)

- HTTP Interceptor (JWT)

### Funkcjonalności dodatkowe (rozszerzenia projektu)
- System polubień (like / unlike)

- System ulubionych postów (localStorage)

- Wyszukiwanie postów po nazwie

- Tryb jasny / ciemny 

- System ocen postów (rating)

- Responsywny interfejs (Bootstrap)
### Autorska funkcjonalność
Zaimplementowano autorską funkcjonalność analizy aktywności posta, prezentującą liczbę polubień, ocen oraz komentarzy, co pozwala użytkownikom ocenić popularność i zaangażowanie społeczności wokół danego posta.
