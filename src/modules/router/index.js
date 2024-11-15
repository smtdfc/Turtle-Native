import { TurtleRenderHelper, TurtleRenderData } from '@smtdfcteam/turtle';

export class TurtleNativeRouter {
  constructor(app, configs = {}) {
    this.app = app
    this.configs = configs
    this.root = configs.root ?? document.createElement("div")
    this.app.router = this
    this.pages = {}
    this.currentPage = ""
    this.data = {}
    this.pageComponents = {}
    this.events = {
      notallow: [],
      notfound: [],
      pagematches: [],
      pageloaded: [],
      pagechange: []
    };
  }

  /**
   * Registers an event listener for a specific router event.
   *
   * @param {string} event - The name of the event (e.g., 'pagechange', 'notfound').
   * @param {function} callback - The function to call when the event is triggered.
   */
  on(event, callback) {
    this.events[event].push(callback);
  }

  /**
   * Unregisters an event listener for a specific router event.
   *
   * @param {string} event - The name of the event.
   * @param {function} callback - The callback function to remove.
   */
  off(event, callback) {
    this.events[event].forEach((fn, idx) => {
      if (fn === callback) {
        this.events[event].splice(idx, 1);
      }
    });
  }

  /**
   * Emits an event.
   *
   * @param {string} name - The event name.
   * @param {*} data - The data to pass with the event.
   */
  emitEvent(name, data) {
    this.events[name].forEach(fn => {
      fn(data);
    });
  }

  createPage(namespace, component) {
    this.pages[namespace] = component
  }

  async resolve(name) {
    this.emitEvent("pagechange", this)
    let configs = this.pages[name]
    this.emitEvent("pagematches", this)

    if (!this.pageComponents[configs.name]) {
      await configs.loader()
    }
    let renderHelper = new TurtleRenderHelper(this.app, this.root, new TurtleRenderData(this.app))
    let component = this.pageComponents[configs.name]
    this.root.textContent = ""
    this.emitEvent("pageloaded", this)
    this.root.appendChild(renderHelper.fragment`
      <${component}/>
    `)
  }

  match(pagesName,current) {
    for (let name of pagesName) {
      if(current == name){
        return [true,name]
      }
    }
    return [false,null]
  }
  
  matches(name) {
    if (this.pages[name]) {
      this.currentPage = name
      this.resolve(name)
    }
  }


}