
function seedUsers(req, res) {
  const users = [
		{ name: "name_1", email: "name_1@guest.com", password: "password" },
		{ name: "name_2", email: "name_2@guest.com", password: "password" },
		{ name: "name_3", email: "name_3@guest.com", password: "password" },
		{ name: "name_4", email: "name_4@guest.com", password: "password" }
  ];

  for (user of users) {
    var newUser = new User(user);
    newUser.save();
  }

  res.send('User data seeded!');
}

function seedCategories(req, res) {
	const categories = [
		{ name: "TEST1" },
		{ name: "TEST2" }
	];

	for (category of categories) {
		var newCategory = new Category(category);
		newCategory.save();
	}

	res.send('Category data seeded!');
}

function seedCategories(req, res) {
	const categories = [
		{ name: "TEST1" },
		{ name: "TEST2" }
	];

	for (category of categories) {
		var newCategory = new Category(category);
		newCategory.save();
	}

	res.send('Category data seeded!');
}

function seedArts(req, res) {
	const arts = [
		{
			title: "art_test_1",
			description: "The distinctive lines and geometric designs which form Ording’s art are beyond satisfying. A graduate of the San Francisco Art Institute, Ording has done various public projects including one on Valencia Street, one in the Buchanan Hotel, and one inside the Facebook headquarters. Her other pieces include paintings, prints, and drawings/collages.",
			author: user4.id,
			category: category4.id,
			photoLink: "https://d32dm0rphc51dk.cloudfront.net/-oY7weV0Ev3mtkpBn6F-2g/large.jpg"
		}
	];

	for (art of arts) {
		var newArt = new Art(art);
		newArt.save();
	}

	res.send('Art data seeded!');
}