import React from 'react';

interface Props {
  id: string
}

interface State {
  isMounted: boolean
}

class LivedoorRSS extends React.Component<Props, State> {
  public instance: any
  public constructor(props: Props) {
    super(props)
    this.state = {
      isMounted: false,
    }
  }

  public componentDidUpdate() {
    const { id } = this.props
    const { isMounted } = this.state
    if (!isMounted) {
      this.setState({isMounted: true})
      let fragment = document.createDocumentFragment();
      let div = document.createElement('div');
      div.id = `blogroll-${id}`
      div.className = "blogroll-channel"

      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.innerHTML = `\n<!--\n    var blogroll_channel_id = ${id};\n// -->\n`;
      div.appendChild(s);

      const a = document.createElement('script');
      a.type = 'text/javascript';
      a.async = true;
      a.src ="https://blogroll.livedoor.net/js/blogroll.js"
      div.appendChild(a)
      fragment.appendChild(div)

      this.instance.appendChild(fragment)
    }
  }

  public render() {
    return (
      <div id='blogpoll' className='blogroll-wrapper' ref={el => (this.instance = el)}>
      </div>
    )
  }
}

export default (LivedoorRSS)
