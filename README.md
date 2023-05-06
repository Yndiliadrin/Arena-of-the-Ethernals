# Arena-of-the-Ethernals

## Elindítás

Két féle képpen lehet elindítani az alkalmazást

- Amennyiben rendelkezésre áll **Docker** + **docker-compose** (és a gép tud Bash scriptet futtatni):
  - A .env.pattern fájból készíteni egy másolatot és `.env`-re átnevezni
  - A .env fájlban kitölteni a megadott értékeket
  - Futtatni a `bash start.sh {dev, prod} up` parancsot (frontend, backend, database, reverse-proxy servicek)
    - `dev`: Development módban indítja el az alkalmazást
    - `prod`: Production módban indítja el az alkalmazást
  - Az alkalmazás a **localhost:80**-on lesz elérhető
- A `standalone` nevezetű mappából is el lehet indítani az alkalmazást. Ebben az esetben az alkalmazás Atlas cloud database-t használ.
  - A .env.pattern fájból készíteni egy másolatot és `.env`-re átnevezni
  - A .env fájlban kitölteni a megadott értékeket
  - Futtatni kell az `npm run build` majd az `npm run start` parancsokat
  - Az alkalmazás a **localhost:3000**-en lesz elérhető.