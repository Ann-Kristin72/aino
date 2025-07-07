# Test Bilde-konvertering

Dette er en test for å verifisere at bilde-URL-er konverteres riktig til Azure Blob Storage.

## Test 1: Lokale bilder

Her er et bilde med lokal referanse:

![Test bilde](./img/test-bilde.png)

## Test 2: Gamle Skillaid-referanser

Her er et bilde med gammel Skillaid-referanse:

![Skillaid bilde](img/skillaid-bilde.jpg)

## Test 3: Relative stier

Her er et bilde med relativ sti:

![Relativt bilde](../images/relativt-bilde.png)

## Test 4: Eksisterende Azure URL

Her er et bilde som allerede peker til Azure:

![Azure bilde](https://ainomedia.blob.core.windows.net/aino-media/azure-bilde.png)

## Test 5: Fullstendig URL

Her er et bilde med fullstendig URL:

![Fullstendig bilde](https://example.com/bilde.png)

## Test 6: HTML img tag

Her er en HTML img-tag:

<img src="./img/html-bilde.png" alt="HTML bilde" width="300" height="200">

## Test 7: Background image

Her er en div med background-image:

<div style="background-image: url('./img/background-bilde.jpg'); height: 200px; background-size: cover;">
  Dette er en div med background-image
</div> 