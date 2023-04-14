require("dotenv").config();
const fs = require('fs');
const getPool = require("./getPool");
const bcrypt = require("bcrypt");
const { processAndSaveImage } = require("../utils");
const path = require('path')


const populateDb = async () => {
    try {
      const pool = getPool();
      await pool.query(`
         USE strong_fit;
      `);
      console.log("Inserting users...");
  
      await pool.query(`
          INSERT INTO users (email, password, role, avatar ) VALUES 
          ("pablo@email.com", "${await bcrypt.hash("123456", 10)}","admin", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "avatars", "avatarpablo.png"))}" ),
          ("juan@email.com", "${await bcrypt.hash("123456", 10)}","normal", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "avatars", "avatar2.webp"))}" ),
          ("maria@email.com", "${await bcrypt.hash("123456", 10)}","normal", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "avatars",  "avatar 3.webp"))}"),
          ("jorge@email.com", "${await bcrypt.hash("123456", 10)}","normal", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "avatars",  "avatar4.webp"))}"),
          ("luis@email.com", "${await bcrypt.hash("123456", 10)}","normal", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "avatars",  "avatar5.webp"))}")
          `);

      await pool.query(`
      INSERT INTO exercises (type, movility, name, description, media, userId ) VALUES
      ("aerobic/strength", "advanced", "burpee", "A burpee is essentially a two-part exercise: a pushup followed by a leap in the air. Doing several burpees in a row can be tiring, but this versatile exercise may be worth the payoff, especially if you're looking for a way to build strength and endurance, while burning calories, and boosting your cardio fitness.", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "exercises", "burpee.webp"))}", "1"),
      ("strenght", "begginer", "bench press", "The bench press is a compound exercise that involves the pectoralis major of the chest, the anterior deltoids of the shoulder, and the triceps brachii of the upper arm. It builds strength as well as encouraging the growth (hypertrophy) of these muscles.", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "exercises", "benchpress.jpg"))}", "1"),
      ("strenght", "reduced", "barbell bench press on the floor", "A variation of the bench press that  involves the pectoralis major of the chest, the anterior deltoids of the shoulder, and the triceps brachii of the upper arm but with less pression under the shoulders. It builds strength as well as encouraging the growth (hypertrophy) of these muscles.", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "exercises", "barbellbenchpressonthefloor.png"))}", "1"),
      ("aerobic", "reduced", "static bike", "Its a nice option for elderly people to sweat a little and improve cardio habilities, there a a lot of range of static bikes adaptable to every case ", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "exercises", "bikereduced.jpg"))}", "1")
      `);

      await pool.query(`
      INSERT INTO diets (type, name, recipe, media, userId ) VALUES
      ("vegetarian", "Healthy egg & chips", "
      Ingredients

      500g potatoes, diced
      2 shallots, sliced
      1 tbsp olive oil
      2 tsp dried crushed oregano or 1 tsp fresh leaves
      200g small mushroom
      4 eggs
      
      STEP 1
Heat oven to 200C/fan 180C/gas 6. Tip the potatoes and shallots into a large, non-stick roasting tin, drizzle with the oil, sprinkle over the oregano, then mix everything together well. Bake for 40-45 mins (or until starting to go brown), add the mushrooms, then cook for a further 10 mins until the potatoes are browned and tender.

STEP 2
Make four gaps in the vegetables and crack an egg into each space. Return to the oven for 3-4 mins or until the eggs are cooked to your liking.", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "diets", "healthyeggsandships.webp"))}", "1"),
("vegan", "Olive, cauliflower & harissa pasta", "
Ingredients

1 tbsp olive oil
1 small cauliflower, broken into small florets, stalks and leaves finely chopped
1 tbsp tomato purée
200g cherry tomatoes, halved
2 garlic cloves, crushed
25g pitted green olives, halved
2 tbsp rose harissa
150g dairy-free wholemeal pasta of your choice (such as pappardelle; gluten-free if needed)
small handful of parsley, finely chopped

Method

STEP 1
Heat the oil in a large frying pan over a medium-high heat and tip in the cauliflower florets, stalks and leaves. Season, cover and fry for 8-10 mins, shaking the pan now and then, until lightly browned and softened. Stir the tomato purée and tomatoes, cover and cook for 5 mins more until the tomatoes have burst. Add the garlic, olives and harissa, and cook for 2-3 mins until fragrant.

STEP 2
Meanwhile, cook the pasta following pack instructions. Drain, reserving a mugful of the water. Stir the pasta and a splash of the water into the tomato mixture. Season, scatter over the parsley and serve.", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "diets", "Olive-cauliflower-and-harissa-pasta.webp"))}", "1"),
("meat", "Chilli chicken with peanut noodles", "
Ingredients

For the stir-fry

2 tsp rapeseed oil
2 skinless, boneless chicken thighs, about 225g in total, all fat removed, chopped
3 large garlic cloves, finely grated
1 tbsp ginger, cut into matchsticks
1 red chilli, deseeded and finely chopped
175g long-stem broccoli, stems sliced on the angle, florets left whole
1 red pepper, deseeded and chopped
½ tsp tamari

For the noodles

2 nests wholewheat noodles
1 tbsp sugar-free peanut butter
½ lime, zested and juiced
1 tsp ground cumin

STEP 1
Heat the oil in a wok and add all the stir-fry ingredients except for the tamari. Toss over a high heat for a min, then cover, reduce the heat and cook for 5 mins more until the chicken is tender. Toss through the tamari.

STEP 2
Meanwhile, cook the noodles in a pan of boiling water for 5 mins. Drain, but reserve the water. Mix the peanut butter, lime juice and zest, cumin and 3 tbsp of the water, then toss with the noodles until coated. Serve with the stir-fry.

", "${await processAndSaveImage(path.join(__dirname, "..", "..", "public", "diets", "chilli-chicken-with-peanut-noodles-37f9682.webp"))}", "1")    
`);
      console.log("¡All done! 🤗");
    } catch (error) {
      console.error(error.message);
    } finally {
      process.exit();
    }
  };
  
  populateDb();