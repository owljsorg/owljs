(function(app, owl) {
    class TodoItemView extends React.Component {
        onChange() {
            this.props.controller.setDone(this.props.item.getCollectionIndex(), this.refs.checkbox.checked);
        }
        render() {
            var item = this.props.item.getData();
            return (
                <div>
                    <label className="checkbox">
                        <input
                            ref="checkbox"
                            type="checkbox"
                            checked={item.isDone ? 'checked' : ''}
                            onChange={this.onChange.bind(this)}
                        />
                        <span>{item.title}</span>
                    </label>
                </div>
            );
        }
    }
    app.TodoItemView = TodoItemView;
})(app, owl);
