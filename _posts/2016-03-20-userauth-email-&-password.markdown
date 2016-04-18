---
layout: post
comments: true
title:  "User Authentication: Email & Password, storing user data with the javascript API"
disqus_identifier: c89248c7-3f28-4001-abb4-99231512ff02
date:   2016-03-20 20:26:51 +0100


---
This post is in Swedish and it will translated to English in the upcoming week.

För att följa denna guide krävs det att du har ett konto och en applikation på [Firebase][firebase-io].

Jag har visat firebase för vänner och andra utvecklare ett flertal gånger och alla blir lika förvånade över hur enkelt det är att använda. Eftersom vi inte har tillgång till
koden som körs back-end är det inte uppenbart hur vissa funktioner fungerar och användarhantering är ett exempel, vilket lett till att jag skrivit denna korta guide!

### Steg 1 - Aktivering
Slå på inloggniningsmodulen i firebase som tillåter använder att logga in via Email och Password.
Du finner den under din applikation -> Login & Auth -> Email &  Password. Bocka i checboxen.

### Steg 2 - Registrering
Skapa en funktion för registrering som implementerar firebase registrering för Email och Password.

Se snippet nedan

{% highlight javascript %}
1.	var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
2.	ref.createUser({
3.	  email    : "bobtony@firebase.com",
4.	  password : "correcthorsebatterystaple"
5.	}, function(error, userData) {
6.	  if (error) {
7.	    console.log("Error creating user:", error);
8.	  } else {
9.	    console.log("Successfully created user account with uid:", userData.uid);
10.	  }
11.	});


{% endhighlight %}


Createuser-metoden vill ha ett objekt som första parameter innehållandes email och password som den registrerar en användare utefter. 

Som andra parameter tar den emot en funktion med två parametrar, error och userData. Om error triggar funkade det ej, annars så gick registreringen igenom. 

Observera att vi får ut userData.uid här, vi kommer att behöva det sen.

### Steg 3 – Inloggning
Skapa en funktion för inloggning som implementerar firebase inloggnings för Email och password

{% highlight javascript %}
1.	var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
2.	ref.authWithPassword({
3.	  email    : "bobtony@firebase.com",
4.	  password : "correcthorsebatterystaple"
5.	}, function(error, authData) {
6.	  if (error) {
7.	    console.log("Login Failed!", error);
8.	  } else {
9.	    console.log("Authenticated successfully with payload:", authData);
10.	  }
11.	});

{% endhighlight %}



Loginmetoden vill ha ett objekt som första argument likt registrering som innehåller email och password. Som andra argument en funktion med error och authData, funkar precis som registreringsmetoden.

När vi loggar in får vi tillbaka data, t.ex. userId, och en session startas som håller oss inloggade.

### Steg 4 – Vem är inloggad?
Om vi vill veta vem som är inloggad kan vi enkelt göra det genom att användara vår referens till firebase i vår klient. Vi får vilken användare som ligger som ”Authenticated”


{% highlight javascript %}
1.	ref.getAuth() 
{% endhighlight %}

getAuth-metoden skickar tillbaka en bunt data som vi kan använda, men den mest intressanta är UID.


### Steg 5 – Hämta data från inloggad användare
Firebase lagrar inte information om registrerade användare ”åtkomligt” för oss programmerare förutom när vi kör genom getAuth. Den datan har dock ingen koppling till data som vi lagrar i firebase (vi har dock inte lagrat något ännu). Men om vi vill lagra någon information associerad till användaren, vart gör vi det?

När vi registrerar användare i Firebase får vi tillbaka användarens userid i callbacken som även kollar om det funkade. I samband med denna aktivitet bör vi därför själva lagra information om användare i firebase som vi kan komma åt.

Detta kan vi enkelt göra genom referensen till firebase tillsammans med en barnnod, som vi i sin tur ger en ny barnnod bestående av användares id!
Se steg 6 för kod.


### Steg 6 – Koppla ihop registrering och användarlagring
Gå tillbaka till den funktion där vi registrera användaren. Koden vi har där ser för tillfället ut:

{% highlight javascript %}
1.	var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
2.	ref.createUser({
3.	  email    : "bobtony@firebase.com",
4.	  password : "correcthorsebatterystaple"
5.	}, function(error, userData) {
6.	  if (error) {
7.	    console.log("Error creating user:", error);
8.	  } else {
9.	    console.log("Successfully created user account with uid:", userData.uid);
10.	  }
11.	});

{% endhighlight %}

I vår else vill vi lägga till den funktionalitet vi pratar om i steg 5. Detta gör vi genom att peka på ett barn till vår firebasereferens, förslagvis ”users”. Även om vi inte har detta nu så skapar firebase ett sådant barn åt oss om vi pekar på det.

{% highlight javascript %}
1.	…
2.	else {
3.	    console.log("Successfully created user account with uid:", userData.uid);
4.	    ref.child("users").seethenextsnippet---
5.	  }

{% endhighlight %}

På denna referens lägger vi nu till unika barn med hjälp av den nyregistrerade användarens id. Vi pushar samtidigt in data i det nya barnet för att få se så att det dyker upp i databasen.

{% highlight javascript %}
1.	else {
2.	    console.log("Successfully created user account with uid:", userData.uid);
3.	    ref.child("users").child(userData.uid).push(("testdata").
4.	  }

{% endhighlight %}

Gör nu en ny användare, kolla i din firebase och voila!

Om vi nu vill komma åt en inloggad användarens data i firebase gör vi det via:

{% highlight javascript %}
1.	ref.child('users').child(chatRef.getAuth().uid).addYourQueryHere()
{% endhighlight %}


Kolla in vårt meningslösa projekt vi slängde ihop en kväll för ett kösystem i Firebase som implementerar registreringen i denna guide [Firebase Queue System][hackathon-game].
Om du har några frågor eller synpunkter? Släng iväg en tweet!

[firebase-webguide]: https://www.firebase.com/docs/web/guide/login/password.html 
[hackathon-game]:   https://github.com/godiagonal/hackathon-game
[firebase-io]:   https://www.firebase.com/

