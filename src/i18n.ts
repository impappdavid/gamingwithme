// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Search between all users...": "Search between all users...",
          "ABOUT US": "About us",
          "HOW IT WORKS?": "How it works?",
          "DOWNLOAD": "Download",
          "NEWS": "News",
          "Categories": "Categories",
          "Just Chatting": "Just Chatting",
          "Gamers": "Gamers",
          "Music": "Music",
          "No just chatting users yet.": "No just chatting users yet.",
          "No gamers yet.": "No gamers yet.",
          "BOOK": "Book",
          "No musicians yet": "No musicians yet.",
          "No tiktokers yet.": "No tiktokers yet.",
          "No youtubers yet.": "No youtubers yet.",
          "Games": "Games",
          "View all": "View all",
          "All rights reserved.": "All rights reserved.",
          "Follow Us": "Follow Us",
          "Quick Links": "Quick Links",
          "Terms and Conditions": "Terms and Conditions",
          "Support": "Support",
          "Search for players or tags": "Search for players or tags",
          "No users found": "No users found",
          "Try adjusting your search criteria or filters to find more users.": "Try adjusting your search criteria or filters to find more users.",
          "Search for games...": "Search for games...",
          "Become a creator": "Become a creator",
          "Continue setup": "Continue setup",
          "Create listing": "Create listing",
          "Create service": "Create service",
          "Events": "Events",
          "Easter eggs": "Easter eggs",
          "Notifications": "Notifications",
          "Profile": "Profile",
          "Settings": "Settings",
          "Log out": "Log out",
          "Duration": "Duration",
          "Price": "Price",
          "Create Service": "Create Service",
          "Create New Service": "Create New Service",
          "day": "day",
          "Edit": "Edit",
          "Delete": "Delete",
          "Add Service": "Add Service",
          "Please fill all the inputs.": "Please fill all the inputs.",
          "Enter service title": "Enter service title",
          "Enter service description": "Enter service description",
          "Deadline(day)": "Deadline (day)",
          "Cancel": "Cancel",
          "Save changes": "Save changes",
          "Edit Service": "Edit Service",
          "You can update your service details here.": "You can update your service details here.",
          "Services": "Services",
          "General": "General",
          "Upcoming bookings": "Upcoming bookings",
          "Billing history": "Billing history",
          "Coupons": "Coupons",
          "Security": "Security",
          "Danger": "Danger",
          "Tags": "Tags",
          "Languages": "Languages",
          "Username": "Username",
          "Update": "Update",
          "Twitter profile link": "Twitter profile link",
          "Instagram profile link": "Instagram profile link",
          "Facebook profile link": "Facebook profile link",
          "Update Socials": "Update Socials",
          "Bio": "Bio",
          "Tell us about yourself": "Tell us about yourself",
          "Game tags": "Game tags",
          "Search games...": "Search games...",
          "Search by username": "Search by username",
          "No upcoming transactions or services.": "No upcoming transactions or services.",
          "You don't have any billing or service history.": "You don't have any billing or service history.",
          "Create coupon": "Create coupon",
          "Create New Coupon": "Create New Coupon",
          "Suggestion: Dont apply more then 80%": "Suggestion: Don't apply more than 80%",
          "Add Coupon": "Add Coupon",
          "Enter coupon name": "Enter coupon name",
          "Percent": "Percent",
          "Duration(day)": "Duration (day)",
          "Max redeem": "Max redeem",
          "Change Password": "Change Password",
          "Current Password": "Current Password",
          "New Password": "New Password",
          "Update Password": "Update Password",
          "Delete account": "Delete account",
          "Are you sure you want to delete your account?": "Are you sure you want to delete your account?",
          "Name": "Name",
          "Description": "Description",
          "Add game": "Add game",
          "Game Name": "Game Name",
          "Enter game name": "Enter game name",
          "Enter game description": "Enter game description",
          "Title": "Title",
          "Content": "Content",
          "Add news": "Add news",
          "Prize Pool": "Prize Pool",
          "Location": "Location",
          "Add Event": "Add Event",
          "Add Easter Egg": "Add Easter Egg",
          "No easter eggs yet.": "No easter eggs yet.",
          "No events yet.": "No events yet.",
          "No news yet.": "No news yet.",
          "English": "English",
          "Hungary": "Hungary",
          "Deutsch": "Deutsch",
          "Spanish": "Spanish"
        }
      },
      hu: {
        translation: {
          "Home": "Kezdőlap",
          "Search between all users...": "Keresés az összes felhasználó között...",
          "ABOUT US": "Rólunk",
          "HOW IT WORKS?": "Hogyan működik?",
          "DOWNLOAD": "Letöltés",
          "NEWS": "Hírek",
          "Categories": "Kategóriák",
          "Just Chatting": "Csevegés",
          "Gamers": "Játékosok",
          "Music": "Zene",
          "No just chatting users yet.": "Még nincs csevegő felhasználó.",
          "No gamers yet.": "Még nincs játékos.",
          "BOOK": "Foglalás",
          "No musicians yet": "Még nincs zenész.",
          "No tiktokers yet.": "Még nincs TikTok felhasználó.",
          "No youtubers yet.": "Még nincs YouTube felhasználó.",
          "Games": "Játékok",
          "View all": "Összes megtekintése",
          "All rights reserved.": "Minden jog fenntartva.",
          "Follow Us": "Kövessen minket",
          "Quick Links": "Gyors linkek",
          "Terms and Conditions": "Felhasználási feltételek",
          "Support": "Támogatás",
          "Search for players or tags": "Keresés játékosokra vagy címkékre",
          "No users found": "Nem található felhasználó",
          "Try adjusting your search criteria or filters to find more users.": "Próbálja meg módosítani a keresési feltételeket vagy szűrőket.",
          "Search for games...": "Játékokra keresés...",
          "Become a creator": "Légy alkotó",
          "Continue setup": "Beállítás folytatása",
          "Create listing": "Listázás létrehozása",
          "Create service": "Szolgáltatás létrehozása",
          "Events": "Események",
          "Easter eggs": "Rejtett poénok",
          "Notifications": "Értesítések",
          "Profile": "Profil",
          "Settings": "Beállítások",
          "Log out": "Kijelentkezés",
          "Duration": "Időtartam",
          "Price": "Ár",
          "Create Service": "Szolgáltatás létrehozása",
          "Create New Service": "Új szolgáltatás létrehozása",
          "day": "nap",
          "Edit": "Szerkesztés",
          "Delete": "Törlés",
          "Add Service": "Szolgáltatás hozzáadása",
          "Please fill all the inputs.": "Kérjük, töltsön ki minden mezőt.",
          "Enter service title": "Szolgáltatás címének megadása",
          "Enter service description": "Szolgáltatás leírásának megadása",
          "Deadline(day)": "Határidő (nap)",
          "Cancel": "Mégsem",
          "Save changes": "Változtatások mentése",
          "Edit Service": "Szolgáltatás szerkesztése",
          "You can update your service details here.": "Itt frissítheted a szolgáltatás részleteit.",
          "Services": "Szolgáltatások",
          "General": "Általános",
          "Upcoming bookings": "Közelgő foglalások",
          "Billing history": "Számlázási előzmények",
          "Coupons": "Kuponok",
          "Security": "Biztonság",
          "Danger": "Veszély",
          "Tags": "Címkék",
          "Languages": "Nyelvek",
          "Username": "Felhasználónév",
          "Update": "Frissítés",
          "Twitter profile link": "Twitter profil link",
          "Instagram profile link": "Instagram profil link",
          "Facebook profile link": "Facebook profil link",
          "Update Socials": "Közösségi módosítás",
          "Bio": "Bemutatkozás",
          "Tell us about yourself": "Mesélj magadról",
          "Game tags": "Játék címkék",
          "Search games...": "Keresés játékokra...",
          "Search by username": "Felhasználónév alapján keresés",
          "No upcoming transactions or services.": "Nincs közelgő tranzakció vagy szolgáltatás.",
          "You don't have any billing or service history.": "Nincs számlázási vagy szolgáltatás előzménye.",
          "Create coupon": "Kupon létrehozása",
          "Create New Coupon": "Új kupon létrehozása",
          "Suggestion: Dont apply more then 80%": "Javaslat: Ne adj meg 80%-nál többet",
          "Add Coupon": "Kupon hozzáadása",
          "Enter coupon name": "Kupon nevét add meg",
          "Percent": "Százalék",
          "Duration(day)": "Időtartam (nap)",
          "Max redeem": "Maximális beváltás",
          "Change Password": "Jelszó módosítása",
          "Current Password": "Jelenlegi jelszó",
          "New Password": "Új jelszó",
          "Update Password": "Jelszó frissítése",
          "Delete account": "Fiók törlése",
          "Are you sure you want to delete your account?": "Biztosan törölni szeretnéd a fiókodat?",
          "Name": "Név",
          "Description": "Leírás",
          "Add game": "Játék hozzáadása",
          "Game Name": "Játék neve",
          "Enter game name": "Add meg a játék nevét",
          "Enter game description": "Add meg a játék leírását",
          "Title": "Cím",
          "Content": "Tartalom",
          "Add news": "Hír hozzáadása",
          "Prize Pool": "Nyereményalap",
          "Location": "Helyszín",
          "Add Event": "Esemény hozzáadása",
          "Add Easter Egg": "Rejtett poén hozzáadása",
          "No easter eggs yet.": "Még nincs rejtett poén.",
          "No events yet.": "Még nincs esemény.",
          "No news yet.": "Még nincs hír.",
          "English": "Angol",
          "Hungary": "Magyar",
          "Deutsch": "Német",
          "Spanish": "Spanyol"
        }
      },
      de: {
        translation: {
          "Home": "Home",
          "Search between all users...": "Suche unter allen Benutzern...",
          "ABOUT US": "Über uns",
          "HOW IT WORKS?": "Wie funktioniert es?",
          "DOWNLOAD": "Download",
          "NEWS": "Neuigkeiten",
          "Categories": "Kategorien",
          "Just Chatting": "Nur chatten",
          "Gamers": "Gamer",
          "Music": "Musik",
          "No just chatting users yet.": "Noch keine Chat-Benutzer.",
          "No gamers yet.": "Noch keine Gamer.",
          "BOOK": "Buchen",
          "No musicians yet": "Noch keine Musiker.",
          "No tiktokers yet.": "Noch keine TikToker.",
          "No youtubers yet.": "Noch keine YouTuber.",
          "Games": "Spiele",
          "View all": "Alle anzeigen",
          "All rights reserved.": "Alle Rechte vorbehalten.",
          "Follow Us": "Folge uns",
          "Quick Links": "Schnellzugriff",
          "Terms and Conditions": "AGB",
          "Support": "Support",
          "Search for players or tags": "Suche nach Spielern oder Tags",
          "No users found": "Keine Benutzer gefunden",
          "Try adjusting your search criteria or filters to find more users.": "Versuchen Sie, Ihre Suchkriterien oder Filter anzupassen, um mehr Benutzer zu finden.",
          "Search for games...": "Nach Spielen suchen...",
          "Become a creator": "Ersteller werden",
          "Continue setup": "Setup fortsetzen",
          "Create listing": "Anzeige erstellen",
          "Create service": "Dienst erstellen",
          "Events": "Events",
          "Easter eggs": "Easter Eggs",
          "Notifications": "Benachrichtigungen",
          "Profile": "Profil",
          "Settings": "Einstellungen",
          "Log out": "Abmelden",
          "Duration": "Dauer",
          "Price": "Preis",
          "Create Service": "Dienst erstellen",
          "Create New Service": "Neuen Dienst erstellen",
          "day": "Tag",
          "Edit": "Bearbeiten",
          "Delete": "Löschen",
          "Add Service": "Dienst hinzufügen",
          "Please fill all the inputs.": "Bitte alle Felder ausfüllen.",
          "Enter service title": "Diensttitel eingeben",
          "Enter service description": "Dienstbeschreibung eingeben",
          "Deadline(day)": "Frist (Tag)",
          "Cancel": "Abbrechen",
          "Save changes": "Änderungen speichern",
          "Edit Service": "Dienst bearbeiten",
          "You can update your service details here.": "Hier können Sie die Details Ihres Dienstes aktualisieren.",
          "Services": "Dienste",
          "General": "Allgemein",
          "Upcoming bookings": "Bevorstehende Buchungen",
          "Billing history": "Rechnungsverlauf",
          "Coupons": "Gutscheine",
          "Security": "Sicherheit",
          "Danger": "Gefahr",
          "Tags": "Tags",
          "Languages": "Sprachen",
          "Username": "Benutzername",
          "Update": "Aktualisieren",
          "Twitter profile link": "Twitter Profil-Link",
          "Instagram profile link": "Instagram Profil-Link",
          "Facebook profile link": "Facebook Profil-Link",
          "Update Socials": "Soziale Profile aktualisieren",
          "Bio": "Biografie",
          "Tell us about yourself": "Erzähl uns über dich",
          "Game tags": "Spiel-Tags",
          "Search games...": "Nach Spielen suchen...",
          "Search by username": "Nach Benutzername suchen",
          "No upcoming transactions or services.": "Keine anstehenden Transaktionen oder Dienste.",
          "You don't have any billing or service history.": "Sie haben noch keine Rechnungs- oder Diensthistorie.",
          "Create coupon": "Gutschein erstellen",
          "Create New Coupon": "Neuen Gutschein erstellen",
          "Suggestion: Dont apply more then 80%": "Tipp: Nicht mehr als 80% anwenden",
          "Add Coupon": "Gutschein hinzufügen",
          "Enter coupon name": "Gutscheinnamen eingeben",
          "Percent": "Prozent",
          "Duration(day)": "Dauer (Tag)",
          "Max redeem": "Max. Einlösungen",
          "Change Password": "Passwort ändern",
          "Current Password": "Aktuelles Passwort",
          "New Password": "Neues Passwort",
          "Update Password": "Passwort aktualisieren",
          "Delete account": "Konto löschen",
          "Are you sure you want to delete your account?": "Möchten Sie Ihr Konto wirklich löschen?",
          "Name": "Name",
          "Description": "Beschreibung",
          "Add game": "Spiel hinzufügen",
          "Game Name": "Spielname",
          "Enter game name": "Spielname eingeben",
          "Enter game description": "Spielbeschreibung eingeben",
          "Title": "Titel",
          "Content": "Inhalt",
          "Add news": "Neuigkeit hinzufügen",
          "Prize Pool": "Preispool",
          "Location": "Ort",
          "Add Event": "Event hinzufügen",
          "Add Easter Egg": "Easter Egg hinzufügen",
          "No easter eggs yet.": "Noch keine Easter Eggs.",
          "No events yet.": "Noch keine Events.",
          "No news yet.": "Noch keine Neuigkeiten.",
          "English": "Englisch",
          "Hungary": "Ungarisch",
          "Deutsch": "Deutsch",
          "Spanish": "Spanisch"
        }
      },
      sp: {
        translation: {
          "Home": "Página principal",
          "Search between all users...": "Buscar entre todos los usuarios...",
          "ABOUT US": "Sobre nosotros",
          "HOW IT WORKS?": "¿Cómo funciona?",
          "DOWNLOAD": "Descargar",
          "NEWS": "Noticias",
          "Categories": "Categorías",
          "Just Chatting": "Chateando",
          "Gamers": "Gamers",
          "Music": "Música",
          "No just chatting users yet.": "Aún no hay usuarios de chat.",
          "No gamers yet.": "Aún no hay gamers.",
          "BOOK": "Reservar",
          "No musicians yet": "Aún no hay músicos",
          "No tiktokers yet.": "Aún no hay tiktokers.",
          "No youtubers yet.": "Aún no hay youtubers.",
          "Games": "Juegos",
          "View all": "Ver todo",
          "All rights reserved.": "Todos los derechos reservados.",
          "Follow Us": "Síguenos",
          "Quick Links": "Enlaces rápidos",
          "Terms and Conditions": "Términos y condiciones",
          "Support": "Soporte",
          "Search for players or tags": "Buscar jugadores o etiquetas",
          "No users found": "No se encontraron usuarios",
          "Try adjusting your search criteria or filters to find more users.": "Intenta ajustar tus criterios de búsqueda o filtros para encontrar más usuarios.",
          "Search for games...": "Buscar juegos...",
          "Become a creator": "Conviértete en creador",
          "Continue setup": "Continuar configuración",
          "Create listing": "Crear anuncio",
          "Create service": "Crear servicio",
          "Events": "Eventos",
          "Easter eggs": "Easter eggs",
          "Notifications": "Notificaciones",
          "Profile": "Perfil",
          "Settings": "Ajustes",
          "Log out": "Cerrar sesión",
          "Duration": "Duración",
          "Price": "Precio",
          "Create Service": "Crear servicio",
          "Create New Service": "Crear nuevo servicio",
          "day": "día",
          "Edit": "Editar",
          "Delete": "Eliminar",
          "Add Service": "Agregar servicio",
          "Please fill all the inputs.": "Por favor, completa todos los campos.",
          "Enter service title": "Ingresa el título del servicio",
          "Enter service description": "Ingresa la descripción del servicio",
          "Deadline(day)": "Plazo (día)",
          "Cancel": "Cancelar",
          "Save changes": "Guardar cambios",
          "Edit Service": "Editar servicio",
          "You can update your service details here.": "Aquí puedes actualizar los detalles de tu servicio.",
          "Services": "Servicios",
          "General": "General",
          "Upcoming bookings": "Reservas próximas",
          "Billing history": "Historial de facturación",
          "Coupons": "Cupones",
          "Security": "Seguridad",
          "Danger": "Peligro",
          "Tags": "Etiquetas",
          "Languages": "Idiomas",
          "Username": "Nombre de usuario",
          "Update": "Actualizar",
          "Twitter profile link": "Enlace de perfil de Twitter",
          "Instagram profile link": "Enlace de perfil de Instagram",
          "Facebook profile link": "Enlace de perfil de Facebook",
          "Update Socials": "Actualizar redes sociales",
          "Bio": "Biografía",
          "Tell us about yourself": "Cuéntanos sobre ti",
          "Game tags": "Etiquetas de juegos",
          "Search games...": "Buscar juegos...",
          "Search by username": "Buscar por nombre de usuario",
          "No upcoming transactions or services.": "No hay transacciones o servicios próximos.",
          "You don't have any billing or service history.": "No tienes historial de servicios o facturación.",
          "Create coupon": "Crear cupón",
          "Create New Coupon": "Crear nuevo cupón",
          "Suggestion: Dont apply more then 80%": "Sugerencia: No aplicar más del 80%",
          "Add Coupon": "Agregar cupón",
          "Enter coupon name": "Ingresa el nombre del cupón",
          "Percent": "Porcentaje",
          "Duration(day)": "Duración (día)",
          "Max redeem": "Máximo canje",
          "Change Password": "Cambiar contraseña",
          "Current Password": "Contraseña actual",
          "New Password": "Nueva contraseña",
          "Update Password": "Actualizar contraseña",
          "Delete account": "Eliminar cuenta",
          "Are you sure you want to delete your account?": "¿Estás seguro de que quieres eliminar tu cuenta?",
          "Name": "Nombre",
          "Description": "Descripción",
          "Add game": "Agregar juego",
          "Game Name": "Nombre del juego",
          "Enter game name": "Ingresa el nombre del juego",
          "Enter game description": "Ingresa la descripción del juego",
          "Title": "Título",
          "Content": "Contenido",
          "Add news": "Agregar noticia",
          "Prize Pool": "Pozo de premios",
          "Location": "Ubicación",
          "Add Event": "Agregar evento",
          "Add Easter Egg": "Agregar easter egg",
          "No easter eggs yet.": "Aún no hay easter eggs.",
          "No events yet.": "Aún no hay eventos.",
          "No news yet.": "Aún no hay noticias.",
          "English": "Inglés",
          "Hungary": "Hungría",
          "Deutsch": "Deutsch",
          "Spanish": "Español"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
