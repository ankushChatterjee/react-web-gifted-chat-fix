import { InteractionManager } from "react-native";
export default Object.assign({}, InteractionManager, {
  runAfterInteractions: function runAfterInteractions(f) {
    // ensure f get called, timeout at 500ms
    // @gre workaround https://github.com/facebook/react-native/issues/8624
    var called = false;
    var timeout = setTimeout(function () {
      called = true;f();
    }, 500);
    InteractionManager.runAfterInteractions(function () {
      if (called) return;
      clearTimeout(timeout);
      f();
    });
  }
});