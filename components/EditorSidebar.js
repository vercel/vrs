import { Component } from 'react'

import { ChromePicker } from 'react-color'
import ClickOutside from 'react-click-outside'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colorPicker: [],
      currColor: []
    }
  }
  openColorpicker(ev, index) {
    this.state.colorPicker[index] = true
    this.setState({})
  }
  close() {
    this.setState({ colorPicker: [] })
  }
  changeColor(color, index) {
    this.state.currColor[index] = color.hex
    this.setState({})
    this.props.changeColor && this.props.changeColor(color, index)
  }
  componentWillReceiveProps(newProps) {
    let {data} = newProps
    if (this.props.data && this.props.data.uuid !== data.uuid) {
      // component changed
      this.setState({ colorPicker: [], currColor: [] })
    }
  }
  render() {
    let {data} = this.props
    return <div className="sidebar-container white">
      {
        data &&
        <div className="flex flex-column items-start h-100 bottom-0 left-0">
          <span className="subtitle mb1">Name <i className="material-icons f7 v-btm">lock</i></span>
          {data.name ? <div>{data.name}</div> : <div>-</div>}
          <span className="subtitle mb1 mt3">Textures <i className="material-icons f7 v-btm">lock</i></span>
          {data.textures && <div>
            {data.textures.map((texture, i) => <img className="mr1" key={`texture-${i}`} src={texture}/>)}
          </div>}
          {(!data.textures || !data.textures.length) && <div>-</div>}
          <span className="subtitle mb1 mt3">Colors</span>
          {data.colors && <div>
            {data.colors.map(({r, g, b}, i) => {
              let bg = this.state.currColor[i] || `rgb(${~~(r*255)}, ${~~(g*255)}, ${~~(b*255)})`
              return <div key={`color-${i}`} className="dib color-swatch mr1 relative" onClick={ev => this.openColorpicker(ev, i)} style={{backgroundColor: bg}}>{
                this.state.colorPicker[i] && <ClickOutside onClickOutside={ev => this.close()}>
                  <div className="absolute z-1">
                    <ChromePicker
                      color={bg}
                      onChangeComplete={color => this.changeColor(color, i)}/>
                  </div>
                </ClickOutside>
              }</div>
            })}
          </div>}
          {(!data.colors || !data.colors.length) && <div>-</div>}
          <span className="subtitle mb1 mt3">Refraction Ratio <i className="material-icons f7 v-btm">lock</i></span>
          {data.refractionRatios && <div>
            {data.refractionRatios.map((r, i) => <div>{r}</div>)}
          </div>}
          {(!data.refractionRatios || !data.refractionRatios.length) && <div>-</div>}
          <span className="subtitle mb1 mt3">Shininesse <i className="material-icons f7 v-btm">lock</i></span>
          {data.shininesses && <div>
            {data.shininesses.map((r, i) => <div>{r}</div>)}
          </div>}
          {(!data.shininesses || !data.shininesses.length) && <div>-</div>}
        </div>
      }
    </div>
  }
}
