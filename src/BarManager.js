export default class BarManager {
  constructor(bar, container) {
    this.bar = bar;
    this.container = container;
  }

  getPartition(pointX, direction = 'left') {
    const containerWidth = this.container.getBoundingClientRect().width;
    const barRect        = this.bar.getBoundingClientRect();
    let barWidth = pointX - barRect.left;

    if(direction === 'right') {

    }


    return barWidth / containerWidth;
  }

  slide(partition) {
    return () => {
      this.bar.style.width = `${partition * 100}%`;
    }
  }
}
