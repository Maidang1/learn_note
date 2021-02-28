## index.js

```javascript
class Component {
  constructor(props) {
    this.props = props;
  }
  createDOMFromDOMString(domString) {
    let div = document.createElement('div');
    div.innerHTML = domString;
    return div.children[0];
  }
  setState(partcialState) {
    this.state = Object.assign(this.state, partcialState);
    let oldElemet = this.domElement;
    let newElement = this.renderElement();
    oldElemet.parentElement.replaceChild(newElement, oldElemet);
  }
  renderElement() {
    let htmlString = this.render();
    this.domElement = this.createDOMFromDOMString(htmlString);
    this.domElement.component = this;
    return this.domElement;
  }

  mount(container) {
    container.appendChild(this.renderElement());
  }
}

window.trigger = function (event, mothodName) {
  event.target.component[mothodName].call(event.target.component);
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  add() {
    this.setState({ number: this.state.number + 1 });
  }

  render() {
    return `<button onclick="trigger(event, 'add')">${this.state.number}</button>`;
  }
}

```



## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="count-app"></div>
  </body>
  <script src="./index.js"></script>
  <script>
    let countApp = document.getElementById('count-app');
    let res = new Counter().render();
   	res.mount(countApp)
  </script>
</html>

```

