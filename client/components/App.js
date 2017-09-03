import React, {PropTypes} from "react";
import {connect} from "react-redux";

import {IconButton, IconMenu, LeftNav, ToolbarTitle} from "material-ui";

import FontIcon from "material-ui/lib/font-icon";
import NavigationExpandMoreIcon from "material-ui/lib/svg-icons/navigation/expand-more";
import NavigationMore from "material-ui/lib/svg-icons/navigation/menu";
import MenuItem from "material-ui/lib/menus/menu-item";
import RaisedButton from "material-ui/lib/raised-button";
import Toolbar from "material-ui/lib/toolbar/toolbar";
import ToolbarGroup from "material-ui/lib/toolbar/toolbar-group";
import ToolbarSeparator from "material-ui/lib/toolbar/toolbar-separator";

import LeftMenu from "./LeftMenu";

require('../styles/app.css');

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
  static propTypes = {
    todos: PropTypes.array,
    actions: PropTypes.object
  };

  render() {
    return (
      <section>
        <Toolbar style={{backgroundColor: '#f2f2f2'}}>
          <ToolbarGroup firstChild={true} float="left">
            <IconButton style={{float: 'left', marginTop: '4px'}}> <NavigationMore /></IconButton>
            <ToolbarTitle text="Node Fiddler 3"/>
          </ToolbarGroup>

          <ToolbarGroup float="right">
            <ToolbarTitle text="Options"/>
            <FontIcon className="muidocs-icon-custom-sort"/>
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }>
              <MenuItem primaryText="Download"/>
              <MenuItem primaryText="More Info"/>
            </IconMenu>
            <ToolbarSeparator />
            <RaisedButton label="Create Broadcast" primary={true}/>
          </ToolbarGroup>

        </Toolbar>

        <LeftMenu />

        <div style={ {padding: '10px', paddingLeft: '280px'} }>
          <h2>Settings</h2>

          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
          adasdasd asdas dasd asd
        </div>

      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  }
}

export default App;