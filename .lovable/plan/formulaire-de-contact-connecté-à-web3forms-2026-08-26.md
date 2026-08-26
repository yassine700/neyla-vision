# Formulaire de contact connecté à Web3Forms

Le formulaire de devis affiche aujourd'hui seulement un toast de succès : aucun message ne part réellement. On le connecte à Web3Forms pour que chaque demande arrive par e-mail.

## Ce qui change

- Envoi réel des demandes via Web3Forms (clé d'accès intégrée côté client, comme prévu).
- Objet de l'e-mail : « 🎯 Nouvelle demande de devis — Neyla Production », expéditeur « Neyla Production Web », réponse directe possible à l'e-mail du visiteur.
- Champs : Nom complet (requis), E-mail (requis), Téléphone / WhatsApp (requis), Sujet (requis), Votre projet (requis).
- Protection anti-spam par champ caché (honeypot `botcheck`).
- États d'envoi : bouton désactivé + libellé « Envoi en cours… », toast de succès (« Message envoyé ») ou d'erreur (« Échec de l'envoi, réessayez ou appelez-nous »), remise à zéro du formulaire après succès.
- Style conservé/harmonisé avec le thème sombre du site (carte sombre, bordures fines, accent rouge sur les erreurs et le bouton).

## Détails techniques

- Fichier : `src/components/shared/ContactForm.tsx` (utilisé sur `/` et `/contact`) — pas de changement de route ni de données.
- POST JSON vers `https://api.web3forms.com/submit` avec `access_key`, `subject`, `from_name`, `botcheck`, et les champs du formulaire ; en-têtes `Content-Type` et `Accept` en `application/json`.
- Validation client avant envoi : nom ≥ 2 caractères, e-mail au format valide, téléphone et sujet non vides, message ≥ 10 caractères, avec limites de longueur (255 pour les champs courts, 2000 pour le message) et `trim`.
- Gestion d'erreur : réponse `success !== true` ou exception réseau → toast d'erreur, champs conservés.
- Aucune donnée sensible n'est journalisée ; la clé Web3Forms est une clé publique de formulaire.
