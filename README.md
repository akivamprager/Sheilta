# Sheilta שְׁאִילְתָא

##### A collaborative Torah learning platform

<img src="public\images\logo-banner2.png" style="zoom:15%;" />

Sheilta ([sheilta.ml](sheilta.ml)) is a new website with the aim of bringing the benefits of learning in a Beit Midrash to a virtual environment.


## Background

In the past couple of years, I've studied Torah in a Hesder Yeshiva (Maale Adumim), which is an institute that has a Beit Midrash with about two hundred students learning at any given time. It's very impressive, yet I haven't fully realized how fortunate I am to be learning in this atmosphere until March of this year when due to the COVID-19 epidemic, our Yeshiva closed down temporarily for a few months. 

During the following months, we continued to learn regularly, over Zoom, or on the phone. However, my general feeling was that something was missing, and our learning wasn't as productive and enjoyable as before. The lack of a Beit Midrash meant that if my Chavruta and I had difficulty understanding a Gemara or a Parshan, we weren't able to ask other students for help, as we used to. Also, if we had a Chiddush (insight) or Kashya (challenging question) on the Sugya (Talmudic paragraph) we didn't have a way to share it with the rest of the students to get feedback. 

Therefore, when I saw the announcement about the Sefaria API contest, I decided that my project would focus on bringing the benefits of the Yeshiva learning experience to people who are not able to have that experience themselves. Another goal of the project was to connect between the different Batei Midrash and Yeshivot to make their learning more collaborative so that it would be more productive. 

## Description of the project

The objective of Sheilta is to create a community of Torah learners that will be able to assist each other with their learning.

Users of the site can view Torah texts such as the Bible, Mishna, or Gemara (retrieved from the Sefaria API). If they have a question regarding the text, or a Kashya or Chiddush, they can post them to the site so other users can help them out or provide feedback. 

The website design was inspired by Mi Yodea's UX (and other Stack Exchange websites like StackOverflow), except unlike Mi Yodea, where the questions aren't tied to a specific context, in Sheilta the questions/Kashyas/etc. have to be connected to a specific Torah text so that when other users will use Sheilta to learn that text, will see the entry and be able to respond to it.

For example, let's say I'm learning Gemara Masechet (tractate) Beitza Daf 4a, and struggling to understand the quoted Mishna which deals with the complicated laws of Teruma. Instead of giving up and moving on, I can post a question on Sheilta and explain what I'm finding difficult in the Sugya, and hopefully, someone else learning that Sugya will be able to answer my question.

Another scenario: two Chavrutot are learning a chapter of Yechezkel, and they stumble upon a word they've never seen before. After doing some research, they find a book that gives the word an original interpretation, which seems to explain the meaning of the whole Pasuk (verse). Instead of keeping that knowledge to themselves, they can post a reference to the book, so other people learning that chapter can gain a better understanding.

<img src="public\images\Docs\referenceExample.png" />
<img src="public\images\Docs\referenceExample2.png" />

Of course, there can be many more use cases, and the usefulness of Sheilta will increase eventually, as its community will grow and there will be more content on the site.

## Functionality

Clicking https://sheilta.ml will open Bereshit (Genesis) chapter 1 by default. In order to open a different text, click on the search icon in the navbar, and enter the source's reference (as of now, only English works. But later on Hebrew will also work. Additionally, the only types of references guaranteed to work at this point are Bible and Talmud Bavli.) with a space between the source name and the chapter or page - for example: "Shoftim 23", or "Bava Kama 103b". Click enter, and that will bring you to the appropriate page. 

The webpage is split into two sections: the Torah text on the top, and the user input on the bottom, split into tabs based on the matching category. The available categories are questions, Kashyas, references, and Chiddushim.

Clicking on the globe icon in the navbar will toggle the language of the text (if the text is available in English). 

Hovering over any line in the text will reveal two buttons, one to compose a new post regarding that line, and one to display all of the existing posts written on that line. 

Clicking on any post title in the bottom section will reveal the complete thread and an option to reply.

In order to compose a new post or a reply, you will be prompted to enter your name, so that the post can be identified. 

This is the functionality that's currently available, but of course, I'm constantly working on extending it and making the whole experience more user friendly. 

#### Pages that already have content for purpose of the demo:
- בראשית פרק א - https://sheilta.ml/?location=Bereshit.1
- יחזקאל פרק ה - https://sheilta.ml/?location=Ezekiel.5
- בבלי שבת קכג עמוד א - https://sheilta.ml/?location=Shabbat.123a

**Note**: There's a temporary issue with sending too many requests to the server at once, which leads to some posts not to be sent. If that happens, just wait a minute or two. To be fixed in the future...

## Technology behind the site

Sheilta is written in Node.JS and React, and uses Javascript libraries such as Axios and Express. The Sefaria API is used in order to fetch the requested texts. The user posts system is powered by a Discourse server, which stores the posts based on the appropriate category and context, and the users who posted them. Sheilta makes requests to the discourse server to fetch the existing posts and to post new ones. 

## Name of the website

שאילתא is an Aramaic term which means a speech that the Amoraim and Geonim would give in front of their students. In modern Hebrew though, it is used in programming context as the translation of a query. Therefore I decided that the name is suitable, given that the project is a combination of Torah (especially from the Amoraim era...) and programming, like the term itself, and that its purpose is to answer "שאלות".

## Things I want to improve in the future

- Replace the local storage based identification with proper OAuth2 authentication (with social accounts login and SSO).
- Develop a better way to navigate the website and let users select wanted texts instead of typing them.
- Add support for other types of text other than Bavli and Tanach.
- Add advanced features to the posts section, such as a voting system like Mi Yodea's, and more sorting options. Ultimately port all of Discourse's features directly to Sheilta. 
-  Add full Hebrew support. 
- My plan is to eventually start a closed beta of Sheilta that will be used exclusively in my Yeshiva, and once the website will have enough user content I'll release it to the public, G-d willing.

## Feedback

I'd love to hear feedback from users who are trying the website and I'm always happy to accept new ideas on how to improve it or extend its functionality. Additionally, if you are a developer and would like to contribute to the project, that would be awesome :)

Please email me at akivaprager@gmail.com or submit a pull request on Github. 
