import React from "react";
import { Mutation } from "react-apollo";
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { merge } from "lodash";
const { UPDATE_ART_TITLE } = Mutations;
const { FETCH_ART } = Queries;

class ArtTitleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: this.props.art.title || ""
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
    const art = cache.readQuery({
      query: FETCH_ART,
      variables: {
        _id: this.props.art.id
      }
    });
    let newArt = merge({}, art);
    newArt.art.title = this.state.title;
    cache.writeQuery({
      query: FETCH_ART,
      data: newArt,
      variables: {
        _id: this.props.art.id
      }
    });
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ART_TITLE}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArtTitle, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArtTitle({
                    variables: {
                      id: this.props.art.id,
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
            {this.props.art.title}
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

export default ArtTitleDetail;
