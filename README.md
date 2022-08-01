Fan-made deck builder for the World of Tanks miniatures tabletop game built using React without any additional libraries.
https://www.gf9games.com/worldoftanks/113/whatis/

Main goal - Facilitating sharing of a single game set between two players or reducing the setup time for a single player.

Features - Full CRUD profiles, profile sharing, filtering of available game expansions, fully detailed card stats, deck point usage breakdowns, modeled crew slots, modeled mutual exclusions or special requirements of cards and recommendations based on stats and pre-defined tags.

Project is WIP and in active daily development until all features are complete.

Main Profile Screen:

![example-app](https://user-images.githubusercontent.com/43594857/182103878-3a8f3012-7868-4875-814b-e33c3e81d6cf.jpg)

Hovering over listed equipment will show which tanks they are equipped to.

![example-equip](https://user-images.githubusercontent.com/43594857/182103950-d2abbff8-4966-4f25-80d7-445b1069ac84.jpg)

CRUD operation buttons. (Note Double clicking on saved profiles will also load them)

![example-profile](https://user-images.githubusercontent.com/43594857/182103649-18e95e08-28d2-49a5-9745-b3f947f43b6c.jpg)

Settings to Delete Local Storage and reset default (Reach it using the Settings Cog on the main page)

![example-settings](https://user-images.githubusercontent.com/43594857/182104502-ea03b3df-6d2e-41d1-a7c0-213b6fff7f47.jpg)

Tank Stats Screen.

![example tank](https://user-images.githubusercontent.com/43594857/182103594-79ae3d74-fbf1-437c-8076-66ff3870ea03.jpg)

Tank Equipment screen. (Sorted into 7 catagories with 4 recommendation types)
Notes: Hover over the equipment to see its description (Only on desktop. TODO: Mobile tap functionality)
1. This screen keeps track of every aspect of card limits (Tank, Nation, Crew Slot, Unique Limit, Tank Stats requirements, etc.)
2. Keeps track of which tank each card is attached to. Allowing you to freely add and remove cards without issue.
3. Keeps track of how many available cards you have depending on the configured expansion set ownership in the settings.
4. 
![example-equipment-recommend](https://user-images.githubusercontent.com/43594857/182103967-4b9376e4-1ce0-40a6-bf3a-9180f77cdb31.jpg)

Recommendation System for cards to cover weaknesses(Red Tier) and cards to buff strengths (Blue tier+)

![Screenshot 2022-07-28 224438](https://user-images.githubusercontent.com/43594857/182104999-df582518-0199-4d29-b0f5-0e8d95dada5e.jpg)

Equipment Modal handling universal crew slots.

![example-equip-prompt](https://user-images.githubusercontent.com/43594857/182104345-9e48002d-4669-427a-b610-f6454dde71e0.jpg)

Dynamic Point usage tracker

![example-points](https://user-images.githubusercontent.com/43594857/182104410-4779d82d-0413-4a6f-9562-4fd2c7e4437d.jpg)

Overpoint limit warning.

![example-points-over](https://user-images.githubusercontent.com/43594857/182104441-8fff3fd3-48ed-4a30-a428-cc1aebba602b.jpg)
