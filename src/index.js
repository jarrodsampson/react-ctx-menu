// Demo component
// this is only example component
// you can find tests in __test__ folder

import React from 'react';
import './ctx-style.css';

var xOffset = '';
var yOffset = '';

class CTXMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            target: ''
        }
    }

    componentDidMount() {
        let context = document.getElementById(this.props.ctxId);
        context.addEventListener('contextmenu', (event) => {
            this.openContextMenu(event)
        });

        let menu = document.getElementById('contextMenu');
        menu.addEventListener('mouseleave', (event) => {
            this.closeContextMenu(event)
        });

    }

    render() {
        return (
            <div id="contextMenu">
                {this.props.menuItems.map((item) => {
                    let handleClick = (event) => {
                        this.closeContextMenu(event);
                        item.onClick(this.state.target);
                    };
                    let text = item.text;
                    let image = item.image;
                    return (
                        <span onClick={handleClick} key={text}>
                    {image &&
                    <img className="icon" src={image} alt={text} />
                    }
                            {text}
                </span>
                    );
                })}
            </div>
        );
    }

    openContextMenu = (event) => {
        event.preventDefault();
        this.setState({target: event.target});

        xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        let menu = document.getElementById('contextMenu');

        menu.style.cssText =
            'left: ' + (event.clientX + xOffset) + 'px;' +
            'top: ' + (event.clientY + yOffset) + 'px;' +
            'visibility: visible;';
    };

    closeContextMenu = (event) => {

        let menu = document.getElementById('contextMenu');

        menu.style.cssText =
            'left: ' + (event.clientX + xOffset) + 'px;' +
            'top: ' + (event.clientY + yOffset) + 'px;' +
            'visibility: visible; opacity:0;';

    }
}

export default CTXMenu;