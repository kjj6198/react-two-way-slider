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
      let barWidth = this.container.getBoundingClientRect().right
    }

    if(barWidth / containerWidth < 0) {
      return 0;
    } else if (barWidth / containerWidth >= 1) {
      return 1;
    }

    return barWidth / containerWidth;
  }

  slide(partition) {
    return () => {
      this.bar.style.width = `${partition * 100}%`;
    }
  }
}
