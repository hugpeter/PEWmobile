class Listener {
    constructor (notifier, key, onNavEnter, onNavExit) {
      this.notifier = notifier
      this.key = key
      this.onNavEnter = onNavEnter
      this.onNavExit = onNavExit
    }
  
    off () {
      this.notifier.removeListener(this)
    }
}

function findRouteKey(navLevel){
    if(navLevel.index == undefined){
        return navLevel.key;
    } else {
        return findRouteKey(navLevel.routes[navLevel.index]);
    }
}
  
class Notifier {
    constructor () {
      this.listeners = new Set()
    }
  
    removeListener (listener) {
      this.listeners.delete(listener)
    }
  
    onNavigationStateChange (prevState, currState) {
      //search through route tree and find leaf route's key
      const prevKey = findRouteKey(prevState);
      const currKey = findRouteKey(currState);

      if(prevKey != currKey){
        // Handle all exit events...
        this.listeners.forEach((listener) => {
          if (listener.key === prevKey) {
            listener.onNavExit()
          }
        })
    
        // ...then all enter events
        this.listeners.forEach((listener) => {
          if (listener.key === currKey) {
            listener.onNavEnter()
          }
        })
      }
    }
  
    newListener (screen, onNavEnter, onNavExit) {
      const listener = new Listener(
        this,
        screen.props.navigation.state.key,
        onNavEnter,
        onNavExit
      )
      this.listeners.add(listener)
      return listener
    }
}
  
export default (new Notifier())