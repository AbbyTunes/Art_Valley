import React from "react";
import { Mutation } from "react-apollo";
// we added the "react-icons" library to have access to a pencil icon for editting
import { IconContext } from "react-icons";
import { FaPencilAlt } from "react-icons/fa";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { merge } from "lodash";
const { UPDATE_ART_DESCRIPTION } = Mutations;
const { FETCH_ART } = Queries;

class ArtDescriptionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      description: this.props.art.description || ""
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
        artId: this.props.art.id
      }
    });
    let newArt = merge({}, art);
    newArt.artById.description = this.state.description;
    cache.writeQuery({
      query: FETCH_ART,
      data: newArt,
      variables: {
        artId: this.props.art.id
      }
    });
  }

  render() {
    // if we are editing we'll return a Mutation component
    if (this.state.editing) {
      return (
        <Mutation
          mutation={UPDATE_ART_DESCRIPTION}
          update={(cache, data) => this.updateCache(cache, data)}
        >
          {(updateArtDescription, data) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateArtDescription({
                    variables: {
                      id: this.props.art.id,
                      description: this.state.description
                    }
                  }).then(() => this.setState({ editing: false }));
                }}
              >
                <input
                  value={this.state.description}
                  onChange={this.fieldUpdate("description")}
                />
                <button type="submit">Update Description</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    } else {
      return (
        <div>
          <div onClick={this.handleEdit}>
            {this.props.art.description}
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

export default ArtDescriptionDetail;
