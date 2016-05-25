(function(app) {
    class TodoView extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                title: ''
            }
        }
        onTitleChange() {
            this.setState({
                title: this.refs.title.value
            })
        }
        onSubmit(event) {
            event.preventDefault();
            this.props.controller.addItem(this.state.title);
            this.setState({
                title: ''
            });
        }
        renderItems() {
            return this.props.items.getModels().map((item) => (
                <app.TodoItemView
                    item={item}
                    controller={this.props.controller}
                />
            ));
        }
        renderCount() {
            var countLeft = 0;
            this.props.items.getData().forEach(function(item) {
                if(!item.isDone) {
                    countLeft++;
                }
            });
            return (<div className="v-todo--count">{countLeft} items left</div>);
        }
        render() {
            return (
                <div>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <h1>Todo list</h1>
                        <input
                            ref="title"
                            type="text"
                            value={this.state.title}
                            placeholder="Add a task"
                            onChange={this.onTitleChange.bind(this)} />
                        <div className="v-todo--counter">{this.state.title.length}</div>
                    </form>
                    <div>{this.renderItems()}</div>
                    <div>{this.renderCount()}</div>
                </div>
            );
        }
    }
    app.TodoView = TodoView;
})(app);
