export default class SliderManager {
  constructor(toggle, container) {
    this.toggle = toggle;
    this.container = container;
  }

  getOffset(pointX, direction = 'left') {
    const maxWidth     = this.container.offsetWidth;
    const toggleWidth  = this.toggle.offsetWidth;
    const sliderOffset = this.container.getBoundingClientRect().left;
    const curOffset    = parseInt((pointX - (toggleWidth / 2) - sliderOffset), 10);

    /* adjust offset */
    if(curOffset > (maxWidth - (toggleWidth / 2))) { return (maxWidth - toggleWidth / 2); }
    if(curOffset < (0 - (toggleWidth / 2))) { return (0 - toggleWidth / 2); }

    return curOffset;
  }

  slide(pointX, direction = 'left') {
    const translateX = SliderManager.getTranslateX(pointX, direction);

    return () => {
      this.toggle.style.left = translateX;
    }
  }
}

SliderManager.getTranslateX = function(pointX, direction) {

  return `${pointX}px`;

}
