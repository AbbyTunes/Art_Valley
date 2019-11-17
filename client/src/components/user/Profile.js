import React from "react";
import { Query } from "react-apollo";
import "./profile.css"
import Settings from "./Settings";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Queries from "../../graphql/queries";
import Gallery from "react-grid-gallery";
const { FETCH_USER } = Queries;



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };

    this.debugEdit = this.debugEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // itemStyle() {
  //   return ({
  //     border: "1px solid red",
  //     height: "100%",
  //     width: "100%",

  //   })
  // }

  debugEdit(userData) {
    return (
      <div>
        <Settings user={userData} />
      </div>
    );
  }

  handleClick() {
    if (this.state.clicked) {
      this.setState({
        clicked: false
      });
    } else {
      this.setState({
        clicked: true
      });
    }
    console.log(this.state.clicked);
  }

  render() {
    return (
      <Query
        query={FETCH_USER}
        variables={{ _id: this.props.match.params.userId }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="profile-container">
                <p>Loading...</p>
              </div>
            );
          if (error)
            return (
              <div className="profile-container">
                <p>Error</p>
              </div>
            );

          console.log(data);

          let settings;
          if (localStorage.currentUserId === data.user.id) {
            settings = (
              <div className="settings-container">
                <button className="settings-button" onClick={this.handleClick}>
                  ✎
                </button>
                {this.state.clicked ? (
                  <Settings user={data} clicked={true} />
                ) : null}
                {this.state.clicked ? null : (
                  <Settings user={data} clicked={false} />
                )}
              </div>
            );
          } else {
            settings = (
              <div>
                <Settings user={data} clicked={false} />
              </div>
            );
          }

          const recentlyLiked = data.user.likedArts.reverse();
          const artLikedList = recentlyLiked.map(art => {
            return {
              src: art.photoLink,
              thumbnail: art.photoLink,
              thumbnailWidth: 320,
              thumbnailHeight: 174,
              caption: (
                <a className="art-title" href={`#/arts/${art.id}`}>
                  <span className="profile-gallery-span">{art.title}</span>
                </a>
              )
            };
          });

          const artPublishedLimit = data.user.publishedArts
            .reverse();
          const artPubList = artPublishedLimit.map(art => {
            return {
              src: art.photoLink,
              thumbnail: art.photoLink,
              thumbnailWidth: 320,
              thumbnailHeight: 174,
              caption: (
                <a className="art-title" href={`#/arts/${art.id}`}>
                  <span className="profile-gallery-span">{art.title}</span>
                </a>
              )
            };
          });

          const articlePublishedLimit = data.user.publishedArticles.reverse();
          const articlePubList = articlePublishedLimit.map(article => {
            return {
              src: article.photoLink,
              thumbnail: article.photoLink,
              thumbnailWidth: 320,
              thumbnailHeight: 174,
              caption: (
                <a className="art-title" href={`#/community/${article.id}`}>
                  <span className="profile-gallery-span">{article.title}</span>
                </a>
              )
            };
          });

          const publishedArt = (
            <div className="profile-published">
              <Gallery
                images={artPubList}
                enableLightbox={true}
                enableImageSelection={false}
                backdropClosesModal
                thumbnailStyle={this.itemStyle}
                margin={5}
              />

              
            </div>
          );

          const publishedArticles = (
            <div className="profile-published">
              <Gallery
                images={articlePubList}
                enableLightbox={true}
                enableImageSelection={false}
                backdropClosesModal
                margin={5}
              />

            </div>
          );

          const recentlyLikedTab = (
            <div className="profile-published">
              <Gallery
                images={artLikedList}
                enableLightbox={true}
                enableImageSelection={false}
                backdropClosesModal
                margin={5}
              />
            </div>
          );

          return (
            <div className="profile-container">
              <div className="user-info"></div>
              {settings}

              <Tabs
                className="profile-tabs"
                selectedTabClassName="profile-tab-single-selected"
              >
                <TabList>
                  <Tab className="profile-tab-single">Published Art</Tab>
                  <Tab className="profile-tab-single">Published Articles</Tab>
                  <Tab className="profile-tab-single">Liked</Tab>
                </TabList>

                <TabPanel>{publishedArt}</TabPanel>
                <TabPanel>{publishedArticles}</TabPanel>
                <TabPanel>{recentlyLikedTab}</TabPanel>
              </Tabs>
            </div>
          );
        }}
      </Query>
    );
  }
}
 
export default Profile; 