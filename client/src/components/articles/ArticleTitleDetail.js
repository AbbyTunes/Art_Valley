import React from "react";
import { Mutation } from "react-apollo";
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import {merge} from "lodash"
const { UPDATE_ARTICLE_TITLE } = Mutations;
const { FETCH_ARTICLE } = Queries;
 
class ArticleTitleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: this.props.article.title || ""
    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  // this is the function that will trigger "editing" mode
  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  fieldUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, data) {
    // update cache instead of setState
    const article = cache.readQuery({
      query: FETCH_ARTICLE,
      variables: {
        _id: this.props.article.id
      }
    });
    let newArticle = merge({}, article);
    newArticle.article.title = this.state.title;
    cache.writeQuery({
      query: FETCH_ARTICLE,
      data: newArticle,
      variables: {
        _id: this.props.article.id
      }
    });
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ARTICLE_TITLE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArticleTitle, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArticleTitle({
                    variables: {
                      id: this.props.article.id,
                      title: this.state.title
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <input
                  value={this.state.title}
                  onChange={this.fieldUpdate("title")}
                />
                <button type="submit">Update Title</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div onClick={this.handleEdit}>
            {this.props.article.title}
            <IconContext.Provider value={{ className: "custom-icon" }}>
              <FaPencilAlt />
            </IconContext.Provider>
          </div>
          <h2>{this.state.Titile}</h2>
        </div>
      );
    }
  }
}

export default ArticleTitleDetail;