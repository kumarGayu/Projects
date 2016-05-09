var React = require('react');
var Image = require('./components/Image');
var Panel = require('./components/Panel');
var Button = require('./components/Button');
var Tags = require('./components/Tags');
var TagDialog = require('./components/TagDialog');
var tagStore = require('./stores/tagStore');
var tagActions = require('./actions/tagActions');


var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  getInitialState: function() {
    return {
      isTagsHidden: true,
      isTagDialogHidden: true,
      positions:[],
      tags:[],
      title:""
    };
  },

  onShowTags: function() {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: false
    });
  },

  onHideTags: function() {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: true
    });
  },

  addATag: function(tag) {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: false
    });
    tagActions.addTag({tag: tag,
      positions: this.state.positions
    });
  },

  onClick: function(event){
    this.state.positions.push({
      x: event.pageX,
      y: event.pageY
    });

  },

  showTagDialog: function(event) {
    this.setState({
      isTagDialogHidden: false,
      isTagsHidden: true,
    });
  },

  getTags: function(){
    if(this.state.isTagsHidden === false){
      return <Tags tags={this.state.tags} onClick={this.onTagClick} onTagDelete={this.onTagDelete}> </Tags>;
    }
  },

  onChange: function(){
    this.state.positions = [];
    this.setState({
      tags: tagStore.getList(),
      isTagsHidden: false
    });
  },

  onTagDelete: function(tag){
    tagActions.removeTag(tag);
  },

  onRemoveTags: function(){
    tagActions.removeAll();
  },

  componentDidMount: function (){
    tagStore.addChangeListener(this.onChange);
    tagActions.getTag();
  },

  componentWillUnmount: function(){
    tagStore.removeChangeListener(this.onChange);
  },

    render: function(){
      return (
        <Panel>
          <Panel className="drag-area">
              <TagDialog hidden = {this.state.isTagDialogHidden}
                          addTag = {this.addATag}/>
              <Image path={'image/test_image.png'} onClick={this.onClick} onContextMenu = {this.showTagDialog}/>
              {this.getTags()}
          </Panel>
          <Panel>
            <Button lable = 'Show Tags' onClick = {this.onShowTags}/>
            <Button lable = 'Hide Tags' onClick = {this.onHideTags}/>
            <Button lable = 'Remove All' onClick = {this.onRemoveTags}/>
          </Panel>
        </Panel>
      );
    }
});

React.render(
  <App />,
  document.getElementById('app')
);