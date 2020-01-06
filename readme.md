# Art Valley


![alt text](https://imgur.com/1GkD4Zh.png)

## [Visit Us!](https://art-valley.herokuapp.com)

Created by

Abby Xu - [LinkedIn](https://www.linkedin.com/in/abby-jun-xu/) - [Github](https://www.github.com/AbbyTunes)

Christopher Fong - [LinkedIn](https://www.linkedin.com/in/chris-fong-33b6b3197/) - [Github](https://github.com/cfo8473)

Gabriel Barrios - [LinkedIn](https://www.linkedin.com/in/gabriel-antonio-barrios/) - [Github](https://github.com/gbarrios212)


## Technologies
 * Database: MongoDB
 * Backend: Express, Node.js, GraphQL
 * Frontend: React-Apollo, GraphQL
 * Cloud Storage: AWS

## Background and Overview

Despite powerful associations with tech, the Bay Area remains rooted in culture, and it offers so much more left to be discovered. Art Valley seeks to makes finding talent in art, film, and local criticism easy.

Through Art Valley, users can create accounts to follow their favorite artists.  Users may create a profile, wherein they may present themselves and their art to a community of art enthusiasts.  Users may additionally publish essays on the Bay Area art scene.  Artworks, videos and articles all contain likes and comments.  Navigation is made easy on ArtValley, and users are never more than a click away from a new cultural experience. 



## Design

![alt text](https://imgur.com/6M4SKkY.png)

Clean style and respectful presentation are key values at ArtValley.  On navigating to any particular work on the site, users are able to view their work in full resolution against a neutral  background.  The title, artist info, and descriptions, as well as an option to like or unlike a work are directly beneath. 

A comment section can be found on the opposite side of a dividing line, where users may freely add opinions about the select artwork.  Should a user lament a post, they can quickly delete their comment right from the page.   

Furthermore, users are presented with other popular artworks by the same artist. 

![alt text](https://imgur.com/Dgw6qD2.png)

Special care is given to all aspects of the site, including those centered on text.  ArtValley's index pages provide an organized display of resources against a minimalist backdrop to ensure no design outshines the work being presented.

![alt text](https://imgur.com/iJRWrJU.png)

Users are also given a comfortable home for their personal information.  On their profile page, users have the option to customize their biography and view their collected activity.

![alt text](https://imgur.com/vGZm0Vz.png)

 A quick button click will render a form that updates their profile in real time.

![alt text](https://imgur.com/AjbaqV4.png)

Below, they can find their art, articles, and liked pieces separated out by tabs for easy navigation.  On clicking any of these thumbnails, a full resolution image of the piece will display alongisde a link to the individual show page.  

![alt text](https://imgur.com/p3EyWnw.png)

## Sample Code

To provide users with a quick way to target edits across the page, be it art descriptions or article bodies, each editable piece of data was given its own component.  Utilizing local react states, different elements would be rendered on a page.  To edit an article header, for instance, the below Article Header Detail class constructor component was created. 

```
class ArticleHeaderDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		editing: false,
		header: this.props.article.header || ""
		};

		this.handleEdit = this.handleEdit.bind(this);
	}
}
```

Upon arrival to an article, a user would see

![alt text](https://imgur.com/ugHRgEw.png)

Which itself would correspond with the elements below: 

```
	return (
		<div>
			<div onClick={this.handleEdit}>
			{this.props.article.header}
			<IconContext.Provider value={{ className: "custom-icon" }}>
				<FaPencilAlt />
			</IconContext.Provider>
			</div>
			<h2>{this.state.Titile}</h2>
		</div>
	);
```

On clicking this header element, the handleEdit function would set editing state to true, which in turn would render the following: 

```
if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ARTICLE_HEADER}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArticleHeader, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArticleHeader({
                    variables: {
                      id: this.props.article.id,
                      header: this.state.header
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <TextareaAutosize
                className="article-show-header-edit"
                  value={this.state.header}
                  onChange={this.fieldUpdate("header")}
                />
                <button className="edit-info-button"type="submit">Update Header</button>
              </form>
            </div>
          )}
        </Mutation>
      );
```
This would be represented as a textbox, as illustrated below: 

![alt text](https://imgur.com/y4mEIXm.png)

which allows the user to instantly update information in place.  On submission, the results of the update would be read to the cache, and the editing state would be set to false.  An onSubmit action on our form would ensure the data is updated in the backend as well. 

```
  updateCache(cache, data) {
    const article = cache.readQuery({
      query: FETCH_ARTICLE,
      variables: {
        _id: this.props.article.id
      }
    });
    let newArticle = merge({}, article);
    newArticle.article.header = this.state.header;
    cache.writeQuery({
      query: FETCH_ARTICLE,
      data: newArticle,
      variables: {
        _id: this.props.article.id
      }
    });
  }
```

Given the emphasis on visuals, coordination between React, HTML, and CSS was crucial.  Below, a sample of videos is sorted according to number of likes and rendered with a youtube thumbnail.
```
let sortedVideobyLike = data.artsByCategory.sort((a, b) =>
	a.likers.length > b.likers.length ? -1 : 1
);

let allArtList = sortedVideobyLike.map(art => {
	const linkStrArr = art.videoLink.split("/");
	const linkId = linkStrArr[linkStrArr.length - 1];

	return (
	<li key={art.id} className="video-index-li">
		<Link to={`/videos/${art.id}`}>
		<img className="video-photo-thumbnail"
			src={`https://img.youtube.com/vi/${linkId}/0.jpg`}
			alt="" />
		<div className="video-photo-thumbnail-text">{art.title}</div>
		</Link>
	</li>
	);
});
```

On hover, a title would key users in to the content to be consumed. 

![alt text](https://imgur.com/gdXhQV7.png)


Below, a sample of how our users are registered on to our site, using Express connected to MongoDB with Mongoose: 

```
const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    let newUser = user;
    const token = jwt.sign({ id: user._id }, keys);
    return { token, id: newUser._id, username: newUser.name, loggedIn: true, ...newUser._doc, password: null };
  } catch (err) {
    throw err;
  }
};
```

## Challenges 

Given the complicated cross-model relationships inherent to social media sites paired with the expectations for rapid interactions on behalf of users, special care had to be given to the way in which we chose to access our backend.  To account for the many resources any one user could "own" and to provide quick navigation throughout the site, we used GraphQL to leverage rich querying tools in conjunction with MongoDB's document based collections.  

Challenges working with this technology included ways to maintain session related user information across various pages.  A workaround to accessing a global state involved injecting auth tokens, usernames, and the like directly into localStorage.  In this way, user information was easy to render regardless of what page a user found themselves in while minimizing requests to the backend.   

## Upcoming Features
* A rich text editor for further artilce customization. 
* An algorithm that sorts the homepage according to site-wide user interactivity. 
* A search function to facilitate artistic discovery. 
